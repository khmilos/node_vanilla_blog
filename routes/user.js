const { registerRoute } = require('../libs/router')
const { loginGithub, callbackGithub } = require('../controllers/user')

registerRoute('GET', '/login/github', loginGithub)
registerRoute('GET', '/login/github/callback', callbackGithub)
