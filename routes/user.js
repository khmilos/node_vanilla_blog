const { registerRoute } = require('../libs/router')
const {
  // loginGithub,
  // callbackGithub,
  loginGoogle,
  callbackGoogle
} = require('../controllers/user')

// registerRoute('GET', '/login/github', loginGithub)
// registerRoute('GET', '/login/github/callback', callbackGithub)
registerRoute('GET', '/login/google', loginGoogle)
registerRoute('GET', '/login/google/callback', callbackGoogle)
