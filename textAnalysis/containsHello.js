function containsHello(text){
  const greetings = ["bonjour", "salut", "hi", "hello", "ça va", "ca va"];
  const textToAnalyze = text.toLowerCase().replace(",", " ").replace(".", " ").replace("!", " ").split(" ");
  const resultArray = textToAnalyze.map(element => greetings.includes(element));
  return resultArray.includes(true);
}

module.exports = containsHello;
