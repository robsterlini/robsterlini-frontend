'use strict'

// Path
const path = require('path')

// Webpack
const webpack = require('webpack')

// Plugins
const FriendlyErrors = require('friendly-errors-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// Extends
const base = require('./webpack.base')
const _ = require('./utils')
const config = require('./config')

base.devtool = 'eval-source-map'

base.plugins.push(
  new HtmlWebpackPlugin({
    title: config.title,
    template: path.resolve(__dirname, 'index.html'),
    filename: path.join(__dirname, '../dist/index.html'),
    env: 'development',
    inject: 'head',
    chunksSortMode: 'dependency',
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development')
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new FriendlyErrors()
)

// push loader for css files
_.cssProcessors.forEach(processor => {
  let loaders
  if (processor.loader === '') {
    loaders = ['postcss-loader']
  } else {
    loaders = ['postcss-loader', processor.loader]
  }
  base.module.loaders.push(
    {
      test: processor.test,
      loaders: ['style-loader', _.cssLoader].concat(loaders)
    }
  )
})

module.exports = base
