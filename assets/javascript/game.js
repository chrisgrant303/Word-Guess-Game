// First we create a variable that contains all of the possible letter choices
//

var computerChoices = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

// I want to then initialize all of the container variables we'll need, and set them to a starting point of 0, except for our total amount of guesses allowed to play which will be 9
//

let wins = 0;
let losses = 0;
let guesses = 9;
let guessesLeft = 9;
let guessedLetters = [];
var letterToGuess = null;

// I used the code from RPS and the computer will select a value from computerChoices and save it in computerGuess
var computerGuess = computerChoices[Math.floor(Math.random() * computerChoices.length)];

// These functions make it a game since I need to find a way to keep track of what's happening after every round, not just a one off like rock paper scissors.  SAVE THESE FUNCTIONS FOR LATER REFERENCE
function updateGL() {
    document.querySelector('#guessLeft').innerHTML = "Guesses left: " + guessesLeft;
};

function updateLTG() {
    this.letterToGuess = this.computerChoices[Math.floor(Math.random() * this.computerChoices.length)];
};

function updateGSF() {
    document.querySelector('#let').innerHTML = "Your Guesses: " + guessedLetters.join(', '); //Added the comma break aparts using .join every time the #let was written to
};


// I'm creating a game reset function
var reset = function () {
    totalGuesses = 9;
    guessesLeft = 9;
    guessedLetters = [];

    updateLTG();
    updateGL();
    updateGSF();
}

updateLTG(); // Is this redundant, see above?

//When key is released it becomes the users guess
document.onkeyup = function (event) {
    var userGuess = String.fromCharCode(event.keyCode).toLowerCase(); // This was an awesome line to learn, anything that gets pressed is saved as unicode, then dropped to lowercase
    var check = computerChoices.includes(userGuess);

    if (check === false) {
        alert("That was not a valid guess, try again?");
        return false;
    } else if (check === true) {
        guessesLeft--;
        guessedLetters.push(userGuess); // this once empty array gets filled
        updateGL();
        updateGSF();

        if (guessesLeft > 0) {
            if (userGuess == letterToGuess) {
                wins++;
                document.querySelector('#wins').innerHTML = "Wins: " + wins;
                userGuess = userGuess.toUpperCase();
                alert("Hey, you guessed it right, it was " + userGuess);
                reset();
            }
        } else if (guessesLeft == 0) {
            losses++;
            document.querySelector('#losses').innerHTML = "Losses: " + losses;
            alert("You're not psychic, but that's ok, most people aren't either");
            reset();
        }
        return false;
    } else {
        alert("Something went wrong, please try again!");
    }

};