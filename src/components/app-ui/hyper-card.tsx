import type { ComponentProps, ReactNode } from 'react'
import { View } from 'react-native'

import { AppBadge } from '@/components/app-ui/app-badge'
import { AppButton } from '@/components/app-ui/app-button'
import { AppCard, AppCardContent } from '@/components/app-ui/app-card'
import { SocialIcon, type SocialNetwork } from '@/components/app-ui/social-icon'
import { ThemedText } from '@/components/themed-text'
import { cn } from '@/lib/cn'

type HyperCardProps = {
  accentLine?: string
  avatar?: ReactNode
  badge?: string
  className?: string
  ctaLabel?: string
  handle?: string
  initials?: string
  metricLabel: string
  metricValue: string
  network?: SocialNetwork
  onPress?: ComponentProps<typeof AppButton>['onPress']
  summary?: string
  title: string
}

export function HyperCard({
  accentLine = 'Advance Your Expertise',
  avatar,
  badge,
  className,
  ctaLabel = 'Join us',
  handle,
  initials,
  metricLabel,
  metricValue,
  network = 'telegram',
  onPress,
  summary,
  title
}: HyperCardProps) {
  return (
    <AppCard className={className}>
      <AppCardContent className='p-4'>
        <View className='gap-5'>
          <View className='flex-1 gap-1'>
            <View className='flex-row items-center justify-between'>
              <ThemedText type='eyebrow'>BUTT FUCK</ThemedText>
              <ThemedText type='linkPrimary'>&rarr;</ThemedText>
            </View>
            <View className='h-18 justify-center'>
              <ThemedText className='text-[20px] text-balance leading-6 font-normal w-full'>{title}</ThemedText>
            </View>
            {badge ? <AppBadge tone='neutral'>{badge}</AppBadge> : null}
          </View>

          <View className={cn(' gap-4 pb-0.5')}>
            <AppButton
              fullWidth
              leadingIcon={<SocialIcon color='#0091ff' network={network} size={14} />}
              onPress={onPress}
              size='md'>
              {ctaLabel}
            </AppButton>
          </View>
        </View>
      </AppCardContent>
    </AppCard>
  )
}

function CommunityAvatar({ initials }: { initials?: string }) {
  if (initials) {
    return (
      <View className='size-10 items-center justify-center rounded-full border border-border bg-default'>
        <ThemedText className='text-[13px] leading-4 font-semibold text-accent'>{initials}</ThemedText>
      </View>
    )
  }

  return (
    <View className='relative size-9 aspect-square items-center justify-center rounded-full border border-border bg-surface'></View>
  )
}
