/**
 * @typedef {import('http').ClientRequest} ClientRequest
 * @typedef {import('http').ServerResponse} ServerResponse
 */

const axios = require('axios')
const {
  sendRedirect,
  getURLParameters,
  combineURLParams,
  sendResponse
} = require('../utils')
const {
  googleClientId,
  googleClientSecret
} = require('../config')
const templates = require('../templates')

/**
 * Controller for first Oauth Google user authorization. Redirects user to Google login
 * @param {ClientRequest} request - request to process
 * @param {ServerResponse} response - response to process
 */
exports.loginGoogle = (request, response) => {
  try {
    const params = combineURLParams({
      client_id: googleClientId,
      redirect_uri: 'http://localhost:5000/login/google/callback',
      response_type: 'code',
      scope: 'https://www.googleapis.com/auth/plus.login'
    })
    const url = 'https://accounts.google.com/o/oauth2/v2/auth'
    sendRedirect(response, url + '?' + params)
  } catch (error) {
    console.log(error)
    sendResponse(response, templates[404](), '.html', 404)
  }
}

/**
 * Controller for Oauth Google callback
 * @param {ClientRequest} request - request to process
 * @param {ServerResponse} response - response to process
 */
exports.callbackGoogle = async (request, response) => {
  try {
    const { url } = request
    const { code } = getURLParameters(url)

    // Request to Google API for access token
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
    const data = combineURLParams({
      code,
      client_id: googleClientId,
      client_secret: googleClientSecret,
      redirect_uri: 'http://localhost:5000/login/google/callback&grant_type=authorization_code'
    })
    const { data: { access_token: accessToken } } = await axios.post(
      'https://oauth2.googleapis.com/token',
      data,
      { headers }
    )

    response.setHeader('Set-Cookie', `access_token=${accessToken}; Path=/`)
    sendRedirect(response, '/')
  } catch (error) {
    console.log(error)
    sendResponse(response, templates[404](), '.html', 404)
  }
}
