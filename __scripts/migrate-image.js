const fs = require('fs')
const { join } = require('path')
// const mkdirp = require('mkdirp')

const postsDir = join(process.cwd(), '_posts')
// const thumbnailDir = join(process.cwd(), 'public', 'thumbnail')

const allPostDir = fs.readdirSync(postsDir)

const isDirExist = (dir) => {
  try {
    fs.statSync(dir)
    return true
  } catch (error) {
    return false
  }
}

allPostDir.forEach((dir) => {
  const imageDir = join(postsDir, dir, 'images')
  const markdownId = join(postsDir, dir, 'index.md')
  const markdownEn = join(postsDir, dir, 'en/index.md')

  const isHaveEn = isDirExist(join(postsDir, dir, 'en'))

  if (isDirExist(imageDir)) {
    const allImages = fs.readdirSync(imageDir)
    const mdId = fs.readFileSync(markdownId, { encoding: 'utf8' })
    let mdEn = ''
    if (isHaveEn) {
      mdEn = fs.readFileSync(markdownEn, { encoding: 'utf8' })
    }

    let newMdId = mdId
    let newMdEn = mdEn

    allImages.forEach((imagePath) => {
      const oldPath = join(imageDir, imagePath)
      // const newPath = join(thumbnailDir, dir, imagePath)

      const newThumbnail = `/thumbnail/${dir}/${imagePath}`
      const imgPathEn = `../images/${imagePath}`
      const imgPathId = `./images/${imagePath}`

      if (newMdEn.includes(imgPathEn)) {
        const re = new RegExp(imgPathEn, 'g')
        newMdEn = newMdEn.replace(re, newThumbnail)
      }

      if (newMdId.includes(imgPathId)) {
        const re = new RegExp(imgPathId, 'g')
        newMdId = newMdId.replace(re, newThumbnail)
      }

      // copy file
      // mkdirp(join(thumbnailDir, dir)).then(() => {
      //   fs.copyFileSync(oldPath, newPath);
      // });

      // remove file
      fs.unlinkSync(oldPath)
    })

    // fs.writeFileSync(markdownId, newMdId);
    // if (isHaveEn) {
    //   fs.writeFileSync(markdownEn, newMdEn);
    // }
  }
})
