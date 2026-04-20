import * as Google from 'expo-auth-session/providers/google'
import Constants from 'expo-constants'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import * as WebBrowser from 'expo-web-browser'
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Platform, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'

import { AppButton, AppCard, AppCardContent, AppCardHeader, SectionHeading } from '@/components/app-ui'
import { AuthScreen } from '@/components/app-ui/auth-screen'
import { ThemedText } from '@/components/themed-text'
import { useAuthSession } from '@/context/auth-context'
import { auth } from '@/lib/firebase/client'
import { googleAuthConfig } from '@/lib/firebase/config'

WebBrowser.maybeCompleteAuthSession()

type NativeGoogleSignInModule = {
  GoogleSignin: {
    configure: (options: { iosClientId?: string; webClientId?: string }) => void
    hasPlayServices: (options: { showPlayServicesUpdateDialog: boolean }) => Promise<boolean>
    signIn: () => Promise<unknown>
    signOut: () => Promise<null>
  }
  isErrorWithCode: (error: unknown) => error is Error & { code: string }
  isSuccessResponse: (response: unknown) => response is { type: 'success'; data: { idToken: string | null } }
  statusCodes: {
    PLAY_SERVICES_NOT_AVAILABLE: string
    IN_PROGRESS: string
  }
}

const nativeGoogleSignInModule: NativeGoogleSignInModule | null =
  Platform.OS === 'web'
    ? null
    : (() => {
        try {
          return require('@react-native-google-signin/google-signin') as NativeGoogleSignInModule
        } catch {
          return null
        }
      })()

export default function HomeScreen() {
  const router = useRouter()
  const { ready, signOut, user } = useAuthSession()
  const [busy, setBusy] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const isExpoGoNative = Platform.OS !== 'web' && Constants.appOwnership === 'expo'
  const needsNativeRebuild = Platform.OS !== 'web' && !isExpoGoNative && !nativeGoogleSignInModule
  const usesNativeGoogleSignIn = Platform.OS !== 'web' && !isExpoGoNative && Boolean(nativeGoogleSignInModule)

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    androidClientId: googleAuthConfig.androidClientId,
    iosClientId: googleAuthConfig.iosClientId,
    selectAccount: true,
    webClientId: googleAuthConfig.webClientId
  })

  const signedInLabel = useMemo(() => {
    if (!user) {
      return null
    }

    return user.displayName ?? user.email ?? 'Google account connected'
  }, [user])

  const exchangeGoogleToken = useCallback(async (idToken?: string | null) => {
    if (!idToken) {
      throw new Error('Google did not return an ID token.')
    }

    const credential = GoogleAuthProvider.credential(idToken)
    await signInWithCredential(auth, credential)
    setErrorMessage(null)
  }, [])

  useEffect(() => {
    if (!usesNativeGoogleSignIn) {
      return
    }

    nativeGoogleSignInModule?.GoogleSignin.configure({
      iosClientId: googleAuthConfig.iosClientId,
      webClientId: googleAuthConfig.webClientId
    })
  }, [usesNativeGoogleSignIn])

  useEffect(() => {
    if (!response) {
      return
    }

    if (response.type === 'success') {
      void exchangeGoogleToken(response.params.id_token ?? response.authentication?.idToken)
        .catch((error: unknown) => {
          const message = error instanceof Error ? error.message : 'Unable to finish Google sign-in.'
          setErrorMessage(message)
        })
        .finally(() => {
          setBusy(false)
        })

      return
    }

    if (response.type === 'error') {
      setErrorMessage(response.error?.message ?? 'Unable to start Google sign-in.')
    }

    setBusy(false)
  }, [exchangeGoogleToken, response])

  const handleContinueWithGoogle = useCallback(async () => {
    setBusy(true)
    setErrorMessage(null)

    try {
      if (usesNativeGoogleSignIn) {
        await nativeGoogleSignInModule?.GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })

        const nativeResponse = await nativeGoogleSignInModule?.GoogleSignin.signIn()

        if (!nativeGoogleSignInModule?.isSuccessResponse(nativeResponse)) {
          setBusy(false)
          return
        }

        await exchangeGoogleToken(nativeResponse.data.idToken)
        setBusy(false)
        return
      }

      const result = await promptAsync()

      if (result.type !== 'success') {
        setBusy(false)
      }
    } catch (error) {
      let message = error instanceof Error ? error.message : 'Unable to start Google sign-in.'

      if (nativeGoogleSignInModule?.isErrorWithCode(error)) {
        switch (error.code) {
          case nativeGoogleSignInModule.statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            message = 'Google Play Services is unavailable or needs an update on this device.'
            break
          case nativeGoogleSignInModule.statusCodes.IN_PROGRESS:
            message = 'Google sign-in is already in progress.'
            break
        }
      }

      setErrorMessage(message)
      setBusy(false)
    }
  }, [exchangeGoogleToken, promptAsync, usesNativeGoogleSignIn])

  const handleSignOut = useCallback(async () => {
    setBusy(true)
    setErrorMessage(null)

    try {
      if (usesNativeGoogleSignIn) {
        await nativeGoogleSignInModule?.GoogleSignin.signOut()
      }

      await signOut()
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to sign out.'
      setErrorMessage(message)
    } finally {
      setBusy(false)
    }
  }, [signOut, usesNativeGoogleSignIn])

  return (
    <AuthScreen innerClassName='gap-6' keyboardShouldPersistTaps='handled' maxWidth={520}>
      <View className='relative overflow-hidden rounded-lg bg-linear-to-b from-secondary/20 to-background h-full'>
        <Image
          className='h-full'
          contentFit='cover'
          source={require('@/assets/images/logo-glow.png')}
          style={{ width: '100%', aspectRatio: 0.69 }}
        />
      </View>

      {user && (
        <SectionHeading
          eyebrow='FastInsure'
          title='Welcome back'
          description='Your Google account is connected and ready to use.'
        />
      )}

      <AppCard className='absolute -bottom-20 bg-transparent border-0 p-6'>
        <AppCardHeader
          eyebrow=''
          title={user ? (signedInLabel ?? 'Signed in') : ''}
          description={user ? 'You can go straight into the app or disconnect this device from your session.' : ''}
        />
        <AppCardContent className='gap-4'>
          {user && (
            <View className='gap-1 rounded-lg border border-border bg-background px-4 py-4'>
              <ThemedText type='small' themeColor='textSecondary'>
                Signed in as
              </ThemedText>
              <ThemedText className='font-medium'>{user?.email ?? 'Google account'}</ThemedText>
            </View>
          )}

          {user ? (
            <AppButton fullWidth size='lg' onPress={() => router.replace('/components')}>
              Open workspace
            </AppButton>
          ) : (
            <AppButton
              fullWidth
              tone='primary'
              className='border-border'
              isDisabled={!ready || busy || isExpoGoNative || needsNativeRebuild || (Platform.OS === 'web' && !request)}
              leadingIcon={<GoogleMark />}
              onPress={() => void handleContinueWithGoogle()}>
              {busy ? 'Connecting...' : 'Continue with Google'}
            </AppButton>
          )}

          {user ? (
            <AppButton
              fullWidth
              tone='tertiary'
              className='border-border'
              isDisabled={busy}
              onPress={() => void handleSignOut()}>
              {busy ? 'Signing out...' : 'Sign out'}
            </AppButton>
          ) : null}

          <ThemedText themeColor='textSecondary' className='text-[14px] text-balance text-center leading-5 opacity-50'>
            {isExpoGoNative
              ? 'Google sign-in on Android and iOS requires a development build. Expo Go redirects to exp:// URLs, which Google rejects.'
              : needsNativeRebuild
                ? 'This build does not include the Google Sign-In native module yet. Rebuild and reinstall the Android app after adding the plugin.'
                : usesNativeGoogleSignIn
                  ? 'Google sign-in is using the native Android or iOS SDK for this build.'
                  : !ready
                    ? 'Restoring your session...'
                    : busy
                      ? 'Waiting for Google to finish the sign-in flow.'
                      : user
                        ? 'Firebase Authentication is active on this device.'
                        : request
                          ? 'Google sign-in is ready.'
                          : 'Preparing Google sign-in.'}
          </ThemedText>

          {errorMessage ? <ThemedText className='text-[14px] leading-5 text-danger'>{errorMessage}</ThemedText> : null}
        </AppCardContent>
      </AppCard>
    </AuthScreen>
  )
}

