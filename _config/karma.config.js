var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var path = require('path')
var fs = require('fs')

var nodeModules = {}

fs.readdirSync('../node_modules')
  .filter(function (x) {
    return ['.bin'].indexOf(x) === -1
  })
  .forEach(function (mod) {
    nodeModules[mod] = 'commonjs ' + mod
  })

module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    target: 'node',
    singleRun: true,
    frameworks: ['jasmine'],
    files: [
      '../node_modules/babel-polyfill/dist/polyfill.js',
      'webpack.tests.config.js'
    ],
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-sourcemap-loader',
      'karma-webpack',
      'karma-babel-preprocessor'
    ],
    preprocessors: {
      'webpack.tests.config.js': ['webpack', 'babel']
    },
    reporters: ['dots'],
    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          {
            test: /\.js$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader?presets[]=react,presets[]=es2015!eslint-loader?fix'
          },
          {
            test: /\.json$/,
            loader: 'json-loader'
          },
          {
            test: require.resolve('react'),
            loader: 'expose?React'
          }
        ]
      },
      resolve: {
        extensions: ['', '.js', '.jsx'],
        root: [path.resolve(__dirname, '..')],
        alias: {
          areas: 'app/areas',
          common: 'app/common',
          components: 'app/components',
          services: 'app/common/services'
        }
      },
      externals: nodeModules
    },
    webpackMiddleware: {
      noInfo: true
    }
  })
}
