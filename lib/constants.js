const SITE_METADATA = {
  titleText: '<Mazipan />',
  title: 'mazipan.space',
  url: 'https://mazipan.space',
  description: 'Personal blog by @mazipan | JavaScript, CSS, Open Source, Frontend Development',
  author: {
    name: 'Irfan Maulana',
    avatar: 'https://mazipan.space/avatars/mazipan.png'
  }
}

const OG_IMAGE_HOME = `${SITE_METADATA.url}/meta/meta-image-home.jpg`
const OG_IMAGE_404 = `${SITE_METADATA.url}/meta/meta-image-404.jpg`
const OG_IMAGE_ABOUT = `${SITE_METADATA.url}/meta/meta-image-about.jpg`
const OG_IMAGE_TALKS = `${SITE_METADATA.url}/meta/meta-image-talks.jpg`

exports.SITE_METADATA = SITE_METADATA
exports.OG_IMAGE_HOME = OG_IMAGE_HOME
exports.OG_IMAGE_404 = OG_IMAGE_404
exports.OG_IMAGE_ABOUT = OG_IMAGE_ABOUT
exports.OG_IMAGE_TALKS = OG_IMAGE_TALKS
