// Game controls
const gameBoard = (() => {
  let gameState = [[], [], []];
  let turns = ["X"];

  const addEntry = (x, y, entry) => {
    gameState[x][y] = entry;

    displayController.updateDisplay(x, y, entry);
    if (checkResult()) {
      displayController.announceWinner(checkResult());
    }
  };

  // Check if game finished
  const checkResult = () => {
    if (
      gameState[0][0] === gameState[0][1] &&
      gameState[0][1] === gameState[0][2] &&
      gameState[0][1]
    ) {
      return gameState[0][0];
    } else if (
      gameState[1][0] === gameState[1][1] &&
      gameState[1][1] === gameState[1][2] &&
      gameState[1][2]
    ) {
      return gameState[1][0];
    } else if (
      gameState[2][0] === gameState[2][1] &&
      gameState[2][1] === gameState[2][2] &&
      gameState[2][2]
    ) {
      return gameState[2][0];
    } else if (
      gameState[0][0] === gameState[1][1] &&
      gameState[1][1] === gameState[2][2] &&
      gameState[2][2]
    ) {
      return gameState[0][0];
    } else if (
      gameState[0][2] === gameState[1][1] &&
      gameState[1][1] === gameState[2][0] &&
      gameState[2][0]
    ) {
      return gameState[0][2];
    } else if (
      gameState[0][1] === gameState[1][1] &&
      gameState[1][1] === gameState[2][1] &&
      gameState[2][1]
    ) {
      return gameState[0][1];
    } else if (
      gameState[1][0] === gameState[1][1] &&
      gameState[1][1] === gameState[1][2] &&
      gameState[1][2]
    ) {
      return gameState[1][0];
    } else if (
      gameState[0][0] === gameState[1][0] &&
      gameState[1][0] === gameState[2][0] &&
      gameState[2][0]
    ) {
      return gameState[0][0];
    } else if (
      gameState[0][2] === gameState[1][2] &&
      gameState[1][2] === gameState[2][2] &&
      gameState[2][2]
    ) {
      return gameState[0][2];
    } else {
      //Check if the board is full and no one has won
      let full = true;

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (!gameState[i][j]) {
            full = false;
          }
        }
      }

      //if all cells are full then it's a tie
      if (full) {
        return "draw";
      }
    }
  };

  const resetGame = () => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        gameState[i][j] = "";
      }
    }

    document.querySelector("h2").innerHTML = "Player X's turn";

    displayController.resetDisplay();
  };

  return {
    addEntry,
    resetGame,
    checkResult,
    turns,
  };
})();

// Display controls
const displayController = (() => {
  const playerTitle = document.querySelector("h2");

  const updateDisplay = (x, y, entry) => {
    const cell = document.querySelector(`[data-x = "${x}"][data-y ="${y}"]`);
    if (cell.innerHTML === "") {
      cell.innerHTML = entry;
    }
  };

  //Reset game board cells in the DOM
  const resetDisplay = () => {
    const divs = document.querySelectorAll(".gamepad > div");
    divs.forEach((div) => {
      div.innerHTML = "";
    });
  };

  const clickControl = () => {
    const divs = document.querySelectorAll(".gamepad > div");
    const restartBtn = document.querySelector("button");
    //GameBoard cells control
    divs.forEach((div) => {
      div.addEventListener("click", () => {
        const x = div.dataset.x;
        const y = div.dataset.y;

        if (gameBoard.turns[gameBoard.turns.length - 1] === "finished") {
          return;
        }

        if (div.innerHTML === "") {
          if (gameBoard.turns[gameBoard.turns.length - 1] === "X") {
            gameBoard.addEntry(x, y, "X");
            if (gameBoard.checkResult()) {
              gameBoard.turns.push("finished");
            } else {
              gameBoard.turns.push("O");
              playerTitle.innerHTML = "Player O's turn";
            }
          } else if (gameBoard.turns[gameBoard.turns.length - 1] === "O") {
            gameBoard.addEntry(x, y, "O");
            if (gameBoard.checkResult()) {
              gameBoard.turns.push("finished");
            } else {
              gameBoard.turns.push("X");
              playerTitle.innerHTML = "Player X's turn";
            }
          }
        }
      });
    });

    //Restart button control
    restartBtn.addEventListener("click", () => {
      gameBoard.resetGame();
      gameBoard.turns = ["X"];
    });
  };

  // Announce the winner
  const announceWinner = (result) => {
    if (result === "draw") {
      playerTitle.innerHTML = "It's a Tie !";
    } else {
      playerTitle.innerHTML = `The player ${result} has Won !`;
    }
  };

  return {
    updateDisplay,
    announceWinner,
    resetDisplay,
    clickControl,
  };
})();

displayController.clickControl();
