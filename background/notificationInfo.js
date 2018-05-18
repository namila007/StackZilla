function notifynotiunread(count) {
    browser.notifications.create({
      "type": "basic",
      "iconUrl": browser.extension.getURL("icons/addon.png"),          
      "title": "Reputation Changes",
      "message": "You have "+count+" reputation change events"

    })
  }


function unreadnotificatons(token){
  var url = NOTIFICATIONS+`&access_token=${token}`

    return axios.get(url).then(res=>{
        
        if(notiunread < res.data.items.length )
        {   console.log(notiunread+" n "+res.data.items.length )
            notiunread = res.data.items.length
            return Promise.resolve(res.data.items.length)
        }
        if(notiunread == res.data.items.length ){
            console.log(notiunread+" n "+res.data.items.length )
            return Promise.resolve(-1)
        }
        throw new Error('Error occured While fetching notification data') 
      })           
}

