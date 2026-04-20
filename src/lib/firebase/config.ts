import { Platform } from 'react-native'

const env = (name: string) => process.env[name] ?? ''

const androidApp = {
  apiKey: env('EXPO_PUBLIC_FIREBASE_ANDROID_API_KEY'),
  appId: env('EXPO_PUBLIC_FIREBASE_ANDROID_APP_ID')
} as const

const iosApp = {
  apiKey: env('EXPO_PUBLIC_FIREBASE_IOS_API_KEY'),
  appId: env('EXPO_PUBLIC_FIREBASE_IOS_APP_ID')
} as const

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

export const firebaseConfig = Platform.select({
  ios: {
    ...iosApp,
    authDomain,
    messagingSenderId,
    projectId,
    storageBucket
  },
  android: {
    ...androidApp,
    authDomain,
    messagingSenderId,
    projectId,
    storageBucket
  },
  web: firebaseWebConfig,
  default: {
    ...firebaseWebConfig,
    authDomain,
    messagingSenderId,
    projectId,
    storageBucket
  }
})!

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
