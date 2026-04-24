# Android Release Runbook

This project now supports two Android release paths:

- local signed release builds from Gradle
- EAS cloud builds with Firebase config passed as a secret file environment variable

Important:

- the repo currently ignores `/android`, so native signing changes inside `android/` are local workspace changes
- this runbook is the tracked source of truth for recreating that setup after `expo prebuild --clean` or on another machine

## Release files used by this repo

- Tracked:
  - `app.config.ts`
  - `docs/android-keystore.properties.example`
  - `src/context/okxs-font-map.ts`
  - `src/context/okxs-font-map.web.ts`
- Local only and ignored by git:
  - `android/app/build.gradle` release-signing wiring
  - `android/keystore.properties`
  - `android/app/fastsaf-upload-key.jks`
- EAS secret:
  - `GOOGLE_SERVICES_JSON`

## One-time setup

1. Generate an Android upload keystore:

```sh
cd android
keytool -genkeypair \
  -v \
  -storetype PKCS12 \
  -keystore app/fastsaf-upload-key.jks \
  -alias fastsaf-upload \
  -keyalg RSA \
  -keysize 4096 \
  -validity 10000 \
  -storepass "<store-password>" \
  -keypass "<key-password>" \
  -dname "CN=FastInsure Technologies, OU=Mobile, O=FastInsure Technologies, L=Manila, ST=Metro Manila, C=PH"
```

For `PKCS12`, use the same value for `storepass` and `keypass`.

2. Create `android/keystore.properties` using [`android-keystore.properties.example`](./android-keystore.properties.example) as the template:

```properties
storeFile=app/fastsaf-upload-key.jks
storePassword=<store-password>
keyAlias=fastsaf-upload
keyPassword=<store-password>
```

3. Add Firebase Android config to EAS once:

```sh
npx eas-cli@latest env:create \
  --name GOOGLE_SERVICES_JSON \
  --type file \
  --visibility secret \
  --value ./google-services.json \
  --environment preview \
  --environment production
```

4. Link the repo to EAS once if it is not already linked:

```sh
npx eas-cli@latest init
```

## Local signed release builds

1. Build a signed APK:

```sh
npm run build:android:local:apk
```

Output:

- `android/app/build/outputs/apk/release/app-release.apk`

2. Build a signed AAB for Play Console upload:

```sh
npm run build:android:local:aab
```

Output:

- `android/app/build/outputs/bundle/release/app-release.aab`

3. Build both in one run:

```sh
npm run build:android:local:release
```

## EAS cloud builds

1. Internal signed APK:

```sh
npm run build:android:apk
```

2. Store-oriented production build:

```sh
npm run build:android:production
```

Note:

- `app.config.ts` maps `GOOGLE_SERVICES_JSON` from EAS into `android.googleServicesFile`, so the cloud builder does not need `google-services.json` committed to git.

## Verification

1. Verify lint:

```sh
npm run lint
```

2. Verify APK signing certificate:

```sh
$ANDROID_HOME/build-tools/36.0.0/apksigner verify --print-certs android/app/build/outputs/apk/release/app-release.apk
```

3. Inspect keystore fingerprints:

```sh
cd android
keytool -list -v -keystore app/fastsaf-upload-key.jks -alias fastsaf-upload
```

Current upload key fingerprints in this workspace:

- SHA-1: `8B:7E:3C:B9:28:9E:DE:7F:05:EA:8C:50:97:97:38:6A:7D:1E:92:B2`
- SHA-256: `C3:38:A1:96:9C:9B:4B:C3:14:C1:F0:2D:4D:BC:4F:76:2C:63:32:FA:4C:8A:5B:A1:56:32:40:9B:40:0F:C9:E8`

## Troubleshooting

- If release build fails immediately with a signing error, `android/keystore.properties` is missing or incomplete.
- If EAS fails with missing `google-services.json`, recreate the `GOOGLE_SERVICES_JSON` file secret.
- If Android fails on duplicate font resources, keep native fonts in `src/context/okxs-font-map.ts` and web fonts in `src/context/okxs-font-map.web.ts`.
- If `./gradlew clean` fails in native CMake cleanup, rerun `assembleRelease` or `bundleRelease` without `clean`.
- If Gradle warns about metaspace locally, increase `org.gradle.jvmargs` in `android/gradle.properties`.
