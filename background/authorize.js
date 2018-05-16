/* exported getAccessToken */

const REDIRECT_URL = browser.identity.getRedirectURL();
const CLIENT_ID = "12428";
const KEY = "f26RUH3uoCiokrEYNeDf9Q(("
const SCOPES = ["read_inbox"];
const AUTH_URL =
`https://stackoverflow.com/oauth/dialog?client_id=${CLIENT_ID}&key=${KEY}&redirect_uri=${REDIRECT_URL}&scope=${encodeURIComponent(SCOPES.join(' '))}`;



const VALIDATION_BASE_URL="https://api.stackexchange.com/2.2/";

function extractAccessToken(redirectUri) {
  let m = redirectUri.match(/[#?](.*)/);
  if (!m || m.length < 1)
    return null;
  let params = new URLSearchParams(m[1].split("#")[0]);
  return params.get("access_token");
}

function validate(redirectURL) {
  const accessToken = extractAccessToken(redirectURL);
  console.log(accessToken + " access")
  if (!accessToken) {
    throw "Authorization failure";
  }
  const validationURL = `${VALIDATION_BASE_URL}access-tokens/${accessToken}?key=${KEY}`;

  console.log(validationURL)
  const validationRequest = new Request(validationURL, {
    method: "GET"
  });

  function checkResponse(response) {
    return new Promise((resolve, reject) => {
      if (response.status != 200) {
        reject("Token validation error");
      }
      response.json().then((json) => {
        if (json.items) {
          resolve(accessToken);
        } else {
          reject("Token validation error");
        }
      });
    });
  }

  return fetch(validationRequest).then(checkResponse);
}


async function authorize() {
  return await browser.identity.launchWebAuthFlow({
    interactive: true,
    url: AUTH_URL
  });
}

function getAccessToken() {
  return authorize().then(validate);
}