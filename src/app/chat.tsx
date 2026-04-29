import type { ComponentProps } from 'react'
import { useMemo } from 'react'
import { View, useWindowDimensions } from 'react-native'

import {
  AppBadge,
  AppButton,
  AppCard,
  AppCardContent,
  AppCardDivider,
  AppCardHeader,
  AppScreen
} from '@/components/app-ui'
import { ThemedText } from '@/components/themed-text'
import { MCIcon } from '@/components/ui/icons'
import { useAuthSession } from '@/context/auth-context'
import { cn } from '@/lib/cn'

type MaterialIconName = ComponentProps<typeof MCIcon>['name']

type BadgeTone = ComponentProps<typeof AppBadge>['tone']

type ChatMessage =
  | {
      body: string
      id: string
      meta: string
      speaker: 'member'
    }
  | {
      body: string
      icon: MaterialIconName
      id: string
      meta: string
      speaker: 'house'
      title: string
    }
  | {
      body: string
      id: string
      speaker: 'system'
    }

type DeskState = {
  detail: string
  icon: MaterialIconName
  id: string
  label: string
  tone: BadgeTone
}

type Prompt = {
  icon: MaterialIconName
  id: string
  label: string
}

type SuggestedAsk = {
  detail: string
  icon: MaterialIconName
  id: string
  title: string
}

const deskStates: DeskState[] = [
  {
    id: 'reception',
    icon: 'shield-check-outline',
    label: 'Reception',
    detail: 'Entry and guest clearance are ready to scan.',
    tone: 'active'
  },
  {
    id: 'dining',
    icon: 'silverware-fork-knife',
    label: 'Dining desk',
    detail: 'A quiet corner table is being held through 8:45 PM.',
    tone: 'accent'
  },
  {
    id: 'transport',
    icon: 'car-outline',
    label: 'Transport',
    detail: 'Departure pickup can be staged in about 12 minutes.',
    tone: 'neutral'
  }
]

const quickPrompts: Prompt[] = [
  { id: 'table', icon: 'silverware-fork-knife', label: 'Hold a table' },
  { id: 'guest', icon: 'account-plus-outline', label: 'Add guest note' },
  { id: 'car', icon: 'car-outline', label: 'Arrange a car' }
]

const suggestedAsks: SuggestedAsk[] = [
  {
    id: 'arrival',
    icon: 'message-text-outline',
    title: 'Arrival note',
    detail: 'Share guest names, preferred entry time, or pacing for the evening.'
  },
  {
    id: 'lounge',
    icon: 'star-four-points-outline',
    title: 'Quiet corner',
    detail: 'Ask the lounge to hold a low-traffic table after dinner service.'
  },
  {
    id: 'late-night',
    icon: 'clock-time-four-outline',
    title: 'Late close',
    detail: 'Stage a car at close so the side entrance is already covered.'
  }
]

function getMemberName(displayName?: string | null, email?: string | null) {
  return displayName ?? email?.split('@')[0] ?? 'Member'
}

