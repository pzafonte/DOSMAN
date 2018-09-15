
//Initialize Variables

//HTML Display Elements
var wordHTML = document.getElementById("word-text");
var wrongGuessHTML = document.getElementById("wrongguess-text");
var remainingGuessHTML = document.getElementById("remainingguess-text");
var messageHTML = document.getElementById("message-text");
var lossesHTML = document.getElementById("losses-text");
var winsHTML = document.getElementById("wins-text");
var gameImageHTML = document.getElementById("game-image");


var remainingGuesses = 16;
var wins = 0;
var losses = 0;
var wordList = ["simcity", "doom", "lemmings", "dukenukem", "wolfenstein", "dynablaster", "ultimaunderworld"]

//HTML Audio Elements
var doomAudio = document.getElementById("doom-audio");
var dukeNukemAudio = document.getElementById("dukenukem-audio");
var dynaBlasterAudio = document.getElementById("dynablaster-audio");
var lemmingsAudio = document.getElementById("lemmings-audio");
var simCityAudio = document.getElementById("simcity-audio");
var ultimaUnderworldAudio = document.getElementById("ultimaunderworld-audio");
var wolfensteinAudio = document.getElementById("wolfenstein-audio");


//Functions
function generateWordArray(str) {
  return str.split('');
}

function generateUnderscoreArray(str) {
  var underScoreArr = [];
  for (i = 0; i < str.length; i++) {
    underScoreArr.push("_");
  }
  return (underScoreArr);
}

function getStrFromArr(arr) {
  var printStr = "";
  for (var i = 0; i < arr.length; i++) {
    printStr += arr[i] + " ";
  }
  return printStr;
}

function genCharArray(charA, charZ) {
  var a = [],
    i = charA.charCodeAt(0),
    j = charZ.charCodeAt(0);
  for (; i <= j; ++i) {
    a.push(String.fromCharCode(i));
  }
  return a;
}

function playAudio(word){
  if (word === "doom"){
    doomAudio.play();
  }
  if (word === "dukenukem"){
    dukeNukemAudio.play();
  }
  if (word === "dynablaster"){
    dynaBlasterAudio.play();
  }
  if (word === "lemmings"){
    lemmingsAudio.play();
  }
  if (word === "simcity"){
    simCityAudio.play();
  }
  if (word === "ultimaunderworld"){
    ultimaUnderworldAudio.play();
  }
  if (word === "wolfenstein"){
    wolfensteinAudio.play();
  }

}

function changeImage(word){

  if (word === "doom"){
    gameImageHTML.src = "assets/images/doom.png"
  }
  if (word === "dukenukem"){
    gameImageHTML.src = "assets/images/dukenukem.jpg"
  }
  if (word === "dynablaster"){
    gameImageHTML.src = "assets/images/dynablaster.png"
  }
  if (word === "lemmings"){
    gameImageHTML.src = "assets/images/lemmings.gif"
  }
  if (word === "simcity"){
    gameImageHTML.src = "assets/images/simcity.gif"
  }
  if (word === "ultimaunderworld"){
    gameImageHTML.src = "assets/images/ultimaunderworld.jpg"
  }
  if (word === "wolfenstein"){
    gameImageHTML.src = "assets/images/wolfenstein.jpg"
  }
  
}

function stopAudio(){
  var audio = document.getElementsByTagName('audio');
  for(i=0; i<audio.length; i++){
   audio[i].pause();
  }
}

function guess(answerArray, notGuessed, word, guess) {

  var wordArray = generateWordArray(word);
  var index = notGuessed.indexOf(guess);
  messageHTML.textContent = "";

  if (index > -1) {
    var i = 0;
    for (i = 0; i < word.length; i++) {
      if (word[i] === guess) {
        answerArray[i] = guess;
        document.getElementById("word-text").innerHTML = getStrFromArr(answerArray);
      }
    }
    // Update the game for remaining unknowns
    var remainingLetters = answerArray.length;
    // recount the remaining letters
    for (i = 0; i < answerArray.length; i++) {
      if (answerArray[i] !== '_') {
        remainingLetters -= 1;
      }

    }
    if (remainingLetters === 0) {
      wins++;
      document.getElementById("wins-text").innerHTML = wins;
      messageHTML.innerHTML = "YOU WIN!"
      stopAudio();
      playAudio(word);
      changeImage(word);
      resetGameState();
      return false;
    }

    if (wordArray.indexOf(guess) < 0) {
      remainingGuesses--;
      document.getElementById("remainingguess-text").innerHTML = remainingGuesses;
      console.log("Wrong Guess Number: " + remainingGuesses);
      document.getElementById("wrongguess-text").innerHTML += guess + " ";
      console.log(wrongGuessHTML);
      if (remainingGuesses === 0) {
        losses++;
        document.getElementById("losses-text").innerHTML = losses;
        messageHTML.innerHTML = "YOU LOSE!"
        resetGameState();
      }
    }



    document.getElementById("word-text").innerHTML = answerArray.join(" ");


    //Remove letter from available choice of letters
    notGuessed.splice(index, 1);
  } else {
    messageHTML.textContent = "Press a key between 'a' and 'z' that you have not guessed already!"
  }
}

function resetGameState() {
  notGuessed = genCharArray('a', 'z');
  word = wordList[Math.floor(Math.random() * wordList.length)];
  answerArray = generateUnderscoreArray(word);
  document.getElementById("word-text").textContent = getStrFromArr(answerArray);
  remainingGuesses = 16;
  document.getElementById("wrongguess-text").innerHTML = "";
  document.getElementById("remainingguess-text").innerHTML = remainingGuesses;
}

function hardReset () {
  notGuessed = genCharArray('a', 'z');
  word = wordList[Math.floor(Math.random() * wordList.length)];
  answerArray = generateUnderscoreArray(word);
  document.getElementById("word-text").textContent = getStrFromArr(answerArray);
  remainingGuesses = 16;
  document.getElementById("wrongguess-text").innerHTML = "";
  document.getElementById("remainingguess-text").innerHTML = remainingGuesses;
  wins = 0;
  document.getElementById("wins-text").innerHTML = wins;
  losses = 0;
  document.getElementById("losses-text").innerHTML = wins;
  messageHTML.textContent = "";
  gameImageHTML.src = "";
  stopAudio();
}


//Start Game
var notGuessed = genCharArray('a', 'z');
var word = wordList[Math.floor(Math.random() * wordList.length)];
var answerArray = generateUnderscoreArray(word);
document.getElementById("word-text").innerHTML = getStrFromArr(answerArray);

document.onkeypress = function (event) {
  var keyPressed = event.key;
  guess(answerArray, notGuessed, word, keyPressed);
}