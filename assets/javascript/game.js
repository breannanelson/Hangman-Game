
const PHOTO_PATH = "./assets/images/";
const AUDIO_PATH = "./assets/audio/";

// array of artistes info
var artist = [
    {
        name: "adele",
        photo: PHOTO_PATH + "adele-photo.jpg",
        audio: AUDIO_PATH + "adele-audio.mp3"
    },
    {
        name: "beyonce",
        photo: PHOTO_PATH + "beyonce-photo.gif",
        audio: AUDIO_PATH + "beyonce-audio.mp3"
    },
    {
        name: "drake",
        photo: PHOTO_PATH + "drake-photo.gif",
        audio: AUDIO_PATH + "drake-audio.mp3"
    },
    {
        name: "eminem",
        photo: PHOTO_PATH + "eminem-photo.jpg",
        audio: AUDIO_PATH + "eminem-audio.mp3"
    },
    {
        name: "pink",
        photo: PHOTO_PATH + "pink-photo.gif",
        audio: AUDIO_PATH + "pink-audio.mp3"
    },
    {
        name: "prince",
        photo: PHOTO_PATH + "prince-photo.jpg",
        audio: AUDIO_PATH + "prince-audio.mp3"
    },
    {
        name: "shakira",
        photo: PHOTO_PATH + "shakira-photo.jpg",
        audio: AUDIO_PATH + "shakira-audio.mp3"
    },
    {
        name: "sia",
        photo: PHOTO_PATH + "sia-photo.jpg",
        audio: AUDIO_PATH + "sia-audio.mp3"
    },
    {
        name: "rihanna",
        photo: PHOTO_PATH + "rihanna-photo.jpg",
        audio: AUDIO_PATH + "rihanna-audio.mp3"
    },
    {
        name: "lorde",
        photo: PHOTO_PATH + "lorde-photo.gif",
        audio: AUDIO_PATH + "lorde-audio.mp3"
    },
    {
        name: "macklemore",
        photo: PHOTO_PATH + "macklemore-photo.gif",
        audio: AUDIO_PATH + "macklemore-audio.mp3"
    },
    {
        name: "elvis",
        photo: PHOTO_PATH + "elvis-photo.gif",
        audio: AUDIO_PATH + "elvis-audio.mp3"
    },
    {
        name: "khalid",
        photo: PHOTO_PATH + "khalid-photo.png",
        audio: AUDIO_PATH + "khalid-audio.mp3"
    },
    {
        name: "halsey",
        photo: PHOTO_PATH + "halsey-photo.gif",
        audio: AUDIO_PATH + "halsey-audio.mp3"
    }
];

var currentArtist = {
    name: "",
    photo: PHOTO_PATH + "default-photo.jpg",
    audio: AUDIO_PATH + "default-audio.mp3"
};

// Gets Link for Song
var audioElement = document.createElement("audio");
audioElement.setAttribute("src", currentArtist.audio);
audioElement.play();


// will be used to increment wins
var wins = 0;
// will be used to increment losses
var losses = 0;
// initializing an array to store all wrong letters entered
var wrongLetter = [];
// var correctLetter = "";
// will be used to increment the number of correct letters selected
var correctLetterCount = 0;
var correctLetter = [];
// will be used to increment the number of guesses
var numGuessesRemaining = 12;
// initializing var to store undersores
var underlineWord = "";
// initializing user entered keystroke
var letter = "";


// function returns a random num that will be used for the index of the array names
function selectName() {
    return Math.floor(Math.random() * artist.length);
}

// function will output to the screen the updated stats
function reWriteStats() {
    var stats =
        "<p>Name an artist:<br>" + underlineWord + "</p>" +
        "<p>Letters Already Guessed: " + wrongLetter + "</p>" +
        "<p>Number of Guesses Remaining: " + numGuessesRemaining + "</p>" +
        "<p>Wins: " + wins + "</p>" +
        "<p>Losses : " + losses + "</p>";

    document.getElementById('gameStats').innerHTML = stats;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function displayName() {
    document.getElementById('singerName').innerHTML = capitalizeFirstLetter(artist[index].name);
}

function updateAfterWin(ref) {
    currentAritist = artist[ref];
    audioElement.setAttribute("src", currentAritist.audio);
    audioElement.play();
    document.getElementById("singerPhoto").setAttribute("src", currentAritist.photo);
}


// Song Button
$(".play-button").on("click", function () {
    audioElement.play();
});

$(".pause-button").on("click", function () {
    audioElement.pause();
});


// function will reset all stats (besides wins and losses) and output to the screen
function resetStats() {
    wrongLetter = [];
    correctLetter = [];
    correctLetterCount = 0;
    numGuessesRemaining = 12;
    letter = "";
    index = selectName();
    underlineWord = generateUnderline(artist[index].name);
    reWriteStats();
}

// generates underline
function generateUnderline(str) {
    var results = "";
    for (var i = 0; i < str.length; i++) {
        results += "_ ";
    }
    return results;
}

// will replace chosen character in a string
function replaceAt(string, index, replace) {
    return string.substring(0, index) + replace + string.substring(index + 1);
}

// function call for selectName(). Returns a num that will be used as the index of the array names
var index = selectName();

// calling underline generater
underlineWord = generateUnderline(artist[index].name);

// prints stats
reWriteStats();
console.log(artist[index].name);

document.onkeyup = function (event) {
    letter = event.key;
    var type = event.keyCode;


    if (type >= 65 && type <= 90) {
        if (!wrongLetter.includes(letter) && !correctLetter.includes(letter)) {

            for (var i = 0; i < artist[index].name.length; i++) {
                if (artist[index].name[i] === letter) {
                    correctLetter.push(letter);
                    correctLetterCount++;
                    underlineWord = replaceAt(underlineWord, i * 2, letter);
                }
            }

            if (!correctLetter.includes(letter)) {
                wrongLetter.push(letter);
                numGuessesRemaining--;
            }

            reWriteStats();

            if (correctLetterCount === artist[index].name.length) {
                wins++;
                displayName();
                updateAfterWin(index);
                resetStats();
                console.log(artist[index].name);
                // alert("You have won!");
            }
            if (wrongLetter.length === 12) {
                alert("You have lost!");
                losses++;
                console.log(artist[index].name);
                resetStats()

            }

        }
        else {
            alert("Try a different letter key!")
        }
    }
    else {
        // alert("You did not enter a letter key!");
    }

}


