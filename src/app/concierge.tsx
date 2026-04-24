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
import { EventRow } from '@/components/club/club-ui'
import { ThemedText } from '@/components/themed-text'
import { IconName, RIcon } from '@/components/ui/icons'
import { clubEvents, conciergeRequests } from '@/lib/club-data'
import { cn } from '@/lib/cn'

export default function ConciergeScreen() {
  const { width } = useWindowDimensions()
  const isWide = width >= 860

  return (
    <AppScreen innerClassName='gap-6' maxWidth={980}>
      <SectionHeading
        eyebrow='Concierge'
        title='Member services'
        description='Coordinate reservations, arrivals, transport, and private room needs with the house team.'
        trailing={
          <AppButton size='sm' tone='active' leadingIcon={<RIcon color='#FFFFFF' name='chat' size={17} />}>
            New request
          </AppButton>
        }
      />

      <View className={cn('gap-4', isWide && 'flex-row items-start')}>
        <View className='gap-4' style={isWide ? { flex: 1.15 } : undefined}>
          <AppCard>
            <AppCardHeader
              eyebrow='Requests'
              title='In motion'
              description='The house desk updates these as each request moves between teams.'
            />
            <AppCardContent className='gap-3'>
              {conciergeRequests.map((request) => (
                <RequestRow key={request.title} {...request} />
              ))}
            </AppCardContent>
          </AppCard>

          <AppCard className='bg-secondary'>
            <AppCardHeader
              eyebrow='Priority'
              title="Tonight's handoff"
              description='Dining, reception, and transport are linked to your arrival window.'
              trailing={<AppBadge tone='accent'>7:30 PM</AppBadge>}
            />
            <AppCardContent className='gap-3'>
              <HandoffRow icon='home' label='Reception' value='Guest pass ready' />
              <HandoffRow icon='home' label='Dining' value='Window table held' />
              <HandoffRow icon='home' label='Transport' value='Pickup pending' />
            </AppCardContent>
          </AppCard>
        </View>

        <View className='flex-1 gap-4'>
          <AppCard>
            <AppCardHeader eyebrow='Calendar' title='Private programming' />
            <AppCardContent className='gap-3'>
              {clubEvents.map((event) => (
                <EventRow key={event.title} {...event} />
              ))}
            </AppCardContent>
          </AppCard>

          <AppCard>
            <AppCardHeader eyebrow='House line' title='Direct support' />
            <AppCardContent className='gap-3'>
              <SupportAction icon='home' label='Message concierge' />
              <SupportAction icon='home' label='Add a guest' />
              <SupportAction icon='chat' label='Book a private room' />
            </AppCardContent>
          </AppCard>
        </View>
      </View>
    </AppScreen>
  )
}

function RequestRow({
  detail,
  owner,
  status,
  title
}: {
  detail: string
  owner: string
  status: string
  title: string
}) {
  return (
    <View className='rounded-lg border border-border bg-background px-4 py-4'>
      <View className='flex-row items-start justify-between gap-3'>
        <View className='flex-1 gap-1'>
          <ThemedText className='font-medium'>{title}</ThemedText>
          <ThemedText type='small' themeColor='textSecondary'>
            {detail}
          </ThemedText>
        </View>
        <AppBadge tone='neutral'>{status}</AppBadge>
      </View>
      <ThemedText type='small' themeColor='textSecondary' className='mt-3'>
        {owner}
      </ThemedText>
    </View>
  )
}

function HandoffRow({ icon, label, value }: { icon: IconName; label: string; value: string }) {
  return (
    <View className='flex-row items-center gap-3 rounded-lg border border-border bg-background px-4 py-3'>
      <View className='h-9 w-9 items-center justify-center rounded-lg bg-default'>
        <RIcon color='#8A8A91' name={icon} size={18} />
      </View>
      <View className='flex-1'>
        <ThemedText className='font-medium'>{label}</ThemedText>
        <ThemedText type='small' themeColor='textSecondary'>
          {value}
        </ThemedText>
      </View>
    </View>
  )
}

function SupportAction({ icon, label }: { icon: IconName; label: string }) {
  return (
    <View className='flex-row items-center gap-3 rounded-lg border border-border bg-background px-4 py-3'>
      <View className='h-9 w-9 items-center justify-center rounded-lg bg-active/15'>
        <RIcon color='#0091ff' name={icon} size={18} />
      </View>
      <ThemedText className='flex-1 font-medium'>{label}</ThemedText>
      <RIcon color='#8A8A91' name='grid' size={17} />
    </View>
  )
}
