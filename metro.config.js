const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname, {
  // [Web-only]: Enables CSS support in Metro.
  isCSSEnabled: true,
});

// NativeWind Metro transformer
module.exports = withNativeWind(config, {
  input: './global.css',
  projectRoot: __dirname,
});