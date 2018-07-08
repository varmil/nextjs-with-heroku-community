const reqlib = require('app-root-path').require
const models = reqlib('/models')
const moveFile = require('move-file')
const Path = reqlib('/constants/Path')
const Role = reqlib('/constants/Role')

// import Promise from 'bluebird'
// const fs = Promise.promisifyAll(require('fs-extra'))
// const PUBLIC_ROOT_DIRECTORY = 'public'
// const PROFILE_PHOTO_DIRECTORY = '/img/profile/fcb'
// const PROFILE_PHOTO_FILENAME = 'p200x200'
// const FACEBOOK_GRAPH_API_VERSION = '2.8'
// const FACEBOOK_PICTURE_SIZE_PX = 200

const DEFAULT_ICON_PATH = 'https://www.w3schools.com/w3images/avatar4.png'

module.exports = class User {
  // { <id>: name, ... } というObjectを返す
  static async idToName(ids) {
    const names = await models.User.findAll({
      attributes: ['id', 'nickname', 'lastName', 'firstName'],
      where: { id: ids },
      raw: true
    })
    return names.reduce((acc, cur) => {
      let name = ''
      if (cur.nickname) name = cur.nickname
      else name = `${cur.lastName} ${cur.firstName}`
      return {
        ...acc,
        [cur.id]: name
      }
    }, {})
  }

  static async moveProfileIcon(file) {
    let dbPath
    if (file) {
      // image path
      const { path, filename } = file
      dbPath = `${Path.USER_ICON_DIR}/${filename}`
      const fullPath = `${Path.STATIC_BASE_DIR}${dbPath}`
      await moveFile(path, fullPath)
    } else {
      // TODO: プロフィール画像が設定されていない場合
    }
    return dbPath
  }

  static async updateProfile(userId, nickname, file, fromServerFiles) {
    try {
      let dbPath = await User.moveProfileIcon(file)
      if (!dbPath) {
        if (fromServerFiles && fromServerFiles.length > 0) {
          dbPath = fromServerFiles[0]
        } else {
          dbPath = DEFAULT_ICON_PATH
        }
      }

      await models.User.update(
        { nickname, iconPath: dbPath },
        {
          where: { id: userId }
        }
      )
    } catch (e) {
      throw e
    }
  }

  static async createNormalUser(email, password, brandId) {
    const trans = await models.sequelize.transaction()
    try {
      const user = await models.User.create(
        {
          email,
          passwordHash: await models.User.generateHash(password),
          roleId: Role.User.NORMAL
        },
        {
          transaction: trans
        }
      )

      await models.UserBrand.create(
        {
          userId: user.id,
          brandId
        },
        {
          transaction: trans
        }
      )
      trans.commit()
      return user
    } catch (e) {
      trans.rollback()
      throw e
    }
  }

  static async createAdmin(
    email,
    password,
    brandName,
    lastName,
    firstName,
    file
  ) {
    const trans = await models.sequelize.transaction()
    try {
      // プロフィール画像
      const dbPath = await User.moveProfileIcon(file)

      const user = await models.User.create(
        {
          email,
          passwordHash: await models.User.generateHash(password),
          roleId: Role.User.ADMIN_SUPER,
          lastName,
          firstName,
          iconPath: dbPath
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
          userId: user.id
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
          userId: user.id,
          brandId: brand.id
        },
        {
          transaction: trans
        }
      )
      trans.commit()
      return user
    } catch (e) {
      trans.rollback()
      throw e
    }
  }

  static async fetchBrand(userId) {
    try {
      const { brandId } = await models.UserBrand.findOne(
        { where: { userId } },
        { raw: true }
      )
      if (!brandId) return null

      const brand = await models.Brand.findById(brandId, {
        attributes: ['id', 'name'],
        raw: true
      })
      return brand
    } catch (e) {
      console.error(e)
      return null
    }
  }
}
