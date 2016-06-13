// (c) Andrew Wei

'use strict';

import path from 'path';
import webpack from 'webpack';

const sourceDir = path.join(__dirname, 'app');
const buildDir = path.join(__dirname, 'public');

module.exports = {
  cache: true,
  debug: true,
  devtool: 'eval',
  context: path.join(sourceDir, 'scripts'),
  entry: {
    main: './main.js'
  },
  output: {
    path: path.join(buildDir, 'javascripts'),
    publicPath: '/javascripts/',
    filename: '[name].js',
    chunkFilename: '[chunkhash].js',
    sourceMapFilename: '[name].map'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: [
        'babel'
      ],
      exclude: /node_modules/
    }, {
      test: /\.[s]?css$/,
      loaders: [
        'style',
        'css',
        `sass?includePaths=${path.join(sourceDir, 'scripts', 'stylesheets')},outputStyle=expanded,sourceMap`
      ]
    }, {
      test: /\.styl$/,
      loaders: [
        'style',
        'css',
        `stylus?include=${path.join(sourceDir, 'scripts', 'stylesheets')},includeCss`
      ]
    }]
  },
  resolve: {
    extensions: ['', '.js'],
    root: [
      path.join(sourceDir, 'scripts')
    ],
    modulesDirectories: [
      path.join(__dirname, '../', 'dist'),
      path.join(__dirname, '../', 'src'),
      path.join(__dirname, '../', 'node_modules')
    ]
  }
}
