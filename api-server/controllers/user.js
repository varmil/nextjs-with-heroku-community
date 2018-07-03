const appRoot = require('app-root-path')
const moveFile = require('move-file')

/**
 * Profile編集
 */
exports.profile = async (req, res) => {
  console.log('[profile]body', req.body)
  console.log('[profile]file', req.file)
  const { userId, nickname } = req.body

  if (!userId || !nickname || !req.file) {
    return res.status(422).json({ error: '項目を正しく入力してください。' })
  }

  console.log(appRoot.toString())

  // TODO save images
  const { path, filename } = req.file
  const newPath = `${appRoot}/../react-web/static/img/user/icon/${filename}`
  await moveFile(path, newPath)

  res.json(true)
}
