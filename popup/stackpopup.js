
//initializing 

const REDIRECT_URL = browser.identity.getRedirectURL();
const CLIENT_ID = "12428";
const KEY = "f26RUH3uoCiokrEYNeDf9Q(("
const SCOPES = ["read_inbox", "noexpire"];
const AUTH_URL =
`https://stackoverflow.com/oauth/dialog?client_id=${CLIENT_ID}&key=${KEY}&redirect_uri=${REDIRECT_URL}`;
//&scope=${encodeURIComponent(SCOPES.join(' '))}`;


browser.runtime.onMessage.addListener((message) => {
    console.log(message + " mess")
    if (message.command === "token") {
      tokenSet(message.token);
    } 
  });

document.getElementById('tokenbtn').addEventListener("click", async function getToken () {
   
  var tokenurl =  await browser.identity.launchWebAuthFlow({
    interactive: true,
    url: AUTH_URL
  })
  browser.runtime.sendMessage({url: tokenurl});
})

function tokenSet (req) {
    document.getElementById('token').innerHTML = req
    
}




