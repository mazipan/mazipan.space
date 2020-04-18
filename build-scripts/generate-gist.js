const path = require('path');
const fs = require('fs');
const appRootDir = require('app-root-dir').get();
const readDirsUtil = require('./readdirs');

const SKIP_FILES = ['.DS_Store', 'images', 'author.yaml', 'tag.yaml'];

(async () => {
  const allDirs = await readDirsUtil.readDirsSync(path.resolve(`${appRootDir}/src/content/`), SKIP_FILES);
  let r = {}
  allDirs.forEach(element => {
    r = {
      ...r,
      [element]: 1
    }
  });
  try {
    await fs.writeFileSync(path.resolve(`${appRootDir}/build-scripts/blog-3-api.json`), JSON.stringify(r))
  } catch (error) {
    console.error(error);
  }
})();
