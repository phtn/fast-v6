import AsyncStorage from '@react-native-async-storage/async-storage'
import { getApp, getApps, initializeApp } from 'firebase/app'
import * as FirebaseAuth from 'firebase/auth'
import type { Persistence } from 'firebase/auth'
import { Platform } from 'react-native'

import { firebaseConfig } from '@/lib/firebase/config'

export const firebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)

const getReactNativePersistence = (
  FirebaseAuth as typeof FirebaseAuth & {
    getReactNativePersistence?: (storage: typeof AsyncStorage) => Persistence
  }
).getReactNativePersistence

export const auth =
  Platform.OS === 'web' || !getReactNativePersistence
    ? FirebaseAuth.getAuth(firebaseApp)
    : (() => {
        try {
          return FirebaseAuth.initializeAuth(firebaseApp, {
            persistence: getReactNativePersistence(AsyncStorage)
          })
        } catch {
          return FirebaseAuth.getAuth(firebaseApp)
        }
      })()
