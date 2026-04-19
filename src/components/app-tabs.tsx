import { TabList, Tabs, TabSlot, TabTrigger, type TabListProps, type TabTriggerSlotProps } from 'expo-router/ui'
import { Pressable, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Svg, { Circle, Path, Rect } from 'react-native-svg'

import { ThemedText } from '@/components/themed-text'
import { cn } from '@/lib/cn'

const TAB_BAR_MIN_HEIGHT = 72
const ACTIVE_ICON_COLOR = '#CCFF2F' // '#050505'
const BAR_BORDER_COLOR = '#1A1A1A'
const BAR_BACKGROUND_COLOR = '#050505'
const INACTIVE_ICON_COLOR = '#74747B'

const TABS_CONFIG = [
  { href: '/', icon: 'home', label: 'Home', name: 'home' },
  { href: '/components', icon: 'library', label: 'Library', name: 'library' },
  { href: '/forms', icon: 'forms', label: 'Forms', name: 'forms' },
  { href: '/explore', icon: 'explore', label: 'Explore', name: 'explore' }
] as const

type TabIconName = (typeof TABS_CONFIG)[number]['icon']

const Separator = () => <View className='absolute top-0 bg-[#383939] h-[0.5px] w-full' />

export default function AppTabs() {
  const insets = useSafeAreaInsets()
  const bottomPadding = Math.max(insets.bottom, 6)

  return (
    <Tabs asChild>
      <View className='relative flex-1 bg-background'>
        <TabSlot style={{ flex: 1 }} />

        <TabList asChild>
          <BottomTabBar bottomPadding={bottomPadding}>
            {TABS_CONFIG.map((tab) => (
              <TabTrigger key={tab.name} asChild href={tab.href} name={tab.name}>
                <TabButton icon={tab.icon} label={tab.label} />
              </TabTrigger>
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
  ...props
}: TabListProps & {
  bottomPadding: number
}) {
  return (
    <View {...props} className='absolute inset-x-0 bottom-0 overflow-visible bg-transparent'>
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
    <Pressable {...props} className='flex items-center justify-center'>
      <View className='min-h-14 items-center justify-end'>
        <View className={cn('flex items-center justify-center rounded-full h-8 w-8')}>
          <TabIcon color={iconColor} focused={Boolean(isFocused)} name={icon} />
        </View>

        <ThemedText className={cn('text-[10px] leading-4', isFocused ? 'text-[#F5F2EB]' : 'text-[#8A8A91]')}>
          {label}
        </ThemedText>
      </View>
    </Pressable>
  )
}

function TabIcon({ color, focused, name }: { color: string; focused: boolean; name: TabIconName }) {
  const size = focused ? 26 : 26
  const strokeWidth = focused ? 2 : 1

  switch (name) {
    case 'home':
      return (
        <Svg fill='none' height={size} viewBox='0 0 24 24' width={size}>
          <Path
            d='M4.75 10.5 12 4.75l7.25 5.75V19a1 1 0 0 1-1 1h-4.5v-5.25h-3.5V20h-4.5a1 1 0 0 1-1-1v-8.5Z'
            stroke={color}
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={strokeWidth}
          />
        </Svg>
      )
    case 'library':
      return (
        <Svg fill='none' height={size} viewBox='0 0 24 24' width={size}>
          <Rect height='6.5' rx='1.4' stroke={color} strokeWidth={strokeWidth} width='6.5' x='4.25' y='4.25' />
          <Rect height='6.5' rx='1.4' stroke={color} strokeWidth={strokeWidth} width='6.5' x='13.25' y='4.25' />
          <Rect height='6.5' rx='1.4' stroke={color} strokeWidth={strokeWidth} width='6.5' x='4.25' y='13.25' />
          <Rect height='6.5' rx='1.4' stroke={color} strokeWidth={strokeWidth} width='6.5' x='13.25' y='13.25' />
        </Svg>
      )
    case 'forms':
      return (
        <Svg fill='none' height={size} viewBox='0 0 24 24' width={size}>
          <Path
            d='M6 7.25h12m0 0-4-4m4 4-4 4M18 16.75H6m0 0 4-4m-4 4 4 4'
            stroke={color}
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={strokeWidth}
          />
        </Svg>
      )
    case 'explore':
      return (
        <Svg fill='none' height={size} viewBox='0 0 24 24' width={size}>
          <Circle cx='12' cy='12' r='7.25' stroke={color} strokeWidth={strokeWidth} />
          <Path
            d='m10.1 13.9 1.9-5 5-1.9-1.9 5-5 1.9Z'
            stroke={color}
            strokeLinejoin='round'
            strokeWidth={strokeWidth}
          />
          <Circle cx='12' cy='12' fill={color} r='1.1' />
        </Svg>
      )
  }
}
