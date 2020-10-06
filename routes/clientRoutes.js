const { registerRoute } = require('../libs/router')
const { homePage, sendFile } = require('../controllers/clientControllers')

registerRoute('GET', '/', homePage)
registerRoute('GET', '*', sendFile)
