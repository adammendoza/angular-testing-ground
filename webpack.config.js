'use strict';

const path = require('path');
const webpack =require('webpack');

module.exports = {
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },

  module: {
    rules: [
      { test: /\.ts$/, loaders: ['awesome-typescript-loader', 'angular2-template-loader'] },
      { test: /\.html$/, loader: 'raw-loader' }
    ]
  },

  plugins: [
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      path.join(process.cwd(), 'src')
    )
  ],

  devtool: 'inline-cheap-source-map'
};
