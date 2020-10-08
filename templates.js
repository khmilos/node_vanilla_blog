const path = require('path')
const pug = require('pug')

/**
 * Contains pug templates
 */
module.exports = {
  home: pug.compileFile(path.join(process.cwd(), '/client/dist/index.pug')),
  404: pug.compileFile(path.join(process.cwd(), '/client/dist/404.pug'))
}
