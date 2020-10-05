exports.getAnchor = (url) => {
  const match = url.match(/#[^#]*$/)
  return Array.isArray(match) ? match[0] : null
}

exports.getParameters = (url) => {
  const match = /\?([^#]*)/g.exec(url)
  if (!Array.isArray(match)) return null
  return match[1]
    .split('&')
    .map((pair) => /^\w+=\w+$/.test(pair) ? pair.split('=') : null)
    .filter((pair) => pair)
    .reduce((result, pair) => ({ ...result, [pair[0]]: pair[1] }), {})
}

exports.getPath = (url) => url.replace(/(\?|#).*$/, '')

exports.getExtension = (url) => {
  const match = this.getPath(url).match(/\.[^.]*$/)
  return Array.isArray(match) ? match[0] : null
}
