const path = require('path');
const fs = require('fs');
const cpFile = require('cp-file');

const SKIP_FILES = ['.DS_Store'];

function readDirs(dirname, onDir, onError) {
  fs.readdir(dirname, function (err, filenames) {
    if (err) {
      onError(err);
      return;
    }

    filenames
      .filter(i => !i.includes(SKIP_FILES))
      .map(function (filename) {
        const isDir = fs.statSync(dirname + '/' + filename).isDirectory();
        if (isDir) {
          readDirs(dirname + '/' + filename, onDir, onError, true)
        } else {
          onDir(dirname + '/' + filename);
        }
      });
  });
}

(() => {
  // copy static
  readDirs(path.resolve('./src/static/'), async (filepath) => {
    try {
      const destPath = filepath.replace('/src/static/', '/public/');
      await cpFile(filepath, destPath);
      console.log(`File copied to: /${destPath.split('/public/')[1]}`);
    } catch (err) {
      console.error(err)
    }
  }, (err) => {
    console.error(err)
  })

  // copy images
  readDirs(path.resolve('./src/content/images/'), async (filepath) => {
    try {
      const destPath = filepath.replace('/src/content/images/', '/public/images/');
      await cpFile(filepath, destPath);
      console.log(`File copied to: /${destPath.split('/public/images/')[1]}`);
    } catch (err) {
      console.error(err)
    }
  }, (err) => {
    console.error(err)
  })
})();

cpFile(path.resolve('./README.md'), path.resolve('./public/README.md'));
cpFile(path.resolve('./LICENSE'), path.resolve('./public/LICENSE'));
