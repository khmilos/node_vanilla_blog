/**
 * @typedef {import('http').ClientRequest} ClientRequest
 * @typedef {import('http').ServerResponse} ServerResponse
 */

const fs = require('fs')
const path = require('path')
const {
  sendResponse,
  sendResponseJSON,
  fail,
  getRequestMultilineData,
  getRequestCookie,
  sendRedirect
} = require('../utils')
const { createArticle, getArticleById, deleteArticle } = require('../models/article')
const { getSessionData } = require('../libs/session')
const templates = require('../templates')

/**
 * Renders article page
 * @param {ClientRequest} request - request to process
 * @param {ServerResponse} response - response to process
 * @param {Object} entities - dictionary of entities in url path
 */
exports.displayArticleController = async (request, response, entities) => {
  try {
    const { session_id: sessionId } = getRequestCookie(request)
    const sessionData = getSessionData(sessionId)

    const { id } = entities
    const article = await getArticleById(id)

    sendResponse(
      response,
      templates.article({ article, ...sessionData }),
      '.html'
    )
  } catch (error) {
    console.log(error)
    sendResponse(response, templates[404](), '.html', 404)
  }
}

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

/**
 * Deletes article
 * @param {ClientRequest} request - request to process
 * @param {ServerResponse} response - response to process
 * @param {Object} entities - dictionary of entities in url path
 */
exports.deleteArticleController = async (request, response, entities) => {
  try {
    const { session_id: sessionId } = getRequestCookie(request)
    const sessionData = getSessionData(sessionId)
    if (!sessionData?.user?.id) return sendRedirect(response, '/')

    const { id } = entities
    await deleteArticle(id)

    fs.unlinkSync(path.join(
      process.cwd(),
      '/assets/article/',
      id + '.jpg'
    ))

    sendRedirect(response, '/profile')
  } catch (error) {
    console.log(error)
    sendResponse(response, templates[404](), '.html', 404)
  }
}
