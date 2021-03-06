/**
 * @typedef {import('http').ClientRequest} ClientRequest
 * @typedef {import('http').ServerResponse} ServerResponse
 */

const fs = require('fs')
const path = require('path')
const Busboy = require('busboy')

/**
 * Contains dictionary object of mime types
 * @constant
 * @type {Object}
 */
const mime = {
  '.html': 'text/html',
  '.txt': 'text/plain',
  '.css': 'text/css',
  '.gif': 'image/gif',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.ico': 'image/vnd.microsoft.icon'
}

/**
 * Returns recursively combined object
 * @param {Object} A - first object
 * @param {Object} B - second object
 * @returns {Object} combined object
 */
exports.combineObjects = (A, B) => {
  return Object.keys({ ...A, ...B })
    .reduce((result, key) => {
      if (!A[key] || !B[key]) return { ...result, [key]: (A[key] || B[key]) }
      return { ...result, [key]: this.combineObjects(A[key], B[key]) }
    }, {})
}

/**
 * Returns recursively compared objects content and keys
 * @param {Object} A - first object
 * @param {Object} B - second object
 * @returns {boolean} compare result
 */
exports.isObjectsEqual = (A, B) => {
  const keysA = Object.keys(A)
  const keysB = Object.keys(B)

  if (!this.isArraysEqual(keysA, keysB)) return false
  return keysA.reduce((result, key) => {
    if (typeof A[key] === 'object' && typeof B[key] === 'object') {
      return this.isObjectsEqual(A[key], B[key]) ? result : false
    }
    return A[key] === B[key] ? result : false
  }, true)
}

/**
 * Returns result of two arrays comparison without regard to the sequence of elements
 * @param {Array} A - first array
 * @param {Array} B - second array
 * @returns {boolean} comparison result
 */
exports.isArraysEqual = (A, B) => {
  if (A.length !== B.length) return false
  const sortedA = A.sort()
  const sortedB = B.sort()
  return sortedA.reduce((result, _, index) => {
    return sortedA[index] === sortedB[index] ? result : false
  }, true)
}

/**
 * Traverse through Routes Node Tree by specified path
 * @param {(Object|any)} node - current node
 * @param {Array} nodePathes - path to traverse
 * @param {Object} [entities]  - entities values in path segments
 * @returns {{ node: Object, entities: Object }} node represents traverse result and entities represents collected data in path segments
 */
exports.traverse = (node, nodePathes, entities = {}) => {
  // If path is ended returns node content and collected entities
  if (nodePathes.length === 0) return { node, entities }

  // If node contains next path segment then continue traverse
  if (node[nodePathes[0]]) {
    const newNode = node[nodePathes[0]]
    const newNodePathes = nodePathes.filter((_, i) => i !== 0)
    return this.traverse(newNode, newNodePathes, entities)
  }

  // Check existence of entities in node
  const entitiesKeys = Object.keys(node).filter((key) => /^:.*$/.test(key))
  if (entitiesKeys.length < 0) return { node: null, entities: null }

  // Continue traverse with each entity of node as segment
  const newNodePathes = nodePathes.filter((_, i) => i !== 0)
  const subtrees = entitiesKeys
    .map((key) => {
      const newNode = node[key]
      const newEntities = { ...entities, [key.replace(':', '')]: nodePathes[0] }
      return this.traverse(newNode, newNodePathes, newEntities)
    })
    .filter((subtree) => subtree.node !== null)

  // If each entity traverse returns null than return failed traverse
  if (subtrees.length === 0) return { node: null, entities: null }

  // If there are at least one success entity traverse than return first
  return subtrees[0]
}

/**
 * Return the content of the specified SQL file synchronously reading
 * @param {string} filePath - path to SQL file
 * @returns {string} SQL file content
 */
exports.readSQLFile = (filePath) => {
  return fs
    .readFileSync(filePath)
    .toString()
    .replace(/\n/g, ' ')
    .replace(/\s+/g, ' ')
}

