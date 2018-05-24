/*main back to get th*/

var token
var totunread = 0
var notiunread = 0
var interval;

const INBOX_UNREAD =
`https://api.stackexchange.com/2.2/me/inbox/unread?key=${KEY}&site=stackoverflow&filter=!0UscT51V)r-XJhlOHzduuQu)O`

const INBOX =
`https://api.stackexchange.com/2.2/me/inbox?key=${KEY}&site=stackoverflow&pagesize=5&filter=!8IfPpxGro.Z6_M(hOhkHW`


const NOTIFICATIONS = 
`https://api.stackexchange.com/2.2/me/notifications/unread?site=stackoverflow&key=${KEY}&pagesize=5&filter=!w*yCRQ_T5l9PdmgVXW`

const BADGEUPDATES = 
`https://api.stackexchange.com/2.2/me/notifications?site=stackoverflow&key=${KEY}&pagesize=5&filter=!w*yCRQ_T5l9PdmgVXW`


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

async function messageHandle (request, sender, sendResponse) {
  if(request.command == "getToken"){
    console.log("CLICKED")
    token = await getAccessToken()
    console.log("tok "+token)
    unreadnotificatons(token).then(notifynotiunread).catch(logError)
    unreadmessages(token).then(notifyunread).catch(logError)
    badge()
    clearInterval(interval)
    startInterval() 
    inbox(token).then(res=>{
      console.log("mmmm "+res)
      sendResponse({data: res})
    })
  }
  return true
 
  
}

// browser.browserAction.onClicked.addListener(async function() {
//   console.log("CLICKED")
//   token = await getAccessToken()
//   console.log("tok "+token)
//   unreadnotificatons(token).then(notifynotiunread).catch(logError)
//   unreadmessages(token).then(notifyunread).catch(logError)
//   badge()
//   startInterval()
// })

function startInterval(){
 interval = setInterval(function(){
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
    browser.browserAction.setBadgeText({text: (totunread).toString()});
  }
}

browser.runtime.onMessage.addListener(messageHandle);


