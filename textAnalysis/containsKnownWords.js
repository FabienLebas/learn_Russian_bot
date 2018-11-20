function containsKnownWords(textInput, groupOfSimilarWords){
  const textToAnalyze = textInput.toLowerCase().replace(",", " ").replace(".", " ").replace("!", " ").split(" ");
  const resultArray = textToAnalyze.map(element => groupOfSimilarWords.includes(element));
  return resultArray.includes(true);
}

module.exports = containsKnownWords;
