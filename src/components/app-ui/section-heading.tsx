import type { ReactNode } from 'react'
import { View } from 'react-native'

import { ThemedText } from '@/components/themed-text'
import { cn } from '@/lib/cn'

type SectionHeadingProps = {
  align?: 'left' | 'center'
  className?: string
  description?: string
  descriptionClassName?: string
  eyebrow?: string
  title: string
  titleClassName?: string
  trailing?: ReactNode
}

export function SectionHeading({
  align = 'left',
  className,
  description,
  descriptionClassName,
  eyebrow,
  title,
  titleClassName,
  trailing
}: SectionHeadingProps) {
  const centered = align === 'center'

  return (
    <View className={cn('gap-1', centered && 'items-center', className)}>
      {eyebrow ? (
        <ThemedText type='eyebrow' className={cn(centered && 'text-center')}>
          {eyebrow}
        </ThemedText>
      ) : null}

      <ThemedText type='subtitle' className={cn(centered && 'text-center', titleClassName)}>
        {title}
      </ThemedText>

      {description ? (
        <ThemedText
          themeColor='textSecondary'
          className={cn('max-w-160', centered && 'text-center', descriptionClassName)}>
          {description}
        </ThemedText>
      ) : null}

      {trailing ? <View className={cn(centered && 'items-center')}>{trailing}</View> : null}
    </View>
  )
}
