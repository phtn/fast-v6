import { ThemeProvider } from '@react-navigation/native'
import type { HeroUINativeConfig } from 'heroui-native'
import { HeroUINativeProvider } from 'heroui-native'
import React, { useMemo } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { AnimatedSplashOverlay } from '@/components/animated-icon'
import AppTabs from '@/components/app-tabs'
import { AppThemeProvider, useAppTheme } from '@/context/app-theme-context'

export default function TabLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppThemeProvider>
        <RootLayoutContent />
      </AppThemeProvider>
    </GestureHandlerRootView>
  )
}

function RootLayoutContent() {
  const { fontFamilies, fontsReady, navigationTheme } = useAppTheme()

  const heroUIConfig = useMemo<HeroUINativeConfig>(
    () => ({
      textProps: {
        allowFontScaling: true,
        maxFontSizeMultiplier: 1.5,
        minimumFontScale: 0.5,
        style: fontFamilies.display ? { fontFamily: fontFamilies.display } : undefined
      },
      toast: {
        defaultProps: { variant: 'default', placement: 'top' },
        insets: { top: 0, bottom: 6, left: 12, right: 12 },
        maxVisibleToasts: 3
      }
    }),
    [fontFamilies.display]
  )

  if (!fontsReady) {
    return null
  }

  return (
    <HeroUINativeProvider config={heroUIConfig}>
      <ThemeProvider value={navigationTheme}>
        <AnimatedSplashOverlay />
        <AppTabs />
      </ThemeProvider>
    </HeroUINativeProvider>
  )
}
