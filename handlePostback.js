const callSendAPI = require("./callSendAPI");
const getAllWords = require("./queries/getAllWords");

function handlePostback(sender_psid, received_postback) {
  let response;
  let allWords;

  // Get the payload for the postback
  let payload = received_postback.payload.split(" ");

  return getAllWords()
  .then(words => {
    allWords = words;
    return words;
  })
  .then(result => {
    // Set the response based on the postback payload
    if (payload[0] === 'start') {
      const indexChosen = Math.floor(Math.random() * allWords);
      response = {
        "attachment":{
          "type":"template",
          "payload": {
            "template_type":"button",
            "text": `${allWords[indexChosen].french}`,
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
    } else if (payload[0] === "stop"){
      response = { "text": "Cкоро увидимся"}
    } else if (payload[0] === "iKnow" || payload[0] === "iDontKnow" || payload[0] === "seeRussian"){
      let wordIndex = payload[1];
      response = {
        "attachment":{
          "type":"template",
          "payload": {
            "template_type":"button",
            "text": `${allWords[indexChosen].russian}. Tu t'en souvenais ?`,
            "buttons":[
              {
                "type": "postback",
                "title": "Да",
                "payload": `start`//et ajouter
              },{
                "type": "postback",
                "title": "Нет",
                "payload": `start`//ne pas ajouter
              },{
                "type": "postback",
                "title": "Stop",
                "payload": `stop`
              }
            ]
          }
        }
      }

    }
    // Send the message to acknowledge the postback
    callSendAPI(sender_psid, response);

  })
  .catch(error => {
    console.warn(`Error while handling postback : ${error}`);
  })

}

module.exports = handlePostback;
