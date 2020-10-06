const { fetchPOST, fetchGithubUser } = require('../utils/fetch')
const { redirect } = require('../utils/response')
const { getParameters } = require('../utils/url')

const clientId = 'Iv1.72b8c2a25a616adf'
const clientSecret = '44ee5ec22db2a2ea85a1683469079c2ecba075f4'

exports.loginUser = (request, response) => {
  try {
    const redirectURI = 'http://localhost:5000/login/github/callback'
    const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectURI}`
    redirect(response, url)
  } catch (error) {
    console.log(error)
  }
}

// access_token=db5bdefc34a83e3d28a795ab732efc7f40ed2119&expires_in=28800&refresh_token=r1.cadce3114083afdcad00f5d0ed59ab0a4e64a3a91efd915f1980ba74032ef1c15bd1933062ca1291&refresh_token_expires_in=15724800&scope=&token_type=bearer


exports.githubCallback = async (request, response) => {
  try {
    const { url } = request
    const { code } = getParameters(url)
    const accessToken = await fetchPOST(code, 'https://github.com/login/oauth/access_token')
    await fetchGithubUser(accessToken)
  } catch (error) {
    console.log(error)
    console.log('error')
  }
}

// http://localhost:9000/login/github/callback?code=dbeb6fce88a034fa3196


// async function getAccessToken({ code, client_id, client_secret }) {
//   const request = await fetch("https://github.com/login/oauth/access_token", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//       client_id,
//       client_secret,
//       code
//     })
//   });
//   const text = await request.text();
//   const params = new URLSearchParams(text);
//   return params.get("access_token");
// }

// async function fetchGitHubUser(token) {
//   const request = await fetch("https://api.github.com/user", {
//     headers: {
//       Authorization: "token " + token
//     }
//   });
//   return await request.json();
// }

// app.get("/login/github/callback", async (req, res) => {
//   const code = req.query.code;
//   const access_token = await getAccessToken({ code, client_id, client_secret });
//   const user = await fetchGitHubUser(access_token);
//   if (user) {
//     req.session.access_token = access_token;
//     req.session.githubId = user.id;
//     res.redirect("/admin");
//   } else {
//     res.send("Login did not succeed!");
//   }
// });

// app.get("/admin", async (req, res) => {
//   if (req.session && req.session.githubId === 1126497) {
//     res.send("Hello Kevin <pre>" + JSON.stringify(req.session, null, 2));
//     // Possible use "fetchGitHubUser" with the access_token
//   } else {
//     res.redirect("/login/github");
//   }
// });

// app.get("/logout", (req, res) => {
//   if (req.session) req.session = null;
//   res.redirect("/");
// });

// const PORT = process.env.PORT || 9000;
// app.listen(PORT, () => console.log("Listening on localhost:" + PORT));