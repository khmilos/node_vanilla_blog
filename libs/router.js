/**
 * @typedef {import('http').ClientRequest} ClientRequest
 * @typedef {import('http').ServerResponse} ServerResponse
 */

const {
  traverse,
  combineObjects,
  getURLPath,
  sendResponseJSON,
  fail
} = require('../utils')

/**
 * Node tree of registered routes
 * @constant
 * @type {Object}
 */
const routeTree = {
  GET: {},
  POST: {},
  PUT: {},
  DELETE: {}
}

/**
 * Create new route
 * @param {String} method - request method
 * @param {String} url - route's URL
 * @param {Function} handler - endpoint handler
 */
exports.registerRoute = (method, url, handler) => {
  const route = url
    .split('/')
    .filter((segment) => segment.length > 0)
    .concat(['/'])
    .reduceRight((result, segment) => ({ [segment]: result }), handler)
  routeTree[method] = combineObjects(routeTree[method], route)
}

/**
 * Returns handler of specified request URL
 * @param {ClientRequest} request - request that transfer to handler
 * @param {ServerResponse} response - response that transfer to handler
 */
exports.listenRequest = (request, response) => {
  // Get URL path without parameters and anchors
  const { method, url } = request
  const segments = getURLPath(url)
    .split('/')
    .filter((segment) => segment.length > 0)
    .concat('/')

  // Traverse to get URL request handler
  const traversing = traverse(routeTree[method], segments)
  const { node: handler, entities } = traversing

  // If there are no handler call wildcard handler or send error response
  if (!handler) {
    if (method === 'GET' && routeTree.GET['*']) {
      return routeTree.GET['*']['/'](request, response, entities)
    }
    return sendResponseJSON(response, fail(null, 'No such route'), 404)
  }

  // If handler exists call it
  return handler(request, response, entities)
}
