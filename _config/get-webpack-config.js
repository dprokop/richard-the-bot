var path = require('path')
var fs = require('fs')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
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
  var settings = Object.assign({}, defaultOptions, options)
  var stylesETP = new ExtractTextPlugin('main.css', {allChunks: true})
  var vendorStylesETP = new ExtractTextPlugin('vendors.css', {allChunks: true})
  var envPlugin = new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(defaultOptions.env)
  })

  var jsLoaders = [
    {
      test: /\.(js|jsx)$/,
      exclude: /(node_modules)/,
      loader: settings.reactHot
        ? 'react-hot-loader!babel-loader?presets[]=react,presets[]=es2015!eslint-loader?fix=true'
        : 'babel-loader?presets[]=react,presets[]=es2015!eslint-loader'
    },
    {
      test: require.resolve('react'), loader: 'expose?React'
    },
    {
      test: require.resolve('react-dom'), loader: 'expose?ReactDOM'
    }
  ]
  var jsonLoader = [
    {
      test: /\.json$/,
      loader: 'json-loader'
    }
  ]
  var cssLoader = 'css-loader?' +
  (settings.minify ? 'minimize&importLoaders=1' : '&importLoaders=1') +
  (settings.devtool.indexOf('source-map') > -1 ? '&sourceMap' : '')

  var postcssLoader = '!postcss-loader'
  var sassLoader = '!sass-loader?sourceMap'

  var styleLoaders = [
    {
      test: /.scss$/,
      exclude: /(node_modules)/,
      loader: settings.extractCss
        ? stylesETP.extract('style-loader', cssLoader + postcssLoader + sassLoader)
        : 'style-loader!' + cssLoader + postcssLoader + sassLoader
    },
    {
      test: /(node_modules)*\.(css)$/,
      loader: settings.extractCss
        ? vendorStylesETP.extract('style-loader', cssLoader)
        : 'style-loader' + cssLoader
    }
  ]

  var plugins = (settings.extractCss ? [stylesETP, vendorStylesETP] : [])
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

    postcss: [autoprefixer({browsers: settings.autoprefixerBrowsers})],

    plugins: plugins
  }
}
