const { registerRoute } = require('../libs/router')
const { homePage, sendFile, profilePage } = require('../controllers/client')

registerRoute('GET', '/', homePage)
registerRoute('GET', '*', sendFile)
registerRoute('GET', '/profile', profilePage)
