const uuid = require('uuid')
const path = require('path')
const db = require('../../db')
const {
  readSQLFile
} = require('../../utils')

const createArticleScript = readSQLFile(path.join(
  process.cwd(),
  '/models/article/sql/createArticle.sql'
))
const getAllArticlesScript = readSQLFile(path.join(
  process.cwd(),
  '/models/article/sql/getAllArticles.sql'
))

/**
 * Returns status of creation article query script execution
 * @param {Object} article - aritcle's object
 * @param {string} article.ownerId - id of user that creates article
 * @param {string} article.title - title of the article
 * @param {string} article.description - short description of the article that shown in the list
 * @param {string} article.content - text content of she article
 * @returns {Promise<(boolean|Error)>} represents creation query execution
 */
exports.createArticle = ({ ownerId, title, description, content }) => {
  const id = uuid.v4()
  const createdAt = Date.now()
  const params = [id, ownerId, title, description, content, createdAt]
  return new Promise((resolve, reject) => {
    db.run(createArticleScript, params, (error) => {
      if (error) return reject(error)
      resolve(true)
    })
  })
}

/**
 * Returns Promise reporesent of article list selection from database
 * @returns {Promise<(Object|Error)>} reporesents article list selection from database
 */
exports.getAllArticles = () => {
  return new Promise((resolve, reject) => {
    db.all(getAllArticlesScript, (error, rows) => {
      if (error) return reject(error)
      const articles = rows.map((row) => ({
        id: row.id,
        title: row.title,
        ownerId: row.owner_id,
        description: row.description,
        content: row.content,
        createdAt: row.created_at
      }))
      resolve(articles)
    })
  })
}
