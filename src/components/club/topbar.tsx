import { Image } from 'expo-image'
import { View } from 'react-native'
import { AppButton } from '../app-ui'
import { RIcon } from '../ui/icons'
import { UserMenu } from '../ui/menu'

interface TopbarProps {
  photoUrl?: string | null
  text: string
}

export const Topbar = ({ photoUrl, text }: TopbarProps) => {
  return (
    <View className='relative h-20 flex-row items-center justify-between bg-background pb-2 pt-10 pr-2'>
      <View className='flex-row items-center justify-between w-24'>
        <AppButton tone='ghost' size='sm' className='w-12 min-h-6 px-4 self-center' onPress={undefined}>
          <RIcon name='grid' size={28} strokeWidth={1} />
        </AppButton>
        <Image
          contentFit='contain'
          source={require('@/assets/images/fastcar-optimized.svg')}
          style={{ position: 'absolute', left: '54%', right: '0%', top: '40%', width: '64%', aspectRatio: 7 }}
        />
      </View>
      <UserMenu photoUrl={photoUrl} name={text} />
    </View>
  )
}
