import { Image } from 'expo-image'
import { type Href, useRouter } from 'expo-router'
import type { PropsWithChildren, ReactNode } from 'react'
import { Pressable, View } from 'react-native'
import Svg, { Circle, Path, Rect } from 'react-native-svg'

import { AppBadge, AppButton, AppCard, AppCardContent, AppCardHeader } from '@/components/app-ui'
import { ThemedText } from '@/components/themed-text'
import { type ClubAccent } from '@/lib/club-data'
import { cn } from '@/lib/cn'

export type ClubIconName =
  | 'access'
  | 'amenity'
  | 'calendar'
  | 'check'
  | 'chevron'
  | 'concierge'
  | 'home'
  | 'key'
  | 'lounge'
  | 'spark'
  | 'ticket'
  | 'grid'

const accentStyles: Record<ClubAccent, { bg: string; border: string; text: string }> = {
  amber: {
    bg: 'bg-warning/15',
    border: 'border-warning/30',
    text: 'text-warning'
  },
  blue: {
    bg: 'bg-active/15',
    border: 'border-active/40',
    text: 'text-active'
  },
  green: {
    bg: 'bg-success/15',
    border: 'border-success/30',
    text: 'text-success'
  },
  rose: {
    bg: 'bg-danger/15',
    border: 'border-danger/30',
    text: 'text-danger'
  },
  slate: {
    bg: 'bg-default',
    border: 'border-border',
    text: 'text-muted'
  }
}

const accentColors: Record<ClubAccent, string> = {
  amber: '#f4bd50',
  blue: '#0091ff',
  green: '#38d48b',
  rose: '#f07178',
  slate: '#8A8A91'
}

export function getClubAccentClass(accent: ClubAccent, part: keyof (typeof accentStyles)[ClubAccent]) {
  return accentStyles[accent][part]
}

export function getClubAccentColor(accent: ClubAccent) {
  return accentColors[accent]
}

