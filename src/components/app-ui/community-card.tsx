import type { ComponentProps, ReactNode } from 'react'
import { View } from 'react-native'

import { AppBadge } from '@/components/app-ui/app-badge'
import { AppButton } from '@/components/app-ui/app-button'
import { AppCard, AppCardContent } from '@/components/app-ui/app-card'
import { SocialIcon, type SocialNetwork } from '@/components/app-ui/social-icon'
import { ThemedText } from '@/components/themed-text'
import { cn } from '@/lib/cn'

type CommunityCardProps = {
  accentLine?: string
  avatar?: ReactNode
  badge?: string
  className?: string
  ctaLabel?: string
  handle: string
  initials?: string
  metricLabel: string
  metricValue: string
  network?: SocialNetwork
  onPress?: ComponentProps<typeof AppButton>['onPress']
  summary?: string
  title: string
}

export function CommunityCard({
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
}: CommunityCardProps) {
  return (
    <AppCard className={className}>
      <AppCardContent className='gap-8 px-6 pb-6 pt-6'>
        <View className='flex-row items-start justify-between gap-4'>
          {avatar ?? <CommunityAvatar initials={initials} />}

          <AppButton
            className='min-w-28'
            leadingIcon={<SocialIcon color='#0091ff' network={network} size={14} />}
            onPress={onPress}
            size='sm'>
            {ctaLabel}
          </AppButton>
        </View>

        <View className='gap-4'>
          <View className='flex-1 gap-1'>
            <ThemedText className='text-[18px] text-balance leading-6 font-normal w-full'>{title}</ThemedText>
            <ThemedText themeColor='textSecondary' className='text-[14px] leading-6 font-normal'>
              {handle}
            </ThemedText>
            {summary ? (
              <ThemedText themeColor='textSecondary' className='pt-1 text-[14px] leading-6'>
                {summary}
              </ThemedText>
            ) : null}
          </View>

          <View className={cn('max-w-44 gap-1.5 pb-0.5')}>
            {badge ? <AppBadge tone='neutral'>{badge}</AppBadge> : null}

            <View className='flex-row items-baseline gap-1'>
              <ThemedText className='text-[25px] leading-7.5 font-semibold'>{metricValue}</ThemedText>
              <ThemedText themeColor='textSecondary' className='text-[18px] leading-6 font-normal'>
                {metricLabel}
              </ThemedText>
            </View>

            <ThemedText themeColor='accent' className='text-[13px] leading-5 font-medium'>
              {accentLine}
            </ThemedText>
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
