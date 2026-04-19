import { useRouter } from 'expo-router'
import { Pressable, View } from 'react-native'

import {
  AppBadge,
  AppButton,
  AppCard,
  AppCardContent,
  AppCardFooter,
  AppCardHeader,
  AppScreen,
  SectionHeading
} from '@/components/app-ui'
import { HyperCard } from '@/components/app-ui/hyper-card'
import { ExternalLink } from '@/components/external-link'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { useTheme } from '@/hooks/use-theme'
import { SymbolView } from 'expo-symbols'
import Svg, { Circle, Rect } from 'react-native-svg'

export default function HomeScreen() {
  const router = useRouter()

  const theme = useTheme()

  return (
    <AppScreen innerClassName='gap-8' maxWidth={880}>
      <View className='gap-4'>
        <View className='flex flex-row items-center justify-between w-full'>
          <Svg fill='none' height={26} viewBox='0 0 24 24' width={26} className='stroke-active'>
            <Rect height='6.5' rx='1.4' stroke='#AAAAAA' strokeWidth={1} width='6.5' x='4.25' y='4.25' />
            <Rect height='6.5' rx='1.4' stroke='#AAAAAA' strokeWidth={1} width='6.5' x='13.25' y='4.25' />
            <Rect height='6.5' rx='1.4' stroke='#AAAAAA' strokeWidth={1} width='6.5' x='4.25' y='13.25' />
            <Rect height='6.5' rx='1.4' stroke='#AAAAAA' strokeWidth={1} width='6.5' x='13.25' y='13.25' />
          </Svg>
          <Svg fill='none' height={26} viewBox='0 0 24 24' width={26} className='stroke-active'>
            <Circle cx='12' cy='12' r='8' stroke='#AAAAAA' strokeWidth={1} />
          </Svg>
        </View>
        <HyperCard
          accentLine='Advance Your Expertise'
          handle='@compchem_more'
          metricLabel='Exp'
          metricValue='+100'
          network='telegram'
          badge='buttfuck'
          title='Computational Chemistry and Materials Engineering'
        />
      </View>

      <SectionHeading title='Featured community' titleClassName='text-[20px] leading-[26px] font-normal' />
      <View className='h-96 gap-4'>
        <AppButton size='lg' tone='secondary'>
          <ThemedText themeColor='textSecondary'>YOOO</ThemedText>
        </AppButton>
        <AppButton size='md' tone='primary'>
          Open Gallery
        </AppButton>
        <AppButton size='sm' tone='active'>
          Active
        </AppButton>
        <ExternalLink href='https://docs.expo.dev' asChild>
          <Pressable className=''>
            <ThemedView type='backgroundElement'>
              <ThemedText type='link'>Expo documentation</ThemedText>
              <SymbolView
                tintColor={theme.text}
                name={{ ios: 'arrow.up.right.square', android: 'link', web: 'link' }}
                size={12}
              />
            </ThemedView>
          </Pressable>
        </ExternalLink>
      </View>

      <View className='h-96'></View>

      <AppCard className='bg-secondary/20'>
        <AppCardHeader
          eyebrow='Quick links'
          title='Use the shared layer first'
          description='The gallery shows the visual system, and the form screen carries the same spacing and control language.'
          trailing={<AppBadge>v2</AppBadge>}
        />
        <AppCardContent className='gap-3'>
          <AppBadge tone='neutral'>Buttons, pills, panels, and switches</AppBadge>
        </AppCardContent>
        <AppCardFooter className='flex-row gap-3 pt-0'>
          <AppButton fullWidth tone='active'>
            Open gallery
          </AppButton>
          <AppButton fullWidth tone='tertiary'>
            Open forms
          </AppButton>
        </AppCardFooter>
      </AppCard>
    </AppScreen>
  )
}
