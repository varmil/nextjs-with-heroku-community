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

  if (!userId || !nickname) {
    return res.status(422).json({ error: '項目を正しく入力してください。' })
  }

  let dbPath
  if (req.file) {
    // image path
    // save image before update DB
    const { path, filename } = req.file
    dbPath = `${Path.USER_ICON_DIR}/${filename}`
    const fullPath = `${Path.STATIC_BASE_DIR}${dbPath}`
    await moveFile(path, fullPath)
  } else {
    // TODO: プロフィール画像が設定されていない場合
    dbPath = 'https://www.w3schools.com/w3images/avatar4.png'
  }

  // save nickname
  await models.User.update(
    { nickname, iconPath: dbPath },
    {
      where: { id: userId }
    }
  )

  res.json(true)
}
