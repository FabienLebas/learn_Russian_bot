const callSendAPI = require("./callSendAPI");
const getWordsExceptKnown = require("./queries/getWordsExceptKnown");
const addKnownWord = require("./queries/addKnownWord");
const determineLevel = require("./queries/determineLevel");

function handlePostback(sender_psid, received_postback) {
  let allWords;
  let myLevel = 1;

  // Get the payload for the postback
  let payload = received_postback.payload.split(" ");

  return determineLevel(sender_psid)
  .then(level => {
    myLevel = level;
    return level;
  })
  .then(result => getWordsExceptKnown(sender_psid, myLevel))
  .then(words => {
    allWords = words;
    return words;
  })
  .then(result => {
    if(payload[0] === "ask" && payload[1] !== undefined){
      return addKnownWord(sender_psid, payload[1])
    } else {
      return result;
    }
  })
  .then(result => {
    // Set the response based on the postback payload
    if (payload[0] === 'ask') {
      const indexChosen = Math.floor(Math.random() * allWords.length);
      response = {
        "attachment":{
          "type":"template",
          "payload": {
            "template_type":"button",
            "text": `${allWords[indexChosen].french}`,
            "buttons":[{
                "type": "postback",
                "title": "Voir en Russe",
                "payload": `seeRussian ${allWords[indexChosen].id}`
              }
            ]
          }
        }
      }
    } else if (payload[0] === "stop"){
      response = { "text": "Cкоро увидимся"}
    } else if (payload[0] === "seeRussian"){
      let word = allWords.find(element => element.id === payload[1]);
      response = {
        "attachment":{
          "type":"template",
          "payload": {
            "template_type":"button",
            "text": `${word.russian}. Tu t'en souvenais ?`,
            "buttons":[
              {
                "type": "postback",
                "title": "Да",
                "payload": `ask ${payload[1]}`
              },{
                "type": "postback",
                "title": "Нет",
                "payload": `ask`
              }
            ]
          }
        }
      }
    }
    // Send the message to acknowledge the postback
    callSendAPI(sender_psid, response);
    return response;
  })
  .catch(error => {
    console.warn(`Error while handling postback : ${error}`);
  })

}

module.exports = handlePostback;
