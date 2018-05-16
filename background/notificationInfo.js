function notifynotiunread(count) {
    browser.notifications.create({
      "type": "basic",
      "iconUrl": browser.extension.getURL("icons/addon.png"),          
      "title": "Notifications",
      "message": "You have "+count+" unread Notifications"
    })
  }


function unreadnotificatons(token){
  var url = NOTIFICATIONS+`&access_token=${token}`
    console.log(url)

    return new Promise((resolve,reject)=>{
        get(url, (msg1)=>{
            console.log(msg1)
            let msg = JSON.parse(msg1)  
            console.log(msg.items.length) 
            if(notiunread < msg.items.length ){
                notifynotiunread(msg.items.length)
                notiunread = msg.items.length
                resolve(msg.items.length)
            }
            
        })
    })
           
}

