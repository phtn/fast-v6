const env = (name: string) => process.env[name] ?? ''

const firebaseWebConfig = {
  apiKey: env('EXPO_PUBLIC_FIREBASE_WEB_API_KEY'),
  authDomain: env('EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN'),
  projectId: env('EXPO_PUBLIC_FIREBASE_PROJECT_ID'),
  storageBucket: env('EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: env('EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID'),
  appId: env('EXPO_PUBLIC_FIREBASE_WEB_APP_ID'),
  measurementId: env('EXPO_PUBLIC_FIREBASE_WEB_MEASUREMENT_ID')
} as const

const projectId = env('EXPO_PUBLIC_FIREBASE_PROJECT_ID')
const storageBucket = env('EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET')
const messagingSenderId = env('EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID')
const authDomain = env('EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN')

// This app uses the Firebase JavaScript SDK in React Native, so native builds
// should initialize with the Firebase Web app config instead of the Android/iOS
// native app config files.
export const firebaseConfig = firebaseWebConfig

export const googleAuthConfig = {
  androidClientId: env('EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID'),
  iosClientId: env('EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID'),
  webClientId: env('EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID')
} as const

export const firebaseProjectConfig = {
  authDomain,
  messagingSenderId,
  packageName: env('EXPO_PUBLIC_ANDROID_PACKAGE_NAME'),
  projectId,
  storageBucket
} as const
