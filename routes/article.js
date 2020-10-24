const { registerRoute } = require('../libs/router')
const {
  createArticleController,
  displayArticleController,
  deleteArticleController
} = require('../controllers/article')

registerRoute('GET', '/article/:id', displayArticleController)
registerRoute('POST', '/api/article', createArticleController)
registerRoute('POST', '/api/article/:id/delete', deleteArticleController)