export function ClubIcon({
  color = '#8A8A91',
  focused = false,
  name,
  size = 22,
  strokeWidth = focused ? 2 : 1.5
}: {
  color?: string
  focused?: boolean
  name: ClubIconName
  size?: number
  strokeWidth?: number
}) {
  switch (name) {
    case 'home':
      return (
        <Svg fill='none' height={size} viewBox='0 0 24 24' width={size}>
          <Path
            d='M4.75 10.5 12 4.75l7.25 5.75V19a1 1 0 0 1-1 1h-4.5v-5.25h-3.5V20h-4.5a1 1 0 0 1-1-1v-8.5Z'
            fill={focused ? color : undefined}
            stroke={color}
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={strokeWidth}
          />
        </Svg>
      )
    case 'access':
      return (
        <Svg fill='none' height={size} viewBox='0 0 24 24' width={size}>
          <Rect
            fill={focused ? color : undefined}
            height='13.5'
            rx='2.5'
            stroke={color}
            strokeWidth={strokeWidth}
            width='17.5'
            x='3.25'
            y='5.25'
          />
          <Path
            d='M7 10h10M7 14h6'
            stroke={focused ? '#050505' : color}
            strokeLinecap='round'
            strokeWidth={strokeWidth}
          />
        </Svg>
      )
    case 'amenity':
      return (
        <Svg fill='none' height={size} viewBox='0 0 24 24' width={size}>
          <Path
            d='M4.75 15.5h14.5M6.25 15.5c.2-4.65 2.1-7.25 5.75-7.25s5.55 2.6 5.75 7.25M12 5.25v3'
            stroke={color}
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={strokeWidth}
          />
          <Path d='M7.5 18.75h9' stroke={color} strokeLinecap='round' strokeWidth={strokeWidth} />
        </Svg>
      )
    case 'calendar':
      return (
        <Svg fill='none' height={size} viewBox='0 0 24 24' width={size}>
          <Rect height='15.5' rx='2.5' stroke={color} strokeWidth={strokeWidth} width='16.5' x='3.75' y='5.25' />
          <Path
            d='M7.5 3.75v3M16.5 3.75v3M4.5 9.75h15'
            stroke={color}
            strokeLinecap='round'
            strokeWidth={strokeWidth}
          />
        </Svg>
      )
    case 'check':
      return (
        <Svg fill='none' height={size} viewBox='0 0 24 24' width={size}>
          <Circle
            cx='12'
            cy='12'
            fill={focused ? color : undefined}
            r='7.75'
            stroke={color}
            strokeWidth={strokeWidth}
          />
          <Path
            d='m8.5 12.2 2.2 2.2 4.9-5'
            stroke={focused ? '#050505' : color}
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={strokeWidth}
          />
        </Svg>
      )
    case 'chevron':
      return (
        <Svg fill='none' height={size} viewBox='0 0 24 24' width={size}>
          <Path
            d='m9.5 6.5 5.25 5.5-5.25 5.5'
            stroke={color}
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={strokeWidth}
          />
        </Svg>
      )
    case 'concierge':
      return (
        <Svg fill='none' height={size} viewBox='0 0 24 24' width={size}>
          <Path
            d='M5 17.75h14M7.25 17.75c.2-4.35 1.95-6.8 4.75-6.8s4.55 2.45 4.75 6.8M12 7.5v3.25'
            stroke={color}
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={strokeWidth}
          />
          <Circle cx='12' cy='6' r='1.5' stroke={color} strokeWidth={strokeWidth} />
        </Svg>
      )
    case 'key':
      return (
        <Svg fill='none' height={size} viewBox='0 0 24 24' width={size}>
          <Circle cx='8' cy='12' r='3.25' stroke={color} strokeWidth={strokeWidth} />
          <Path d='M11.25 12h8M16 12v3M18.5 12v2' stroke={color} strokeLinecap='round' strokeWidth={strokeWidth} />
        </Svg>
      )
    case 'lounge':
      return (
        <Svg fill='none' height={size} viewBox='0 0 24 24' width={size}>
          <Path
            d='M5.25 13.75v-3A2.5 2.5 0 0 1 7.75 8.25h8.5a2.5 2.5 0 0 1 2.5 2.5v3M4.5 13.75h15v4.5h-15zM7 18.25v1.5M17 18.25v1.5'
            stroke={color}
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={strokeWidth}
          />
        </Svg>
      )
    case 'spark':
      return (
        <Svg fill='none' height={size} viewBox='0 0 24 24' width={size}>
          <Path
            d='M12 3.75 13.7 9l5.55 1.25-5.55 1.25L12 16.75l-1.7-5.25-5.55-1.25L10.3 9 12 3.75ZM18 15.25l.75 2.25 2.25.5-2.25.5L18 20.75l-.75-2.25-2.25-.5 2.25-.5.75-2.25Z'
            fill={focused ? color : undefined}
            stroke={color}
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={strokeWidth}
          />
        </Svg>
      )
    case 'ticket':
      return (
        <Svg fill='none' height={size} viewBox='0 0 24 24' width={size}>
          <Path
            d='M5.75 7.25h12.5a1.5 1.5 0 0 1 1.5 1.5v2.1a2.15 2.15 0 0 0 0 4.3v2.1a1.5 1.5 0 0 1-1.5 1.5H5.75a1.5 1.5 0 0 1-1.5-1.5v-2.1a2.15 2.15 0 0 0 0-4.3v-2.1a1.5 1.5 0 0 1 1.5-1.5Z'
            stroke={color}
            strokeLinejoin='round'
            strokeWidth={strokeWidth}
          />
          <Path d='M9 9.5v5M15 9.5v5' stroke={color} strokeLinecap='round' strokeWidth={strokeWidth} />
        </Svg>
      )
    case 'grid':
      return (
        <Svg fill='none' height={size} viewBox='0 0 24 24' width={size}>
          <Rect height='6.5' rx='1.4' stroke={color} strokeWidth={strokeWidth} width='6.5' x='4.25' y='4.25' />
          <Rect height='6.5' rx='1.4' stroke={color} strokeWidth={strokeWidth} width='6.5' x='13.25' y='4.25' />
          <Rect height='6.5' rx='1.4' stroke={color} strokeWidth={strokeWidth} width='6.5' x='4.25' y='13.25' />
          <Rect height='6.5' rx='1.4' stroke={color} strokeWidth={strokeWidth} width='6.5' x='13.25' y='13.25' />
        </Svg>
      )
  }
}

