const PG = require("pg");

function addKnownWord(user_id, word_id){
  const client = new PG.Client();
  client.connect();
  return client.query(`INSERT INTO words_ok (user_id, word_id) VALUES($1, $2)`,
  [user_id, word_id])
  .then(result => {
    client.end();
    return result.rows;
  })
  .catch(error => {
    client.end();
    console.warn(`Error when inserting new known word ${word_id} for user ${user_id} : ${error}`);
  })
}

module.exports = addKnownWord;
