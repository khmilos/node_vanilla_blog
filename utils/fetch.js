const https = require('https')
const axios = require('axios')

exports.fetchPOST = async (code, url) => {
  // console.log(data)
  const body = JSON.stringify({
    "client_id": "Iv1.72b8c2a25a616adf",
    "client_secret": "44ee5ec22db2a2ea85a1683469079c2ecba075f4",
    "code": code
  })

  const headers = {
    'Content-Type': 'application/json',
  }
  const responseData = await axios.post(url, body, { headers })
  // console.log('data', responseData.data)
  const params = new URLSearchParams(responseData.data);
  return params.get("access_token");
  // const responseObj = JSON.parse()
  // console.log(responseObj)
}

exports.fetchGithubUser = async (token) => {
  const data = await axios.get('https://api.github.com/user', {
    headers: {
      Authorization: "token " + token
    }
  })
  console.log(data)
} 

// async function fetchGitHubUser(token) {
//   const request = await fetch("https://api.github.com/user", {
//     headers: {
//       Authorization: "token " + token
//     }
//   });
//   return await request.json();
// }
