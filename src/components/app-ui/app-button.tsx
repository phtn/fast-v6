import { PressableFeedback, type PressableFeedbackProps } from 'heroui-native'
import type { PropsWithChildren, ReactNode } from 'react'
import { View } from 'react-native'

import { ThemedText } from '@/components/themed-text'
import { cn } from '@/lib/cn'

type Tone = 'primary' | 'secondary' | 'ghost' | 'active' | 'tertiary'
type AppButtonSize = 'sm' | 'md' | 'lg'

type AppButtonProps = PropsWithChildren<
  Omit<PressableFeedbackProps, 'children'> & {
    className?: string
    fullWidth?: boolean
    labelClassName?: string
    leadingIcon?: ReactNode
    size?: AppButtonSize
    tone?: Tone
    trailingIcon?: ReactNode
  }
>

export function AppButton({
  accessibilityRole = 'button',
  children,
  className,
  fullWidth = false,
  isDisabled = false,
  labelClassName,
  leadingIcon,
  size = 'md',
  tone = 'primary',
  trailingIcon,
  ...props
}: AppButtonProps) {
  return (
    <PressableFeedback
      accessibilityRole={accessibilityRole}
      animation={{ scale: { value: 0.98 } }}
      className={cn(
        'self-start flex-row items-center justify-center gap-2.5 border',
        size === 'sm' && 'min-h-9 px-5 rounded-[6xp]',
        size === 'md' && 'min-h-11 px-8 rounded-lg',
        size === 'lg' && 'min-h-14 px-12 rounded-[11px]',
        tone === 'primary' && 'border-foreground bg-foreground',
        tone === 'secondary' && 'border-secondary bg-secondary',
        tone === 'tertiary' && 'border-secondary/10 bg-secondary/20',
        tone === 'ghost' && 'border-transparent bg-transparent',
        tone === 'active' && 'bg-active border-active text-white',
        fullWidth && 'self-stretch',
        isDisabled && 'opacity-50',
        className
      )}
      isDisabled={isDisabled}
      {...props}>
      {leadingIcon ? <View className='items-center justify-center -ml-1.5'>{leadingIcon}</View> : null}

      {typeof children === 'string' || typeof children === 'number' ? (
        <ThemedText
          className={cn(
            'font-semibold',
            size === 'sm' && 'text-[14px] leading-5.5',
            size === 'md' && 'text-[15px] leading-5',
            size === 'lg' && 'text-[16px] leading-5.5',
            tone === 'primary' && 'text-background',
            tone === 'active' && 'text-white',
            labelClassName
          )}>
          {children}
        </ThemedText>
      ) : (
        children
      )}

      {trailingIcon ? <View className='items-center justify-center -mr-1.5'>{trailingIcon}</View> : null}
    </PressableFeedback>
  )
}
