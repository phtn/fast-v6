import {
  Tabs,
  TabList,
  TabTrigger,
  TabSlot,
  TabTriggerSlotProps,
  TabListProps,
} from 'expo-router/ui'
import React from 'react'
import { Pressable, View } from 'react-native'

import { ThemedText } from './themed-text'

import { cn } from '@/lib/cn'

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot style={{ height: '100%' }} />
      <TabList asChild>
        <CustomTabList>
          <TabTrigger name='home' href='/' asChild>
            <TabButton>Home</TabButton>
          </TabTrigger>
          <TabTrigger name='components' href='/components' asChild>
            <TabButton>Components</TabButton>
          </TabTrigger>
          <TabTrigger name='forms' href='/forms' asChild>
            <TabButton>Forms</TabButton>
          </TabTrigger>
          <TabTrigger name='explore' href='/explore' asChild>
            <TabButton>Explore</TabButton>
          </TabTrigger>
        </CustomTabList>
      </TabList>
    </Tabs>
  )
}

export function TabButton({ children, isFocused, ...props }: TabTriggerSlotProps) {
  return (
    <Pressable {...props} style={({ pressed }) => (pressed ? { opacity: 0.72 } : undefined)}>
      <View className={cn('rounded-lg px-3 py-2', isFocused && 'bg-default')}>
        <ThemedText type='small' themeColor={isFocused ? 'text' : 'textSecondary'}>
          {children}
        </ThemedText>
      </View>
    </Pressable>
  )
}

export function CustomTabList(props: TabListProps) {
  return (
    <View {...props} className='absolute inset-x-0 top-0 flex-row justify-center px-4 pt-4'>
      <View className='w-full max-w-[920px] flex-row items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2'>
        <ThemedText type='smallBold' className='mr-auto'>
          FastSaf
        </ThemedText>

        {props.children}
      </View>
    </View>
  )
}
