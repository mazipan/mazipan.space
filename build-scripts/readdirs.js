const fs = require('fs');

const isSkipFiles = (filename, skipFiles) => {
  if (skipFiles) {
    const e = skipFiles.find(f => f.trim().toLowerCase() === filename.trim().toLowerCase());
    return Boolean(e);
  }
  return false;
}

const readDirs = (dirname, isRecursive, onFile, onError, skipFiles) => {
  fs.readdir(dirname, function (err, filenames) {
    if (err) {
      onError(err);
      return;
    }

    filenames
      .filter(filename => !isSkipFiles(filename, skipFiles))
      .map(function (filename) {
        const isDir = fs.statSync(dirname + '/' + filename).isDirectory();
        if (isRecursive) {
          if (isDir) {
            readDirs(dirname + '/' + filename, true, onFile, onError, skipFiles)
          } else {
            onFile(dirname + '/' + filename);
          }
        } else {
          onFile(dirname + '/' + filename);
        }
      });
  });
}

const readDirsSync = async (dirname, skipFiles) => {
  const dirs = await fs.readdirSync(dirname)
  return dirs.filter(filename => !isSkipFiles(filename, skipFiles));
}

module.exports = {
  readDirs,
  readDirsSync
};
