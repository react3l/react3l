module.exports = {
  stories: [
    '../src/**/*.stories.ts',
    '../src/**/*.stories.tsx',
  ],
  webpackFinal(config) {
    config.module.rules.push(
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
    );
    config.resolve.extensions.push('.less', '.css', '.scss');
    return config;
  },
};
