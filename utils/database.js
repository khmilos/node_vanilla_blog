const { isArraysEqual } = require('../utils')

exports.isSqliteContains = (db, tables) => new Promise((resolve, reject) => {
  const query = 'SELECT name FROM sqlite_master WHERE type=\'table\';'
  db.all(query, (error, rows) => {
    if (error) return reject(error)
    const dbTables = rows.map((row) => row.name)
    if (isArraysEqual(tables, dbTables)) return resolve(true)
    return resolve(new Error(false))
  })
})
