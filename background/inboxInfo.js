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

  return axios.get(url).then(res=>{
    console.log(totunread+" "+res.data.items.length )
    console.log(res.data)
    if(totunread < res.data.items.length )
    {
      totunread = res.data.items.length
      console.log(totunread+" "+res.data.items.length )
      return Promise.resolve(res.data.items.length)
    }
    if(totunread == res.data.items.length ){
      console.log(totunread+" "+res.data.items.length )
      return Promise.resolve(-1)
    }
    throw new Error('Error occured While fetching inbox data') 
  })

   }



