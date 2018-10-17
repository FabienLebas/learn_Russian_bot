const callSendAPI = require("./callSendAPI");
const checkUser = require("./queries/checkUser");
const addUser = require("./queries/addUser");
const containsHello = require("./textAnalysis/containsHello");

function handleMessage(sender_psid, received_message) {
  //if the user does not exist, create an entry in the users database
  checkUser(sender_psid)
  .then(result => {
    if (result === false){
      addUser(sender_psid)
    }
  })
  .catch(error => {
    console.warn(`Error while checking / inserting user ${sender_psid} : ${error}`);
  })

  //check if user says hello, if so, then start
  let response;
  // if (received_message.text === "Bonjour")
  if (containsHello(received_message.text))
  {
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
      "text": `Euh désolé, je ne parle pas encore parfaitement Français... mais je vais demander à бабушка !`
    }
  }

  // Sends the response message
  callSendAPI(sender_psid, response);
}

module.exports = handleMessage;
