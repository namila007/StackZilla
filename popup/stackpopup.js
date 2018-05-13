
//initializing 

const REDIRECT_URL = browser.identity.getRedirectURL();
const CLIENT_ID = "12428";
const KEY = "f26RUH3uoCiokrEYNeDf9Q(("
const SCOPES = ["read_inbox", "noexpire"];
const AUTH_URL =
`https://stackoverflow.com/oauth/dialog?client_id=${CLIENT_ID}&key=${KEY}&redirect_uri=${REDIRECT_URL}`;
//&scope=${encodeURIComponent(SCOPES.join(' '))}`;



document.getElementById('tokenbtn').addEventListener("click", async function getToken () {
    
    // SE.init({ 
    //     // Parameters obtained by registering an app, these are specific to the SE
    //     //   documentation site
    //     clientId: 12428, 
    //     key: 'f26RUH3uoCiokrEYNeDf9Q((', 
    //     // Used for cross domain communication, it will be validated
    //     channelUrl: 'resource://stackzilla-nb007@mozilla.org-at-jetpack/stackzilla/popup/blank.html',
    //     // Called when all initialization is finished
    //     complete: function(data) { 
    //         console.log(data)
    //     }
    // });
    // console.log(SE)

    // SE.authenticate({
    //     success: function(data) { 
    //         console.log(data)
    //         document.getElementById('token').innerHTML() = data
    //     },
    //     error: function(data) { 
    //         alert('An error occurred:\n' + data.errorName + '\n' + data.errorMessage); 
    //     },
    //     networkUsers: true
    // })
    console.log(AUTH_URL)
   const auth = await browser.identity.launchWebAuthFlow({
    interactive: true,
    url: AUTH_URL
  });
  console.log(auth + "auth")
})
