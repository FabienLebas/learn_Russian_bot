const PG = require("pg");
const getKnownWords = require("./getKnownWords");
const getAllWords = require("./getAllWords");

function determineLevel(user_id){
  const client = new PG.Client();
  client.connect();
  let allWords = [];
  let knownWords = [];
  return Promise.all([getAllWords(), getKnownWords(user_id)])
  .then(result => {
    allWords = result[0];
    knownWords = result[1];
    // const maxLevelReached = Math.max(...knownWords.map(e => e.level));
    let maxLevelReached = 1;
    if (knownWords.length > 0){
      maxLevelReached = Math.max(...knownWords.map(e => e.level));
    }
    const knownWordsOfMaxLevel = knownWords.filter(e => parseInt(e.level, 10) === maxLevelReached);
    const ratioForNextLevel = 0.5;
    if (knownWordsOfMaxLevel.length  >= ratioForNextLevel * allWords.filter(e => parseInt(e.level, 10) === maxLevelReached).length){
      return parseInt(maxLevelReached, 10) + 1;
    } else {
      return maxLevelReached;
    }
  })
  .catch(error => {
    console.warn(`Error while determining level for user ${user_id} : ${error}`);
  })
}

module.exports = determineLevel;
