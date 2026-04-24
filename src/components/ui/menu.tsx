import { useAppTheme } from '@/context/app-theme-context'
import { getInitials } from '@/utils/helpers'
import { useRouter } from 'expo-router'
import { Avatar, Menu, Separator, Switch } from 'heroui-native'
import { useCallback } from 'react'
import { View } from 'react-native'
import { AppButton } from '../app-ui'
import { SignoutConfirm } from './confirm'
import { IconButton } from './icon-button'

interface UserMenuProps {
  photoUrl?: string | null
  name?: string
}

export const UserMenu = ({ photoUrl, name }: UserMenuProps) => {
  const router = useRouter()
  const { resolvedTheme, setTheme } = useAppTheme()

  const handleThemeToggle = useCallback(() => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }, [resolvedTheme, setTheme])

  const handleAccountPress = useCallback(() => {
    router.push('/account')
  }, [router])

  return (
    <Menu>
      <Menu.Trigger asChild>
        <IconButton size='xs'>
          <Avatar alt='pfp' className='bg-secondary' color='default' size='sm' variant='soft'>
            {photoUrl ? <Avatar.Image source={{ uri: photoUrl }} /> : null}
            <Avatar.Fallback>{getInitials(name)}</Avatar.Fallback>
          </Avatar>
        </IconButton>
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Overlay />
        <Menu.Content presentation='popover' width={220}>
          <Menu.Group>
            <Menu.Item className='px-2.5 py-2.5' id='account' onPress={handleAccountPress}>
              <View className='flex-1 gap-0.5'>
                <Menu.ItemTitle>Account</Menu.ItemTitle>
                <Menu.ItemDescription>Profile and preferences</Menu.ItemDescription>
              </View>
            </Menu.Item>
          </Menu.Group>
          <Menu.Group>
            <Menu.Item className='p-2.5' id='darkmode' onPress={handleThemeToggle} shouldCloseOnSelect={false}>
              <Menu.ItemTitle className='w-full'>Dark Mode</Menu.ItemTitle>
              <Switch className='pointer-events-none h-5.5 w-9' isSelected={resolvedTheme === 'dark'}>
                <Switch.Thumb
                  className='size-4'
                  animation={{
                    left: {
                      value: 4,
                      springConfig: {
                        damping: 30,
                        stiffness: 300,
                        mass: 1
                      }
                    }
                  }}
                />
              </Switch>
            </Menu.Item>
          </Menu.Group>
          <Separator className='mx-2 my-2 opacity-75' />
          <Menu.Group>
            <View className='w-full p-2.5'>
              <SignoutConfirm>
                <AppButton tone='tertiary' fullWidth>
                  Sign out
                </AppButton>
              </SignoutConfirm>
            </View>
          </Menu.Group>
        </Menu.Content>
      </Menu.Portal>
    </Menu>
  )
}
