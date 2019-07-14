const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');

const libRoot = path.join(__dirname, '../../');
const baseDir = path.join(__dirname, '../');
const inputDir = path.join(baseDir, 'app');
const outputDir = path.join(baseDir, 'public');

module.exports = {
  mode: 'development',
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
        presets: ['@babel/preset-env']
      }
    }, {
      test: /\.scss|sass$/,
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
      test: /\.pug$/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }, {
        loader: 'pug-loader',
        options: {
          root: inputDir
        }
      }]
    }]
  },
  resolve: {
    extensions: ['.js', '.scss', '.sass'],
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
};
