const path = require('path')
const fs = require('fs')
const pug = require('pug')
const {
  responseStatic,
  responseStream,
  responseJSON,
  success,
  fail
} = require('../utils/response')
const { getPath, getExtension } = require('../utils/url')

const homePug = pug.compileFile(
  path.join(__dirname, '../client/dist/index.pug')
)

const articles = [
  { 
    id: 1,
    owner: {
      id: 1,
      nickname: 'John Doe',
    },
    title: 'TITLE',
    subtitle: 'SHORT_DESC',
    creationDate: '24 December 2020',
    image: '/assets/article/1.jpg',
  },
]

exports.sendClient = async (request, response) => {
  try {
    const { url } = request
    const extension = getExtension(url)
    if (!extension) throw new Error('No extension')

    const filePath = path.join(process.cwd(), getPath(url))
    responseStream(response, filePath, extension)
  } catch (error) {
    console.log(error)
    responseJSON(response, fail(null, 'No file'), 404)
  }
}

exports.homePage = (request, response) => {
  try {
    responseStatic(response, homePug({ articles }), 'html')
  } catch (err) {
    console.log(err)
  }
}
