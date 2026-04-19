import {
  Checkbox,
  Description,
  FieldError,
  Input,
  Label,
  Switch,
  TextField
} from 'heroui-native'
import { useState } from 'react'
import { View } from 'react-native'

import {
  AppButton,
  AppCard,
  AppCardContent,
  AppCardFooter,
  AppCardHeader,
  AppScreen,
  SectionHeading
} from '@/components/app-ui'
import { ThemedText } from '@/components/themed-text'

export default function FormsScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [agreed, setAgreed] = useState(false)

  const emailIsInvalid = email.length > 0 && !email.includes('@')

  return (
    <AppScreen innerClassName='gap-6' keyboardShouldPersistTaps='handled' maxWidth={760}>
      <SectionHeading
        eyebrow='Forms'
        title='Account setup'
        description='Field groups, control rows, and actions should stay aligned with the same panel language.'
      />

      <AppCard>
        <AppCardHeader
          eyebrow='Account'
          title='Create your account'
          description='Use this structure as the default starting point for setup flows.'
        />
        <AppCardContent className='gap-5'>
          <TextField isInvalid={emailIsInvalid} isRequired className='gap-2'>
            <Label className='text-[14px] leading-5 font-medium text-foreground'>Email</Label>
            <Input
              autoCapitalize='none'
              className='h-[56px] rounded-lg border border-border bg-background px-4 text-[16px] leading-6 text-foreground shadow-none'
              keyboardType='email-address'
              onChangeText={setEmail}
              placeholder='you@example.com'
              value={email}
            />
            {emailIsInvalid ? (
              <FieldError
                className='pt-1'
                classNames={{ text: 'text-[14px] leading-5 text-danger' }}>
                Please enter a valid email
              </FieldError>
            ) : (
              <Description className='pt-1 text-[14px] leading-5 text-muted'>
                We&apos;ll never share your email.
              </Description>
            )}
          </TextField>

          <TextField className='gap-2'>
            <Label className='text-[14px] leading-5 font-medium text-foreground'>Password</Label>
            <Input
              className='h-[56px] rounded-lg border border-border bg-background px-4 text-[16px] leading-6 text-foreground shadow-none'
              onChangeText={setPassword}
              placeholder='Enter a password'
              secureTextEntry
              value={password}
            />
            <Description className='pt-1 text-[14px] leading-5 text-muted'>
              At least 8 characters.
            </Description>
          </TextField>
        </AppCardContent>
      </AppCard>

      <AppCard>
        <AppCardHeader
          eyebrow='Preferences'
          title='Default settings'
          description='Switches should keep their motion and use the same spacing system as text fields.'
        />
        <AppCardContent className='gap-3'>
          <PreferenceRow
            label='Enable notifications'
            control={
              <Switch
                className='h-[30px] w-[56px]'
                isSelected={notifications}
                onSelectedChange={setNotifications}>
                <Switch.Thumb className='left-[3px] h-[24px] w-[24px] rounded-full shadow-none' />
              </Switch>
            }
          />

          <PreferenceRow
            label='Dark mode'
            control={
              <Switch className='h-[30px] w-[56px]' isSelected={darkMode} onSelectedChange={setDarkMode}>
                <Switch.Thumb className='left-[3px] h-[24px] w-[24px] rounded-full shadow-none' />
              </Switch>
            }
          />
        </AppCardContent>
      </AppCard>

      <AppCard>
        <AppCardHeader
          eyebrow='Consent'
          title='Confirmation'
          description='Keep legal acknowledgement compact and easy to scan.'
        />
        <AppCardContent>
          <View className='flex-row items-center gap-4 rounded-lg border border-border bg-background px-4 py-4'>
            <Checkbox isSelected={agreed} onSelectedChange={setAgreed} />
            <ThemedText className='flex-1'>I agree to the terms & conditions</ThemedText>
          </View>
        </AppCardContent>
        <AppCardFooter className='pt-0'>
          <AppButton fullWidth isDisabled={!agreed || emailIsInvalid || email.length === 0}>
            Create account
          </AppButton>
        </AppCardFooter>
      </AppCard>
    </AppScreen>
  )
}

function PreferenceRow({ control, label }: { control: React.ReactNode; label: string }) {
  return (
    <View className='flex-row items-center gap-4 rounded-lg border border-border bg-background px-4 py-4'>
      <ThemedText className='flex-1'>{label}</ThemedText>
      {control}
    </View>
  )
}
