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

start();

async function start() {
  console.log(
    "Let's play a game where you (human) make up a number and I (computer) try to guess it."
  );
  let secretNumber = await ask(
    "What is your secret number?\nI won't peek, I promise...\n"
  );
  console.log("You entered: " + secretNumber);
  // Now try and complete the program.
  process.exit();
}

function guessRange(startRange, endRange) {
  let arrayRange = [];
  for (let counter = startRange; counter <= endRange; counter++) {
    arrayRange.push(counter);
  }
  return arrayRange;
}

function median(array) {
  return array.length % 2 === 0
    ? (array[array.length / 2 - 1] + array[array.length / 2]) / 2
    : array[Math.floor(array.length / 2)];
}
