import type { ComponentProps } from 'react'
import { View } from 'react-native'

import { AppBadge } from '@/components/app-ui/app-badge'
import { AppButton } from '@/components/app-ui/app-button'
import { AppCard, AppCardContent, AppCardFooter, AppCardHeader } from '@/components/app-ui/app-card'
import { ThemedText } from '@/components/themed-text'
import { cn } from '@/lib/cn'

type PricingPlanCardProps = {
  badge?: string
  cadence?: string
  className?: string
  configuration?: string
  ctaLabel?: string
  disabled?: boolean
  featured?: boolean
  highlights: string[]
  note?: string
  onPress?: ComponentProps<typeof AppButton>['onPress']
  price: string
  tier: string
}

export function PricingPlanCard({
  badge,
  cadence = 'per month',
  className,
  configuration,
  ctaLabel,
  disabled = false,
  featured = false,
  highlights,
  note,
  onPress,
  price,
  tier
}: PricingPlanCardProps) {
  return (
    <AppCard className={cn('min-h-[392px] justify-between', featured && 'bg-default/50', className)}>
      <View>
        <AppCardHeader
          eyebrow={tier}
          eyebrowClassName={featured ? 'text-accent' : undefined}
          trailing={badge ? <AppBadge>{badge}</AppBadge> : null}>
          <View className='flex-row items-end gap-1'>
            <ThemedText className='text-[40px] leading-[40px] font-medium'>{`$${price}`}</ThemedText>
            <ThemedText themeColor='textSecondary' className='pb-1.5 text-[15px] leading-5'>
              {cadence}
            </ThemedText>
          </View>
        </AppCardHeader>

        <AppCardContent className='gap-4'>
          {highlights.map((highlight) => (
            <View key={highlight} className='flex-row items-start gap-3'>
              <View className='mt-[9px] h-1.5 w-1.5 rounded-full bg-foreground' />
              <ThemedText className='flex-1'>{highlight}</ThemedText>
            </View>
          ))}

          {note || configuration ? (
            <View className='gap-1 pt-2'>
              {note ? (
                <ThemedText themeColor='textSecondary' className='text-[15px] leading-[22px]'>
                  {note}
                </ThemedText>
              ) : null}
              {configuration ? (
                <ThemedText className='text-[14px] leading-5 font-medium'>{configuration}</ThemedText>
              ) : null}
            </View>
          ) : null}
        </AppCardContent>
      </View>

      <AppCardFooter className='pt-0'>
        <AppButton fullWidth isDisabled={disabled} onPress={onPress} tone={disabled ? 'secondary' : 'primary'}>
          {ctaLabel ?? (disabled ? 'Join waitlist' : 'Get started')}
        </AppButton>
      </AppCardFooter>
    </AppCard>
  )
}
