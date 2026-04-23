import { useAuthSession } from '@/context/auth-context'
import { Button, Dialog } from 'heroui-native'
import { ReactNode, useState } from 'react'
import { View } from 'react-native'
import { AppButton } from '../app-ui'
import { ClubIcon } from '../club/club-ui'

interface ConfirmProps {
  isOpen?: boolean
  children: ReactNode
}

export const Confirm = ({ isOpen: propIsOpen, children }: ConfirmProps) => {
  const [isOpen, setIsOpen] = useState(propIsOpen ?? false)

  return (
    <Dialog isOpen={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <AppButton tone='ghost' size='sm' className='w-12 min-h-6 px-4 self-center' onPress={undefined}>
          <ClubIcon name='grid' size={28} strokeWidth={1} />
        </AppButton>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Close variant='ghost' />
          {children}
          <View className='flex-row justify-end gap-3'>
            <Button variant='ghost' size='sm' onPress={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button size='sm'>Confirm</Button>
          </View>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  )
}

export const BasicConfirm = ({ title, description }: { title: string; description: string }) => {
  return (
    <Confirm>
      <View className='mb-5 gap-1.5'>
        <Dialog.Title>Confirm Action</Dialog.Title>
        <Dialog.Description>
          Are you sure you want to proceed with this action? This cannot be undone.
        </Dialog.Description>
      </View>
    </Confirm>
  )
}

export const SignoutConfirm = ({ isOpen: propIsOpen, children }: ConfirmProps) => {
  const [isOpen, setIsOpen] = useState(propIsOpen ?? false)
  const { signOut } = useAuthSession()

  return (
    <Dialog isOpen={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Close variant='ghost' />
          <View className='mb-5 gap-1.5'>
            <Dialog.Title>Sign out</Dialog.Title>
            <Dialog.Description>Are you sure you want to sign out?</Dialog.Description>
          </View>
          <View className='flex-row justify-end gap-3'>
            <Button variant='ghost' size='sm' onPress={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onPress={signOut} size='sm'>
              Confirm
            </Button>
          </View>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  )
}
