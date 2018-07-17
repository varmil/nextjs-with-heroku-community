const sharp = require('sharp')

const MAX_WIDTH = 720
const MAX_HEIGHT = 720

// 画像を圧縮しつつ移動させる
const moveImage = async (
  from,
  to,
  maxWidth = MAX_WIDTH,
  maxHeight = MAX_HEIGHT
) => {
  try {
    const image = sharp(from)
    const meta = await image.metadata()

    return await image
      .resize(Math.min(meta.width, maxWidth), Math.min(meta.height, maxHeight))
      // resizeの値を上限として、幅と高さ、でかいほうの値を縮小に用いる
      .max()
      .jpeg({ quality: 70, force: false })
      .png({ compressionLevel: 9, force: false })
      .toFile(to)
  } catch (e) {
    console.error('FAILED to move image', e)
  }
}

module.exports = { moveImage }
