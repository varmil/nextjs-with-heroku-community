/**
 * Profile編集
 */
exports.profile = function(req, res) {
  console.log('[profile]body', req.body)
  console.log('[profile]file', req.file)
  res.json(true)
}
