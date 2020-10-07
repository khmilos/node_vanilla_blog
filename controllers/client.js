/**
 * @typedef {import('http').ClientRequest} ClientRequest
 * @typedef {import('http').ServerResponse} ServerResponse
 */

const path = require('path')
const pug = require('pug')
const {
  readStaticDir,
  sendResponse,
  sendResponseStream,
  getURLPath
} = require('../utils')

/**
 * Contains content of client static files
 */
const staticFiles = readStaticDir(
  path.join(process.cwd(), '/client/dist'),
  ['.pug']
)

/**
 * Contains pug templates
 */
const templates = {
  home: pug.compileFile(path.join(process.cwd(), '/client/dist/index.pug')),
  404: pug.compileFile(path.join(process.cwd(), '/client/dist/404.pug'))
}

/**
 * Creates rendered home page response
 * @param {ClientRequest} request
 * @param {ServerResponse} response
 */
exports.homePage = (request, response) => {
  try {
    sendResponse(response, templates.home({ articles: [] }), '.html')
  } catch (error) {
    console.log(error)
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
      return sendResponseStream(response, staticFiles[pathURL])
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
