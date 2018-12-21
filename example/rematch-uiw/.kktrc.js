const path = require('path');
const apiMocker = require('mocker-api');

module.exports = {
  plugins: [
    require.resolve('@kkt/plugin-less'),
  ],
  // Modify the webpack config
  config: (conf, { dev, env }, webpack) => {
    if (env === 'prod') {
      // conf = {
      //   ...conf,
      //   optimization: {
      //     ...conf.optimization,
      //     // https://webpack.js.org/plugins/split-chunks-plugin/
      //     splitChunks: {
      //       chunks: 'async',
      //       minSize: 30000,
      //       minChunks: 2,
      //       maxAsyncRequests: 5,
      //       maxInitialRequests: 3,
      //       automaticNameDelimiter: '~',
      //       name: true,
      //       cacheGroups: {
      //         vendors: {
      //           test: /[\\/]node_modules[\\/]/,
      //           priority: -10
      //         },
      //         default: {
      //           minChunks: 2,
      //           priority: -20,
      //           reuseExistingChunk: true
      //         }
      //       }
      //     }
      //   }
      // };
    }
    if (dev) {
      conf.devServer.before = (app) => {
        apiMocker(app, path.resolve('./mocker/index.js'), {
          proxy: {
            '/repos/*': 'https://api.github.com/',
          },
          changeHost: true,
        });
      };
    }
    return conf;
  },
};
