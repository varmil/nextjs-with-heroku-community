const sharp = require('sharp')

const MAX_WIDTH = 720

// 画像を圧縮しつつ移動させる
const moveImage = async (from, to, maxWidth = MAX_WIDTH) => {
  try {
    return await sharp(from)
      .resize(maxWidth)
      .min()
      .jpeg({ quality: 70, force: false })
      .png({ compressionLevel: 9, force: false })
      .toFile(to)
  } catch (e) {
    console.error('FAILED to move image', e)
  }
}

module.exports = { moveImage }
