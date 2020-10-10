const { registerRoute } = require('../libs/router')
const { createArticleController } = require('../controllers/article')

registerRoute('POST', '/api/article', createArticleController)
