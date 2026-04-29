import { usePathname, useRouter } from 'expo-router'
import { TabList, Tabs, TabSlot, TabTrigger, type TabListProps, type TabTriggerSlotProps } from 'expo-router/ui'
import { useEffect } from 'react'
import { Pressable, View } from 'react-native'

import { ThemedText } from '@/components/themed-text'
import { useAuthSession } from '@/context/auth-context'
import { cn } from '@/lib/cn'
import { IconName, RIcon } from './ui/icons'

const ACTIVE_ICON_COLOR = '#0091ff'
const INACTIVE_ICON_COLOR = '#74747B'

const TABS_CONFIG = [
  { href: '/', icon: 'home', label: 'Home', name: 'home' },
  { href: '/chat', icon: 'chat', label: 'Chat', name: 'chat' },
  { href: '/amenities', icon: 'home', label: 'Amenities', name: 'amenities' },
  { href: '/concierge', icon: 'grid', label: 'Concierge', name: 'concierge' }
] as const satisfies readonly {
  href: '/' | '/chat' | '/amenities' | '/concierge'
  icon: IconName
  label: string
  name: string
}[]

const HIDDEN_TABS_CONFIG = [
  { href: '/account', name: 'account' },
  { href: '/settings', name: 'settings' }
] as const

type WebTabIconName = (typeof TABS_CONFIG)[number]['icon']

export default function AppTabs() {
  const pathname = usePathname()
  const router = useRouter()
  const { ready, user } = useAuthSession()

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
          <CustomTabList hidden={!user}>
            {TABS_CONFIG.map((tab) => (
              <TabTrigger key={tab.name} asChild href={tab.href} name={tab.name}>
                <TabButton icon={tab.icon}>{tab.label}</TabButton>
              </TabTrigger>
            ))}

            {HIDDEN_TABS_CONFIG.map((tab) => (
              <TabTrigger key={tab.name} href={tab.href} name={tab.name} style={{ display: 'none' }} />
            ))}
          </CustomTabList>
        </TabList>
      </View>
    </Tabs>
  )
}

export function TabButton({
  children,
  icon,
  isFocused,
  ...props
}: TabTriggerSlotProps & {
  icon: WebTabIconName
}) {
  const iconColor = isFocused ? ACTIVE_ICON_COLOR : INACTIVE_ICON_COLOR

  return (
    <Pressable {...props} className='active:opacity-75'>
      <View className={cn('flex-row items-center gap-2 rounded-lg px-3 py-2', isFocused && 'bg-default')}>
        <RIcon color={iconColor} focused={Boolean(isFocused)} name={icon} size={17} strokeWidth={1.4} />
        <ThemedText type='smallBold' themeColor={isFocused ? 'text' : 'textSecondary'}>
          {children}
        </ThemedText>
      </View>
    </Pressable>
  )
}

export function CustomTabList({
  children,
  hidden = false,
  ...props
}: TabListProps & {
  hidden?: boolean
}) {
  return (
    <View
      {...props}
      className='absolute inset-x-0 top-0 flex-row justify-center px-4 pt-4'
      pointerEvents={hidden ? 'none' : 'auto'}
      style={hidden ? { display: 'none' } : undefined}>
      <View className='w-full max-w-230 flex-row items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2'>
        <ThemedText type='smallBold' className='mr-auto'>
          Fast Club
        </ThemedText>

        {children}
      </View>
    </View>
  )
}
