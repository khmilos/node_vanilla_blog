/**
 * @typedef {import('http').ClientRequest} ClientRequest
 * @typedef {import('http').ServerResponse} ServerResponse
 */

const {
  getRequestBody,
  sendResponseJSON,
  fail,
  getFormData,
  sendRedirect,
  getRequestCookie
} = require('../utils')
const { createArticle } = require('../models/article')
const { userAuthorization } = require('../models/user')

/**
 * Creates new article and redirects to profile page
 * @param {ClientRequest} request
 * @param {ServerResponse} response
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

    const body = await getRequestBody(request)
    const article = getFormData(body)
    await createArticle({ ...article, ownerId: user.id })
    sendRedirect(response, '/profile')
  } catch (error) {
    console.log(error)
    sendResponseJSON(response, fail(null, 'creation fail'), 404)
  }
}
