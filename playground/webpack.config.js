// (c) Andrew Wei

'use strict';

const path = require('path');
const webpack = require('webpack');

const sourceDir = path.join(__dirname, 'app');
const buildDir = path.join(__dirname, 'public');

module.exports = {
  cache: true,
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
    rules: [{
      test: /\.jsx?$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['es2015']
        }
      }
    }, {
      test: /\.s?css$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader'
      }, {
        loader: 'sass-loader',
        options: {
          includePaths: [path.join(sourceDir, 'scripts', 'stylesheets')],
          outputStyle: 'expanded',
          sourceMap: true
        }
      }]
    }, {
      test: /\.styl$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader'
      }, {
        loader: 'stylus-loader',
        options: {
          include: path.join(sourceDir, 'scripts', 'stylesheets'),
          includeCss: true
        }
      }]
    }]
  },
  resolve: {
    extensions: ['.js'],
    modules: [
      path.join(sourceDir, 'scripts'),
      path.join(__dirname, '../', 'src'),
      path.join(__dirname, '../', 'node_modules')
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true
    })
  ]
}
