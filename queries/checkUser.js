const PG = require("pg");

function checkUser(psid){
  const client = new PG.Client();
  client.connect();
  return client.query(`SELECT * FROM users WHERE psid=$1`,
  [psid])
  .then(result => {
    client.end();
    return (result.rows.length > 0);
  })
  .catch(error => {
    client.end();
    console.warn(`Error in getting user ${psid} : ${error}`);
  })
}

module.exports = checkUser;
