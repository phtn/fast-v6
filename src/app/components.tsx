import { View, useWindowDimensions } from 'react-native'

import {
  AppBadge,
  AppButton,
  AppCard,
  AppCardContent,
  AppCardHeader,
  AppScreen,
  CommunityCard,
  PricingPlanCard,
  SectionHeading,
  SocialPlatformPill
} from '@/components/app-ui'
import { ThemedText } from '@/components/themed-text'
import { cn } from '@/lib/cn'

export default function ComponentsScreen() {
  const { width } = useWindowDimensions()
  const isWide = width >= 920

  return (
    <AppScreen innerClassName='gap-8' maxWidth={900}>
      <View className='gap-5'>
        <ThemedText className='text-[36px] leading-[40px] font-normal'>Social networks</ThemedText>

        <View className={cn('flex-row flex-wrap gap-3', isWide && 'gap-4')}>
          <SocialPlatformPill label='Telegram' network='telegram' />
          <SocialPlatformPill label='Facebook' network='facebook' />
          <SocialPlatformPill label='LinkedIn' network='linkedin' />
        </View>
      </View>

      <View className='gap-5'>
        <ThemedText className='text-[20px] leading-[26px] font-normal'>Telegram community</ThemedText>

        <CommunityCard
          accentLine='Advance Your Expertise'
          handle='@compchem_more'
          metricLabel='Exp'
          metricValue='+100'
          network='telegram'
          title='Computational Chemistry and Materials Engineering'
        />
      </View>

      <View className={cn('gap-4', isWide && 'flex-row items-start')}>
        <View className='flex-1 gap-4'>
          <SectionHeading
            eyebrow='Pricing'
            title='Plan cards'
            description='Structured plans with restrained type, clean dividers, and direct actions.'
            titleClassName='text-[20px] leading-[26px]'
          />

          <PricingPlanCard
            configuration='1 unit: 32-cores, 64Gb'
            highlights={['1 unit-minute per task', 'Unlimited tasks']}
            note='Standard configuration'
            price='0'
            tier='Basic'
          />

          <PricingPlanCard
            badge='Very soon'
            configuration='1 unit: 64-cores, 128Gb'
            ctaLabel='Join waitlist'
            disabled
            featured
            highlights={['1 unit-hour monthly for operational tasks']}
            note='Premium configuration'
            price='--'
            tier='Premium'
          />
        </View>

        <AppCard className='flex-1 bg-default/50'>
          <AppCardHeader
            eyebrow='Primitives'
            title='Shared language'
            description='Buttons, pills, panels, and text styles should read as one system rather than a bag of widgets.'
          />
          <AppCardContent className='gap-4'>
            <View className='flex-row flex-wrap gap-2'>
              <AppBadge>Very soon</AppBadge>
              <AppBadge tone='neutral'>Editorial</AppBadge>
              <AppBadge tone='ink'>Primary</AppBadge>
            </View>

            <View className='flex-row flex-wrap gap-3'>
              <AppButton>Primary action</AppButton>
              <AppButton tone='secondary'>Secondary</AppButton>
              <AppButton tone='ghost'>Ghost</AppButton>
            </View>

            <ThemedText themeColor='textSecondary'>
              Start new work from `AppScreen`, `AppCard`, `AppButton`, `AppBadge`, and the social
              components before reaching for one-off layout decisions.
            </ThemedText>
          </AppCardContent>
        </AppCard>
      </View>
    </AppScreen>
  )
}
