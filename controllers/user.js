/**
 * @typedef {import('http').ClientRequest} ClientRequest
 * @typedef {import('http').ServerResponse} ServerResponse
 */

const axios = require('axios')
const {
  // fail,
  success,
  sendResponseJSON,
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

    // Request to Google API for user data
    const { data: user } = await axios.get(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`)

    const h = { 'Set-Cookie': 'mycookie=test' }

    sendRedirect(response, '/', h)
    // sendResponseJSON(response, success(user))
  } catch (error) {
    console.log(error)
    sendResponse(response, templates[404](), '.html', 404)
  }
}

// {
//   id: '110401388113501598283',
//   name: 'Oleksandr Khmil',
//   given_name: 'Oleksandr',
//   family_name: 'Khmil',
//   picture: 'https://lh4.googleusercontent.com/-vHujaxuESU8/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnMUN0zkj0O7_CY0nbZ75VS2cU7zA/photo.jpg',
//   locale: 'ru'
// }

// /**
//  *
//  * @param {*} request
//  * @param {*} response
//  */
// exports.loginGithub = (request, response) => {
//   try {
//     const redirectURI = 'http://localhost:5000/login/github/callback'
//     const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectURI}`
//     sendRedirect(response, url)
//   } catch (error) {
//     console.log('login github', error)
//     sendResponseJSON(response, fail(null, 'login github error'), 404)
//   }
// }

// /**
//  *
//  * @param {*} request
//  * @param {*} response
//  */
// exports.callbackGithub = async (request, response) => {
//   try {
//     const { url } = request
//     const { code } = getURLParameters(url)

//     // POST request to the Github
//     const headers = { 'Content-Type': 'application/json' }
//     const body = JSON.stringify({
//       client_id: clientId,
//       client_secret: clientSecret,
//       code
//     })
//     const githubResponse = await axios.post(
//       'https://github.com/login/oauth/access_token',
//       body,
//       { headers }
//     )
//     const params = new URLSearchParams(githubResponse.data)
//     const accessToken = params.get('access_token')

//     // GET request to fetch Github user
//     const fetchedUser = await axios.get('https://api.github.com/user', {
//       headers: {
//         Authorization: 'token ' + accessToken
//       }
//     })

//     sendResponseJSON(response, success(fetchedUser.data, 'callback github success'), 200)
//   } catch (error) {
//     console.log('callback github', error)
//     sendResponseJSON(response, fail(null, 'callback github error'), 404)
//   }
// }

// clientID: 1063158587987-udbst9bdu0j5j2dbnp84m8mnggo291md.apps.googleusercontent.com
// clientSecret: -1dqWfNL9cABnw2vJPSAPc6Y
