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
  getRequestCookie
} = require('../utils')
const templates = require('../templates')
const staticFiles = require('../staticFiles')
const { userAuthorization } = require('../models/user')

/**
 * Creates rendered home page response
 * @param {ClientRequest} request
 * @param {ServerResponse} response
 */
exports.homePage = async (request, response) => {
  try {
    const { access_token: accessToken } = getRequestCookie(request)
    const user = accessToken ? await userAuthorization(accessToken) : null
    sendResponse(response, templates.home({ articles: [], user }), '.html')
  } catch (error) {
    console.log(error)
    sendResponse(response, templates[404](), '.html', 404)
  }
}

/**
 * Creates static file response
 * @param {ClientRequest} request
 * @param {ServerResponse} response
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
