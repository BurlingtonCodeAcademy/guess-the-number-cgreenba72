const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

//The computer then guesses within the predetermined range
let computerGuess = (max, min) => {
  let guess = (min + max) / 2;
  return Math.floor(guess);
};

start();
async function start() {
  let playing = true;
  let upperBound = 100
  let lowerBound = 1
  let currentGuess = computerGuess(upperBound, lowerBound);
  console.log(
    "Let's play a game where you (human) make up a number and I (computer) try to guess it."
  );
  //The user picks a secret number
  let secretNumber = await ask(
    "What is your secret number?\nI won't peek, I promise...\n"
  );
  console.log("You entered: " + secretNumber);
  while (playing) {
    let yesOrNo = await ask("is your number " + currentGuess + "? ");
    if (yesOrNo.toLowerCase().includes("yes")) {
      console.log("You're correct, that is my number!");
      process.exit();
    } else {
      let highOrLow = await ask("Is your number higher or lower? ");
      if (highOrLow.toLowerCase().includes("higher")) {
        lowerBound = currentGuess;
        currentGuess = computerGuess(upperBound, lowerBound);
      } else if (highOrLow.toLowerCase().includes("lower")) {
        upperBound = currentGuess;
        currentGuess = computerGuess(upperBound, lowerBound);
      } else {
        console.log("Please type higher or lower");
      }
    }
  }
}
