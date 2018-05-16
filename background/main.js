/*main back to get th*/

var token
var totunread = -1
var notiunread = -1

const INBOX_READ =
`https://api.stackexchange.com/2.2/me/inbox/unread?page=1&pagesize=5&key=${KEY}&site=stackoverflow&filter=!0UscT51V)r-XK9Kg9bV54nqom`

const NOTIFICATIONS = 
`https://api.stackexchange.com/2.2/me/notifications/unread?page=1&pagesize=2&site=stackoverflow&filter=!0UscT5320P8DSPTPhCF)1tNYL&key=${KEY}`

//error log function
function logError(error) {
  console.error(`Error: ${error}`);
}

function get(url, callback){
  var xmlHttp =  new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() { 
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        callback(xmlHttp.responseText);
    }
  xmlHttp.open("GET", url, true); // true for asynchronous 
  xmlHttp.send(null);
}

browser.browserAction.onClicked.addListener(async function() {
  console.log("CLICKED")
  token = await getAccessToken()
  console.log("tok "+token)
  unreadnotificatons(token).catch(logError)
  unreadmessages(token).then((data)=>{console.log(data)}).catch(logError)
  
})






