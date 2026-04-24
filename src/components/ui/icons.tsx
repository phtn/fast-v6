import { MaterialCommunityIcons } from '@expo/vector-icons'
import { JSX } from 'react'
import Svg, { Path } from 'react-native-svg'
import { withUniwind } from 'uniwind'

export interface IconData {
  symbol: string
  set: string
  viewBox?: string
}

export type IconName = keyof typeof icons

export interface ReupIconProps {
  color?: string
  focused?: boolean
  name: IconName
  size?: number
  strokeWidth?: number
}

export const MCIcon = withUniwind(MaterialCommunityIcons)

export const RIcon = ({
  color = '#8A8A91',
  focused = false,
  name,
  size = 22,
  strokeWidth = focused ? 2 : 1.5
}: ReupIconProps): JSX.Element => {
  const icon = icons[name]

  return (
    <Svg fill='none' height={size} viewBox={icon.viewBox} width={size}>
      <Path
        d={icon.symbol}
        fill={focused ? color : undefined}
        stroke={color}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={strokeWidth}
      />
    </Svg>
  )
}

const icons: Record<string, IconData> = {
  chat: {
    symbol: `M7.5 8.5h9m-9 4H13m-11-2c0-.77.013-1.523.04-2.25c.083-2.373.125-3.56 1.09-4.533c.965-.972 2.186-1.024 4.626-1.129A100 100 0 0 1 12 2.5c1.48 0 2.905.03 4.244.088c2.44.105 3.66.157 4.626 1.13c.965.972 1.007 2.159 1.09 4.532a64 64 0 0 1 0 4.5c-.083 2.373-.125 3.56-1.09 4.533c-.965.972-2.186 1.024-4.626 1.129q-1.102.047-2.275.07c-.74.014-1.111.02-1.437.145s-.6.358-1.148.828l-2.179 1.87A.73.73 0 0 1 8 20.77v-2.348l-.244-.01c-2.44-.105-3.66-.157-4.626-1.13c-.965-.972-1.007-2.159-1.09-4.532A64 64 0 0 1 2 10.5`,
    viewBox: '0 0 24 24',
    set: 'hugeicons'
  },
  home: {
    symbol: `M5.732 20.5c-2.29 0-3.723-2.498-2.581-4.5L9.419 5.006c1.144-2.008 4.018-2.008 5.163 0L20.849 16c1.142 2.002-.291 4.5-2.581 4.5z`,
    viewBox: `0 0 24 24`,
    set: `club`
  },
  grid: {
    symbol: `M5.732 20.5c-2.29 0-3.723-2.498-2.581-4.5L9.419 5.006c1.144-2.008 4.018-2.008 5.163 0L20.849 16c1.142 2.002-.291 4.5-2.581 4.5z`,

    viewBox: '0 0 24 24',
    set: 'mingcute'
  }
}

/*
"grid-line": {
  "symbol": "<g fill=\"none\" fill-rule=\"evenodd\"><path d=\"m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z\"/><path fill=\"currentColor\" d=\"M9 13a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2zm10 0a2 2 0 0 1 1.995 1.85L21 15v4a2 2 0 0 1-1.85 1.995L19 21h-4a2 2 0 0 1-1.995-1.85L13 19v-4a2 2 0 0 1 1.85-1.995L15 13zM9 15H5v4h4zm10 0h-4v4h4zm0-12a2 2 0 0 1 1.995 1.85L21 5v4a2 2 0 0 1-1.85 1.995L19 11h-4a2 2 0 0 1-1.995-1.85L13 9V5a2 2 0 0 1 1.85-1.995L15 3zM9 3a2 2 0 0 1 1.995 1.85L11 5v4a2 2 0 0 1-1.85 1.995L9 11H5a2 2 0 0 1-1.995-1.85L3 9V5a2 2 0 0 1 1.85-1.995L5 3zm10 2h-4v4h4zM9 5H5v4h4z\"/></g>",
  "viewBox": "0 0 24 24",
  "set": "mingcute"
}
*/
