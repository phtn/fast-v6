import { AppButton, AppScreen } from '@/components/app-ui'
import { RIcon } from '@/components/ui/icons'
import { List } from '@/components/ui/list'
import { useRouter } from 'expo-router'
import { View } from 'react-native'

export default function SettingsScreen() {
  const router = useRouter()
  return (
    <AppScreen className='px-0'>
      <AppButton
        leadingIcon={
          <View>
            <RIcon color='#8A8A91' name='left' size={16} fill='#8A8A91' />
          </View>
        }
        onPress={() => router.back()}
        size='sm'
        tone='ghost'
        className='h-8'>
        Back
      </AppButton>
      <List />
    </AppScreen>
  )
}
