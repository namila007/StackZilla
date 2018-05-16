function notifyunread(count) {
    browser.notifications.create({
      "type": "basic",
      "iconUrl": browser.extension.getURL("icons/addon.png"),          
      "title": "Inbox",
      "message": "You have "+count+" unread messages"
    })
  }



function unreadmessages(token){
  var url = INBOX_READ+`&access_token=${token}`
    console.log(url)

   return new Promise((resolve,reject)=>{
        get(url, (msg1)=>{ 
            if(msg1.error_message){ resolve("Error: "+msg1.error_message)}
            console.log(msg1)
            let msg = JSON.parse(msg1)  
            console.log(msg.items.length) 
            if(totunread < msg.items.length ){
                notifyunread(msg.items.length)
                totunread = msg.items.length
                resolve(msg.items.length)
            } 
        })
        })
   }



