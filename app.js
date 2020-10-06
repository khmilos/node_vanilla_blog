const http = require('http')
const db = require('./db')
const { listenRequest } = require('./libs/router')
const { isSqliteContains } = require('./utils/database')

const hostname = '127.0.0.1'
const port = process.env.PORT || 5000

require('./routes/client')
require('./routes/user')


http.createServer(listenRequest).listen(port, hostname, async () => {
  const tables = ['user', 'article', 'article_vote', 'comment', 'comment_vote']
  const tablesExist = await isSqliteContains(db, tables)
  if (!tablesExist) {
    console.error('ERROR: There are no requested tables in DB')
    return process.exit(1)
  }
  console.log(`Server is running on port: ${port}`)
})
