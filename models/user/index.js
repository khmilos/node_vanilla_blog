const axios = require('axios')
const path = require('path')
const db = require('../../db')
const {
  readSQLFile,
  isObjectsEqual
} = require('../../utils')

const getUserByIdScript = readSQLFile(path.join(
  process.cwd(),
  '/models/user/sql/getUserById.sql'
))
const saveUserScript = readSQLFile(path.join(
  process.cwd(),
  '/models/user/sql/saveUser.sql'
))
const updateUserScript = readSQLFile(path.join(
  process.cwd(),
  '/models/user/sql/updateUser.sql'
))

/**
 * Returns User data from the database
 * @param {string} id - user's id
 * @returns {Promise<(Object|Error)>} Represents result of select SQL script execution
 */
exports.getUserById = (id) => new Promise((resolve, reject) => {
  db.get(getUserByIdScript, id, (error, row) => {
    if (error) return reject(error)
    resolve(row)
  })
})

/**
 * Returns status of user cration script execution
 * @param {Object} user - user data
 * @param {string} user.id - user's Id
 * @param {string} user.nickname - user's name
 * @param {string} user.avatar - URL path to user's avatar
 * @returns {Promise<(boolean|Error)>} Represents status of creation script
 */
exports.saveUser = ({ id, nickname, avatar }) => {
  return new Promise((resolve, reject) => {
    db.run(saveUserScript, [id, nickname, avatar], (error) => {
      if (error) return reject(error)
      resolve(true)
    })
  })
}

/**
 * Returns status of update user's data script, where user specified by id
 * @param {Object} user - user's data
 * @param {string} user.id - user's Id
 * @param {string} user.nickname - user's name
 * @param {string} user.avatar - URL path to user's avatar
 * @returns {Promise<(boolean|Error)>} Represents status of updation script
 */
exports.updateUser = ({ id, nickname, avatar }) => {
  return new Promise((resolve, reject) => {
    db.run(updateUserScript, { id, nickname, avatar }, (error) => {
      if (error) return reject(error)
      resolve(true)
    })
  })
}

/**
 * Returns fetched user data from Google API and store in DataBase
 * @param {string} accessToken - Google API access token
 * @returns {Object} user - user's data
 */
exports.userAuthorization = async (accessToken) => {
  const { data: { id, name: nickname, picture: avatar } } = await axios
    .get(
      'https://www.googleapis.com/' +
      `oauth2/v2/userinfo?access_token=${accessToken}`
    )

  const user = { id, nickname, avatar }

  const storedUser = await this.getUserById(id)
  if (!storedUser) {
    await this.saveUser(user)
  } else if (!isObjectsEqual(user, storedUser)) {
    await this.updateUser(user)
  }

  return user
}
