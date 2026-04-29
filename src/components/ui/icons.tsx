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
  fill?: string
}

export const MCIcon = withUniwind(MaterialCommunityIcons)

export const RIcon = ({
  color = '#8A8A91',
  focused = false,
  name,
  size = 22,
  strokeWidth = focused ? 2 : 1.5,
  fill = 'none'
}: ReupIconProps): JSX.Element => {
  const icon = icons[name]

  return (
    <Svg fill={fill} height={size} viewBox={icon.viewBox} width={size}>
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
    symbol: `M12 20.25h4.25a4 4 0 0 0 4-4V12M12 20.25H7.75a4 4 0 0 1-4-4V12M12 20.25V3.75m0 0H7.75a4 4 0 0 0-4 4V12M12 3.75h4.25a4 4 0 0 1 4 4V12m-16.5 0h16.5`,
    viewBox: '0 0 24 24',
    set: 'proicons'
  },
  container: {
    symbol: `M9.93 13.22L3.168 9.626m6.762 3.596v7.357m0-7.357l5.443-3.079M3.168 9.625c-.27.455-.418.98-.418 1.528v4.227a3 3 0 0 0 1.592 2.649l4.135 2.198a3 3 0 0 0 1.453.351M3.168 9.625c.263-.444.64-.82 1.105-1.083l8.364-4.732a3 3 0 0 1 2.886-.037l4.135 2.199c.486.258.881.639 1.157 1.092m0 0c.28.461.435.997.435 1.556v4.227a3 3 0 0 1-1.523 2.612l-4.354 2.463m5.442-10.858l-5.442 3.078M9.93 20.578a3 3 0 0 0 1.433-.388l4.01-2.268m0-7.78v7.78`,
    viewBox: '0 0 24 24',
    set: 'proicons'
  },
  chest: {
    symbol: `M2.75 10a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v7.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3zM8 5.5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2V7H8zm.5 5.5v3m7-3v3M2.75 12.5h18.5`,
    viewBox: '0 0 24 24',
    set: 'proicons'
  },
  cloud: {
    symbol: `M18.268 11c0 .3.21.563.497.65a3.502 3.502 0 0 1-1.015 6.85H7.375q-.09 0-.178-.005q-.098.005-.197.005A4.25 4.25 0 0 1 7 10a.445.445 0 0 0 .431-.334A5.5 5.5 0 0 1 18.268 11`,
    viewBox: '0 0 24 24',
    set: 'proicons'
  },
  bell: {
    symbol: `M18.934 14.98a3 3 0 0 1-.457-1.59V9.226a6.477 6.477 0 0 0-12.954 0v4.162a3 3 0 0 1-.457 1.592l-1.088 1.74a1 1 0 0 0 .848 1.53h14.348a1 1 0 0 0 .848-1.53z`,
    viewBox: '0 0 24 24',
    set: 'proicons'
  },
  camera: {
    symbol: `M12.857 3.189h-1.714c-.681 0-1.022 0-1.331.094c-.274.083-.529.22-.75.401c-.25.205-.438.489-.816 1.056L7.103 6.454c-1.524 0-2.286 0-2.868.296a2.72 2.72 0 0 0-1.188 1.19c-.297.581-.297 1.343-.297 2.867v5.651c0 1.524 0 2.286.297 2.868c.26.512.677.928 1.188 1.189c.582.296 1.344.296 2.868.296h9.794c1.524 0 2.286 0 2.868-.296a2.72 2.72 0 0 0 1.188-1.19c.297-.581.297-1.343.297-2.867v-5.651c0-1.524 0-2.286-.297-2.868a2.72 2.72 0 0 0-1.188-1.189c-.582-.296-1.344-.296-2.868-.296L15.754 4.74c-.378-.567-.567-.85-.816-1.056a2.2 2.2 0 0 0-.75-.401c-.309-.094-.65-.094-1.331-.094`,
    viewBox: '0 0 24 24',
    set: 'proicons'
  },
  left: {
    symbol: `M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42a.996.996 0 0 0-1.41 0l-6.59 6.59a.996.996 0 0 0 0 1.41l6.59 6.59a.996.996 0 1 0 1.41-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1`,
    viewBox: '0 0 24 24',
    set: 'ic'
  }
}

/*
"arrow-back": {
  "symbol": "<path fill=\"currentColor\" d=\"\"/>",

}
*/
