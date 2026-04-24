import type { ConfigContext, ExpoConfig } from 'expo/config'

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  android: {
    ...config.android,
    googleServicesFile: process.env.GOOGLE_SERVICES_JSON ?? config.android?.googleServicesFile
  },
  ios: {
    ...config.ios,
    googleServicesFile: process.env.GOOGLE_SERVICE_INFO_PLIST ?? config.ios?.googleServicesFile
  }
})
