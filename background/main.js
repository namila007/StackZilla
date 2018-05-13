/*global getAccessToken*/

// function notifyUser(user) {
//   browser.notifications.create({
//     "type": "basic",
//     "title": "Google info",
//     "message": `Hi ${user.name}`
//   });}

function logError(error) {
  console.error(`Error: ${error}`);
}

/**
When the button's clicked:
- get an access token using the identity API
- use it to get the user's info
- show a notification containing some of it
*/
// browser.browser.addListener(function() {
//     console.log("clicked")
//   getAccessToken()
//     // .then(getUserInfo)
//     // .then(notifyUser)
//     .catch(logError);
// });
