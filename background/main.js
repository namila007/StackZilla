/*global getAccessToken*/

var token
// function notifyUser(user) {
//   browser.notifications.create({
//     "type": "basic",
//     "title": "Google info",
//     "message": `Hi ${user.name}`
//   });}

function sendnow (tabs) {
  browser.tabs.sendMessage(tabs[0].id, {
    command: "token",
    token: token
  });
}


async function sendToken (data) {
  console.log(data.url)
  token = await validate(data.url)
  
  console.log("FINAL "+token)
  
  browser.tabs.query({active: true, currentWindow: true},
    function (tabs) {
    browser.tabs.sendMessage(tabs[0].id, {
      command: "token",
      token: token
    });
  })
        
        .catch(logError);
  
}

function logError(error) {
  console.error(`Error: ${error}`);
}

/**
When the button's clicked:
- get an access token using the identity API
- use it to get the user's info
- show a notification containing some of it
*/
browser.runtime.onMessage.addListener(async function (message,sender,res){
  console.log(message.url)
  token = await validate(message.url)
  
  console.log("FINAL "+token)
  
  browser.tabs.query({active: true, currentWindow: true},
    function (tabs) {
    browser.tabs.sendMessage(tabs[0].id, {
      command: "token",
      token: token
    });
  })
        
        .catch(logError);
  
});



