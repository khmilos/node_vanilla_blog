const http = require('http')
const { listenRequest } = require('./libs/router')

const hostname = '127.0.0.1'
const port = process.env.PORT || 5000

require('./routes/client')
require('./routes/user')

const app = http.createServer((request, response) => {
  listenRequest(request, response)
})

app.listen(port, hostname, () => {
  console.log(`Server is running on port: ${port}`)
})
