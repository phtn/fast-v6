import { useRouter } from 'expo-router'
import type { User } from 'firebase/auth'
import { useMemo } from 'react'
import { View, useWindowDimensions } from 'react-native'

import {
  AppBadge,
  AppButton,
  AppCard,
  AppCardContent,
  AppCardHeader,
  AppScreen,
  SectionHeading
} from '@/components/app-ui'
import { ActionCard, AmenityCard, ClubHeroVisual, ClubIcon, EventRow, MemberPass } from '@/components/club/club-ui'
import { ThemedText } from '@/components/themed-text'
import { amenities, clubActions, clubEvents } from '@/lib/club-data'
import { cn } from '@/lib/cn'
import { Image } from 'expo-image'

type MemberDashboardProps = {
  errorMessage?: string | null
  onSignOut: () => void
  signingOut: boolean
  user: User
}

function getMemberName(user: User) {
  return user.displayName ?? user.email?.split('@')[0] ?? 'Member'
}

function getGreeting() {
  const hour = new Date().getHours()

  if (hour < 12) {
    return 'Good morning'
  }

  if (hour < 18) {
    return 'Good afternoon'
  }

  return 'Good evening'
}

export function MemberDashboard({ errorMessage, onSignOut, signingOut, user }: MemberDashboardProps) {
  const router = useRouter()
  const { width } = useWindowDimensions()
  const isWide = width >= 820
  const memberName = useMemo(() => getMemberName(user), [user])
  const featuredAmenities = amenities.slice(0, 2)

  return (
    <AppScreen innerClassName='gap-2' maxWidth={980}>
      <View className='h-8 flex-row items-center justify-between'>
        <View className='flex-row items-center justify-between w-24'>
          <AppButton
            tone='ghost'
            size='sm'
            className='w-8 min-h-6 px-2 self-center'
            isDisabled={signingOut}
            onPress={onSignOut}>
            <ClubIcon name='grid' size={28} strokeWidth={1} />
          </AppButton>
          <Image
            contentFit='contain'
            source={require('@/assets/images/fastcar-optimized.svg')}
            style={{ position: 'absolute', left: '38%', right: '18%', top: '40%', width: '64%', aspectRatio: 7 }}
          />
        </View>
        <ThemedText className='text-[12px] px-2 leading-none'>{memberName.split(' ').shift()}</ThemedText>
      </View>

      {errorMessage ? <ThemedText className='text-[14px] leading-5 text-danger'>{errorMessage}</ThemedText> : null}

      <View className={cn('gap-0', isWide && 'flex-row items-stretch')}>
        <View className='flex-1 gap-3'>
          <MemberPass memberName={memberName} />
        </View>

        <View className='h-4'></View>
        <AppCard className='bg-secondary' style={isWide ? { flex: 1.2 } : undefined}>
          <AppCardContent className='gap-5 pt-5'>
            <ClubHeroVisual />
            <View className='gap-4'>
              <View className='flex-row flex-wrap items-center gap-2'>
                <AppBadge tone='ink'>Founders access</AppBadge>
                <AppBadge tone='neutral'>Reception notified</AppBadge>
              </View>
              <View className='gap-2'>
                <ThemedText className='text-lg leading-8 font-medium'>Tonight at the house</ThemedText>
              </View>
              <View className='flex-row flex-wrap gap-3'>
                <AppButton
                  size='sm'
                  tone='active'
                  leadingIcon={<ClubIcon color='#FFFFFF' name='check' size={17} />}
                  onPress={() => router.push('/check-in')}>
                  Open pass
                </AppButton>
                <AppButton
                  size='sm'
                  tone='secondary'
                  leadingIcon={<ClubIcon color='#8A8A91' name='concierge' size={17} />}
                  onPress={() => router.push('/concierge')}>
                  Request help
                </AppButton>
              </View>
            </View>
          </AppCardContent>
        </AppCard>
      </View>

      <View className='h-4'></View>
      <View className='gap-4'>
        <SectionHeading
          eyebrow='Pro Member Access'
          title='Move through the club'
          titleClassName='text-[22px] leading-7'
        />
        <View className='flex-row flex-wrap gap-4'>
          {clubActions.map((action) => (
            <ActionCard key={action.label} {...action} />
          ))}
        </View>
      </View>

      <View className={cn('gap-4', isWide && 'flex-row items-start')}>
        <View className='flex-1 gap-4'>
          <SectionHeading eyebrow='Amenities' title='Open now' titleClassName='text-[22px] leading-7' />
          <View className='flex-row flex-wrap gap-4'>
            {featuredAmenities.map((amenity) => (
              <AmenityCard key={amenity.name} {...amenity} />
            ))}
          </View>
        </View>

        <AppCard className='flex-1'>
          <AppCardHeader
            eyebrow='Calendar'
            title='Members calendar'
            description='Upcoming reservations and private house programming.'
          />
          <AppCardContent className='gap-3'>
            {clubEvents.slice(0, 2).map((event) => (
              <EventRow key={event.title} {...event} />
            ))}
          </AppCardContent>
        </AppCard>
        <View>
          <AppButton onPress={onSignOut}>Sign out</AppButton>
        </View>
      </View>
    </AppScreen>
  )
}