/**
 * Returns the content of the specified file synchronously reading
 * @param {string} filePath - path to static file
 * @returns {string} file content
 */
exports.readStaticFile = (filePath) => {
  return fs.readFileSync(filePath).toString()
}

/**
 * Returns the content of directory's files by synchronous reading
 * @param {string} dirPath - path to directory
 * @param {Array} ignoreExtension - extensions to ignore
 * @param {string} [prefix] - prefix of result's keys
 * @returns {Object} dictionary whith path to file as key and file content as value
 */
exports.readStaticDir = (dirPath, ignoreExtension, prefix = '') => {
  return fs.readdirSync(dirPath)
    .reduce((result, target) => {
      const targetPath = path.join(dirPath, target)

      // If it is a directory, then recursively process its contents
      const isDir = fs.lstatSync(targetPath).isDirectory()
      if (isDir) {
        const newPrefix = '/' + path.relative(dirPath, targetPath)
        return {
          ...result,
          ...this.readStaticDir(targetPath, ignoreExtension, newPrefix)
        }
      }

      // If it's extension is ignored then skip reading
      const extension = path.extname(target)
      if (ignoreExtension.includes(extension)) return result
      return {
        ...result,
        [prefix + '/' + target]: this.readStaticFile(targetPath)
      }
    }, {})
}

/**
 * Rerturns URL path without anchor and parameters
 * @param {string} url - URL to process
 * @returns {string} URL path without anchor and parameters
 */
