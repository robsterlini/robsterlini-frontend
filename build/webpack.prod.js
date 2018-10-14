'use strict'

// Path
const path = require('path')

// Webpack
const webpack = require('webpack')

// Plugins
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ProgressPlugin = require('webpack/lib/ProgressPlugin')
const PrerenderSpaPlugin = require('prerender-spa-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin')

// Models
const prerenderMap = require('../client/models/global/_prerender')

// Extras
const rm = require('rimraf')

// Extends
const base = require('./webpack.base')
const pkg = require('../package')
const _ = require('./utils')
const config = require('./config')

// remove dist folder in web app mode
rm.sync('dist/*')
// use source-map in web app mode
base.devtool = 'source-map'

// use hash filename to support long-term caching
base.output.filename = 'assets/[name].[chunkhash:8].js'
base.output.chunkFilename = 'assets/[name].[chunkhash:8].js'

// add webpack plugins
base.plugins.push(
  new HtmlWebpackPlugin({
    title: config.title,
    template: path.resolve(__dirname, 'index.html'),
    filename: path.join(__dirname, '../dist/index.html'),
    env: JSON.stringify(process.env.NODE_ENV),
    inject: 'head',
    chunksSortMode: 'dependency',
  }),
  new HtmlWebpackPlugin({
    title: config.title,
    template: path.resolve(__dirname, 'index.html'),
    filename: path.join(__dirname, '../dist/200.html'),
    env: JSON.stringify(process.env.NODE_ENV),
    inject: 'head',
    chunksSortMode: 'dependency',
  }),
  new ProgressPlugin(),
  new ExtractTextPlugin('assets/styles.[contenthash:8].css'),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }),
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: true,
    compress: {
      warnings: false
    },
    output: {
      comments: false
    }
  }),
  new webpack.ContextReplacementPlugin(
    /highlight\.js\/lib\/languages$/,
    new RegExp(`^./(${['javascript', 'xml', 'json'].join('|')})$`)
  ),
  // new webpack.optimize.CommonsChunkPlugin({
  //   name: 'vendor',
  //   minChunks: module => {
  //     return module.resource && /\.(js|css|es6)$/.test(module.resource) && module.resource.indexOf('node_modules') !== -1
  //   }
  // }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest'
  }),
  new BundleAnalyzerPlugin(),
  new webpack.optimize.ModuleConcatenationPlugin(),
  // new PrerenderSpaPlugin(
  //   path.join(__dirname, '../dist'),
  //   prerenderMap,
  //   {
  //     captureAfterDocumentEvent: 'custom-post-render-event',
  //     postProcessHtml: function (context) {
  //       return context.html.replace(
  //         `<div class="intro is--running">`,
  //         `<div class="intro">`
  //       )
  //     }
  //   }
  // )
);

// extract css in standalone css files
_.cssProcessors.forEach(processor => {
  let loaders
  if (processor.loader === '') {
    loaders = ['postcss-loader']
  } else {
    loaders = ['postcss-loader', processor.loader]
  }
  base.module.loaders.push({
    test: processor.test,
    loader: ExtractTextPlugin.extract({
      use: [_.cssLoader].concat(loaders),
      fallback: 'style-loader'
    })
  })
})

// minimize webpack output
base.stats = {
  // Add children information
  children: false,
  // Add chunk information (setting this to `false` allows for a less verbose output)
  chunks: false,
  // Add built modules information to chunk information
  chunkModules: false,
  chunkOrigins: false,
  modules: false
}

module.exports = base
