import type { PropsWithChildren } from 'react'
import { Platform, ScrollView, View, type ScrollViewProps } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme'
import { cn } from '@/lib/cn'

type AppScreenProps = PropsWithChildren<
  ScrollViewProps & {
    className?: string
    innerClassName?: string
    maxWidth?: number
  }
>

export function AuthScreen({
  children,
  className,
  contentContainerStyle,
  innerClassName,
  keyboardShouldPersistTaps = 'handled',
  maxWidth = MaxContentWidth,
  showsVerticalScrollIndicator = false,
  style,
  ...props
}: AppScreenProps) {
  const insets = useSafeAreaInsets()

  const topPadding =
    Platform.select({
      web: Spacing.six,
      default: insets.top + Spacing.three
    }) ?? Spacing.six

  const bottomPadding =
    Platform.select({
      web: Spacing.five,
      default: insets.bottom + BottomTabInset + Spacing.three
    }) ?? Spacing.five

  return (
    <ScrollView
      className={cn('flex-1 bg-background', className)}
      contentContainerStyle={[
        {
          alignItems: 'center',
          paddingTop: topPadding,
          paddingBottom: bottomPadding,
          paddingLeft: Spacing.none + insets.left,
          paddingRight: Spacing.none + insets.right
        },
        contentContainerStyle
      ]}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      style={style}
      {...props}>
      <View className={cn('w-full gap-6', innerClassName)} style={maxWidth ? { maxWidth } : undefined}>
        {children}
      </View>
    </ScrollView>
  )
}
