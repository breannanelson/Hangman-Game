
// array of names
var names = ["apple", "banana", "pear"];
// will be used to increment wins
var wins = 0;
// will be used to increment losses
var losses = 0;
// creating an array to store all wrong letters entered
var wrongLetter = [];
// var correctLetter = "";
// will be used to increment the number of correct letters selected
var correctLetterCount = 0;
var correctLetter = [];
// will be used to increment the number of guesses
var numGuessesRemaining = 12;

var underlineWord = "";

var letter = "";








// function returns a random num that will be used for the index of the array names
function selectName() {
    return Math.floor(Math.random() * names.length);
}

// function will output to the screen the updated stats
function reWriteStats() {
    var stats =
        "<p>Wins<br>" + wins + "</p>" +
        "<p>User Guess: " + letter + "</p>" +
        "<p>Correct Letters: " + correctLetter + "</p>" +
        "<p>Letters Already Guessed<br>" + wrongLetter + "</p>" +
        "<p>Number of Guesses Remaining<br>" + numGuessesRemaining + "</p>" +
        "<p>Current Word<br>" + underlineWord + "</p>" +
        "<p>Losses : " + losses + "</p>";

    document.getElementById('gameStats').innerHTML = stats;
}

// function will reset all stats (besides wins and losses) and output to the screen
function resetStats() {
    wrongLetter = [];
    correctLetter = [];
    correctLetterCount = 0;
    numGuessesRemaining = 12;
    letter = "";
    index = selectName();
    console.log(names[index]);
    underlineWord = generateUnderline(names[index]);
    reWriteStats();
}

function generateUnderline(str) {
    var results = "";
    for (var i = 0; i < str.length; i++) {
        results += "_ ";
    }
    return results;
}

function replaceAt(string, index, replace) {
    return string.substring(0, index) + replace + string.substring(index + 1);
}

// function call for selectName(). Returns a num that will be used as the index of the array names

var index = selectName();
console.log(names[index])
console.log(names[index].length);
console.log("==> " + generateUnderline(names[index]));

underlineWord = generateUnderline(names[index]);

reWriteStats();

document.onkeyup = function (event) {
    letter = event.key;
    var type = event.keyCode;


    if (type >= 65 && type <= 90) {
        if (!wrongLetter.includes(letter) && !correctLetter.includes(letter)) {

            for (var i = 0; i < names[index].length; i++) {
                if (names[index][i] === letter) {
                    correctLetter.push(letter);
                    correctLetterCount++;
                    console.log("Correct Letter: " + correctLetter);
                    console.log("Correct Letter Count: " + correctLetterCount);
                    underlineWord = replaceAt(underlineWord, i * 2, letter);
                    //GetElementBy
                }
                //GetElementByID
            }

            if (!correctLetter.includes(letter)) {
                wrongLetter.push(letter);
                console.log("Wrong Letter: " + wrongLetter);
                numGuessesRemaining--;
            }
            reWriteStats();
            // reWriteStats();
            if (correctLetterCount === names[index].length) {
                wins++;
                alert("You have won!");
                resetStats()
            }
            if (wrongLetter.length === 12) {
                alert("You have lost!");
                losses++;
                resetStats()

            }

        }
        else {
            alert("Try a different letter key!")
        }
    }
    else {
        alert("You did not enter a letter key!");
    }

}


