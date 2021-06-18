/* eslint-disable import/first */
delete process.env.TS_NODE_PROJECT;

import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import webpackCommonConfig from './webpack.common';

process.env.NODE_ENV = 'production';

const config: Configuration = {
  mode: 'production',
  plugins: [new CleanWebpackPlugin()],
  optimization: {
    minimizer: [
      '...',
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
    ],
    splitChunks: {
      cacheGroups: {
        vendors: {
          maxSize: 240 * 2 ** 10, // 240Kb
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
  output: {
    chunkFilename: '[name].[fullhash:8].js',
  },
};
const webpackDevConfig = merge(webpackCommonConfig, config);

export default webpackDevConfig;
