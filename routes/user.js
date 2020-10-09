const { registerRoute } = require('../libs/router')
const {
  loginGoogle,
  callbackGoogle
} = require('../controllers/user')

registerRoute('GET', '/login/google', loginGoogle)
registerRoute('GET', '/login/google/callback', callbackGoogle)
