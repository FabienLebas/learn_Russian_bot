const callSendAPI = require("./callSendAPI");
const checkUser = require("./queries/checkUser");
const addUser = require("./queries/addUser");
const containsKnownWords = require("./textAnalysis/containsKnownWords");
const addMisunderstanding = require("./queries/addMisunderstanding");
const getWordsExceptKnown = require("./queries/getWordsExceptKnown");
const getKnownWords = require("./queries/getKnownWords");

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
    return getWordsExceptKnown(sender_psid);
  })
  .then(words => {
    allWords = words;
    return words;
  })
  .then(result => {
    const greetings = ["bonjour", "salut", "hi", "hello", "ça va", "ca va"];
    const askLevel = ["niveau", "combien", "où"];
    const isHelloMessage = containsKnownWords(received_message.text, greetings);
    const isLevelMessage = containsKnownWords(received_message.text, askLevel);
    // const helloMessage = containsHello(received_message.text);
    if (isHelloMessage && firstTime)
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
                "payload": "ask"
              }
            ]
          }
        }
      }
      return result;
    } else if (isHelloMessage && !firstTime){
      const indexChosen = Math.floor(Math.random() * allWords.length);
      response = {
        "attachment":{
          "type":"template",
          "payload": {
            "template_type":"button",
            "text": `Bonjour ! On démarre : est-ce que tu te rappelles comment ont dit ${allWords[indexChosen].french} ?`,
            "buttons":[
              {
                "type": "postback",
                "title": "Voir en Russe",
                "payload": `seeRussian ${allWords[indexChosen].id}`
              }
            ]
          }
        }
      }
      return indexChosen;
    } else if (isLevelMessage){
      return getKnownWords(sender_psid)
      .then(knownWords => {
        response = {
          response = {
            "attachment":{
              "type":"template",
              "payload": {
                "template_type":"button",
                "text": `Tu connais ${knownWords.length} mots sur ${allWords.length}`,
                "buttons":[
                  {
                    "type": "postback",
                    "title": "Démarrer",
                    "payload": `ask`
                  }
                ]
              }
            }
          }
        }
      })
      .catch(error => {
        console.warn(`Error while getting know words user ${sender_psid} error : ${error}`);
      })
    }

    else { //message was not understood
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
                "payload": "ask"
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
