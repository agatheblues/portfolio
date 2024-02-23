const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: ['./main.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
  },
  devServer: {
    devMiddleware: {writeToDisk : true},
    hot: true,
    static: {
      directory: path.resolve(__dirname, './static'),
      publicPath: '/static',
    },
  },
  module: {
    rules: [
      {
        test: /\.(?:js|jsx|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {targets: 'defaults'}],
              ['@babel/preset-react', {targets: 'defaults'}],
            ],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader', // Translates CSS into CommonJS.
          'sass-loader', // Compiles SCSS to CSS.
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({template: 'index.html'}),
    new ESLintPlugin(),
    new MiniCssExtractPlugin({filename: 'style.css'}),
  ],
};
