import type { PropsWithChildren, ReactNode } from 'react'
import { View, type ViewProps } from 'react-native'

import { ThemedText } from '@/components/themed-text'
import { cn } from '@/lib/cn'

type AppCardProps = PropsWithChildren<
  ViewProps & {
    className?: string
  }
>

type AppCardHeaderProps = PropsWithChildren<{
  className?: string
  description?: string
  descriptionClassName?: string
  eyebrow?: string
  eyebrowClassName?: string
  title?: string
  titleClassName?: string
  trailing?: ReactNode
}>

type AppCardSectionProps = PropsWithChildren<{
  className?: string
}>

export function AppCard({ children, className, style, ...props }: AppCardProps) {
  return (
    <View
      className={cn('overflow-hidden rounded-lg border border-secondary bg-secondary', className)}
      style={style}
      {...props}>
      {children}
    </View>
  )
}

export function AppCardHeader({
  children,
  className,
  description,
  descriptionClassName,
  eyebrow,
  eyebrowClassName,
  title,
  titleClassName,
  trailing
}: AppCardHeaderProps) {
  return (
    <View className={cn('px-5 pt-5 pb-4', className)}>
      <View className='flex-row items-start gap-4'>
        <View className='flex-1 gap-1'>
          {eyebrow ? (
            <ThemedText type='eyebrow' className={eyebrowClassName}>
              {eyebrow}
            </ThemedText>
          ) : null}

          {title ? (
            <ThemedText className={cn('text-[16px] leading-7 font-medium', titleClassName)}>{title}</ThemedText>
          ) : null}

          {description ? (
            <ThemedText themeColor='textSecondary' className={cn('leading-5.5', descriptionClassName)}>
              {description}
            </ThemedText>
          ) : null}

          {children}
        </View>

        {trailing ? <View className='shrink-0 items-end'>{trailing}</View> : null}
      </View>
    </View>
  )
}

export function AppCardContent({ children, className }: AppCardSectionProps) {
  return <View className={cn('px-5 pb-5 gap-4', className)}>{children}</View>
}

export function AppCardDivider() {
  return <View className='mx-5 h-px bg-border' />
}

export function AppCardFooter({ children, className }: AppCardSectionProps) {
  return <View className={cn('px-5 pt-4 pb-5 gap-4', className)}>{children}</View>
}