export function ClubHeroVisual({ className }: { className?: string }) {
  return (
    <View
      className={cn(
        'relative min-h-44 overflow-hidden rounded-lg border border-secondary-border bg-background',
        className
      )}>
      <Image
        className='absolute inset-0 h-full w-full opacity-80'
        contentFit='cover'
        source={require('@/assets/images/logo-glow.png')}
      />
      <View className='absolute inset-0 bg-linear-to-b from-transparent via-background/20 to-background/95' />
      <Image
        contentFit='contain'
        source={require('@/assets/images/logo-glow.png')}
        style={{ position: 'absolute', left: '18%', right: '18%', top: '12%', width: '84%', aspectRatio: 1 }}
      />
    </View>
  )
}

export function MetricTile({
  accent,
  detail,
  label,
  value
}: {
  accent: ClubAccent
  detail: string
  label: string
  value: string
}) {
  return (
    <View
      className={cn('flex-1 min-w-36 rounded-lg border bg-secondary px-4 py-4', getClubAccentClass(accent, 'border'))}>
      <ThemedText type='small' themeColor='textSecondary'>
        {label}
      </ThemedText>
      <ThemedText className={cn('mt-2 text-[26px] leading-8 font-medium', getClubAccentClass(accent, 'text'))}>
        {value}
      </ThemedText>
      <ThemedText type='small' themeColor='textSecondary' className='mt-1'>
        {detail}
      </ThemedText>
    </View>
  )
}

export function ActionCard({
  accent,
  description,
  href,
  icon,
  label
}: {
  accent: ClubAccent
  description: string
  href: Href
  icon: ClubIconName
  label: string
}) {
  const router = useRouter()

  return (
    <Pressable
      accessibilityRole='button'
      className='flex-1 min-w-54 active:opacity-80'
      onPress={() => router.push(href)}>
      <AppCard className={cn('bg-secondary', getClubAccentClass(accent, 'border'), 'border-secondary')}>
        <AppCardContent className='gap-4 pt-5'>
          <View
            className={cn(
              'h-11 w-11 items-center justify-center rounded-lg'
              // getClubAccentClass(accent, 'bg')
              // getClubAccentClass(accent, 'border')
            )}>
            <ClubIcon color={getClubAccentColor(accent)} name={icon} />
          </View>
          <View className='gap-1'>
            <View className='flex-row items-center gap-2'>
              <ThemedText className='flex-1 text-[17px] leading-6 font-medium'>{label}</ThemedText>
              <ClubIcon color='#8A8A91' name='chevron' size={18} />
            </View>
            <ThemedText themeColor='textSecondary' className='leading-5'>
              {description}
            </ThemedText>
          </View>
        </AppCardContent>
      </AppCard>
    </Pressable>
  )
}

export function AmenityCard({
  description,
  floor,
  hours,
  name,
  status,
  tone
}: {
  description: string
  floor: string
  hours: string
  name: string
  status: string
  tone: ClubAccent
}) {
  return (
    <AppCard className={cn('flex-1 min-w-64 bg-secondary', getClubAccentClass(tone, 'border'), 'border-secondary')}>
      <AppCardHeader eyebrow={floor} title={name} trailing={<AppBadge tone='neutral'>{status}</AppBadge>} />
      <AppCardContent className='gap-4'>
        <ThemedText themeColor='textSecondary' className='leading-5'>
          {description}
        </ThemedText>
        <View className='flex-row items-center justify-between rounded-lg border border-border bg-background px-4 py-3'>
          <ThemedText type='small' themeColor='textSecondary'>
            Hours
          </ThemedText>
          <ThemedText type='smallBold'>{hours}</ThemedText>
        </View>
      </AppCardContent>
    </AppCard>
  )
}

