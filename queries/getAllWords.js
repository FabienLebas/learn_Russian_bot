const PG = require("pg");

function getAllWords(){
  const client = new PG.Client();
  client.connect();
  return client.query(`SELECT * FROM words`)
  .then(result => {
    client.end();
    return result.rows;
  })
  .catch(error => {
    client.end();
    console.warn(`Error in getting user : ${error}`);
  })
}

getAllWords()
.then(result => {
  console.log(result);
})
.catch(error => {
  console.warn(`error : ${error}`);
})

module.exports = getAllWords;
