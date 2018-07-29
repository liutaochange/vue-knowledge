const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const StyleOptions = require('../stylelint.config.js')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const isDev = process.env.NODE_ENV === 'development'
const config = {
  target: 'web',
  entry: {
    app: ['babel-polyfill', path.resolve(__dirname, '../src/index.js')]
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name]-[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [path.resolve(__dirname, '../src')],
        exclude: /node_modules/,
        options: {
          formatter: require('eslint-friendly-formatter') // 指定错误报告的格式规范
        }
      },
      { test: /\.vue$/, use: 'vue-loader' },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          { loader: 'postcss-loader' }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(png|jpg|gif|jpeg|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      },
      { test: /\.jsx$/, use: 'babel-loader' }
    ]
  },
  plugins: [
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
}

if (isDev) {
  config.module.rules.push({
    test: /\.styl(us)?$/,
    use: [
      { loader: 'style-loader' },
      { loader: 'css-loader' },
      { loader: 'postcss-loader' },
      { loader: 'stylus-loader' }
    ]
  })
  config.devServer = {
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
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
} else {
  config.output.filename = '[name].[chunkhash:8].js'
  config.module.rules.push({
    test: /\.styl(us)?$/,
    use: [
      { loader: MiniCssExtractPlugin.loader, },
      { loader: 'css-loader' },
      { loader: 'postcss-loader' },
      { loader: 'stylus-loader' }
    ]
  })
  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:8].css"
    })
  )
  config.plugins.push(
    new webpack.optimize.SplitChunksPlugin({
      chunks: 'all',
      minSize: 20000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true
    })
  )
}

module.exports = config
