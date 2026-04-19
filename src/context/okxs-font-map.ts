import { Platform } from 'react-native'

import okxsMediumTtf from '../../assets/fonts/okxs-medium.ttf'
import okxsMediumWoff2 from '../../assets/fonts/okxs-medium.woff2'
import okxsRegularTtf from '../../assets/fonts/okxs-regular.ttf'
import okxsRegularWoff2 from '../../assets/fonts/okxs-regular.woff2'

export const okxsFontMap =
  Platform.OS === 'web'
    ? {
        OKXS: okxsRegularWoff2,
        'OKXS-Medium': okxsMediumWoff2
      }
    : {
        OKXS: okxsRegularTtf,
        'OKXS-Medium': okxsMediumTtf
      }
