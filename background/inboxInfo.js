function notifyunread(count) {
    browser.notifications.create({
      "type": "basic",
      "iconUrl": browser.extension.getURL("icons/addon.png"),          
      "title": "Inbox",
      "message": "You have "+count+" unread messages"
    })
}



function unreadmessages(token){
  var url = INBOX_UNREAD+`&access_token=${token}`

  return axios.get(url).then(res=>{
    console.log(totunread+" "+res.data.items.length )
    console.log(res.data)
    if(totunread <= res.data.items.length )
    {
      totunread = res.data.items.length
      console.log(totunread+" "+res.data.items.length )
      return Promise.resolve(res.data.items.length)
    }else{
      totunread = 0
    }
    //throw new Error('Error occured While fetching inbox data') 
  })

}

function inbox (token) {
  var url = INBOX+`&access_token=${token}`

  return axios.get(url).then(res=>{

  console.log(res.data.items.length)  
  console.log("MSGS "+ res.data.items)
  return Promise.resolve(res.data.items)
    
  })
}
