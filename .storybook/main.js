module.exports = {
  stories: [
    '../src/**/*.stories.tsx'
  ],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.less$/,
      use: [
        {loader: 'style-loader'},
        {loader: 'css-loader', options: {modules: false}},
        {loader: 'less-loader', options: {javascriptEnabled: true}}
      ]
    });
    return config
  }
};
