const fs = require('fs')
const path = require('path')

exports.parseSQL = (filePath) => fs
  .readFileSync(filePath)
  .toString()
  .replace(/\n/g, ' ')
  .replace(/\s+/g, ' ')

exports.parseStaticFiles = (folderPath) => fs
  .readdirSync(folderPath)
  .reduce((result, fileName) => {
    const filePath = path.join(folderPath, fileName)
    const isFile = fs.lstatSync(filePath).isFile()
    if (!isFile) return result
    return { ...result, [fileName]: fs.readFileSync(filePath).toString() }
  }, {})
