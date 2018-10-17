const PG = require("pg");

function addUser(psid){
  const client = new PG.Client();
  client.connect();
  return client.query(`INSERT INTO users (psid) VALUES($1)`,
  [psid])
  .then(result => {
    client.end();
    return result.rows;
  })
  .catch(error => {
    client.end();
    console.warn(`Error when inserting new user ${psid} : ${error}`);
  })
}

module.exports = addUser;
