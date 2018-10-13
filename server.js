const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("*", function(request, result){
  result.send("Welcome to Learn Russian Bot API")
})

app.listen(port, function () {
  console.log("Server listening on port:" + port);
});
