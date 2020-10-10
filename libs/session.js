const uuid = require('uuid')

/**
 * Length of the session. Default value 5 mins
 * @constant
 * @type {number}
 */
const SESSION_DURATION = 300000

/**
 * Sessions
 * @constant
 * @type {Object}
 */
const sessions = { }

/**
 * Returns created session id
 * @param {Object} data - data to store in session
 * @returns {string} id of created session in storage
 */
exports.createSession = (data) => {
  const id = uuid.v4()
  sessions[id] = {
    data,
    timeout: setTimeout(() => this.closeSession(id), SESSION_DURATION)
  }
  return id
}

/**
 * Returns data stored in session and updates session duration
 * @param {string} id - id of session
 * @returns {Object} session's data
 */
exports.getSessionData = (id) => {
  const session = sessions[id]
  if (!session) return null

  clearInterval(session.timeout)
  session.timeout = setTimeout(() => this.closeSession(id), SESSION_DURATION)
  return session.data
}

exports.closeSession = (id) => {
  if (sessions[id]) delete sessions[id]
}
