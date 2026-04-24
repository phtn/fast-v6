import { useLocalSearchParams, useRouter } from 'expo-router'
import { useMemo } from 'react'
import { View } from 'react-native'

import {
  AppBadge,
  AppButton,
  AppCard,
  AppCardContent,
  AppCardHeader,
  AppScreen,
  SectionHeading
} from '@/components/app-ui'
import { ThemedText } from '@/components/themed-text'
import { RIcon } from '@/components/ui/icons'
import { getAmenityBySlug } from '@/lib/club-data'

function formatCategoryLabel(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export default function AmenityProfileScreen() {
  const router = useRouter()
  const params = useLocalSearchParams<{ slug?: string | string[] }>()
  const slug = typeof params.slug === 'string' ? params.slug : (params.slug?.[0] ?? '')
  const amenity = useMemo(() => getAmenityBySlug(slug), [slug])

  if (!amenity) {
    return (
      <AppScreen innerClassName='gap-6' maxWidth={760}>
        <AppButton
          leadingIcon={
            <View style={{ transform: [{ rotate: '180deg' }] }}>
              <RIcon color='#8A8A91' name='grid' size={16} />
            </View>
          }
          onPress={() => router.back()}
          size='sm'
          tone='ghost'>
          Back
        </AppButton>

        <SectionHeading
          eyebrow='Amenities'
          title='Profile not found'
          description='This amenity is no longer available in the current house directory.'
        />
      </AppScreen>
    )
  }

  return (
    <AppScreen innerClassName='gap-6' maxWidth={760}>
      <AppButton
        leadingIcon={
          <View style={{ transform: [{ rotate: '180deg' }] }}>
            <RIcon color='#8A8A91' name='grid' size={16} />
          </View>
        }
        onPress={() => router.back()}
        size='sm'
        tone='ghost'>
        Back
      </AppButton>

      {/*<HyperCard {...amenity} disableNavigation />*/}

      <SectionHeading
        eyebrow='Amenity profile'
        title={amenity.name}
        description='Current service window, room details, and the quickest path to reserve or coordinate entry.'
      />

      <AppCard>
        <AppCardHeader
          eyebrow='Overview'
          title='Live service'
          description='This profile mirrors what reception and the house team see right now.'
          trailing={<AppBadge tone='accent'>{amenity.status}</AppBadge>}
        />
        <AppCardContent className='gap-4'>
          <ProfileRow label='Category' value={formatCategoryLabel(amenity.category)} />
          <ProfileRow label='Location' value={amenity.floor} />
          <ProfileRow label='Hours' value={amenity.hours} />
        </AppCardContent>
      </AppCard>

      <AppCard>
        <AppCardHeader eyebrow='Notes' title='House guidance' />
        <AppCardContent className='gap-4'>
          <ThemedText themeColor='textSecondary' className='leading-6'>
            {amenity.description}
          </ThemedText>

          <View className='gap-3'>
            <AppButton fullWidth tone='active' onPress={() => router.push('/concierge')}>
              Reserve with concierge
            </AppButton>
            <AppButton fullWidth tone='secondary' onPress={() => router.push('/amenities')}>
              Explore more amenities
            </AppButton>
          </View>
        </AppCardContent>
      </AppCard>
    </AppScreen>
  )
}

function ProfileRow({ label, value }: { label: string; value: string }) {
  return (
    <View className='flex-row items-center justify-between gap-3 rounded-lg border border-border bg-background px-4 py-4'>
      <ThemedText type='small' themeColor='textSecondary'>
        {label}
      </ThemedText>
      <ThemedText className='font-medium'>{value}</ThemedText>
    </View>
  )
}
