import type { PropsWithChildren } from 'react'
import { View } from 'react-native'

import { ThemedText } from '@/components/themed-text'
import { cn } from '@/lib/cn'

type AppBadgeProps = PropsWithChildren<{
  className?: string
  labelClassName?: string
  tone?: 'accent' | 'ink' | 'neutral' | 'active' | 'dark'
  size?: 'sm' | 'md'
}>

export function AppBadge({ children, className, labelClassName, size, tone = 'accent' }: AppBadgeProps) {
  return (
    <View
      className={cn(
        'self-start rounded-full px-2.5 py-1',
        tone === 'accent' && 'bg-accent-soft',
        tone === 'ink' && 'bg-foreground',
        (tone === 'neutral' || tone === 'dark') && 'bg-default',
        tone === 'active' && 'bg-active',
        size === 'sm' && 'px-1 py-0.5',
        className
      )}>
      <ThemedText
        className={cn(
          'text-[11px] leading-3.5 font-semibold',
          tone === 'accent' && 'text-accent',
          tone === 'ink' && 'text-background',
          tone === 'neutral' && 'text-muted',
          tone === 'active' && 'text-white',
          labelClassName
        )}>
        {children}
      </ThemedText>
    </View>
  )
}

export function IconBadge({ children, className, labelClassName, size, tone = 'accent' }: AppBadgeProps) {
  return (
    <View
      className={cn(
        'flex-row items-center justify-center self-center rounded-full aspect-square size-7',
        tone === 'accent' && 'bg-accent-soft',
        tone === 'ink' && 'bg-foreground',
        (tone === 'neutral' || tone === 'dark') && 'bg-default',
        tone === 'active' && 'bg-active',
        size === 'sm' && 'size-5',
        className
      )}>
      <ThemedText
        className={cn(
          'text-[16px] leading-3.5 font-semibold',
          tone === 'accent' && 'text-accent',
          tone === 'ink' && 'text-background',
          tone === 'neutral' && 'text-muted',
          (tone === 'active' || tone === 'dark') && 'text-white',
          size === 'sm' && 'text-[14px]',
          labelClassName
        )}>
        {children}
      </ThemedText>
    </View>
  )
}