exports.getURLPath = (url) => url.replace(/(\?|#).*$/, '')

/**
 * Returns anchor of URL if exists and null if not
 * @param {string} url - URL to process
 * @returns {(string|null)} anchor of URL
 */
exports.getURLAnchor = (url) => {
  const match = url.match(/#[^#]*$/)
  return Array.isArray(match) ? match[0] : null
}

/**
 * Returns the parameters of URL
 * @param {string} url - URL to process
 * @returns {Object} dictionary of parameters
 */
exports.getURLParameters = (url) => {
  const match = /\?([^#]*)/g.exec(url)
  if (!Array.isArray(match)) return null
  return match[1]
    .split('&')
    .map((pair) => /=/g.test(pair) ? pair.split('=') : null)
    .filter((pair) => pair)
    .reduce((result, pair) => {
      return { ...result, [pair[0]]: pair[1] }
    }, {})
}

/**
 * Returns extension of requested file in URL
 * @param {string} url - URL to process
 * @returns {(string|null)} extension if exists and null if not
 */
exports.getURLFileExtension = (url) => {
  const match = this.getURLPath(url).match(/\.[^.]*$/)
  return Array.isArray(match) ? match[0] : null
}

/**
 * Returns combination of params to URL friendly
 * @param {Object} params - parameters to add to URL
 * @returns {string} reporesents combined params
 */
exports.combineURLParams = (params) => {
  return Object.entries(params)
    .map((param) => param[0] + '=' + param[1]).join('&')
}

/**
 * Returns JSON data as specified response structure with success status
 * @param {Object} data - JSON data
 * @param {string} message - response message
 * @returns {{ success: boolean, data: Object, message: string }}
 */
exports.success = (data, message = '') => ({ success: true, data, message })

/**
 * Returns JSON data as specified response structure with error status
 * @param {Object} data - JSON data
 * @param {string} message - response message
 * @returns {{ success: boolean, data: Object, message: string }}
 */
exports.fail = (data, message) => ({ success: false, data, message })

/**
 * Create response with specified parameters and specified body type
 * @param {ServerResponse} response - response to process
 * @param {string} body - data of the body
 * @param {string} extension - type of the data
 * @param {number} [code] - response code status
 * @param {Object} [headers] - headers of the response
 */
exports.sendResponse = (
  response,
  body,
  extension,
  code = 200,
  headers = {}
) => {
  const mimeType = mime[extension] || mime['.txt']
  response.statusCode = code
  response.setHeader('Content-Length', Buffer.byteLength(body))
  response.setHeader('Content-Type', mimeType)
  response.write(body)
  response.end()
}

/**
 * Create response with specified parameters and JSON body
 * @param {ServerResponse} response - response to process
 * @param {Object} body - data of the body
 * @param {number} [code] - response code status
 * @param {Object} [headers] - headers of the response
 */
exports.sendResponseJSON = (response, body, code = 200, headers = {}) => {
  const bodyString = JSON.stringify(body)
  response.statusCode = code
  response.setHeader('Content-Length', Buffer.byteLength(bodyString))
  response.setHeader('Content-Type', mime['.json'])
  response.write(bodyString)
  response.end()
}

/**
 * Returns promise with read stream of specified file
 * @param {ServerResponse} response - response to process
 * @param {string} filePath - path to file to read
 * @returns {Promise<(boolean|Error)>} Promise object represents status of Stream prcoess
 */
exports.sendResponseStream = (response, filePath) => {
  const mimeType = mime[path.extname(filePath)] || mime['.txt']

  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream(filePath)
    stream
      .on('error', (error) => reject(error))
      .on('open', () => {
        response.statusCode = 200
        response.setHeader('Content-Type', mimeType)
        stream.pipe(response)
      })
      .on('close', () => {
        response.end()
        resolve(true)
      })
  })
}

/**
 * Create redirect response to specified URL
 * @param {ServerResponse} response - response to process
 * @param {string} url - URL to redirect
 * @param {Object} headers - response headers
 */
exports.sendRedirect = (response, url, headers = {}) => {
  response.statusCode = 302
  response.setHeader('Location', url)
  response.end()
}

/**
 * Returns Promise with parsing request body
 * @param {ClientRequest} request - request to process
 * @returns {Promise<(string|Error)>} Promise object represents status of reading request body
 */
exports.getRequestBody = (request) => {
  const body = []
  return new Promise((resolve, reject) => {
    request
      .on('error', (error) => reject(error))
      .on('data', (chunk) => body.push(chunk))
      .on('end', () => resolve(body.toString()))
  })
}

/**
 * Retruns Dictionary Object that represents Cookies
 * @param {ClientRequest} request - request to process
 * @returns {Object} Cookies Dictionary Object
 */
exports.getRequestCookie = (request) => {
  const { cookie } = request.headers
  if (!cookie) return {}
  return cookie.split(';').reduce((result, pair) => {
    const key = pair.replace(/=.*$/g, '').trim()
    const value = pair.replace(/^.*=/g, '')
    return { ...result, [key]: decodeURI(value) }
  }, {})
}

/**
 * Returns Promise that reporesents multiline request data
 * @param {ClientRequest} request - request to process
 * @returns {Promise<(Object| Error)>} reporesent multiline request's data
 */
exports.getRequestMultilineData = (request) => {
  return new Promise((resolve, reject) => {
    const result = {}
    const busboy = new Busboy({ headers: request.headers })
    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      const fileData = []
      file.on('data', (data) => fileData.push(data))
      file.on('end', () => { result[fieldname] = Buffer.concat(fileData) })
    })
    busboy.on('field', (fieldname, value) => {
      result[fieldname] = value
    })
    busboy.on('finish', () => {
      resolve(result)
    })
    busboy.on('error', (error) => reject(error))
    request.pipe(busboy)
  })
}

/**
 * Returns object dictionary that represents parsed form's data
 * @param {string} data - form's data to process
 * @returns {Object} parsed to object dictionary form's data
 */
exports.getFormData = (data) => {
  return data.split('&')
    .reduce((result, pair) => ({
      ...result,
      [pair.replace(/=.*$/g, '').trim()]: pair.replace(/^.*=/g, '').trim()
    }), {})
}
