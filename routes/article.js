const { registerRoute } = require('../libs/router')
const {
  createArticleController,
  displayArticleController
} = require('../controllers/article')

registerRoute('GET', '/article/:id', displayArticleController)
registerRoute('POST', '/api/article', createArticleController)
