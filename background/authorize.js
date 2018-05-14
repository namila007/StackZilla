/* exported getAccessToken */

// const REDIRECT_URL = browser.identity.getRedirectURL();
// const CLIENT_ID = "12428";
const KEY = "f26RUH3uoCiokrEYNeDf9Q(("
// const SCOPES = ["read_inbox", "noexpire"];
// const AUTH_URL =
// `https://stackoverflow.com/oauth/dialog?
// client_id=${CLIENT_ID}&key=${KEY}&redirect_uri=${encodeURIComponent(REDIRECT_URL)}
// &scope=${encodeURIComponent(SCOPES.join(' '))}`;

const VALIDATION_BASE_URL="https://api.stackexchange.com/2.2/";

function extractAccessToken(redirectUri) {
  let m = redirectUri.match(/[#?](.*)/);
  if (!m || m.length < 1)
    return null;
  let params = new URLSearchParams(m[1].split("#")[0]);
  return params.get("access_token");
}

/**
Validate the token contained in redirectURL.
This follows essentially the process here:
https://developers.google.com/identity/protocols/OAuth2UserAgent#tokeninfo-validation
- make a GET request to the validation URL, including the access token
- if the response is 200, and contains an "aud" property, and that property
matches the clientID, then the response is valid
- otherwise it is not valid

Note that the Google page talks about an "audience" property, but in fact
it seems to be "aud".
*/
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



/**
Authenticate and authorize using browser.identity.launchWebAuthFlow().
If successful, this resolves with a redirectURL string that contains
an access token.
*/
