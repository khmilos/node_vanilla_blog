exports.parseRequestBody = (request) => new Promise((resolve, reject) => {
  let body = []
  request
    .on('error', (error) => reject(error))
    .on('data', (chunk) => body.push(chunk))
    .on('end', () => {
      try {
        body = Buffer.concat(body).toString()
        body = JSON.parse(body)
        return resolve(body)
      } catch (error) {
        return reject(error)
      }
    })
})

exports.parseCookies = (request) => {
  const { cookie } = request.headers
  if (!cookie) return {}
  return cookie.split(';').reduce((result, pair) => {
    const key = pair.replace(/=.*$/g, '').trim()
    const value = pair.replace(/^.*=/g, '')
    return { ...result, [key]: decodeURI(value) }
  }, {})
}
