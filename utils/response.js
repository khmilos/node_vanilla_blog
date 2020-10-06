const fs = require('fs')

const mime = {
  html: 'text/html',
  txt: 'text/plain',
  css: 'text/css',
  gif: 'image/gif',
  jpg: 'image/jpeg',
  png: 'image/png',
  svg: 'image/svg+xml',
  js: 'application/javascript'
}

exports.responseJSON = (response, body, code = 200, headers = {}) => {
  const data = JSON.stringify(body)
  response.writeHead(code, {
    'Content-Length': Buffer.byteLength(data),
    'Content-Type': 'application/json',
    ...headers
  })
  response.write(data)
  response.end()
}

exports.responseHTML = (response, body, code = 200, headers = {}) => {
  response.writeHead(code, {
    'Content-Length': Buffer.byteLength(body),
    'Content-Type': mime.html,
    ...headers
  })
  response.write(body)
  response.end()
}

exports.responseCSS = (response, body, code = 200, headers) => {
  response.writeHead(code, {
    'Content-Length': Buffer.byteLength(body),
    'Content-Type': mime.css,
    ...headers
  })
  response.write(body)
  response.end()
}

exports.responseJS = (response, body, code = 200, headers) => {
  response.writeHead(code, {
    'Content-Length': Buffer.byteLength(body),
    'Content-Type': mime.js
  })
  response.write(body)
  response.end()
}

exports.responseStream = (response, filePath, extension = 'txt') => {
  const mimeType = mime[extension] || mime.txt
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
        return resolve(true)
      })
    }
  )
}
