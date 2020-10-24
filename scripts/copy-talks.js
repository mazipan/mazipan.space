const path = require('path')
const fs = require('fs')
const shelljs = require('shelljs')
const appRootDir = require('app-root-dir').get()

const talks = shelljs.exec('curl https://raw.githubusercontent.com/mazipan/talks/master/all-talks.js', { silent: true }).stdout
const pathDest = path.resolve(`${appRootDir}/lib/all-talks.js`)
const stream = fs.createWriteStream(pathDest)

stream.once('open', function (fd) {
  stream.write(talks)
  stream.end()
  console.log('✅ Success copied \'all-talks.js\' files')
})
