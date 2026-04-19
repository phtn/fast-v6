import type { PropsWithChildren } from 'react'
import { View } from 'react-native'

import { ThemedText } from '@/components/themed-text'
import { cn } from '@/lib/cn'

type AppBadgeProps = PropsWithChildren<{
  className?: string
  labelClassName?: string
  tone?: 'accent' | 'ink' | 'neutral'
}>

export function AppBadge({
  children,
  className,
  labelClassName,
  tone = 'accent'
}: AppBadgeProps) {
  return (
    <View
      className={cn(
        'self-start rounded-full px-2.5 py-1',
        tone === 'accent' && 'bg-accent-soft',
        tone === 'ink' && 'bg-foreground',
        tone === 'neutral' && 'bg-default',
        className
      )}>
      <ThemedText
        className={cn(
          'text-[11px] leading-[14px] font-semibold',
          tone === 'accent' && 'text-accent',
          tone === 'ink' && 'text-background',
          tone === 'neutral' && 'text-muted',
          labelClassName
        )}>
        {children}
      </ThemedText>
    </View>
  )
}
