import { Image } from 'expo-image'
import { View } from 'react-native'
import { AppButton } from '../app-ui'
import { BottomSheetComponent } from '../app-ui/bottom-sheet'
import { RIcon } from '../ui/icons'
import { UserMenu } from '../ui/menu'

interface TopbarProps {
  photoUrl?: string | null
  text: string
}

export const Topbar = ({ photoUrl, text }: TopbarProps) => {
  return (
    <View className='relative h-18 flex-row items-center justify-between bg-background pb-0 pt-8 pr-2'>
      <View className='flex-row items-center justify-between w-24'>
        <BottomSheetComponent>
          <AppButton tone='ghost' size='sm' className='w-12 min-h-6 px-4 self-center' onPress={undefined}>
            <RIcon name='container' size={28} strokeWidth={1} />
          </AppButton>
        </BottomSheetComponent>
        <Image
          contentFit='contain'
          source={require('@/assets/images/fastcar-optimized.svg')}
          style={{ position: 'absolute', left: '54%', right: '0%', top: '30%', width: '64%', aspectRatio: 7 }}
        />
      </View>
      <UserMenu photoUrl={photoUrl} name={text} />
    </View>
  )
}
