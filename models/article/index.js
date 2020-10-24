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
const getArticleByIdScript = readSQLFile(path.join(
  process.cwd(),
  '/models/article/sql/getArticleById.sql'
))

/**
 * Returns status of creation article query script execution
 * @param {Object} article - aritcle's object
 * @param {string} article.ownerId - id of user that creates article
 * @param {string} article.title - title of the article
 * @param {string} article.description - short description of the article that
 * shown in the list
 * @param {string} article.content - text content of she article
 * @returns {Promise<(Object|Error)>} represents creation query execution with
 * returning of created object
 */
exports.createArticle = ({ ownerId, title, description, content }) => {
  const id = uuid.v4()
  const createdAt = Date.now()
  const params = [id, ownerId, title, description, content, createdAt]
  return new Promise((resolve, reject) => {
    db.run(createArticleScript, params, (error) => {
      if (error) return reject(error)
      resolve({ id, ownerId, title, description, content, createdAt })
    })
  })
}

/**
 * Returns Promise reporesent of article list selection from database
 * @returns {Promise<(Object|Error)>} represents article list selection from
 * database
 */
exports.getAllArticles = () => {
  return new Promise((resolve, reject) => {
    db.all(getAllArticlesScript, (error, rows) => {
      if (error) return reject(error)
      const articles = rows.map((row) => ({
        id: row.id,
        image: path.join('/assets/article', row.id + '.jpg'),
        title: row.title,
        author: {
          id: row.author_id,
          nickname: row.author_nickname
        },
        description: row.description,
        content: row.content,
        createdAt: row.created_at
      }))
      resolve(articles)
    })
  })
}

/**
 * Returns Promise reporesent of article selection from database by id
 * @returns {Promise<(Object|Error)>} represents article selection from
 * database by specified id
 */
exports.getArticleById = (id) => {
  return new Promise((resolve, reject) => {
    db.get(getArticleByIdScript, id, (error, row) => {
      if (error) return reject(error)
      const article = {
        id: row.id,
        image: path.join('/assets/article', row.id + '.jpg'),
        title: row.title,
        author: {
          id: row.author_id,
          nickname: row.author_nickname,
          avatar: row.author_avatar
        },
        description: row.description,
        content: row.content,
        createdAt: row.created_at
      }
      resolve(article)
    })
  })
}
