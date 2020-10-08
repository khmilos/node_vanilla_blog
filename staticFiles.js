const path = require('path')
const { readStaticDir } = require('./utils')

/**
 * Contains content of client static files
 */
module.exports = readStaticDir(
  path.join(process.cwd(), '/client/dist'),
  ['.pug']
)
