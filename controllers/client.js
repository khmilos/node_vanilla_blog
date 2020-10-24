/**
 * @typedef {import('http').ClientRequest} ClientRequest
 * @typedef {import('http').ServerResponse} ServerResponse
 */

const path = require('path')
const {
  sendResponse,
  sendResponseStream,
  getURLPath,
  getURLFileExtension,
  getRequestCookie,
  sendRedirect
} = require('../utils')
const { getSessionData } = require('../libs/session')
const { getAllArticles } = require('../models/article')
const staticFiles = require('../staticFiles')
const templates = require('../templates')

/**
 * Sends rendered home page response
 * @param {ClientRequest} request - request to process
 * @param {ServerResponse} response - response to process
 */
exports.homePage = async (request, response) => {
  try {
    const { session_id: sessionId } = getRequestCookie(request)
    const sessionData = getSessionData(sessionId)

    const articles = (await getAllArticles()).sort((A, B) => {
      return Math.round(B.createdAt) - Math.round(A.createdAt)
    })

    sendResponse(
      response,
      templates.home({ articles, ...sessionData }),
      '.html'
    )
  } catch (error) {
    console.log(error)
    sendResponse(response, templates[404](), '.html', 404)
  }
}

/**
 * Sends rendered profile page response
 * @param {ClientRequest} request - request to process
 * @param {ServerResponse} response - response to process
 */
exports.profilePage = async (request, response) => {
  try {
    const { session_id: sessionId } = getRequestCookie(request)
    const sessionData = getSessionData(sessionId)

    if (!sessionData?.user?.id) return sendRedirect(response, '/login/google')

    const articles = (await getAllArticles()).sort((A, B) => {
      return Math.round(B.createdAt) - Math.round(A.createdAt)
    })

    sendResponse(
      response,
      templates.profile({ articles, ...sessionData }),
      '.html'
    )
  } catch (error) {
    console.log(error)
    sendResponse(response, templates[404](), '.html', 404)
  }
}

/**
 * Sends static file data or response stream to dynamic file in assets folder
 * @param {ClientRequest} request - request to process
 * @param {ServerResponse} response - response to process
 */
exports.sendFile = async (request, response) => {
  try {
    const { url } = request
    const pathURL = getURLPath(url)

    // Search through static files
    if (staticFiles[pathURL]) {
      return sendResponse(
        response,
        staticFiles[pathURL],
        getURLFileExtension(pathURL)
      )
    }

    // Search through assets folder
    if (/^\/assets\//.test(pathURL)) {
      const filePath = path.join(process.cwd(), pathURL)
      return await sendResponseStream(response, filePath)
    }

    // Throw error if file not found
    throw new Error('No such file')
  } catch (error) {
    console.log(error)
    sendResponse(response, templates[404](), '.html', 404)
  }
}
