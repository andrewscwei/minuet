// © Andrew Wei

'use strict';

const path = require('path');
const webpack = require('webpack');
const HTMLPlugin = require('html-webpack-plugin');

const libRoot = path.join(__dirname, '../../');
const baseDir = path.join(__dirname, '../');
const inputDir = path.join(baseDir, 'app');
const outputDir = path.join(baseDir, 'public');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  context: inputDir,
  entry: './index.js',
  output: {
    path: outputDir,
    filename: '[name].js',
    chunkFilename: '[chunkhash].js',
    sourceMapFilename: '[name].map'
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      options: {
        presets: ['env']
      }
    }, {
      test: /\.s?css|sass$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader',
        options: {
          sourceMap: true
        }
      }, {
        loader: 'sass-loader',
        options: {
          includePaths: [path.join(inputDir, 'stylesheets')],
          outputStyle: 'compressed',
          sourceMap: true
        }
      }]
    }, {
      test: /\.styl$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader',
        options: {
          sourceMap: true
        }
      }, {
        loader: 'stylus-loader',
        options: {
          include: path.join(inputDir, 'stylesheets'),
          includeCss: true
        }
      }]
    }, {
      test: /\.pug$/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      }, {
        loader: `pug-loader`,
        options: {
          root: inputDir
        }
      }]
    }]
  },
  resolve: {
    extensions: ['.js'],
    modules: [
      path.join(inputDir),
      path.join(baseDir, 'node_modules'),
      path.join(libRoot, 'src'),
      path.join(libRoot, 'node_modules')
    ]
  },
  plugins: [
    new HTMLPlugin({
      filename: path.join(outputDir, 'index.html'),
      template: path.join(inputDir, 'templates', 'index.pug'),
      inject: true
    })
  ]
}
