import '@/global.css'

import { Platform } from 'react-native'

export const Colors = {
  light: {
    text: '#20212B',
    background: '#F7F4EF',
    backgroundElement: '#FFFFFF',
    backgroundSelected: '#F1ECE7',
    textSecondary: '#6E6B76',
    accent: '#8A72FF',
    accentSoft: '#F0EBFF',
    border: '#E7E0D9'
  },
  dark: {
    text: '#F7F4EF',
    background: '#0d0c0d', //'#232627'
    backgroundElement: '#53575c',
    backgroundSelected: '#28272a',
    textSecondary: '#ACA8B6',
    accent: '#A795FF',
    accentSoft: '#2B2440',
    border: '#343543'
  }
} as const

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace'
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace'
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)'
  }
})

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64
} as const

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0
export const MaxContentWidth = 960
