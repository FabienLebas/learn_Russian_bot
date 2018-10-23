const callSendAPI = require("./callSendAPI");
const checkUser = require("./queries/checkUser");
const addUser = require("./queries/addUser");
const containsHello = require("./textAnalysis/containsHello");
const addMisunderstanding = require("./queries/addMisunderstanding");
const getAllWords = require("./queries/getAllWords");

function handleMessage(sender_psid, received_message) {
  let firstTime = false;
  let response;
  let allWords;

  //if the user does not exist, create an entry in the users database
  return checkUser(sender_psid)
  .then(result => {
    if (result === false){
      firstTime = true;
      return addUser(sender_psid);
    } else {
      return result;
    }
  })
  .then(result => {
    return getAllWords();
  })
  .then(words => {
    allWords = words;
    return words;
  })
  .then(result => {
    const helloMessage = containsHello(received_message.text);
    if (helloMessage && firstTime)
    {
      response = {
        "attachment":{
          "type":"template",
          "payload": {
            "template_type":"button",
            "text":"Bonjour ! Et bienvenue ! Voici comment je fonctionne : je vais dire un mot en Français. Tu vas essayer de te rappeler comment on dit en Russe. Si tu t'en souviens, tu me le dis et je ne te le proposerai que dans quelques temps pour être sûr que tu n'oublies pas. Quand tu connais la moitié des mots d'un niveau, je passe au niveau suivant.",
            "buttons":[
              {
                "type": "postback",
                "title": "C'est parti !",
                "payload": "start"
              },{
                "type": "postback",
                "title": "Pas tout de suite",
                "payload": "stop"
              }
            ]
          }
        }
      }
      return result;
    } else if (helloMessage && !firstTime){
      const indexChosen = Math.floor(Math.random() * allWords);
      response = {
        "attachment":{
          "type":"template",
          "payload": {
            "template_type":"button",
            "text": `Bonjour ! On démarre : est-ce que tu te rappelles comment ont dit ${allWords[indexChosen].french} ?`,
            "buttons":[
              {
                "type": "postback",
                "title": "Да",
                "payload": `iKnow ${allWords[indexChosen].id}`
              },{
                "type": "postback",
                "title": "Нет",
                "payload": `iDontKnow ${allWords[indexChosen].id}`
              },{
                "type": "postback",
                "title": "Voir en Russe",
                "payload": `seeRussian ${allWords[indexChosen].id}`
              }
            ]
          }
        }
      }
      return indexChosen;
    } else { //message was not understood
      response = {
        "attachment":{
          "type":"template",
          "payload":{
            "template_type":"button",
            "text":"Euh désolé, je ne parle pas encore parfaitement Français... mais je vais demander à бабушка !",
            "buttons":[
              {
                "type": "postback",
                "title": "Continuer",
                "payload": "start"
              },{
                "type": "postback",
                "title": "Arrêter",
                "payload": "stop"
              }
            ]
          }
        }
      }
      return addMisunderstanding(sender_psid, received_message.text);
    }
  })
  .then(result => {
    // Sends the response message
    return callSendAPI(sender_psid, response);
  })
  .catch(error => {
    console.warn(`Error while processing message of user ${sender_psid} : ${error}`);
  })
}

module.exports = handleMessage;
