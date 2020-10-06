const path = require('path')
const pug = require('pug')
const { responseHTML } = require('../utils/response')

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
    image: 'assets/article/1.jpg',
  },
]




exports.homePage = (req, res) => {
  try {
    responseHTML(res, homePug({ articles }))
  } catch (err) {
    
  }
}
