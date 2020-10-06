const { registerRoute } = require('../libs/router')
const { loginUser, githubCallback } = require('../controllers/user')

registerRoute('GET', '/login/github', loginUser)
registerRoute('GET', '/login/github/callback', githubCallback)
