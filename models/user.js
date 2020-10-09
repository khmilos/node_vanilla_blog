const axios = require('axios')

/**
 * Returns fetched user from Google api
 * @param {string} accessToken - access token to google api
 * @returns {Object} - user data from Google API
 */
exports.getUserDataFromGoogle = async (accessToken) => {
  // Request to Google API for user data
  const { data: user } = await axios.get(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`)
  return user
}
