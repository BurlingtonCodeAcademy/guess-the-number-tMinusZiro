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

//async function that runs a guessing numbers game
async function start() {
  console.log(
    "Let's play a game where you (human) pick a range and a number in that range and I (computer) try to guess it."
  );
  //collects user input for the max range number and the users secret number that program must guess
  let max = await ask(
    "Pick any number greater than 1 that will represent the high range.\nFor example if you pick 100, our game would be a number between 1-100.\n\nGot it? Ok, so what will the high range be: "
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
    console.log(`min = ${min}`);
    console.log(`max = ${max}`);
    console.log(`Computer Guess = ${computerGuess}`);

    let range = guessRange(min, max);
    computerGuess = Math.floor(median(range));

    let humanAnswer = await ask("Is this your number? " + computerGuess + "\n");
    //conditional tree that evaluates input based on 4 options: Yes-No and High-Low
    //a break point for loop and conditional is if the input Yes or if the computer guess and secret number are the same but the user does not answer
    console.log(`Computer Guess = ${computerGuess}`);

    if (humanAnswer === "No" && computerGuess == secretNumber) {
      //using equals and not identity because input is a string number and not an actual one (will fix type conversion is preferred over coercion)
      console.log(`You answered incorrectly. I chose correctly!`);
      break;
    } else if (humanAnswer === "Yes" && computerGuess != secretNumber) {
      console.log(`You are not being truthy with me`);
      process.exit();
    } else if (humanAnswer === "Yes") {
      break;
    }

    let highOrLow = await ask("Is it Higher (H), or Lower (L)? ");

    //cheat detector
    if (computerGuess === min + 1 && highOrLow === "L") {
      console.log(`Hey no cheating!`);
      process.exit();
    } else if (computerGuess === max - 1 && highOrLow === "H") {
      console.log(`Hey that can't be right! I don't play with cheaters`);
      process.exit();
    } else if (
      (highOrLow === "L" && computerGuess < secretNumber) ||
      (highOrLow === "H" && computerGuess > secretNumber)
    ) {
      console.log(`Hey that can't be right! Answer honestly.`);
    }

    if (humanAnswer === "No" && highOrLow === "H") {
      //conditional processing Yes or No and High or Low input and updating the min and max accordingly
      min = computerGuess;
    } else if (humanAnswer === "No" && highOrLow === "L") {
      max = computerGuess;
    }
  }

  //after loop breaks there are three log statements that reveal the secret number, track how many guesses, and issue a conciliatory statement
  console.log("Your number was " + secretNumber);
  console.log("I guessed it in " + counter + " attempts");
  console.log("I won! Better luck next time");
  let reload = await ask(`Do you want to play again? Type 'yes' or 'no' `);
  if (reload === "no") {
    console.log(`Bummer`);
    process.exit();
  } else {
    return start();
  }
}
start();
//to-do
//sanitize user input
//need to solve why I must use comparison and not identity with compGuess == secretNum or doesn't work
//build multiple loops for high and Low and No or Yes
//build new reversal game
//combine reversal and normal - allow user to choose
