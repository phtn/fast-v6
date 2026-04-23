import { PressableFeedback, type PressableFeedbackProps } from 'heroui-native'
import type { PropsWithChildren } from 'react'

import { cn } from '@/lib/cn'

type Tone = 'primary' | 'secondary' | 'ghost' | 'active' | 'tertiary'
type AppButtonSize = '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

type IconButtonProps = PropsWithChildren<
  Omit<PressableFeedbackProps, 'children'> & {
    className?: string
    fullWidth?: boolean
    size?: AppButtonSize
    tone?: Tone
  }
>

export function IconButton({
  accessibilityRole = 'button',
  children,
  className,
  isDisabled = false,
  size = 'md',
  tone = 'primary',
  ...props
}: IconButtonProps) {
  return (
    <PressableFeedback
      accessibilityRole={accessibilityRole}
      animation={{ scale: { value: 0.98 } }}
      className={cn(
        'flex-row items-center justify-center rounded-full gap-2.5 border',
        size === '2xs' && 'size-5',
        size === 'xs' && 'size-7',
        size === 'sm' && 'size-9',
        size === 'md' && 'size-11',
        size === 'lg' && 'size-14',
        size === 'xl' && 'size-17',
        size === '2xl' && 'size-20',
        tone === 'primary' && 'border-foreground bg-foreground',
        tone === 'secondary' && 'border-secondary bg-secondary',
        tone === 'tertiary' && 'border-secondary/10 bg-secondary/20',
        tone === 'ghost' && 'border-transparent bg-transparent',
        tone === 'active' && 'bg-active border-active text-white',
        isDisabled && 'opacity-50',
        className
      )}
      isDisabled={isDisabled}
      {...props}>
      {children}
    </PressableFeedback>
  )
}
