const PG = require("pg");

function addMisunderstanding(psid, text){
  const client = new PG.Client();
  client.connect();
  return client.query(`INSERT INTO misunderstandings (psid, text) VALUES($1, $2)`,
  [psid, text])
  .then(result => {
    client.end();
    return result.rows;
  })
  .catch(error => {
    client.end();
    console.warn(`Error when inserting new misunderstanding ${psid}, ${text} : ${error}`);
  })
}

module.exports = addMisunderstanding;
