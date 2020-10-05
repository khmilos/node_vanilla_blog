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
    'Content-Type': 'text/html',
    ...headers
  })
  response.write(body)
  response.end()
}

exports.responseCSS = (response, body, code = 200, headers) => {
  response.writeHead(code, {
    'Content-Length': Buffer.byteLength(body),
    'Content-Type': 'text/css',
    ...headers
  })
  response.write(body)
  response.end()
}

exports.responseJS = (response, body, code = 200, headers) => {
  response.writeHead(code, {
    'Content-Length': Buffer.byteLength(body),
    'Content-Type': 'text/javascript'
  })
  response.write(body)
  response.end()
}
