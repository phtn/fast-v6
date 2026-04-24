import { Image, ImageSource } from 'expo-image'
import { useRouter } from 'expo-router'
import { PressableFeedback } from 'heroui-native'
import { View } from 'react-native'

import type { Star, StartCategory } from '@/lib/club-data'
import { getAmenitySlug } from '@/lib/club-data'
import { cn } from '@/lib/cn'
import { AppBadge, AppCard, IconBadge } from '../app-ui'
import { ThemedText } from '../themed-text'
import { IconName, MCIcon, RIcon } from '../ui/icons'
import { getClubAccentClass, getClubAccentColor } from './club-ui'

export interface HyperCardProps extends Star {
  disableNavigation?: boolean
}

const starVisuals: Record<
  Exclude<StartCategory, 'all'>,
  {
    categoryLabel: string
    glowClassName: string
    icon: IconName
    imageSource: ImageSource
    overlayClassName: string
  }
> = {
  bubly: {
    categoryLabel: 'Dining',
    glowClassName: 'bg-warning/35',
    icon: 'chat',
    imageSource: require('@/assets/images/logo-glow.png') as ImageSource,
    overlayClassName: 'bg-linear-to-b from-warning/10 via-warning/20 to-foreground/95'
  },
  happy: {
    categoryLabel: 'Leisure',
    glowClassName: 'bg-danger/30',
    icon: 'home',
    imageSource: require('@/assets/images/logo-glow.png') as ImageSource,
    overlayClassName: 'bg-linear-to-b from-danger/10 via-danger/15 to-foreground/95'
  },
  fun: {
    categoryLabel: 'Wellness',
    glowClassName: 'bg-success/30',
    icon: 'home',
    imageSource: require('@/assets/images/logo-glow.png') as ImageSource,
    overlayClassName: 'bg-linear-to-b from-success/10 via-success/15 to-foreground/95'
  },
  active: {
    categoryLabel: 'Work',
    glowClassName: 'bg-active/30',
    icon: 'grid',
    imageSource: require('@/assets/images/tutorial-web.png') as ImageSource,
    overlayClassName: 'bg-linear-to-b from-active/10 via-active/15 to-foreground/95'
  },
  romantic: {
    categoryLabel: 'Leisure',
    glowClassName: 'bg-danger/30',
    icon: 'chat',
    imageSource: require('@/assets/images/logo-glow.png') as ImageSource,
    overlayClassName: 'bg-linear-to-b from-danger/10 via-danger/15 to-foreground/95'
  },
  sensational: {
    categoryLabel: 'Wellness',
    glowClassName: 'bg-success/30',
    icon: 'home',
    imageSource: require('@/assets/images/logo-glow.png') as ImageSource,
    overlayClassName: 'bg-linear-to-b from-success/10 via-success/15 to-foreground/95'
  }
}

export function HyperCard({
  category = 'fun',
  description,
  disableNavigation = false,
  level,
  rate,
  name,
  status,
  tone
}: HyperCardProps) {
  const router = useRouter()
  const visual = starVisuals[category]
  const accentColor = getClubAccentColor(tone)
  const amenitySlug = getAmenitySlug(name)

  return (
    <PressableFeedback
      accessibilityRole='button'
      animation={{ scale: { value: 0.985 } }}
      className='self-stretch'
      isDisabled={disableNavigation}
      onPress={
        disableNavigation
          ? undefined
          : () => router.push({ params: { slug: amenitySlug }, pathname: '/amenities/[slug]' })
      }>
      <AppCard className='relative min-h-120 border-secondary bg-foreground'>
        <Image
          className='absolute inset-0 h-full w-full'
          contentFit='cover'
          source={visual.imageSource}
          transition={120}
        />
        <View className={cn('absolute inset-0', visual.overlayClassName)} />
        <View className={cn('absolute -right-10 top-20 h-44 w-44 rounded-full opacity-75', visual.glowClassName)} />
        <View className='absolute inset-0 bg-linear-to-t from-foreground via-foreground/70 to-transparent' />

        <View className='flex-1 justify-between px-5 pb-5 pt-5'>
          <View className='flex-row items-start justify-between gap-3'>
            <IconBadge tone='dark'>{level}</IconBadge>
            <MCIcon color={accentColor} name={'heart-multiple-outline'} size={24} />
          </View>

          <View className='gap-4'>
            <View className='gap-2'>
              <ThemedText themeColor='background' className='text-[30px] leading-8 font-medium'>
                {name}
              </ThemedText>
              <View className='flex-row flex-wrap gap-2'>
                <AppBadge tone='dark'>{category}</AppBadge>
                <AppBadge tone='ink'>{visual.categoryLabel}</AppBadge>
              </View>
            </View>

            <View className={cn('rounded-[22px] border border-white/10 px-4 py-4', getClubAccentClass(tone, 'bg'))}>
              <View className='flex-row items-center justify-between gap-3'>
                <View className='gap-1'>
                  <ThemedText themeColor='background' className='text-[11px] uppercase opacity-65'>
                    Rate
                  </ThemedText>
                  <ThemedText themeColor='background' className='font-medium'>
                    {rate}
                  </ThemedText>
                </View>

                {!disableNavigation ? <RIcon color={accentColor} name='grid' size={24} /> : null}
              </View>
            </View>
          </View>
        </View>
      </AppCard>
    </PressableFeedback>
  )
}
