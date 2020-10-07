const path = require('path')
const db = require('../db')
const { readSQLFile } = require('../utils')

const script = readSQLFile(path.join(__dirname, '/sql/init-db.sql'))

db.exec(script, (error) => {
  if (error) {
    console.log('ERROR: Could not create tables database')
    process.exit(1)
  }
  console.log('MESSAGE: Tables created')
})
