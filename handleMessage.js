const callSendAPI = require("./callSendAPI");
const checkUser = require("./queries/checkUser");
const addUser = require("./queries/addUser");

function handleMessage(sender_psid, received_message) {
  checkUser(sender_psid)
  .then(result => {
    if (result === false){
      addUser(sender_psid)
    }
  })
  .catch(error => {
    console.warn(`Error while checking / inserting user ${sender_psid} : ${error}`);
  })

  let response;
  if (received_message.text === "Bonjour") {
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
