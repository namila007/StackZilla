
//initializing 

const REDIRECT_URL = browser.identity.getRedirectURL();
const CLIENT_ID = "12428";
const KEY = "f26RUH3uoCiokrEYNeDf9Q(("
const SCOPES = ["read_inbox"];
const AUTH_URL =
`https://stackoverflow.com/oauth/dialog?client_id=${CLIENT_ID}&key=${KEY}&redirect_uri=${REDIRECT_URL}&scope=${encodeURIComponent(SCOPES.join(' '))}`;


function handleResponse(message) {
    //console.log(`background script sent a response: ${message.response}`)
    getinbox(message.response)
    
  }
  
  function handleError(error) {
    console.log(`Error: ${error}`);
  }


document.getElementById('tokenbtn').addEventListener("click", async function getToken () {
   
  var tokenurl =  await browser.identity.launchWebAuthFlow({
    interactive: true,
    url: AUTH_URL
  })
  var token = browser.runtime.sendMessage({
    command: "tokenurl" , 
    data: tokenurl })
    token.then(handleResponse,handleError)

})


function handleinbox(message) {
    console.log("Inbox")
    
    let msg = JSON.parse(message.response)
 
   
    var inbox = document.getElementById("inbox")

    for (var i=0; i<msg.items.length; i++){
       var item = document.createElement('li')
        item.innerHTML =
        '<a href="'+ msg.items[i].link +'">' + msg.items[i].title + '</a>'
        inbox.appendChild(item)
    }
    
   
}

function getinbox(token) {
    var inbox = browser.runtime.sendMessage({
        command: "inbox",
        token: token
    })
    inbox.then(handleinbox,handleError)
}



