import { useMemo, useState } from 'react'
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
import { AccessPattern, ClubIcon, DetailCard, MemberPass, StepRow } from '@/components/club/club-ui'
import { ThemedText } from '@/components/themed-text'
import { useAuthSession } from '@/context/auth-context'
import { arrivalSteps } from '@/lib/club-data'
import { cn } from '@/lib/cn'

function getMemberName(displayName?: string | null, email?: string | null) {
  return displayName ?? email?.split('@')[0] ?? 'Member'
}

export default function CheckInScreen() {
  const { user } = useAuthSession()
  const { width } = useWindowDimensions()
  const [checkedIn, setCheckedIn] = useState(false)
  const isWide = width >= 820
  const memberName = useMemo(() => getMemberName(user?.displayName, user?.email), [user?.displayName, user?.email])

  return (
    <AppScreen innerClassName='gap-6' maxWidth={920}>
      <SectionHeading
        eyebrow='Check-in'
        title='Your member access'
        description='Use your pass at reception, confirm today&apos;s arrival, and manage guests before you enter.'
      />

      <View className={cn('gap-4', isWide && 'flex-row items-start')}>
        <View className='flex-1 gap-4'>
          <MemberPass memberName={memberName} status={checkedIn ? 'Checked in' : 'Access clear'} />

          <AppCard>
            <AppCardHeader
              eyebrow='Today'
              title={checkedIn ? 'You are checked in' : 'Ready for arrival'}
              description={
                checkedIn
                  ? 'Reception has marked your arrival and notified the dining desk.'
                  : 'Your profile, booking, and guest pass are ready at the front desk.'
              }
              trailing={<AppBadge tone={checkedIn ? 'accent' : 'neutral'}>{checkedIn ? 'Active' : 'Pending'}</AppBadge>}
            />
            <AppCardContent className='gap-4'>
              <View className='flex-row gap-3 rounded-lg border border-border bg-background px-4 py-4'>
                <View className='h-10 w-10 items-center justify-center rounded-lg bg-success/15'>
                  <ClubIcon color='#38d48b' name='key' />
                </View>
                <View className='flex-1 gap-1'>
                  <ThemedText className='font-medium'>Main entrance</ThemedText>
                  <ThemedText type='small' themeColor='textSecondary'>
                    Arrival window 7:30 PM - 9:30 PM
                  </ThemedText>
                </View>
              </View>

              <AppButton
                fullWidth
                tone={checkedIn ? 'secondary' : 'active'}
                leadingIcon={<ClubIcon color={checkedIn ? '#8A8A91' : '#FFFFFF'} name='check' size={18} />}
                onPress={() => setCheckedIn((current) => !current)}>
                {checkedIn ? 'Undo check-in' : 'Check in now'}
              </AppButton>
            </AppCardContent>
          </AppCard>
        </View>

        <View className='flex-1 gap-4'>
          <AppCard>
            <AppCardHeader
              eyebrow='Pass code'
              title='Scan at reception'
              description='This pass refreshes with your active member session.'
            />
            <AppCardContent className='gap-5'>
              <AccessPattern />
              <View className='flex-row items-center justify-between rounded-lg border border-border bg-background px-4 py-3'>
                <ThemedText type='small' themeColor='textSecondary'>
                  Valid until
                </ThemedText>
                <ThemedText type='smallBold'>1:00 AM</ThemedText>
              </View>
            </AppCardContent>
          </AppCard>

          <DetailCard icon='ticket' title='Guest access'>
            <View className='gap-3'>
              <View className='flex-row items-center justify-between'>
                <ThemedText>Guest passes</ThemedText>
                <ThemedText className='font-medium'>2 available</ThemedText>
              </View>
              <View className='flex-row items-center justify-between'>
                <ThemedText>Companion today</ThemedText>
                <ThemedText className='font-medium'>1 confirmed</ThemedText>
              </View>
            </View>
          </DetailCard>
        </View>
      </View>

      <AppCard>
        <AppCardHeader
          eyebrow='Arrival'
          title='Clearance checklist'
          description='Reception sees the same status when your pass is scanned.'
        />
        <AppCardContent className='gap-4'>
          {arrivalSteps.map((step) => (
            <StepRow key={step}>{step}</StepRow>
          ))}
        </AppCardContent>
      </AppCard>
    </AppScreen>
  )
}
