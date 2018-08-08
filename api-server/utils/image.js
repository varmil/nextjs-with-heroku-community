const reqlib = require('app-root-path').require
const nodepath = require('path')
const mkdirp = require('async-mkdirp')
const Path = reqlib('/constants/Path')
const sharp = require('sharp')

const MAX_WIDTH = 720
const MAX_HEIGHT = 720

// 投稿画像を一括して移動
const moveImages = async (files, toDir) => {
  if (Array.isArray(files)) {
    const promises = files.map(async file => {
      const { path, filename } = file
      const dbPath = `${toDir}/${filename}`
      const fullPath = `${Path.STATIC_BASE_DIR}${dbPath}`
      await moveImage(path, fullPath)
      return dbPath
    })
    return Promise.all(promises)
  } else {
    return []
  }
}

// 画像を圧縮しつつ移動させる
const moveImage = async (
  from,
  to,
  maxWidth = MAX_WIDTH,
  maxHeight = MAX_HEIGHT
) => {
  try {
    // create directories
    await mkdirp(nodepath.dirname(to))

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

module.exports = { moveImages, moveImage }
