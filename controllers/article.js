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
const { getSessionData } = require('../libs/session')

/**
 * Creates new article and redirects to profile page
 * @param {ClientRequest} request - request to process
 * @param {ServerResponse} response - response to process
 */
exports.createArticleController = async (request, response) => {
  try {
    const { session_id: sessionId } = getRequestCookie(request)
    const sessionData = getSessionData(sessionId)
    if (!sessionData?.user?.id) return sendRedirect(response, '/')

    const {
      title,
      description,
      content,
      image
    } = await getRequestMultilineData(request)
    const article = await createArticle({
      ownerId: sessionData.user.id,
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
