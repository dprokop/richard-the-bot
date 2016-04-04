'use strict'

module.exports = require('./get-webpack-config')({
  reactHot: false,
  devtool: 'inline-source-map',
  uglify: false,
  extractCss: true,
  minify: false,
  notify: true
})
