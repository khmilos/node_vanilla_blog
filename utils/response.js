const fs = require('fs')

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

exports.success = (data, message) => ({ success: true, data, message })

exports.fail = (data, message) => ({ success: false, data, message })

exports.responseJSON = (response, data, code = 200, headers = {}) => {
  const body = JSON.stringify(data)
  response.writeHead(code, {
    'Content-Length': Buffer.byteLength(body),
    'Content-Type': mime['.json'],
    ...headers
  })
  response.write(body)
  response.end()
}

exports.responseStatic = (
  response,
  body,
  extension,
  code = 200,
  headers = {}
) => {
  const mimeType = mime[extension] || mime['.txt']
  response.writeHead(code, {
    'Content-Length': Buffer.byteLength(body),
    'Content-Type': mimeType,
    ...headers
  })
  response.write(body)
  response.end()
}

exports.responseStream = (response, filePath, extension = '.txt') => {
  const mimeType = mime[extension] || mime['.txt']
  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream(filePath)
    stream
      .on('error', (error) => reject(error))
      .on('open', () => {
        response.writeHead(200, { 'Content-Type': mimeType })
        stream.pipe(response)
      })
      .on('close', () => {
        response.end()
        resolve(true)
      })
    }
  )
}
