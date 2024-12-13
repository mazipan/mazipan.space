const path = require('path')
const fs = require('fs')
const { execSync } = require('child_process')
const appRootDir = require('app-root-dir').get()

const talks = execSync('curl https://raw.githubusercontent.com/mazipan/talks/master/all-talks.js');

const pathDest = path.resolve(`${appRootDir}/lib/all-talks.js`)
const stream = fs.createWriteStream(pathDest)

stream.once('open', function (fd) {
  stream.write(talks)
  stream.end()
  console.log('✅ Success copied \'all-talks.js\' files')
})
