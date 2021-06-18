import { merge } from 'webpack-merge';
import webpackCommonConfig from './webpack.common';

const webpackDevConfig = merge(webpackCommonConfig, {
  devtool: 'eval-source-map',
  mode: 'development',
  devServer: {
    historyApiFallback: true,
  },
});

export default webpackDevConfig;
