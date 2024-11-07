let playerName;
let playerNameInput = document.getElementById("playerOne");
let gameBoard = document.getElementById("rock-paper-scissor");
let startGameBtn = document.getElementById("startGame");

const choices = document.querySelectorAll(".choice");
const score = document.getElementById("score");
const result = document.getElementById("result");
const restart = document.getElementById("restart");
const modal = document.querySelector(".modal");

const scoreboard = {
  player: 0,
  computer: 0,
};

let chathams_blue = "#1A4B84";

// check player names and show the game board if true
const gameStartListener = () => {
  if (playerNameInput.value === "") {
    alert("Please enter player name");
    playerNameInput.focus();
    return;
  }
  playerName =
    playerNameInput.value.charAt(0).toUpperCase() +
    playerNameInput.value.slice(1);
  gameBoard.style.display = "flex";
  // Show score
  score.innerHTML = `
   <div class="row">
     <div class="col-12 d-flex align-items-center mb-4">
      <div class="col-6 text-start">${playerName}</div><div class="scoreBoardL p-2"> ${scoreboard.player}</div>
     </div>
     <div class="col-12 d-flex align-items-center">
      <div class="col-6 text-start">Computer </div><div class="scoreBoardL p-2"> ${scoreboard.computer}</div>
     </div>
   </div>
   `;
  playerNameInput.style.display = "none";
  startGameBtn.style.display = "none";
};

// Init the event listener
const gameStartButton = startGameBtn.addEventListener(
  "click",
  gameStartListener
);

// Init Game
function initGame() {
  gameBoard.style.display = "none";
}

initGame();

// Play game
function playGame(e) {
  restart.style.display = "inline-block";
  const playerChoice = e.target.id; // rock, paper, scissor
  console.log(playerChoice);
  const computerChoice = getComputerChoice();
  const winner = getWinner(playerChoice, computerChoice);
  showWinner(winner, computerChoice);
}

// Get computers choice
function getComputerChoice() {
  const randomNumber = Math.random();
  if (randomNumber < 0.34) {
    return "rock";
  } else if (randomNumber <= 0.67) {
    return "paper";
  } else {
    return "scissors";
  }
}

// Get game winner
function getWinner(player, computer) {
  if (player === computer) {
    return "draw";
  } else if (player === "rock") {
    if (computer === "paper") {
      return "computer";
    } else {
      return "player";
    }
  } else if (player === "paper") {
    if (computer === "scissors") {
      return "computer";
    } else {
      return "player";
    }
  } else if (player === "scissors") {
    if (computer === "rock") {
      return "computer";
    } else {
      return "player";
    }
  }
}

// decide winner
function showWinner(winner, computerChoice) {
  console.log(computerChoice);
  if (winner === "player") {
    // Inc player score
    scoreboard.player++;
    // Show modal result
    result.innerHTML = `
      <h1 class="text-win">You Win</h1>
      <img id="rock" class="choice" src="./assets/img/${computerChoice}.jpg" alt="rock"  width="150">
      <p>Computer Chose <strong>${
        computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)
      }</strong></p>
    `;
  } else if (winner === "computer") {
    // Inc computer score
    scoreboard.computer++;
    // Show modal result
    result.innerHTML = `
      <h1 class="text-lose">You Lose</h1>
      <img  class="choice" src="./assets/img/${computerChoice}.jpg" alt="rock" width="150">
      <p>Computer Chose <strong>${
        computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)
      }</strong></p>
    `;
  } else {
    result.innerHTML = `
      <h1>It's A Draw</h1>
      <img  class="choice" src="./assets/img/${computerChoice}.jpg" alt="rock"  width="150">
      <p>Computer Chose <strong>${
        computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)
      }</strong></p>
    `;
  }
  // Show score
  score.innerHTML = `
  <div class="row">
  <div class="col-12 d-flex align-items-center mb-4">
   <div class="col-6 text-start">${playerName}</div><div class="scoreBoardL p-2"> ${scoreboard.player}</div>
  </div>
  <div class="col-12 d-flex align-items-center">
   <div class="col-6 text-start">Computer </div><div class="scoreBoardL p-2"> ${scoreboard.computer}</div>
  </div>
</div>
    `;

  modal.style.display = "block";
}

// Restart game
function restartGame() {
  scoreboard.player = 0;
  scoreboard.computer = 0;
  gameBoard.style.display = "none";
  playerNameInput.style.display = "block";
  playerNameInput.value = "";
  startGameBtn.style.display = "block";
}

// Clear modal
function clearModal(e) {
  if (e.target == modal) {
    modal.style.display = "none";
  }
}

// Event listeners
choices.forEach((choice) => choice.addEventListener("click", playGame));
window.addEventListener("click", clearModal);
restart.addEventListener("click", restartGame);

// Change Theme
function setTheme(theme) {
  document.documentElement.style.setProperty("--primary-color", theme);
  localStorage.setItem("movie-theme", theme);
}
setTheme(localStorage.getItem("movie-theme") || chathams_blue);
