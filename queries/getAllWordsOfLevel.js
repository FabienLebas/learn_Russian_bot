const PG = require("pg");

function getAllWordsOfLevel(level){
  const client = new PG.Client();
  client.connect();
  return client.query(`SELECT * FROM words WHERE level = $1`,
    [level])
  .then(result => {
    client.end();
    return result.rows;
  })
  .catch(error => {
    client.end();
    console.warn(`Error in getting all words : ${error}`);
  })
}

module.exports = getAllWordsOfLevel;