export default function ChatScreen() {
  const { user } = useAuthSession()
  const { width } = useWindowDimensions()
  const isWide = width >= 960
  const memberName = useMemo(() => getMemberName(user?.displayName, user?.email), [user?.displayName, user?.email])

  const transcript = useMemo<ChatMessage[]>(
    () => [
      {
        id: 'opened',
        speaker: 'system',
        body: 'Priority channel opened for tonight.'
      },
      {
        id: 'welcome',
        speaker: 'house',
        title: 'House concierge',
        meta: '7:12 PM',
        icon: 'message-processing-outline',
        body: `Good evening, ${memberName}. I have reception, dining, and transport linked to this thread if you need anything adjusted on the fly.`
      },
      {
        id: 'member-request',
        speaker: 'member',
        meta: '7:14 PM',
        body: 'Could you keep a quieter table for two after 8:30 and note that my guest will arrive a few minutes behind me?'
      },
      {
        id: 'dining',
        speaker: 'house',
        title: 'Dining desk',
        meta: '7:15 PM',
        icon: 'silverware-fork-knife',
        body: 'Handled. We have a corner setting held until 8:45 and reception has the guest note attached to your pass.'
      },
      {
        id: 'transport',
        speaker: 'house',
        title: 'Transport',
        meta: '7:17 PM',
        icon: 'car-outline',
        body: 'If the evening runs long, send “car” here and I can stage pickup near the side entrance without opening another request.'
      }
    ],
    [memberName]
  )

  return (
    <AppScreen
      innerClassName='gap-5'
      maxWidth={1060}
      stickyHeader={<ChatStickyHeader isWide={isWide} />}
      stickyHeaderGap={6}>
      {/*<HeroCard memberName={memberName} />*/}

      <View className={cn('gap-4 pb-24', isWide && 'flex-row items-start')}>
        <View className='gap-4' style={isWide ? { flex: 1.2 } : undefined}>
          <AppCard>
            {/*<AppCardHeader
              eyebrow='Thread'
              title='Tonight’s conversation'
              description='One calm line shared between the desks that matter once you are in motion.'
              trailing={<AppBadge tone='accent'>Synced</AppBadge>}
            />*/}
            {/*<AppCardDivider />*/}
            <AppCardContent className='pt-5 gap-4'>
              {transcript.map((message) => (
                <MessageRow key={message.id} message={message} />
              ))}
            </AppCardContent>
            <AppCardDivider />
            <AppCardContent className='pt-5 gap-4'>
              <View className='flex-row flex-wrap gap-2'>
                {quickPrompts.map((prompt) => (
                  <AppButton
                    key={prompt.id}
                    size='sm'
                    tone='secondary'
                    className='px-4'
                    leadingIcon={<MCIcon color='#8A8A91' name={prompt.icon} size={16} />}>
                    {prompt.label}
                  </AppButton>
                ))}
              </View>

              <View className='rounded-3xl border border-border bg-background px-4 py-4'>
                <View className='flex-row items-end gap-3'>
                  <View className='h-11 w-11 items-center justify-center rounded-2xl bg-default'>
                    <MCIcon color='#0091ff' name='send-circle-outline' size={22} />
                  </View>

                  <View className='flex-1 gap-1'>
                    <ThemedText type='small' themeColor='textSecondary'>
                      Draft message
                    </ThemedText>
                    <ThemedText className='text-[15px] leading-5.5'>
                      Need a quiet table after 8:30, plus a car waiting at close if the room runs late.
                    </ThemedText>
                  </View>

                  <AppButton tone='active' size='sm'>
                    Send
                  </AppButton>
                </View>
              </View>
            </AppCardContent>
          </AppCard>
        </View>

        <View className='gap-4' style={isWide ? { width: 320 } : undefined}>
          <AppCard>
            <AppCardHeader eyebrow='Live desks' title='Connected to your thread' />
            <AppCardContent className='gap-3'>
              {deskStates.map((desk) => (
                <DeskRow key={desk.id} desk={desk} />
              ))}
            </AppCardContent>
          </AppCard>

          <AppCard>
            <AppCardHeader
              eyebrow='Suggested asks'
              title='High-signal requests'
              description='Useful prompts that usually save a back-and-forth once the club gets busy.'
            />
            <AppCardContent className='gap-3'>
              {suggestedAsks.map((ask) => (
                <SuggestedAskRow key={ask.id} ask={ask} />
              ))}
            </AppCardContent>
          </AppCard>
        </View>
      </View>
    </AppScreen>
  )
}

function ChatStickyHeader({ isWide }: { isWide: boolean }) {
  return (
    <View className='flex-row items-center justify-between h-18 pt-8 gap-3'>
      <View className='gap-0.5'>
        <ThemedText className='text-[18px] leading-6 font-medium'>Chats</ThemedText>
      </View>
      <View className='flex-row items-center gap-2'>
        <AppBadge tone='active'>Live</AppBadge>
        {isWide ? <AppBadge tone='neutral'>3 desks</AppBadge> : null}
      </View>
    </View>
  )
}

// function HeroCard({ memberName }: { memberName: string }) {
//   return (
//     <AppCard className='border-transparent bg-foreground'>
//       <View className='absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-active/20' />
//       <View className='absolute -right-10 -top-10 h-40 w-40 rounded-full bg-active/30' />
//       <View className='absolute -left-6 bottom-0 h-28 w-28 rounded-full bg-white/10' />

//       <AppCardContent className='pt-5 gap-6'>
//         <View className='flex-row gap-4'>
//           <View className='flex-row gap-4 w-full'>
//             <View className='flex-1 gap-2 border border-t-mauve-800 w-full'>
//               <ThemedText type='eyebrow' themeColor='background' className='opacity-75'>
//                 Private channel
//               </ThemedText>
//               <ThemedText themeColor='background' className='text-[30px] leading-8 font-medium'>
//                 Line for {memberName}
//               </ThemedText>
//               <ThemedText themeColor='background' className='max-w-160 opacity-80'>
//                 A quieter, faster thread for arrivals, dining notes, guest changes, and last-minute transport without
//                 jumping between desks.
//               </ThemedText>
//             </View>
//           </View>