function GoogleMark() {
  return (
    <Svg fill='none' height={18} viewBox='0 0 20 20' width={18}>
      <Path
        d='M18.16 10.22c0-.67-.06-1.31-.17-1.93H10v3.65h4.56a3.9 3.9 0 0 1-1.69 2.56v2.13h2.74c1.61-1.48 2.55-3.66 2.55-6.41Z'
        fill='#4285F4'
        // fill='#FFFFFF'
      />
      <Path
        d='M10 18.5c2.29 0 4.21-.76 5.61-2.06l-2.74-2.13c-.76.51-1.73.82-2.87.82-2.21 0-4.09-1.49-4.76-3.5H2.41v2.2A8.48 8.48 0 0 0 10 18.5Z'
        fill='#34A853'
        // fill='#FFFFFF'
      />
      <Path
        d='M5.24 11.63A5.1 5.1 0 0 1 4.98 10c0-.57.1-1.11.26-1.63V6.17H2.41A8.5 8.5 0 0 0 1.5 10c0 1.37.33 2.66.91 3.83l2.83-2.2Z'
        fill='#FBBC04'
        // fill='#FFFFFF'
      />
      <Path
        d='M10 4.88c1.24 0 2.36.43 3.24 1.27l2.43-2.43C14.21 2.36 12.29 1.5 10 1.5A8.48 8.48 0 0 0 2.41 6.17l2.83 2.2c.67-2.01 2.55-3.49 4.76-3.49Z'
        fill='#EA4335'
        // fill='#FFFFFF'
      />
    </Svg>
  )
}
