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
import { AmenityCard, QuickReserveButton } from '@/components/club/club-ui'
import { ThemedText } from '@/components/themed-text'
import { RIcon } from '@/components/ui/icons'
import { amenities, amenityCategories, type AmenityCategory } from '@/lib/club-data'
import { cn } from '@/lib/cn'

export default function AmenitiesScreen() {
  const { width } = useWindowDimensions()
  const [category, setCategory] = useState<AmenityCategory>('all')
  const isWide = width >= 860

  const visibleAmenities = useMemo(() => {
    if (category === 'all') {
      return amenities
    }

    return amenities.filter((amenity) => amenity.category === category)
  }, [category])

  return (
    <AppScreen innerClassName='gap-6' maxWidth={980}>
      <SectionHeading
        eyebrow='Amenities'
        title='House availability'
        description='Browse what is open, see the current room state, and reserve the spaces that need a booking.'
      />

      <View className='flex-row flex-wrap gap-2'>
        {amenityCategories.map((item) => {
          const selected = item.value === category

          return (
            <AppButton
              key={item.value}
              size='sm'
              tone={selected ? 'active' : 'secondary'}
              className='px-5'
              onPress={() => setCategory(item.value)}>
              {item.label}
            </AppButton>
          )
        })}
      </View>

      <View className={cn('gap-4', isWide && 'flex-row items-start')}>
        <View className='gap-4' style={isWide ? { flex: 1.4 } : undefined}>
          <View className='flex-row flex-wrap gap-4'>
            {visibleAmenities.map((amenity) => (
              <AmenityCard key={amenity.name} {...amenity} />
            ))}
          </View>
        </View>

        <View className='flex-1 gap-4'>
          <AppCard className='bg-secondary'>
            <AppCardHeader
              eyebrow='Recommended'
              title='Best window today'
              description='The club is quietest between dinner seatings and after the wellness circuit turns over.'
              trailing={<AppBadge tone='accent'>Live</AppBadge>}
            />
            <AppCardContent className='gap-4'>
              <View className='gap-3 rounded-lg border border-border bg-background px-4 py-4'>
                <View className='flex-row items-center gap-3'>
                  <View className='h-10 w-10 items-center justify-center rounded-lg bg-active/15'>
                    <RIcon color='#0091ff' name='home' />
                  </View>
                  <View className='flex-1'>
                    <ThemedText className='font-medium'>9:30 PM - 11:00 PM</ThemedText>
                    <ThemedText type='small' themeColor='textSecondary'>
                      Lounge, dining, and bathhouse all available
                    </ThemedText>
                  </View>
                </View>
              </View>

              <QuickReserveButton>Reserve this window</QuickReserveButton>
            </AppCardContent>
          </AppCard>

          <AppCard>
            <AppCardHeader eyebrow='House notes' title="Tonight's service" />
            <AppCardContent className='gap-3'>
              <ServiceNote title='Dining' detail='Late menu starts at 10 PM.' />
              <ServiceNote title='Wellness' detail='Bathhouse capacity resets every hour.' />
              <ServiceNote title='Work' detail='Suites are staffed until 8 PM.' />
            </AppCardContent>
          </AppCard>
        </View>
      </View>
    </AppScreen>
  )
}

function ServiceNote({ detail, title }: { detail: string; title: string }) {
  return (
    <View className='rounded-lg border border-border bg-background px-4 py-3'>
      <View className='flex-row items-center justify-between gap-3'>
        <ThemedText className='font-medium'>{title}</ThemedText>
        <RIcon color='#8A8A91' name='grid' size={17} />
      </View>
      <ThemedText type='small' themeColor='textSecondary' className='mt-1'>
        {detail}
      </ThemedText>
    </View>
  )
}
