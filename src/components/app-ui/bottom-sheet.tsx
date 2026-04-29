import { Href, useRouter } from 'expo-router'
import { BottomSheet, Button } from 'heroui-native'
import { ReactNode, useCallback, useState } from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ThemedText } from '../themed-text'
import { RIcon } from '../ui/icons'
import { AppButton } from './app-button'

interface BottomSheetProps {
  children?: ReactNode
}
export const BottomSheetComponent = ({ children }: BottomSheetProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const insets = useSafeAreaInsets()
  const router = useRouter()

  const navigate = useCallback(
    (path: Href) => () => {
      setIsOpen(false)
      router.push(path)
    },
    [router]
  )

  return (
    <BottomSheet isOpen={isOpen} onOpenChange={setIsOpen}>
      <BottomSheet.Trigger asChild>
        {children ?? <Button variant='secondary'>Open Bottom Sheet</Button>}
      </BottomSheet.Trigger>
      <BottomSheet.Portal>
        <BottomSheet.Overlay />
        <BottomSheet.Content detached bottomInset={insets.bottom + 64} className='' backgroundClassName='rounded-3xl'>
          <View className='w-full flex-row'>
            <View className='flex-1 items-center justify-center aspect-square border-r border-green-50/5'>
              <RIcon name='bell' />
            </View>
            <View className='flex-1 items-center justify-center border-r border-green-50/5'>
              <RIcon name='cloud' />
            </View>
            <View className='flex-1 items-center justify-center py-4'>
              <RIcon name='chat' />
            </View>
          </View>
          <View className='w-full flex-row border-t border-green-50/5'>
            <View className='flex-1 items-center justify-center aspect-square border-r border-green-50/5'>
              <RIcon name='camera' />
            </View>
            <View className='flex-1 items-center justify-center border-r border-green-50/5'>
              <RIcon name='home' />
            </View>
            <AppButton
              tone='ghost'
              onPress={navigate('/settings')}
              className='flex-1 flex-col items-center justify-center space-y-0 aspect-square'>
              <RIcon name='chest' size={28} color='white' />
              <ThemedText className='text-xs text-foreground/80'>Settings</ThemedText>
            </AppButton>
          </View>
        </BottomSheet.Content>
      </BottomSheet.Portal>
    </BottomSheet>
  )
}
