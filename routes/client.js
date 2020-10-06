const { registerRoute } = require('../libs/router')
const { homePage, sendFile } = require('../controllers/client')

registerRoute('GET', '/', homePage)
registerRoute('GET', '*', sendFile)
