/*global getAccessToken*/

var token
// function notifyUser(user) {
//   browser.notifications.create({
//     "type": "basic",
//     "title": "Google info",
//     "message": `Hi ${user.name}`
//   });}


function logError(error) {
  console.error(`Error: ${error}`);
}

browser.runtime.onMessage.addListener(recivemessage)

function recivemessage (message,sender,sendResponse){
  if(message.command === "tokenurl"){
    console.log(message.data)
    token = validate(message.data).catch(logError).then((val)=>{
      console.log("val "+val)
      sendResponse({response: val})
      
    })
    
    
    return true
    
  }
  
}



