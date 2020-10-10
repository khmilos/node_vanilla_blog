/**
 * @typedef {import('http').ClientRequest} ClientRequest
 * @typedef {import('http').ServerResponse} ServerResponse
 */

const fs = require('fs')
const path = require('path')
const {
  sendResponseJSON,
  fail,
  getRequestMultilineData,
  getRequestCookie,
  sendRedirect
} = require('../utils')
const { createArticle } = require('../models/article')
const { userAuthorization } = require('../models/user')

/**
 * Creates new article and redirects to profile page
 * @param {ClientRequest} request - request to process
 * @param {ServerResponse} response - response to process
 */
exports.createArticleController = async (request, response) => {
  try {
    const { access_token: accessToken } = getRequestCookie(request)
    let user = null
    try {
      user = accessToken ? await userAuthorization(accessToken) : null
    } catch (error) {
      response.setHeader(
        'Set-Cookie',
        'access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
      )
    }

    const {
      title,
      description,
      content,
      image
    } = await getRequestMultilineData(request)
    const article = await createArticle({
      ownerId: user.id,
      title,
      description,
      content
    })

    fs.appendFileSync(
      path.join(process.cwd(), '/assets/article/', article.id + '.jpg'),
      image
    )

    sendRedirect(response, '/profile')
  } catch (error) {
    console.log(error)
    sendResponseJSON(response, fail(null, 'creation fail'), 404)
  }
}
