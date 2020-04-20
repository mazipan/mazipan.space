const path = require('path');
const cpFile = require('cp-file');
const appRootDir = require('app-root-dir').get();
const readDirsUtil = require('./readdirs');

const SKIP_FILES = ['.DS_Store'];

(() => {
  // copy static
  readDirsUtil.readDirs(path.resolve(`${appRootDir}/src/static/`), true, async (filepath) => {
    try {
      const destPath = filepath.replace('/src/static/', '/public/');
      await cpFile(filepath, destPath);
    } catch (err) {
      console.error(err)
    }
  }, (err) => {
    console.error(err)
  }, SKIP_FILES)

  // copy images
  readDirsUtil.readDirs(path.resolve('./src/content/images/'), true, async (filepath) => {
    try {
      const destPath = filepath.replace('/src/content/images/', '/public/images/');
      await cpFile(filepath, destPath);
    } catch (err) {
      console.error(err)
    }
  }, (err) => {
    console.error(err)
  }, SKIP_FILES)
})();

cpFile(path.resolve('./README.md'), path.resolve('./public/README.md'));
cpFile(path.resolve('./LICENSE'), path.resolve('./public/LICENSE'));
console.log(`✅ Success copied static files`);
