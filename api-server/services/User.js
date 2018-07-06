const reqlib = require('app-root-path').require
const models = reqlib('/models')
const moveFile = require('move-file')
const Path = reqlib('/constants/Path')

// import Promise from 'bluebird'
// const fs = Promise.promisifyAll(require('fs-extra'))
// const PUBLIC_ROOT_DIRECTORY = 'public'
// const PROFILE_PHOTO_DIRECTORY = '/img/profile/fcb'
// const PROFILE_PHOTO_FILENAME = 'p200x200'
// const FACEBOOK_GRAPH_API_VERSION = '2.8'
// const FACEBOOK_PICTURE_SIZE_PX = 200

module.exports = class User {
  static async updateProfileIcon(trans, userId, file) {
    let dbPath
    if (file) {
      // image path
      // save image before update DB
      const { path, filename } = file
      dbPath = `${Path.USER_ICON_DIR}/${filename}`
      const fullPath = `${Path.STATIC_BASE_DIR}${dbPath}`
      await moveFile(path, fullPath)
    } else {
      // TODO: プロフィール画像が設定されていない場合
      dbPath = 'https://www.w3schools.com/w3images/avatar4.png'
    }

    // save nickname
    await models.User.update(
      { iconPath: dbPath },
      {
        where: { id: userId }
      },
      {
        transaction: trans
      }
    )
  }

  static async updateNickname(trans, userId, nickname) {
    return models.User.update(
      { nickname },
      {
        where: { id: userId }
      },
      {
        transaction: trans
      }
    )
  }

  static async createAdmin(
    trans,
    userId,
    brandName,
    lastName,
    firstName,
    file
  ) {
    try {
      await models.User.update(
        {
          firstName,
          lastName
        },
        {
          where: { id: userId }
        },
        {
          transaction: trans
        }
      )

      const brand = await models.Brand.create(
        {
          name: brandName
        },
        {
          transaction: trans
        }
      )

      const admin = await models.Admin.create(
        {
          userId: userId
        },
        {
          transaction: trans
        }
      )

      await models.AdminBrand.create(
        {
          adminId: admin.id,
          brandId: brand.id
        },
        {
          transaction: trans
        }
      )

      await models.UserBrand.create(
        {
          userId: userId,
          brandId: brand.id
        },
        {
          transaction: trans
        }
      )

      // プロフィール画像
      await User.updateProfileIcon(trans, userId, file)
    } catch (e) {
      throw e
    }
  }
}
