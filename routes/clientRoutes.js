const { registerRoute } = require('../libs/router')
const { homePage } = require('../controllers/clientControllers')

registerRoute('GET', '/', homePage)
