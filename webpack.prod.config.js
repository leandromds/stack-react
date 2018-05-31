'use strict'

const path = require('path')
const webpack = require('webpack')
const HtmlPlugin = require('html-webpack-plugin')
const extractTextPlugin = require('extract-text-webpack-plugin')
const criticalRenderingPath = new extractTextPlugin('crp.css')
const cssModules = new extractTextPlugin('[name]-[hash].css')

const config = {
  entry: path.resolve(__dirname, 'app', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name]-[hash].js'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        include: /app/,
        use: {
          loader: 'standard-loader',
        }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: /app/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: true
          }
        }
      },
      {
        test: /\.(css|scss)$/,
        exclude: /node_modules/,
        include: /app/,
        use: criticalRenderingPath.extract({
          fallback: 'style-loader',
          use: {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        })
      },
      {
        test: /\.(css|scss)$/,
        exclude: /node_modules/,
        include: /app/,
        use: cssModules.extract({
          fallback: 'style-loader',
          use: {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        })
      },
      {
        test: /\.(png|jpg)$/,
        exclude: /node_modules/,
        include: /app/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images/'
          }
        },
      }
    ]
  },
  resolve: {
    alias: {
      main: path.resolve(__dirname, 'app'),
      components: path.resolve(__dirname, 'app', 'components')
    },
    extensions: ['*', '.js', '.jsx', 'css']
  },
  plugins: [
    criticalRenderingPath,
    cssModules,

    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV' : '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlPlugin({
      title: 'Github Consulting User',
      inject: false,
      template: path.resolve(__dirname, 'app', 'html', 'template.html')
    })
  ]
}

module.exports = config