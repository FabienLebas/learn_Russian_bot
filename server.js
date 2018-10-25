const express = require("express");
const bodyParser = require("body-parser");
const handleMessage = require("./handleMessage");
const handlePostback = require("./handlePostback");
const callSendAPI = require("./callSendAPI");

const app = express();
const port = process.env.PORT || 1337;
const facebookToken = process.env.facebookToken;
const facebookID = process.env.facebookID;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

// Creates the endpoint for our webhook
app.post('/webhook', (req, res) => {
  let body = req.body;
  // Checks this is an event from a page subscription
  if (body.object === 'page') {
    // Iterates over each entry - there may be multiple if batched
    body.entry.forEach(function(entry) {
      // Gets the message. entry.messaging is an array, but
      // will only ever contain one message, so we get index 0
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);

      // Get the sender PSID
      let sender_psid = webhook_event.sender.id;
      console.log('Sender PSID: ' + sender_psid);

      // Check if the event is a message or postback and
      // pass the event to the appropriate handler function
      if (webhook_event.message) {
        handleMessage(sender_psid, webhook_event.message);
      } else if (webhook_event.postback) {
        handlePostback(sender_psid, webhook_event.postback);
      }
    });
    // Returns a '200 OK' response to all requests
    res.status(200).send('EVENT_RECEIVED');
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
});

// Adds support for GET requests to our webhook
app.get('/webhook', (req, res) => {
  // Your verify token. Should be a random string.
  let VERIFY_TOKEN = facebookToken;
  // Parse the query params
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];
  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
    // Checks the mode and token sent is correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      // Responds with the challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
});

app.get("*", function (request, result) {
  result.send("Bienvenue sur Dis Serguey ?");
});

app.listen(port, function () {
  console.log("Server listening on port:" + port);
});
