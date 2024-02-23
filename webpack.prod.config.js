const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: ['./main.js'],
  mode: 'production',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
    clean: true,
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
    new MiniCssExtractPlugin({filename: 'style.css'}),
  ],
};
