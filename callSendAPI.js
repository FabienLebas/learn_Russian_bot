const fetch = require('node-fetch');

const facebookToken = process.env.facebookToken;

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response
  }
  return fetch(`https://graph.facebook.com/v2.6/me/messages?access_token=${facebookToken}&nlp_configs?nlp_enabled=$NLP_ENABLED`, {
    method: "POST",
    body: JSON.stringify(request_body),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(error => {
    console.warn(`Error while sending message to Facebook : ${error}`);
  })
}

module.exports = callSendAPI;
