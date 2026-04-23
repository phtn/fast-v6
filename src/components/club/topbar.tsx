import { Image } from 'expo-image'
import { Avatar } from 'heroui-native'
import { View } from 'react-native'
import { BasicConfirm, SignoutConfirm } from '../ui/confirm'
import { IconButton } from '../ui/icon-button'

interface TopbarProps {
  photoUrl?: string | null
  text: string
}

function getInitials(text: string) {
  const initials = text
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')

  return initials || 'M'
}

export const Topbar = ({ photoUrl, text }: TopbarProps) => {
  return (
    <View className='relative h-20 flex-row items-center justify-between bg-background pb-2 pt-10 pr-2'>
      <View className='flex-row items-center justify-between w-24'>
        <BasicConfirm
          title='Confirm Action'
          description='Are you sure you want to proceed with this action? This cannot be undone.'
        />
        <Image
          contentFit='contain'
          source={require('@/assets/images/fastcar-optimized.svg')}
          style={{ position: 'absolute', left: '54%', right: '0%', top: '40%', width: '64%', aspectRatio: 7 }}
        />
      </View>
      <SignoutConfirm>
        <IconButton size='xs'>
          <Avatar alt='pfp' className='bg-secondary' color='default' size='sm' variant='soft'>
            {photoUrl ? <Avatar.Image source={{ uri: photoUrl }} /> : null}
            <Avatar.Fallback>{getInitials(text)}</Avatar.Fallback>
          </Avatar>
        </IconButton>
      </SignoutConfirm>
    </View>
  )
}
