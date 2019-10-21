const path = require('path');
const fs = require('fs');
const cpFile = require('cp-file');

function readDirs(dirname, onDir, onError) {
  fs.readdir(dirname, function (err, filenames) {
    if (err) {
      onError(err);
      return;
    }
    filenames.forEach(function (filename) {
      onDir(dirname + '/' + filename, filename);
    });
  });
}

(() => {
  readDirs(path.resolve('./src/static/'), async (filepath, filename) => {
    try {
      await cpFile(filepath, path.resolve(`./public/${filename}`));
      console.log('File copied: ', filepath);
    } catch (err) {
      console.error(err)
    }
  }, (err) => {
    console.error(err)
  })
})();
