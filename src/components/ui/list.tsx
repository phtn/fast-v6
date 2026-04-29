import { Ionicons } from '@expo/vector-icons'
import { ListGroup, Separator, useThemeColor } from 'heroui-native'
import { Text, View } from 'react-native'
import { withUniwind } from 'uniwind'

const StyledIonicons = withUniwind(Ionicons)

export const List = () => {
  const mutedColor = useThemeColor('muted')

  return (
    <View className='flex-1 justify-center px-2'>
      <Text className='text-sm text-muted mb-2 ml-2'>Account</Text>
      <ListGroup className='mb-6'>
        <ListGroup.Item>
          <ListGroup.ItemPrefix>
            <StyledIonicons size={22} name='person-outline' className='text-foreground' />
          </ListGroup.ItemPrefix>
          <ListGroup.ItemContent>
            <ListGroup.ItemTitle>Personal Info</ListGroup.ItemTitle>
            <ListGroup.ItemDescription>Name, email, phone number</ListGroup.ItemDescription>
          </ListGroup.ItemContent>
          <ListGroup.ItemSuffix />
        </ListGroup.Item>
        <Separator className='mx-4' />
        <ListGroup.Item>
          <ListGroup.ItemPrefix>
            <StyledIonicons name='card-outline' size={22} className='text-foreground' />
          </ListGroup.ItemPrefix>
          <ListGroup.ItemContent>
            <ListGroup.ItemTitle>Payment Methods</ListGroup.ItemTitle>
            <ListGroup.ItemDescription>Visa ending in 4829</ListGroup.ItemDescription>
          </ListGroup.ItemContent>
          <ListGroup.ItemSuffix />
        </ListGroup.Item>
      </ListGroup>
      <Text className='text-sm text-muted mb-2 ml-2'>Preferences</Text>
      <ListGroup>
        <ListGroup.Item>
          <ListGroup.ItemPrefix>
            <StyledIonicons name='color-palette-outline' size={22} className='text-foreground' />
          </ListGroup.ItemPrefix>
          <ListGroup.ItemContent>
            <ListGroup.ItemTitle>Appearance</ListGroup.ItemTitle>
            <ListGroup.ItemDescription>Theme, font size, display</ListGroup.ItemDescription>
          </ListGroup.ItemContent>
          <ListGroup.ItemSuffix />
        </ListGroup.Item>
        <Separator className='mx-4' />
        <ListGroup.Item>
          <ListGroup.ItemPrefix>
            <StyledIonicons name='notifications-outline' size={22} className='text-foreground' />
          </ListGroup.ItemPrefix>
          <ListGroup.ItemContent>
            <ListGroup.ItemTitle>Notifications</ListGroup.ItemTitle>
            <ListGroup.ItemDescription>Alerts, sounds, badges</ListGroup.ItemDescription>
          </ListGroup.ItemContent>
          <ListGroup.ItemSuffix iconProps={{ size: 18, color: mutedColor }} />
        </ListGroup.Item>
      </ListGroup>
    </View>
  )
}
