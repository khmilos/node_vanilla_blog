const { uniteObjects } = require('../utils/common')
const { getPath, getParameters } = require('../utils/url')
const { traverse } = require('../utils/nodeTree')
const { responseJSON } = require('../utils/response')

const routeTree = {
  GET: {},
  POST: {},
  PUT: {},
  DELETE: {}
}

exports.registerRoute = (method, url, handler) => {
  const route = url
    .split('/')
    .filter((segment) => segment.length > 0)
    .concat(['/'])
    .reduceRight((result, segment) => ({ [segment]: result }), handler)
  routeTree[method] = uniteObjects(routeTree[method], route)
}

exports.listenRequest = (request, response) => {
  const { method, url } = request
  const segments = getPath(url)
    .split('/')
    .filter((segment) => segment.length > 0)
    .concat('/')

  const traversing = traverse(routeTree[method], segments)
  const { node: handler, entities } = traversing
  const parameters = getParameters(url)

  if (!handler) {
    if (method === 'GET' && routeTree.GET['*']) {
      return routeTree.GET['*']['/'](request, response, parameters, entities)
    }
    return responseJSON(response, { message: 'There are not such route' }, 404)
  }
  return handler(request, response, parameters, entities)
}
