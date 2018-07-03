const reqlib = require('app-root-path').require
const models = reqlib('/models')
const moveFile = require('move-file')
const Path = reqlib('/constants/Path')

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

  // image path
  const { path, filename } = req.file
  const dbPath = `${Path.USER_ICON_DIR}/${filename}`
  const fullPath = `${Path.STATIC_BASE_DIR}${dbPath}`

  // save nickname
  await models.User.update(
    { nickname, iconPath: dbPath },
    {
      where: { id: userId }
    }
  )

  // save image after update DB
  await moveFile(path, fullPath)
  res.json(true)
}
