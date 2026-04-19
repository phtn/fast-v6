// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config')

/** @type {import('expo/metro-config').MetroConfig} */

const { withUniwindConfig } = require('uniwind/metro')

const config = getDefaultConfig(__dirname)

if (!config.resolver.assetExts.includes('woff2')) {
  config.resolver.assetExts.push('woff2')
}

module.exports = withUniwindConfig(config, {
  // relative path to your global.css file (from previous step)
  cssEntryFile: './src/global.css',
  // (optional) path where we gonna auto-generate typings
  // defaults to project's root
  dtsFile: './src/uniwind-types.d.ts'
})
