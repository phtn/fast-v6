import { PressableFeedback } from 'heroui-native'
import type { ComponentProps } from 'react'

import { SocialIconBadge, type SocialNetwork } from '@/components/app-ui/social-icon'
import { ThemedText } from '@/components/themed-text'
import { cn } from '@/lib/cn'

type SocialPlatformPillProps = {
  className?: string
  label: string
  network: SocialNetwork
  onPress?: ComponentProps<typeof PressableFeedback>['onPress']
}

export function SocialPlatformPill({ className, label, network, onPress }: SocialPlatformPillProps) {
  return (
    <PressableFeedback
      animation={{ scale: { value: 0.995 } }}
      className={cn(
        'min-h-16.5 min-w-41 shrink-0 flex-1 flex-row items-center gap-3 rounded-lg border border-border bg-surface px-5',
        className
      )}
      onPress={onPress}>
      <SocialIconBadge network={network} />
      <ThemedText themeColor='textSecondary' className='text-[15px] leading-5 font-medium'>
        {label}
      </ThemedText>
    </PressableFeedback>
  )
}
