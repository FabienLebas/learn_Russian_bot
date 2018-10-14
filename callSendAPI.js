const fetch = require('node-fetch');

const facebookToken = process.env.facebookToken;

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
  // Construct the message body
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response
  }
  // Send the HTTP request to the Messenger Platform
  // const facebookURL = new URL('https://graph.facebook.com/v2.6/me/messages');

  fetch(`https://graph.facebook.com/v2.6/me/messages?access_token=${facebookToken}`, {
    method: "POST",
    body: request_body,
    headers: { 'Content-Type': 'application/json' }
  })
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(error => {
    console.warn(`Error while sending message to Facebook : ${error}`);
  })
}

module.exports = callSendAPI;
