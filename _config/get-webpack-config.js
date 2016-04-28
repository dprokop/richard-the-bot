var path = require('path')
var fs = require('fs')
var webpack = require('webpack')
var WebpackNotifierPlugin = require('webpack-notifier')

var env = {
  DEV: 'development',
  PROD: 'production'
}
var defaultOptions = {
  env: process.env.NODE_ENV,
  autoprefixerBrowsers: ['last 2 versions'],
  notify: false
}

var nodeModules = {}
fs.readdirSync('node_modules')
  .filter(function (x) {
    return ['.bin'].indexOf(x) === -1
  })
  .forEach(function (mod) {
    nodeModules[mod] = 'commonjs ' + mod
  })

module.exports = function (options) {
  var plugins = []
  var settings = Object.assign({}, defaultOptions, options)
  var envPlugin = new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(defaultOptions.env)
  })

  var jsLoaders = [
    {
      test: /\.(js|jsx)$/,
      exclude: /(node_modules)/,
      loader: settings.reactHot
        ? 'babel-loader?presets[]=es2015!eslint-loader?fix=true'
        : 'babel-loader?presets[]=es2015!eslint-loader'
    }
  ]
  var jsonLoader = [
    {
      test: /\.json$/,
      loader: 'json-loader'
    }
  ]

  plugins.push(envPlugin)

  if (settings.uglify) {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      mangle: {
        except: settings.uglifyMangleExcept ? settings.uglifyMangleExcept : []
      }
    }))
  }

  if (settings.notify) {
    plugins.push(new WebpackNotifierPlugin())
  }

  return {
    entry: {
      bot: 'index.js'
    },
    target: 'node',
    eslint: {
      configFile: './.eslintrc',
      emitError: true,
      fix: true
    },

    output: {
      path: path.resolve(__dirname, '../dist/'),
      filename: '[name].bundle.js'
    },

    devtool: settings.devtool,

    module: {
      loaders: Array.prototype.concat(jsLoaders, jsonLoader)
    },

    resolve: {
      extensions: ['', '.js', '.jsx'],
      root: [path.resolve(__dirname, '../src')],
      alias: {
        areas: 'app/areas',
        common: 'app/common',
        components: 'app/components',
        services: 'app/common/services'
      }
    },
    externals: nodeModules,
    plugins: plugins
  }
}
