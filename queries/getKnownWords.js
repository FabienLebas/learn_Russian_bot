const PG = require("pg");

function getKnownWords(user_id){
  const client = new PG.Client();
  client.connect();
  return client.query(`SELECT DISTINCT word_id, date, user_id, words.level FROM words_ok INNER JOIN words ON (words.id = words_ok.word_id) WHERE user_id = $1`,
    [user_id])
  .then(result => {
    client.end();
    return result.rows;
  })
  .catch(error => {
    client.end();
    console.warn(`Eroor in getKnownWords for user ${user_id} : ${error}`);
  })
}

module.exports = getKnownWords;
