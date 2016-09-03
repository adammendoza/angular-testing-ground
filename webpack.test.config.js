'use strict';
let path = require('path');

module.exports = {
  resolve: {
    root: [ path.join(__dirname, 'src') ],
    extensions: ['', '.ts', '.js']
  },

  module: {
    loaders: [
      { test: /\.ts$/, loaders: ['ts'] },
      { test: /\.html$/, loader: 'raw' }
    ]
  },

  devtool: 'inline-cheap-source-map'
};
