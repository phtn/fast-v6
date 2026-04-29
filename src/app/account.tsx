import { useRouter } from 'expo-router'
import { Avatar } from 'heroui-native'
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
import { SignoutConfirm } from '@/components/ui/confirm'
import { RIcon } from '@/components/ui/icons'
import { type ThemePreference, useAppTheme } from '@/context/app-theme-context'
import { useAuthSession } from '@/context/auth-context'
import { getInitials } from '@/utils/helpers'

const themeOptions: { label: string; value: ThemePreference }[] = [
  { label: 'System', value: 'system' },
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' }
]

function getAccountName(displayName?: string | null, email?: string | null) {
  return displayName ?? email?.split('@')[0] ?? 'Member'
}

export default function AccountScreen() {
  const router = useRouter()
  const { user } = useAuthSession()
  const { resolvedTheme, setTheme, theme } = useAppTheme()
  const accountName = useMemo(() => getAccountName(user?.displayName, user?.email), [user?.displayName, user?.email])

  return (
    <AppScreen innerClassName='gap-6' maxWidth={760}>
      <AppButton
        leadingIcon={
          <View>
            <RIcon color='#8A8A91' name='left' size={16} fill='#8A8A91' />
          </View>
        }
        onPress={() => router.back()}
        size='sm'
        tone='ghost'>
        Back
      </AppButton>

      <SectionHeading eyebrow='Account' title='Settings' />

      <AppCard>
        <AppCardContent className='gap-5 pt-5'>
          <View className='flex-row items-center gap-4'>
            <Avatar alt='pfp' className='border border-border bg-secondary' color='default' size='lg' variant='soft'>
              {user?.photoURL ? <Avatar.Image source={{ uri: user.photoURL }} /> : null}
              <Avatar.Fallback>{getInitials(accountName)}</Avatar.Fallback>
            </Avatar>

            <View className='flex-1 gap-1'>
              <ThemedText className='text-[22px] leading-7 font-medium'>{accountName}</ThemedText>
              <ThemedText themeColor='textSecondary'>{user?.email ?? 'No email on file'}</ThemedText>
            </View>
          </View>

          <View className='flex-row flex-wrap gap-2'>
            <AppBadge tone='neutral'>Theme: {theme}</AppBadge>
            <AppBadge tone='accent'>Resolved: {resolvedTheme}</AppBadge>
          </View>
        </AppCardContent>
      </AppCard>

      <AppCard>
        <AppCardHeader
          eyebrow='Appearance'
          title='Theme preference'
          description='Choose whether the app follows the system appearance or uses a fixed light or dark theme.'
        />
        <AppCardContent className='gap-3'>
          <View className='flex-row flex-wrap gap-2'>
            {themeOptions.map((option) => {
              const selected = theme === option.value

              return (
                <AppButton
                  key={option.value}
                  className='px-5'
                  onPress={() => setTheme(option.value)}
                  size='sm'
                  tone={selected ? 'active' : 'secondary'}>
                  {option.label}
                </AppButton>
              )
            })}
          </View>
        </AppCardContent>
      </AppCard>

      <AppCard>
        <AppCardHeader eyebrow='Session' title='Security' description='Sign out from this device when you are done.' />
        <AppCardContent>
          <SignoutConfirm>
            <AppButton fullWidth tone='tertiary'>
              Sign out
            </AppButton>
          </SignoutConfirm>
        </AppCardContent>
      </AppCard>
    </AppScreen>
  )
}
