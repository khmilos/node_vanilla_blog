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
const { parseStaticFiles } = require('../utils/file')

const homePug = pug.compileFile(
  path.join(process.cwd(), '/client/dist/index.pug')
)
const notFoundPage = pug.compileFile(
  path.join(process.cwd(), '/client/dist/404.pug')
)

const staticFiles = parseStaticFiles(
  path.join(process.cwd(), '/client/dist'),
  ['.pug']
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

exports.sendFile = async (request, response) => {
  try {
    const { url } = request
    const extension = getExtension(url)

    // Search through static files
    if (staticFiles[url]) {
      return responseStatic(response, staticFiles[url], extension)
    }

    // Search through assets folder
    if (/^\/assets\//.test(url)) {
      const filePath = path.join(process.cwd(), getPath(url))
      return await responseStream(response, filePath, extension)
    }

    // Throw error if file not found
    throw new Error('No such file')
  } catch (error) {
    console.log(error)
    responseStatic(response, notFoundPage(), '.html', 404)
  }
}

exports.homePage = (request, response) => {
  try {
    responseStatic(response, homePug({ articles }), '.html')
  } catch (error) {
    console.log(error)
  }
}
