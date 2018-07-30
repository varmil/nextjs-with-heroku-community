const db = require('../models')
const TAG_TABLE_NAME = 'MroongaHashtags'
const POST_TABLE_NAME = 'MroongaPosts'

module.exports = {
  up: function(queryInterface, Sequelize) {
    const tagPromise = queryInterface.sequelize.query(`
      CREATE TABLE ${TAG_TABLE_NAME} (
        name VARCHAR(64) PRIMARY KEY
      )
      ENGINE=Mroonga DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin
      COMMENT='default_tokenizer "TokenDelimit"';`)

    // tagsはベクターカラムなので、独立して転置インデックスを付与する
    const postPromise = queryInterface.sequelize.query(`
      CREATE TABLE ${POST_TABLE_NAME} (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        postId INTEGER NOT NULL,
        title TEXT,
        body TEXT,
        tags TEXT COMMENT 'flags "COLUMN_VECTOR", type "${TAG_TABLE_NAME}"',

        FULLTEXT INDEX idx_tags(tags) COMMENT 'table "${TAG_TABLE_NAME}"',
        FULLTEXT INDEX idx_title_body (title, body)
      )
      ENGINE=Mroonga DEFAULT CHARSET=utf8mb4;`)

    return [tagPromise, postPromise]
  },
  down: async function(queryInterface, Sequelize) {
    // NOTE 先に依存してる方を消す！
    await queryInterface.dropTable(POST_TABLE_NAME)
    await queryInterface.dropTable(TAG_TABLE_NAME)
  }
}
