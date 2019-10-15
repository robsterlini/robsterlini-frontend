'use strict'

// Path
const path = require('path')

// Webpack
const webpack = require('webpack')

// Plugins
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const ImageminPlugin = require('imagemin-webpack-plugin').default
const imageminMozjpeg = require('imagemin-mozjpeg')

// Extends
const config = require('./config')
const _ = require('./utils')

module.exports = {
    entry: {
        client: './client/index.js'
    },
    output: {
        path: path.join(__dirname, '../dist'),
        filename: '[name].js',
        publicPath: config.publicPath,
        // Point sourcemap entries to original disk location
        devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath),
        // Add /* filename */ comments to generated require()s in the output.
        pathinfo: true
    },
    performance: {
       hints: process.env.NODE_ENV === 'production' ? 'warning' : false
    },
    resolve: {
        extensions: [
            '.js',
            '.vue',
            '.css',
            '.json',
            '.svg',
            '.md'
        ],
        alias: {
            root: path.join(__dirname, '../client'),
            modules: path.join(__dirname, '../client/components/modules'),
            ui: path.join(__dirname, '../client/components/ui'),
            transitions: path.join(__dirname, '../client/components/transitions'),
            styleguide: path.join(__dirname, '../client/components/styleguide'),
            videos: path.join(__dirname, '../client/assets/videos'),
            images: path.join(__dirname, '../client/assets/images'),
        },
        modules: [
            _.cwd('node_modules'),
            // this means you can get rid of dot hell
            // for example import 'components/Foo' instead of import '../../components/Foo'
            _.cwd('client')
        ]
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loaders: ['vue-loader']
            },
            {
                test: /\.js$/,
                loaders: ['babel-loader'],
                exclude: [/node_modules/]
            },
            {
                test: /\.es6$/,
                loaders: ['babel-loader']
            },
            {
                test: /\.(ico|jpg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4)(\?.*)?$/,
                loader: 'file-loader',
                query: {
                    name: 'assets/[path][name].[hash:8].[ext]'
                }
            },
            {
                test: /\.svg$/,
                oneOf: [
                    {
                        resourceQuery: /inline/, // foo.svg?inline
                        loader: 'vue-svg-loader',
                    },
                    {
                        loader: 'file-loader',
                        query: {
                            name: 'assets/[path][name].[hash:8].[ext]'
                        }
                    },
                ]
            },
            {
                test: /\.s[a|c]ss$/,
                loader: 'style!css!sass'
            },
            {
              test: /\.md$/,
              loader: 'vue-markdown-loader',
              options: {
                wrapper: 'article',
              },
            },
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin(_.loadersOptions()),
        new CopyWebpackPlugin([
            {
                from: _.cwd('static/fonts'),
                to: './assets/fonts'
            },
            {
                from: _.cwd('static/root'),
                to: './'
            },
        ]),
    ],
    target: 'web'
}
