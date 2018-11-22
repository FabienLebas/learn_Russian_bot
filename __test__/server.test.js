const fetch = require("node-fetch");
const serverUrl = process.env.serverUrl;
const facebookToken = process.env.facebookToken;
const testedUSer = process.env.testedUSer;

test("test webhook - should be able to hook", function() {
  return fetch(`${serverUrl}/webhook?hub.verify_token=${facebookToken}&hub.challenge=CHALLENGE_ACCEPTED&hub.mode=subscribe`)
  .then(response => {
    expect(response.status).toBe(200);
  });
});

const checkUser = require("../queries/checkUser");
test("test database access - I should be able to check sample user", function() {
  return checkUser(testedUSer)
  .then(response => {
    expect(response).toBe(true);
  });
});

const determineLevel = require("../queries/determineLevel");
test("test determineLevel for sample user", function() {
  return determineLevel(testedUSer)
  .then(response => {
    expect(parseInt(response, 10) >= 1).toBe(true);
  });
});

const getAllWords = require("../queries/getAllWords");
test("test getAllWords ", function() {
  return getAllWords()
  .then(response => {
    expect(response.length > 0).toBe(true);
  });
});

const getAllWordsOfLevel = require("../queries/getAllWordsOfLevel");
test("test getAllWordsOfLevel ", function() {
  return getAllWordsOfLevel(1)
  .then(response => {
    expect(response.length > 0).toBe(true);
  });
});

const getKnownWords = require("../queries/getKnownWords");
test("test getKnownWords of sample user ", function() {
  return getKnownWords(testedUSer)
  .then(response => {
    expect(response.length >= 0).toBe(true);
  });
});

const getKnownWordsOfLevel = require("../queries/getKnownWordsOfLevel");
test("test getKnownWordsOfLevel of sample user level 1 ", function() {
  return getKnownWordsOfLevel(testedUSer, 1)
  .then(response => {
    expect(response.length >= 0).toBe(true);
  });
});

const getWordsExceptKnown = require("../queries/getWordsExceptKnown");
test("test getWordsExceptKnown of sample user level 1 ", function() {
  return getWordsExceptKnown(testedUSer, 1)
  .then(response => {
    expect(response.length >= 0).toBe(true);
  });
});

const containsKnownWords = require("../textAnalysis/containsKnownWords");
test("test containsKnownWords", function() {
  expect(containsKnownWords("Bonjour Sergey, comment ça va ?", ["bonjour"])).toBe(true);
  expect(containsKnownWords("Bonjour Sergey, comment ça va ?", ["toto"])).toBe(false);
});
