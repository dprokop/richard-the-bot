#!/usr/bin/env node

'use strict'

var fs = require('fs')
var glob = require('glob')
var colors = require('colors')
var Promise = require('promise')
var _ = require('underscore')

const areasDir = process.cwd() + '/src/app/areas'
const reservedWords = [
  '[Action name]',
  '_ACTION_NAME',
  'ACTION_NAME',
  '<%= areaName %>',
  'areaName',
  '[type]'
]

glob(areasDir + '/**/*.js', {}, function (err, files) {
  Promise.all(processFiles(files)).then(function (results) {
      process.exit(logErrors(accumulateErrors(results)))
    })
})


function processFiles (files) {
  var promises = []
  _.each(files, function (file) {
      promises.push(new Promise(function (resolve, reject) {
          fs.readFile(file, function (err, data) {
              var fileLines = data.toString().split('\n')
              var errors = []
              _.each(fileLines, function (line, i) {
                  var error = checkIfLineValid(line, reservedWords)
                  if (error) {
                      errors.push({
                          path: file,
                          line: i + 1,
                          char: error.atChar,
                          phrase: error.phrase
                        })
                    }
                })
              resolve(errors)
            })
        }))
    })
  return promises
}

function logErrors (errorsDictionary) {
  if (Object.keys(errorsDictionary).length > 0) {
      _.each(Object.keys(errorsDictionary), function (key) {
          console.log(colors.underline(key))
          errorsDictionary[key].forEach(function (error) {
              console.log(error)
            })
        })
      return 1
    }
  return 0

}

function collectResults (results) {
  var errors = {}
  _.each(results, function (result) {
      if (!errors[result.path]) {
          errors[result.path] = []
        }
      errors[result.path].push(colors.gray('  ' + result.line + ':' + result.char + '\t  ') + 'template to be implemented found\t' + colors.red(result.phrase))
    })
  return errors
}

function accumulateErrors (errorsArray) {
  var errorsAccumulator = {}
  _.each(errorsArray, function (result) {
      if (result.length) {
          errorsAccumulator = Object.assign(errorsAccumulator, collectResults(result))
        }
    })

  return errorsAccumulator
}

function checkIfLineValid (line, dictionary) {
  for (var i = 0; i < dictionary.length; i++) {
      if (line.indexOf(dictionary[i]) !== -1) {
          return {
              phrase: dictionary[i],
              atChar: line.indexOf(dictionary[i])
            }
        }
    }
  return null
}

