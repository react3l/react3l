  const webpack = require('webpack');

module.exports = (config) => {
  config.plugins.push(new webpack.BannerPlugin({banner: '#!/usr/bin/env node', raw: true}));
  return config;
};
