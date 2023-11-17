let secretNumber = Math.trunc(Math.random() * 20) + 1;
let lives = 5;
let score = 0;
let highscore = localStorage.getItem("highscore") || 0;
let ended = false;

document.querySelector(".highscore").textContent = "Highscore:" + highscore;

document.querySelector(".check").addEventListener("click", checkNumber);

document.querySelector(".again").addEventListener("click", resetGame);

document.querySelector(".again").style.visibility = "hidden";

function displayMessage(message) {
  document.querySelector(".message").textContent = message;
}

function checkNumber() {
  const guess = Number(document.querySelector(".guess").value);

  if (ended) {
    return;
  }

  //when there is no input
  if (!guess) {
    displayMessage("No number!");
  }
  //when player wins
  else if (guess === secretNumber) {
    displayMessage("Correct Number!");
    document.querySelector(".number").textContent = secretNumber;
    document.querySelector("body").style.backgroundColor = "#60b347";
    document.querySelector(".number").style.width = "30rem";

    score += 10;

    if (score > highscore) {
      localStorage.setItem("highscore", score);
      document.querySelector(".label-highscore").textContent =
        "Highscore: " + score;
    }

    document.querySelector(".label-score").textContent = "Score: " + score;
    ended = true;
    stopGame();
  }
  //when guess is wrong
  else {
    lives--;
    document.querySelector(".label-lives").textContent = "Lives: " + lives;

    if (guess > secretNumber) {
      displayMessage("Too High!");
    } else {
      displayMessage("Too Low!");
    }

    if (lives === 0) {
      document.querySelector(".number").textContent = secretNumber;
      document.querySelector("body").style.backgroundColor = "#ff0000";
      ended = true;
      stopGame();
    }
  }
}

function stopGame() {
  document.querySelector(".again").style.visibility = "visible";
  let button = (document.querySelector(".check").disabled = true);
}

//function executed when you want to start a new game
function resetGame() {
  document.querySelector("body").style.backgroundColor = "#222";
  lives = 5;
  document.querySelector(".label-lives").textContent = "Lives: " + lives;
  document.querySelector(".number").textContent = "?";
  document.querySelector(".guess").value = "";
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  ended = false;
  document.querySelector(".again").style.visibility = "hidden";
}
