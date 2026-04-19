import { DarkTheme, DefaultTheme, type Theme } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren
} from 'react'
import { Appearance, Platform } from 'react-native'

import { Colors } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { okxsFontMap } from './okxs-font-map'

export type ThemePreference = 'system' | 'light' | 'dark'
export type ResolvedTheme = 'light' | 'dark'

type FontFamilies = {
  display?: string
  displayMedium?: string
}

type AppThemeContextValue = {
  colors: (typeof Colors)[ResolvedTheme]
  fontFamilies: FontFamilies
  fontsReady: boolean
  hasCustomDisplayFont: boolean
  isDark: boolean
  navigationTheme: Theme
  resolvedTheme: ResolvedTheme
  setTheme: (theme: ThemePreference) => void
  theme: ThemePreference
  toggleTheme: () => void
}

const AppThemeContext = createContext<AppThemeContextValue | null>(null)

function normalizeColorScheme(colorScheme: ReturnType<typeof useColorScheme>): ResolvedTheme {
  return colorScheme === 'dark' ? 'dark' : 'light'
}

export function AppThemeProvider({ children }: PropsWithChildren) {
  const systemColorScheme = useColorScheme()
  const [theme, setTheme] = useState<ThemePreference>('system')
  const [fontsLoaded, fontError] = useFonts(okxsFontMap)

  const resolvedTheme = theme === 'system' ? normalizeColorScheme(systemColorScheme) : theme
  const fontsReady = fontsLoaded || Boolean(fontError)
  const hasCustomDisplayFont = fontsLoaded && !fontError

  useEffect(() => {
    if (Platform.OS === 'web') {
      return
    }

    Appearance.setColorScheme(theme === 'system' ? 'unspecified' : resolvedTheme)
  }, [resolvedTheme, theme])

  useEffect(() => {
    if (fontError) {
      console.warn('[theme] OKXS fonts failed to load, using platform fallback instead.', fontError)
    }
  }, [fontError])

  const value = useMemo<AppThemeContextValue>(() => {
    const fontFamilies: FontFamilies = hasCustomDisplayFont
      ? {
          display: 'OKXS',
          displayMedium: 'OKXS-Medium'
        }
      : {}

    return {
      colors: Colors[resolvedTheme],
      fontFamilies,
      fontsReady,
      hasCustomDisplayFont,
      isDark: resolvedTheme === 'dark',
      navigationTheme: resolvedTheme === 'dark' ? DarkTheme : DefaultTheme,
      resolvedTheme,
      setTheme,
      theme,
      toggleTheme: () => {
        setTheme((currentTheme) => {
          if (currentTheme === 'system') {
            return resolvedTheme === 'dark' ? 'light' : 'dark'
          }

          return currentTheme === 'dark' ? 'light' : 'dark'
        })
      }
    }
  }, [fontsReady, hasCustomDisplayFont, resolvedTheme, theme])

  return <AppThemeContext.Provider value={value}>{children}</AppThemeContext.Provider>
}

export function useAppTheme() {
  const context = useContext(AppThemeContext)

  if (!context) {
    throw new Error('useAppTheme must be used within an AppThemeProvider.')
  }

  return context
}
