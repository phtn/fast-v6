import { usePathname, useRouter } from 'expo-router'
import { TabList, Tabs, TabSlot, TabTrigger, type TabListProps, type TabTriggerSlotProps } from 'expo-router/ui'
import { useEffect } from 'react'
import { Pressable, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { ThemedText } from '@/components/themed-text'
import { useAuthSession } from '@/context/auth-context'
import { cn } from '@/lib/cn'
import { RIcon } from './ui/icons'

const TAB_BAR_MIN_HEIGHT = 56
const ACTIVE_ICON_COLOR = '#0091ff' // '#050505'
const BAR_BORDER_COLOR = '#1A1A1A'
const BAR_BACKGROUND_COLOR = '#050505'
const INACTIVE_ICON_COLOR = '#74747B'

const TABS_CONFIG = [
  { href: '/', icon: 'home', label: 'Home', name: 'home' },
  { href: '/chat', icon: 'chat', label: 'Chat', name: 'chat' },
  { href: '/amenities', icon: 'home', label: 'Amenities', name: 'amenities' },
  { href: '/concierge', icon: 'chat', label: 'Concierge', name: 'concierge' }
] as const

const HIDDEN_TABS_CONFIG = [{ href: '/account', name: 'account' }] as const

type TabIconName = (typeof TABS_CONFIG)[number]['icon']

const Separator = () => (
  <View className='absolute top-0 bg-linear-to-r from-[#383939]/50 via-[#383939] to-[#383939]/50 h-[0.5px] w-full' />
)

export default function AppTabs() {
  const insets = useSafeAreaInsets()
  const pathname = usePathname()
  const router = useRouter()
  const { ready, user } = useAuthSession()
  const bottomPadding = Math.max(insets.bottom, 6)

  useEffect(() => {
    if (ready && !user && pathname !== '/') {
      router.replace('/')
    }
  }, [pathname, ready, router, user])

  return (
    <Tabs asChild>
      <View className='relative flex-1 bg-background'>
        <TabSlot style={{ flex: 1 }} />

        <TabList asChild>
          <BottomTabBar bottomPadding={bottomPadding} hidden={!user}>
            {TABS_CONFIG.map((tab) => (
              <TabTrigger key={tab.name} asChild href={tab.href} name={tab.name}>
                <TabButton icon={tab.icon} label={tab.label} />
              </TabTrigger>
            ))}

            {HIDDEN_TABS_CONFIG.map((tab) => (
              <TabTrigger key={tab.name} href={tab.href} name={tab.name} style={{ display: 'none' }} />
            ))}
          </BottomTabBar>
        </TabList>
      </View>
    </Tabs>
  )
}

function BottomTabBar({
  bottomPadding,
  children,
  hidden = false,
  ...props
}: TabListProps & {
  bottomPadding: number
  hidden?: boolean
}) {
  return (
    <View
      {...props}
      className='absolute inset-x-0 bottom-0 overflow-visible bg-transparent'
      pointerEvents={hidden ? 'none' : 'auto'}
      style={hidden ? { display: 'none' } : undefined}>
      <View
        className='overflow-visible w-full'
        style={{
          backgroundColor: BAR_BACKGROUND_COLOR,
          borderTopColor: BAR_BORDER_COLOR,
          minHeight: TAB_BAR_MIN_HEIGHT + bottomPadding,
          paddingBottom: bottomPadding
        }}>
        <Separator />
        <View className='flex flex-row items-center justify-evenly w-full'>{children}</View>
      </View>
    </View>
  )
}

function TabButton({
  icon,
  isFocused,
  label,
  ...props
}: TabTriggerSlotProps & {
  icon: TabIconName
  label: string
}) {
  const iconColor = isFocused ? ACTIVE_ICON_COLOR : INACTIVE_ICON_COLOR

  return (
    <Pressable {...props} className='flex items-center justify-center active:scale-96 transition-transform'>
      <View className='min-h-13 items-center justify-end'>
        <View className={cn('flex items-center justify-center rounded-full h-7 w-7')}>
          <TabIcon color={iconColor} focused={Boolean(isFocused)} name={icon} />
        </View>

        <ThemedText className={cn('text-[9.5px] leading-0.5', isFocused ? 'text-[#F5F2EB]' : 'text-[#8A8A91]')}>
          {label}
        </ThemedText>
      </View>
    </Pressable>
  )
}

function TabIcon({ color, focused, name }: { color: string; focused: boolean; name: TabIconName }) {
  const size = focused ? 26 : 26
  const strokeWidth = focused ? 1 : 1

  return <RIcon color={color} focused={focused} name={name} size={size} strokeWidth={strokeWidth} />
}
