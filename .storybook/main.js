const path = require('path');

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
  ],
  webpackFinal: async (config) => {
    config.resolve.modules.push(
      path.resolve(__dirname, '..', 'node_modules'),
      path.resolve(__dirname, '..', 'src'),
    );
    // Return the altered config
    return config;
  },
};
