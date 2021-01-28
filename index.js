//create a software guessing game
//process of elimination game with computer
//Log out "Please think of a number between 1 and 100 (inclusive).\n I will try to guess it."
//user enters secret number that is saved as a variable
//user picks a number from 1 to 100 (inclusive - both 1 and 100 are included)
//to begin the computer will choose a first number
//develop guessing program that will continually choose the median
//from an a array containing a range of numbers => 1-100
//need range function that creates array and fills it with numbers
//a while loop will update array on every iteration based on user input and conditionals
//and loop will run only while guess !== secretNumber
//after the first median answer the program will wait for a response
//further complexity:
//depending on the 'data' it receives (user input Yes/No - H/L)...
//user will type No or Yes
//if Yes, then the computer's answer was truthy and the program is complete
//a counter will keep track of how many iterations it took to guess the correct number
//if No, then the computer's answer was falsy and the loop will continue
//the computer will create a new array each iteration by updating the min/max arguments
//then choose a new median
//continue to do this based on user input

const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

//creates an empty array and fills it with a range determined by the two parameters
function guessRange(startRange, endRange) {
  let arrayRange = [];
  for (let counter = startRange; counter <= endRange; counter++) {
    arrayRange.push(counter);
  }
  return arrayRange;
}
//accepts an array and then using a ternary conditional computes the median index
function median(array) {
  return array.length % 2 === 0
    ? (array[array.length / 2 - 1] + array[array.length / 2]) / 2
    : array[Math.floor(array.length / 2)];
}

start();

//async function that runs a guessing numbers game
async function start() {
  console.log(
    "Let's play a game where you (human) pick a range and a number in that range and I (computer) try to guess it."
  );
  //collects user input for the max range number and the users secret number that program must guess
  let max = await ask(
    "Pick any number greater than 1 that will represent the high range.\nFor example if you pick 100, our game would be a number between 1-100.\nGot it? Ok, so what will the high range be: "
  );
  let secretNumber = await ask(
    "What is your secret number?\nI won't peek, I promise...\n"
  );
  console.log("You entered: " + secretNumber);
  //setting up variables for the loop
  let min = 1;
  let computerGuess = 0;
  let counter = 0;

  while (computerGuess !== secretNumber) {
    //loop that will continue iterating until program picks secret number
    counter++;
    let range = guessRange(min, max);
    computerGuess = Math.floor(median(range));
    let humanAnswer = await ask("Is this your number? " + computerGuess + "\n");
    //conditional tree that evaluates input based on 4 options: Yes-No and High-Low
    //the one break point for loop and conditional is the input Yes
    if (humanAnswer === "Yes") {
      break;
    }
    let highOrLow = await ask("Is it higher (H), or Lower (L)? ");

    if (humanAnswer === "No" && highOrLow === "H") {
      min = computerGuess;
    } else if (humanAnswer === "No" && highOrLow === "L") {
      max = computerGuess;
    }
  }
  //after loop breaks there are three log statements that reveal the secret number, track how many guesses, and issue a conciliatory statement
  console.log("Your number was " + secretNumber);
  console.log("I guessed it in " + counter + " attempts");
  console.log("I won! Better luck next time");
  process.exit();
}
