/*main back to get th*/

var token

const INBOX_READ =
`https://api.stackexchange.com/2.2/me/inbox?page=1&pagesize=5&key=${KEY}&site=stackoverflow&filter=!LURAJLCc5n-3UL-M6AmXYq`

//error log function
function logError(error) {
  console.error(`Error: ${error}`);
}

browser.runtime.onMessage.addListener(recivemessage)

function recivemessage (message,sender,sendResponse){
  if(message.command === "tokenurl"){
    console.log(message.data)
    token = validate(message.data).catch(logError).then((val)=>{
      console.log("val "+val)
      token = val;
      sendResponse({response: val})
      
    }).then(()=>{
      browser.notifications.create({
        "type": "basic",
        "iconUrl": browser.extension.getURL("icons/addon.png"),
        "title": "Token Created",
        "message": "Token is created"
      })
    },logError)
    return true
  }
    if(message.command == "inbox") {
      var url = INBOX_READ+`&access_token=${message.token}`
      get(url, (msg1)=>{
        //console.log(msg1)
        
        sendResponse({response: msg1})
      })
        
      }
      
      
      return true
     
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
    
    // return true
    



