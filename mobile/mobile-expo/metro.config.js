const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Point to the correct node_modules
config.watchFolders = [__dirname];
config.resolver.nodeModulesPaths = [
    path.resolve(__dirname, 'node_modules'),
];

module.exports = config;
