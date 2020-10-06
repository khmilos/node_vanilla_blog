const fs = require('fs')
const path = require('path')

exports.parseSQL = (filePath) => fs
  .readFileSync(filePath)
  .toString()
  .replace(/\n/g, ' ')
  .replace(/\s+/g, ' ')

exports.parseStaticFile = (filePath) => fs
  .readFileSync(filePath)
  .toString()

exports.parseStaticFiles = (folderPath, ignore, prefix = '') => {
  return fs
    .readdirSync(folderPath)
    .reduce((result, current) => {
      const currentPath = path.join(folderPath, current)
      const isDir = fs.lstatSync(currentPath).isDirectory()
      if (isDir) return {
        ...result,
        ...this.parseStaticFiles(
          currentPath,
          ignore,
          `/${path.relative(folderPath, currentPath)}`
        )
      }
      const extension = path.extname(current)
      if (ignore.includes(extension)) return result
      return {
        ...result,
        [`${prefix}/${current}`]: this.parseStaticFile(currentPath)
      }
    }, {})
}
