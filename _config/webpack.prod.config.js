'use strict'

module.exports = require('./get-webpack-config')({
  reactHot: false,
  devtool: 'hidden-source-map',
  uglify: false,
  extractCss: true,
  minify: false
})
