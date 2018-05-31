'use strict'

const path = require('path')
const webpack = require('webpack')
const HtmlPlugin = require('html-webpack-plugin')
const DashbordPlugin = require('webpack-dashboard/plugin')

const config = {
  devtool: 'source-map',
  entry: [
    'react-hot-loader/patch',
    path.resolve(__dirname, 'app', 'index.js')
  ],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name]-[hash].js',
    publicPath: '/'
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
            babelrc: true,
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.(css|scss)$/,
        exclude: /node_modules/,
        include: /app/,
        use: [
          {
            loader: 'style-loader'
          },
          { 
            loader: 'css-loader',
            options:{
              modules: true,
              sourceMap: true,
              importLoaders: 1
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(png|jpg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images/'
          }
        }
      }
    ]
  },
  resolve: {
    alias: {
      main: path.resolve(__dirname, 'app'),
      components: path.resolve(__dirname, 'app', 'components')
    },
    extensions: ['*', '.js', '.jsx', '.css']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new DashbordPlugin(),

    new HtmlPlugin({
      title: 'Github Consulting User',
      template: path.resolve(__dirname, 'app', 'html', 'template-dev.html')
    })
  ],
  devServer: {
    inline: true,
    contentBase: './public',
    hot: true,
    port: 3000,
    compress: false,
    historyApiFallback: true
  },
}

module.exports = config