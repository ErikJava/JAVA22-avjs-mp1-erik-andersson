import { getAllHighscores } from "./highscore";
import { addHighscoreToFirebase } from "./highscore";
getAllHighscores();

const playerChoiceH1 = document.getElementById("playerchoice");
const computer = document.getElementById("enemychoice");
const showResult = document.getElementById("result");
const playerPoints = document.getElementById("playerscore");
const showWinner = document.getElementById("winner");

let userPoints = 0;
let computerChoice;
let userChoice;
let showPlayerName;

// PLAYER NAME
const submitName = document.getElementById("submitname");
submitName.addEventListener("click", event => {
    event.preventDefault();

    const nameInput = document.getElementById("nameinput");
    const textFromInput = nameInput.value;
    nameInput.value = '';
    showPlayerName = document.getElementById("playername");
    showPlayerName.innerText = textFromInput;
});

// COMPUTER CHOICE
function enemysChoice() {
    const computerHand = ['Rock', 'Paper', 'Scissor'];
    const randomChoice = Math.floor(Math.random() * computerHand.length);
    computer.innerHTML = computerHand[randomChoice]
    computerChoice = computerHand[randomChoice];
}

// PLAYER CHOICE (ROCK)
const rockChoice = document.getElementById("rock");
rockChoice.addEventListener("click", rockFunction);

function rockFunction() {
    userChoice = "Rock";
    playerChoiceH1.innerHTML = "Rock";
    enemysChoice()
    getResult()
}

//PLAYER CHOICE (PAPER)
const paperChoice = document.getElementById("paper");
paperChoice.addEventListener("click", paperFunction);

function paperFunction() {
    userChoice = "Paper";
    playerChoiceH1.innerHTML = "Paper";
    enemysChoice()
    getResult()
}

// PLAYER CHOICE (SCISSOR)
const scissorChoice = document.getElementById("scissor");
scissorChoice.addEventListener("click", scissorFunction);

function scissorFunction() {
    userChoice = "Scissor";
    playerChoiceH1.innerHTML = "Scissor";
    enemysChoice()
    getResult()
}

// SHOW RESULT
function getResult() {
    let computer = computerChoice
    let player = userChoice
    let result;

    if (player == computer) {
        result = 'Tie!'
        showResult.innerHTML = result
        return;
    }
    if (player === 'Rock' && computer === 'Paper') {
        result = 'Computer wins!'
        showResult.innerHTML = result
        playerPoints.textContent = "0";
    }
    if (player === 'Rock' && computer === 'Scissor') {
        result = 'You win!'
        showResult.innerHTML = result
        userPoints++
        playerPoints.textContent = userPoints;
    }
    if (player === 'Paper' && computer === 'Scissor') {
        result = 'Computer wins!'
        showResult.innerHTML = result
        playerPoints.textContent = "0";
    }
    if (player === 'Paper' && computer === 'Rock') {
        result = 'You win!'
        showResult.innerHTML = result
        userPoints++
        playerPoints.textContent = userPoints;
    }
    if (player == 'Scissor' && computer == 'Rock') {
        result = 'Computer wins!'
        showResult.innerHTML = result
        playerPoints.textContent = "0";
    }
    if (player == 'Scissor' && computer == 'Paper') {
        result = 'You win!'
        showResult.innerHTML = result
        userPoints++
        playerPoints.textContent = userPoints;
    }

    else if (result == 'Computer wins!') {
        showWinner.innerHTML = "You lost the game!"
        addHighscoreToFirebase(userPoints, showPlayerName.innerText);
        endGame()
    }

    // RESTART GAME
    function endGame() {
        userPoints = 0;
        playerPoints.innerHTML = userPoints;
        result.innerHTML = ``;
        showWinner.innerHTML = ``;
        playerChoiceH1.innerHTML = player;
        computer.innerHTML = ``;
        showResult.innerHTML = result;
    }
}
