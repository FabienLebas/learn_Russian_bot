function verification(req, res){
  const hubChallenge = req.query[hub.challenge];
  const hubMode = req.query[hub.mode];
  const verifyTokenMatches = (req.query[hub.verify_token] === "learn_Russian_bot");

  if (hubMode && verifyTokenMatches){
    res.status(200).send(hubChallenge);
  } else {
    res.status(403).end();
  }
}

module.exports = verification;
