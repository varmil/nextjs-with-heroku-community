const reqlib = require('app-root-path').require
const models = reqlib('/models')
const moveFile = require('move-file')
const Path = reqlib('/constants/Path')

/**
 * 新規投稿 or 編集
 */
exports.savePost = async (req, res) => {
  console.log('[profile]body', req.body)
  console.log('[profile]file', req.files)
  const { userId, boxType, title, body } = req.body

  if (!userId || !boxType || !title || !body) {
    return res.status(422).json({ error: '項目を正しく入力してください。' })
  }

  // TODO brandIdを検証して付与

  res.json(true)
}

/**
 * 個別記事 取得
 */
exports.fetchPost = async (req, res) => {
  res.json(true)
}

exports.fetchPostList = async (req, res) => {
  res.json(true)
}
