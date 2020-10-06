const { registerRoute } = require('../libs/router')
const { homePage, sendClient } = require('../controllers/clientControllers')

registerRoute('GET', '/', homePage)
registerRoute('GET', '*', sendClient)
