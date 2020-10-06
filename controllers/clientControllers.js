const path = require('path')
const fs = require('fs')
const pug = require('pug')
const { responseHTML, responseStream } = require('../utils/response')
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
    if (!extension || extension === '.ico' ) throw new Error('No extension')
    const filePath = path.join(process.cwd(), getPath(url))
    await responseStream(response, filePath, extension)
  } catch (err) {
    console.log(err)
  }
}

exports.homePage = (request, response) => {
  try {
    responseHTML(response, homePug({ articles }))
  } catch (err) {
    console.log(err)
  }
}