//           <View className='rounded-full border border-white/10 bg-white/10 px-3 py-2'>
//             <ThemedText type='smallBold' themeColor='background'>
//               2 min reply
//             </ThemedText>
//           </View>
//         </View>

//         <View className='flex-row flex-wrap gap-2'>
//           <HeroPill icon='clock-time-four-outline' label='Replies stay short and live.' />
//           <HeroPill icon='shield-check-outline' label='Reception already has your pass details.' />
//           <HeroPill icon='car-outline' label='Transport can join without opening a new request.' />
//         </View>
//       </AppCardContent>
//     </AppCard>
//   )
// }

// function HeroPill({ icon, label }: { icon: MaterialIconName; label: string }) {
//   return (
//     <View className='flex-row items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2'>
//       <MCIcon color='#F7F4EF' name={icon} size={15} />
//       <ThemedText type='small' themeColor='background' className='opacity-85'>
//         {label}
//       </ThemedText>
//     </View>
//   )
// }

function MessageRow({ message }: { message: ChatMessage }) {
  if (message.speaker === 'system') {
    return (
      <View className='items-center'>
        <View className='rounded-full bg-default px-3 py-1.5'>
          <ThemedText type='small' themeColor='textSecondary'>
            {message.body}
          </ThemedText>
        </View>
      </View>
    )
  }

  if (message.speaker === 'member') {
    return (
      <View className='items-end gap-2'>
        <View className='rounded-3xl bg-active px-4 py-3.5' style={{ maxWidth: '88%' }}>
          <ThemedText className='text-[15px] leading-5.5 text-active-foreground'>{message.body}</ThemedText>
        </View>
        <ThemedText type='small' themeColor='textSecondary' className='pr-2'>
          You • {message.meta}
        </ThemedText>
      </View>
    )
  }

  return (
    <View className='items-start gap-2'>
      <View className='flex-row items-center gap-3 px-1'>
        <View className='h-9 w-9 items-center justify-center rounded-full bg-default'>
          <MCIcon color='#0091ff' name={message.icon} size={18} />
        </View>

        <View className='flex-row items-center gap-2'>
          <ThemedText type='smallBold'>{message.title}</ThemedText>
          <ThemedText type='small' themeColor='textSecondary'>
            {message.meta}
          </ThemedText>
        </View>
      </View>
      <View className='rounded-3xl border border-border bg-background px-4 py-3.5' style={{ maxWidth: '88%' }}>
        <ThemedText className='text-[15px] leading-5.5'>{message.body}</ThemedText>
      </View>
    </View>
  )
}

function DeskRow({ desk }: { desk: DeskState }) {
  return (
    <View className='rounded-[22px] border border-border bg-background px-4 py-4'>
      <View className='flex-row items-start gap-3'>
        <View className='h-10 w-10 items-center justify-center rounded-2xl bg-default'>
          <MCIcon color='#0091ff' name={desk.icon} size={18} />
        </View>

        <View className='flex-1 gap-1'>
          <View className='flex-row items-center justify-between gap-3'>
            <ThemedText className='font-medium'>{desk.label}</ThemedText>
            <AppBadge tone={desk.tone}>
              {desk.tone === 'active' ? 'Ready' : desk.tone === 'accent' ? 'Held' : 'On call'}
            </AppBadge>
          </View>
          <ThemedText type='small' themeColor='textSecondary'>
            {desk.detail}
          </ThemedText>
        </View>
      </View>
    </View>
  )
}

function SuggestedAskRow({ ask }: { ask: SuggestedAsk }) {
  return (
    <View className='flex-row items-center gap-3 rounded-[22px] border border-border bg-background px-4 py-4'>
      <View className='h-10 w-10 items-center justify-center rounded-2xl bg-active/10'>
        <MCIcon color='#0091ff' name={ask.icon} size={18} />
      </View>

      <View className='flex-1 gap-1'>
        <ThemedText className='font-medium'>{ask.title}</ThemedText>
        <ThemedText type='small' themeColor='textSecondary'>
          {ask.detail}
        </ThemedText>
      </View>

      <MCIcon color='#8A8A91' name='chevron-right' size={20} />
    </View>
  )
}
