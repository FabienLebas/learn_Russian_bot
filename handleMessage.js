const callSendAPI = require("./callSendAPI");

function handleMessage(sender_psid, received_message) {

  let response;

  // Check if the message contains text
  if (received_message.text === "Bonjour") {

    // Create the payload for a basic text message
    response = {
      "attachment":{
        "type":"template",
        "payload": {
          "template_type":"button",
          "text":"Bonjour ! Ca va ?",
          "buttons":[
            {
              "type": "postback",
              "title": "Oui",
              "payload": "yes"
            },{
              "type": "postback",
              "title": "Bof. Pas trop",
              "payload": "no"
            }
          ]
        }
      }
    }
  } else {
    response = {
      "text": `Tu m'as envoyé : "${received_message.text}". C'est un bon début !`
    }
  }

  // Sends the response message
  callSendAPI(sender_psid, response);
}

module.exports = handleMessage;
