const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const StyleOptions = require('../stylelint.config.js')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const isDev = process.env.NODE_ENV === 'development'
const baseCofig = require('./webpack.config.base')
const merge = require('webpack-merge')
const defaultPlugins = [
  new HtmlWebpackPlugin({
    template: 'index.html',
    title: 'app',
    inject: true
  }),
  new CleanWebpackPlugin(['../dist']),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  new VueLoaderPlugin(),
  new StyleLintPlugin(StyleOptions)
]
const devServer = {
  open: true,
  contentBase: path.resolve(__dirname, '../dist'),
  compress: false,
  host: 'localhost',
  port: 9000,
  overlay: {
    warnings: true,
    errors: true
  },
  hot: true
}
let clientConfig
if (isDev) {
  clientConfig = merge(baseCofig, {
    module: {
      rules: [
        {
          test: /\.styl(us)?$/,
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' },
            { loader: 'postcss-loader' },
            { loader: 'stylus-loader' }
          ]
        }
      ]
    },
    devServer,
    plugins: defaultPlugins.concat([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ])
  })
} else {
  clientConfig = merge(baseCofig, {
    output: {
      filename: '[name].[chunkhash:8].js'
    },
    module: {
      rules: [
        {
          test: /\.styl(us)?$/,
          use: [
            { loader: MiniCssExtractPlugin.loader, },
            { loader: 'css-loader' },
            { loader: 'postcss-loader' },
            { loader: 'stylus-loader' }
          ]
        }
      ]
    },
    plugins: defaultPlugins.concat([
      new MiniCssExtractPlugin({
        filename: "[name].[contenthash:8].css"
      }),
      new webpack.optimize.SplitChunksPlugin({
        chunks: 'all',
        minSize: 20000,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        name: true
      })
    ])
  })
}

module.exports = clientConfig
