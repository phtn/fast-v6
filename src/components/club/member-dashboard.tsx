import { useRouter } from 'expo-router'
import type { User } from 'firebase/auth'
import { useMemo } from 'react'
import { Dimensions, useWindowDimensions, View } from 'react-native'

import {
  AppBadge,
  AppButton,
  AppCard,
  AppCardContent,
  AppCardHeader,
  AppScreen,
  Carousel,
  SectionHeading
} from '@/components/app-ui'
import { ActionCard, ClubHeroVisual, ClubIcon, EventRow, MemberPass } from '@/components/club/club-ui'
import { ThemedText } from '@/components/themed-text'
import { clubActions, clubEvents, stars } from '@/lib/club-data'
import { cn } from '@/lib/cn'
import { HyperCard } from './hyper-card'
import { Topbar } from './topbar'

type MemberDashboardProps = {
  errorMessage?: string | null
  onSignOut: () => void
  signingOut: boolean
  user: User
}

function getMemberName(user: User) {
  return user.displayName ?? user.email?.split('@')[0] ?? 'Member'
}

export function MemberDashboard({ errorMessage, onSignOut, signingOut, user }: MemberDashboardProps) {
  const router = useRouter()
  const { width } = useWindowDimensions()
  const isWide = width >= 820
  const memberName = useMemo(() => getMemberName(user), [user])

  return (
    <AppScreen
      innerClassName='gap-2'
      maxWidth={980}
      stickyHeader={<Topbar photoUrl={user.photoURL} text={memberName} />}>
      <View className={cn('gap-4', isWide && 'flex-row items-stretch')}>
        <View className='flex-1 gap-4'>
          {/*<SectionHeading eyebrow='Amenities' title='Open now' titleClassName='text-[22px] leading-7' />*/}
          {isWide ? (
            <View className='flex-row flex-wrap gap-4'>
              {stars.map((star) => (
                <HyperCard key={star.name} {...star} />
              ))}
            </View>
          ) : (
            <Carousel
              gap={14}
              peek={0}
              data={stars}
              keyExtractor={(star) => star.name}
              maxItemWidth={Dimensions.get('window').width - 20}
              renderItem={({ item }) => <HyperCard {...item} />}
            />
          )}
        </View>

        <SectionHeading title='Join today!' titleClassName='text-lg' />
        <MemberPass memberName={'Get Full Access'} />

        <AppCard className='hidden' style={isWide ? { flex: 1.2 } : undefined}>
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

      <View className='gap-4 hidden'>
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

      <View className={cn('gap-4 hidden', isWide && 'flex-row items-start')}>
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
