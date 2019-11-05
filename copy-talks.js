const path = require('path');
const fs = require('fs');
const shelljs = require('shelljs');

const talks = shelljs.exec('curl https://raw.githubusercontent.com/mazipan/talks/master/all-talks.js', { silent:true }).stdout;
const pathDest = path.resolve('./src/data/all-talks.ts');
const stream = fs.createWriteStream(pathDest);

stream.once('open', function(fd) {
  stream.write(talks);
  stream.end();
});
