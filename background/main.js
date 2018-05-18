/*main back to get th*/

var token
var totunread = 0
var notiunread = 0

const INBOX_READ =
`https://api.stackexchange.com/2.2/me/inbox/unread?key=${KEY}&site=stackoverflow&filter=!0UscT51V)r-XJhlOHzduuQu)O`

const NOTIFICATIONS = 
`https://api.stackexchange.com/2.2/me/reputation?site=stackoverflow&key=${KEY}`

//error noti
function notifyerror(error) {
  browser.notifications.create({
    "type": "basic",
    "iconUrl": browser.extension.getURL("icons/addon.png"),          
    "title": "Error",
    "message": `${error}`,
    "items": [{title:"test1",message:"ffff"}]


  })
}

//error log function
function logError(error) {
  console.error(`Error: ${error}`);
  //notifyerror(error)
}


browser.browserAction.onClicked.addListener(async function() {
  console.log("CLICKED")
  token = await getAccessToken()
  console.log("tok "+token)
  unreadnotificatons(token).then(notifynotiunread).catch(logError)
  unreadmessages(token).then(notifyunread).catch(logError)
  badge()
  startInterval()
})

function startInterval(){
var interval = setInterval(function(){
  unreadnotificatons(token)
    .then((val)=>{
      if(val!=-1){notifynotiunread}})
    .catch(logError)
  unreadmessages(token)
    .then((val)=>{
      if(val!=-1){notifyunread}})
    .catch(logError)
    badge()
},60000)}

function badge() {
  if((totunread+notiunread)>0)
  {
    browser.browserAction.setBadgeText({text: (totunread+notiunread).toString()});
  }
}


