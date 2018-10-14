function handleMessage(sender_psid, received_message) {

  let response;

  // Check if the message contains text
  if (received_message.text) {

    // Create the payload for a basic text message
    response = {
      "text": `Bonjour, tu m'as envoyé : "${received_message.text}". C'est un bon début !`
    }
  }

  // Sends the response message
  callSendAPI(sender_psid, response);
}

module.exports = handleMessage;
