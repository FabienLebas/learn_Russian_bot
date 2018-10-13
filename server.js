const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("*", function(request, result){
  result.send("Welcome to Learn Russian Bot API")
})

app.listen(3000, () => console.log("Server is listening on port 3000"));
