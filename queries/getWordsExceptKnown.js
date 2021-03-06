const PG = require("pg");

function getWordsExceptKnown(psid, maxLevel){
  const client = new PG.Client();
  client.connect();
  return client.query(`SELECT * FROM words WHERE id NOT IN (SELECT word_id FROM words_ok WHERE user_id = $1) AND level <= $2`,
[psid, maxLevel])
  .then(result => {
    client.end();
    return result.rows;
  })
  .catch(error => {
    client.end();
    console.warn(`Error in getting words for user ${psid} except his know words: ${error}`);
  })
}

module.exports = getWordsExceptKnown;
