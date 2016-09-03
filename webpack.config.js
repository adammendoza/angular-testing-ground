'use strict';
let webpack = require('webpack');
let path = require('path');

module.exports = {
  entry: {
    'polyfill': './src/polyfill.ts',
    'vendor': './src/vendor.ts',
    'main': './src/main.ts',
  },

  output: {
    path: './dist',
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  },

  resolve: {
    root: [ path.join(__dirname, 'src') ],
    extensions: ['', '.ts', '.js']
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin({ name: ['main', 'vendor', 'polyfill'], minChunks: Infinity }),
  ],

  module: {
    loaders: [
      { test: /\.ts$/, loaders: ['ts'] },
      { test: /\.html$/, loader: 'raw' }
    ]
  },

  devServer: {
    watchOptions: { aggregateTimeout: 300, poll: 500 }
  },

  devtool: 'cheap-module-source-map'
};
