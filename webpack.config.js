const path = require('path');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TsconfigPathsPlugin = require ('tsconfig-paths-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, 'src'),
  target: "node",

  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    plugins: [new TsconfigPathsPlugin({})]
  },

  module: {
    rules: [
        {
          test: /\.(ts|js)x?$/,
          loader: 'babel-loader',
          exclude: [/node_modules/, /^src\/server/, /^src\/browser/]
        }
    ],
  },

  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new webpack.BannerPlugin({banner: '#!/usr/bin/env node', raw: true, entryOnly: true}),
    new CopyPlugin({
      patterns: [
        { from: "package.json", to: "package.json" },
        { from: "README.md", to: "README.md" },
      ],
    }),
  ]
};
