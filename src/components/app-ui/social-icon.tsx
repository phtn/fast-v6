import { View, type ViewStyle } from 'react-native'
import Svg, { Path, Rect } from 'react-native-svg'

import { cn } from '@/lib/cn'

export type SocialNetwork = 'facebook' | 'linkedin' | 'telegram'

type SocialIconProps = {
  color?: string
  network: SocialNetwork
  size?: number
}

type SocialIconBadgeProps = {
  className?: string
  network: SocialNetwork
  size?: number
}

export function SocialIcon({ color = '#FFFFFF', network, size = 16 }: SocialIconProps) {
  switch (network) {
    case 'facebook':
      return (
        <Svg fill='none' height={size} viewBox='0 0 24 24' width={size}>
          <Path
            d='M13.31 20v-6.8h2.28l.34-2.67h-2.62V8.83c0-.77.22-1.29 1.32-1.29H16V5.16c-.23-.03-1.03-.1-1.96-.1-1.94 0-3.27 1.18-3.27 3.36v1.91H8.57v2.67h2.2V20h2.54Z'
            fill={color}
          />
        </Svg>
      )
    case 'linkedin':
      return (
        <Svg fill='none' height={size} viewBox='0 0 24 24' width={size}>
          <Rect fill={color} height='3.1' rx='1.55' width='3.1' x='4.1' y='4.4' />
          <Path
            d='M4.45 9.2H6.9V19.6H4.45V9.2Zm4.1 0h2.35v1.42h.03c.33-.62 1.13-1.7 2.95-1.7 3.16 0 3.74 2.08 3.74 4.79v5.89h-2.45v-5.22c0-1.24-.02-2.84-1.73-2.84-1.73 0-1.99 1.35-1.99 2.75v5.31H8.55V9.2Z'
            fill={color}
          />
        </Svg>
      )
    case 'telegram':
      return (
        <Svg fill='none' height={size} viewBox='0 0 24 24' width={size}>
          <Path
            d='M19.74 5.24c.18-.8-.08-1.12-.78-.84L4.04 10.12c-1.02.4-1 .98.18 1.35l3.81 1.2 1.48 4.57c.18.55.1.78.7.78.46 0 .67-.21.92-.46l2.36-2.3 4.93 3.62c.91.5 1.55.24 1.78-.83l3.04-14.8ZM9.53 12.38l7.33-4.63c.37-.23.71-.11.43.14l-6.05 5.46-.23 2.54c-.03.36-.17.44-.37.44l.19-2.63-1.3-1.32Z'
            fill={color}
          />
        </Svg>
      )
  }
}

export function SocialIconBadge({ className, network, size = 28 }: SocialIconBadgeProps) {
  const isSquare = network === 'linkedin'
  const style: ViewStyle = { width: size, height: size }

  return (
    <View
      className={cn(
        'items-center justify-center bg-foreground',
        isSquare ? 'rounded-[5px]' : 'rounded-full',
        className
      )}
      style={style}>
      <SocialIcon network={network} size={Math.round(size * 0.52)} />
    </View>
  )
}
