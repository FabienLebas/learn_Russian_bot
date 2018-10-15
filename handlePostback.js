const callSendAPI = require("./callSendAPI");

function handlePostback(sender_psid, received_postback) {
  let response;

  // Get the payload for the postback
  let payload = received_postback.payload;

  // Set the response based on the postback payload
  if (payload === 'yes') {
    response = { "text": "Super ! Moi aussi." }
  } else if (payload === 'no') {
    response = { "text": "Ah zut ! Un petit exercice de vocabulaire de Russe va te permettre d'aller mieux." }
  }
  // Send the message to acknowledge the postback
  callSendAPI(sender_psid, response);
}

module.exports = handlePostback;
