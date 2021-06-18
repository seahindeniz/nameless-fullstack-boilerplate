import CopyPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import { Configuration } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const webpackCommonConfig: Configuration = {
  entry: './src/index.tsx',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    plugins: [new TsconfigPathsPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.(?:s[ac]|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 1 } },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  'postcss-preset-env',
                  ['tailwindcss', { config: './tailwind.config.ts' }],
                  'autoprefixer',
                ],
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        issuer: /\.[tj]sx?$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        // https://regex101.com/r/gKqUIc/2
        issuer: /^(?!.*\.[tj]sx?$).*$/,
        loader: 'url-loader',
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
        exclude: /dist/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.[fullhash:8].css',
      chunkFilename: 'styles.[fullhash:8].css',
    }),
    new CopyPlugin({
      patterns: [
        {
          context: './public/',
          from: '**/*',
          globOptions: {
            ignore: ['**/index.html'],
          },
        },
      ],
    }),
  ],
  output: {
    path: path.join(__dirname, '/dist'),
    // path: path.resolve('./dist'),
    filename: '[name].[fullhash:8].js',
    publicPath: '/',
  },
};

export default webpackCommonConfig;
