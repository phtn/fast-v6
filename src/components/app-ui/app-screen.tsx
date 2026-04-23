import type { PropsWithChildren, ReactNode } from 'react'
import { Platform, ScrollView, View, type ScrollViewProps } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { MaxContentWidth, Spacing } from '@/constants/theme'
import { cn } from '@/lib/cn'

type AppScreenProps = PropsWithChildren<
  ScrollViewProps & {
    className?: string
    innerClassName?: string
    maxWidth?: number
    stickyHeader?: ReactNode
    stickyHeaderClassName?: string
    stickyHeaderGap?: number
  }
>

export function AppScreen({
  children,
  className,
  contentContainerStyle,
  innerClassName,
  keyboardShouldPersistTaps = 'handled',
  maxWidth = MaxContentWidth,
  showsVerticalScrollIndicator = false,
  stickyHeader,
  stickyHeaderClassName,
  stickyHeaderGap = Spacing.two,
  style,
  stickyHeaderIndices,
  ...props
}: AppScreenProps) {
  const insets = useSafeAreaInsets()

  const topPadding =
    Platform.select({
      web: Spacing.six,
      default: stickyHeader ? 0 : insets.top + Spacing.three
    }) ?? Spacing.six

  const bottomPadding =
    Platform.select({
      web: Spacing.five,
      default: insets.bottom
    }) ?? Spacing.five

  const horizontalPadding = {
    paddingLeft: Spacing.two + insets.left,
    paddingRight: Spacing.two + insets.right
  }

  return (
    <ScrollView
      className={cn('flex-1 bg-background', className)}
      contentContainerStyle={[
        {
          paddingTop: stickyHeader ? 0 : topPadding,
          paddingBottom: bottomPadding
        },
        contentContainerStyle
      ]}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      stickyHeaderIndices={stickyHeader ? [0] : stickyHeaderIndices}
      style={style}
      {...props}>
      {stickyHeader ? (
        <View
          className={cn('w-full bg-background', stickyHeaderClassName)}
          style={{ paddingTop: topPadding, paddingBottom: stickyHeaderGap, ...horizontalPadding }}>
          <View className='w-full self-center' style={maxWidth ? { maxWidth } : undefined}>
            {stickyHeader}
          </View>
        </View>
      ) : null}

      <View
        className={cn('w-full self-center gap-6', innerClassName)}
        style={[horizontalPadding, maxWidth ? { maxWidth } : undefined]}>
        {children}
      </View>
    </ScrollView>
  )
}
