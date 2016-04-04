#!/usr/bin/env node

'use strict'

var fs = require('fs')
var Promise = require('promise')
var colors = require('colors')
var _ = require('underscore')

const areaNameRegex = new RegExp('^[a-zA-Z]+$')
const templatesDir = process.cwd() + '/_scripts/.templates'
const areasDir = process.cwd() + '/src/app/areas'

var areasToCreate = _.uniq(process.argv.slice(2))
var areasPromises = []

areasToCreate.forEach(function (areaName) {
  if (canCreateArea(areasDir + '/' + areaName)) {
      areasPromises.push(createAreaDirStructure(areaName))
    } else {
      areasToCreate = _.without(areasToCreate, areaName)
    }
})

Promise.all(areasPromises).then(function (results) {
  results.forEach(function (result, i) {
      console.log(colors.cyan.bold('✔  Created area: ', areasToCreate[i]))
      result.forEach(function (file) {
          console.log(colors.green('   +'), file)
        })
    })
})

function dirExists (filePath) {
  try {
      return fs.statSync(filePath).isDirectory()
    } catch (err) {
      return false
    }
}

function canCreateArea (areaName) {
  if (areaNameRegex.test(areaName.split('/').pop())) {
      if (dirExists(areaName)) {
          console.log(colors.yellow('!  Skipping', colors.bold(areaName.split('/').pop()), ', area already exists'))
          return false
        }
      return true
    } else {
      console.log(colors.red('!  Skipping', colors.bold(areaName.split('/').pop()), ', wrong name, you can use letters only'))
      return false
    }
}

function createAreaDirStructure (areaName) {
  try {
      const areaDir = areasDir + '/' + areaName
      const areaTestsDir = areasDir + '/' + areaName + '/' + 'test'
      var filePromises = []
      process.chdir(areasDir)
      fs.mkdirSync(areaName)
      fs.mkdirSync(areaName + '/test')
      filePromises.push(createFileFromTemplate(areaDir, 'actions.js', 'actions.tmpl.js', { areaName: areaName }))
      filePromises.push(createFileFromTemplate(areaDir, 'reducer.js', 'reducer.tmpl.js', { areaName: areaName }))
      filePromises.push(createFileFromTemplate(areaTestsDir, 'reducer.spec.js', 'reducer.spec.tmpl.js', { areaName: areaName }))
      process.chdir(areasDir)
      return Promise.all(filePromises)
    } catch (e) {
      return false
    }
}

function createFileFromTemplate (dir, filename, templateName, templateData) {
  return new Promise(function (resolve, reject) {
      fs.readFile(templatesDir + '/' + templateName, function (err, data) {
          var fileContent = new Buffer((_.template(data.toString()))(templateData))
          process.chdir(dir)
          fs.open(filename, 'w', function (err, fd) {
              if (err) {
                  throw 'Error opening file: ' + err
                }

              fs.write(fd, fileContent, 0, fileContent.length, null, function (err) {
                  if (err) {
                      throw 'Error writing file: ' + err
                    }
                  fs.close(fd, function () {
                      process.chdir(areasDir)
                      resolve(dir + '/' + filename)
                    })
                })
            })
        })
    })
}
