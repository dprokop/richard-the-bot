'use strict'

module.exports = require('./get-webpack-config')({
  reactHot: false,
  devtool: 'hidden-source-map',
  uglify: true,
  extractCss: true,
  minify: false
})