export function EventRow({
  accent,
  date,
  host,
  location,
  title
}: {
  accent: ClubAccent
  date: string
  host: string
  location: string
  title: string
}) {
  return (
    <View className='flex-row gap-4 rounded-lg border border-border bg-background px-4 py-4'>
      <View
        className={cn(
          'h-11 w-11 items-center justify-center rounded-lg border',
          getClubAccentClass(accent, 'bg'),
          getClubAccentClass(accent, 'border')
        )}>
        <ClubIcon color={getClubAccentColor(accent)} name='calendar' />
      </View>
      <View className='flex-1 gap-1'>
        <ThemedText className='font-medium'>{title}</ThemedText>
        <ThemedText type='small' themeColor='textSecondary'>
          {date} - {location}
        </ThemedText>
        <ThemedText type='small' themeColor='textSecondary'>
          {host}
        </ThemedText>
      </View>
    </View>
  )
}

export function MemberPass({ memberName, status = 'Access clear' }: { memberName: string; status?: string }) {
  return (
    <View className='overflow-hidden rounded-lg bg-foreground'>
      <View className='relative min-h-fit p-3'>
        <View className='absolute -right-24 -top-16 h-44 w-44 rounded-full bg-active/5' />
        <View className='absolute -bottom-28 -left-28 h-64 w-64 rounded-full bg-success/20' />
        <View className='relative gap-7'>
          <View className='flex-row items-start justify-between gap-4'>
            <View className='gap-0'>
              <ThemedText
                style={{ letterSpacing: 1.5 }}
                className='text-[10px] leading-4 font-normal uppercase text-background/80 tracking-wider'>
                Founder Series
              </ThemedText>
              <ThemedText className='font-semibold text-background text-lg'>{memberName}</ThemedText>
            </View>
            <View className='h-10 w-10 items-center justify-center'>
              <ClubIcon color='#007AFF' name='chevron' />
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

const qrPattern = [
  [1, 1, 1, 0, 1, 0, 1, 1, 0],
  [1, 0, 1, 0, 1, 1, 0, 0, 1],
  [1, 1, 1, 0, 0, 1, 1, 0, 1],
  [0, 0, 0, 1, 1, 0, 1, 1, 0],
  [1, 1, 0, 1, 0, 1, 0, 1, 1],
  [0, 1, 1, 0, 1, 1, 0, 0, 1],
  [1, 0, 1, 1, 0, 0, 1, 1, 1],
  [1, 0, 0, 1, 1, 0, 1, 0, 0],
  [0, 1, 1, 0, 1, 1, 0, 1, 1]
]

export function AccessPattern() {
  return (
    <View className='self-center rounded-lg border border-border bg-background p-3'>
      <View className='gap-1'>
        {qrPattern.map((row, rowIndex) => (
          <View className='flex-row gap-1' key={`row-${rowIndex}`}>
            {row.map((filled, columnIndex) => (
              <View
                className={cn('h-3 w-3 rounded-xs', filled ? 'bg-foreground' : 'bg-default')}
                key={`cell-${rowIndex}-${columnIndex}`}
              />
            ))}
          </View>
        ))}
      </View>
    </View>
  )
}

export function StepRow({ children, complete = true }: PropsWithChildren<{ complete?: boolean }>) {
  return (
    <View className='flex-row items-center gap-3'>
      <View
        className={cn('h-6 w-6 items-center justify-center rounded-full', complete ? 'bg-success/20' : 'bg-default')}>
        <ClubIcon color={complete ? '#38d48b' : '#8A8A91'} name='check' size={15} strokeWidth={2} />
      </View>
      <ThemedText className='flex-1'>{children}</ThemedText>
    </View>
  )
}

export function DetailCard({
  children,
  icon,
  title,
  trailing
}: PropsWithChildren<{
  icon: ClubIconName
  title: string
  trailing?: ReactNode
}>) {
  return (
    <AppCard>
      <AppCardHeader
        title={title}
        trailing={
          trailing ?? (
            <View className='h-10 w-10 items-center justify-center rounded-lg bg-default'>
              <ClubIcon color='#8A8A91' name={icon} />
            </View>
          )
        }
      />
      <AppCardContent>{children}</AppCardContent>
    </AppCard>
  )
}

export function QuickReserveButton({ children }: PropsWithChildren) {
  return (
    <AppButton fullWidth tone='secondary'>
      {children}
    </AppButton>
  )
}
