/**
 * @typedef {import('http').ClientRequest} ClientRequest
 * @typedef {import('http').ServerResponse} ServerResponse
 */

const path = require('path')
const {
  sendResponse,
  sendResponseStream,
  getURLPath,
  getURLFileExtension
} = require('../utils')
const templates = require('../templates')
const staticFiles = require('../staticFiles')

/**
 * Creates rendered home page response
 * @param {ClientRequest} request
 * @param {ServerResponse} response
 */
exports.homePage = (request, response) => {
  try {
    sendResponse(response, templates.home({ articles: [] }), '.html')
  } catch (error) {
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
