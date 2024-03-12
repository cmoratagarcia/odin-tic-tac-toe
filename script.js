//Rendering
const renderGame = (function () {
  //DOM elements
  const submitBtn = document.querySelector(".submit");
  const playerOne = document.querySelector("#player1");
  const playerTwo = document.querySelector("#player2");
  const newGame = document.querySelector(".new-game");
  const rematch = document.querySelector(".play-again");
  const playerForm = document.querySelector("dialog");
  const formContent = document.querySelector(".player-form");
  const closeModal = document.querySelector(".close-dialog");
  const container = document.querySelector(".container");

  // Initialize game board to prevent duplicates
  let board = null;

  //Open the player name modal on page load
  function openModal() {
    playerForm.showModal();
  }

  window.onload = openModal;

  closeModal.addEventListener("click", () => {
    playerForm.close();
    if (!board) {
      gameInstance.initializeGame(); //Only create board if not done before
    }
  });

  submitBtn.addEventListener("click", () =>
    gameInstance.initializeGame(playerOne.value, playerTwo.value)
  );

  newGame.addEventListener("click", () => {
    container.innerHTML = ""; //Clear the game board
    formContent.reset(); //Reset player names
    board = null; // Reset the game board reference
    players.initializeActive();
    openModal();
  });

  rematch.addEventListener("click", resetGame);

  function resetGame() {
    clearCells();
    let board = gameBoard();
    board.unlockCells();
    players.initializeActive(); //Reset active player back to 1
    showStatus(
      "turn",
      players.getActivePlayer().name,
      players.getActivePlayer().userToken
    );
  }

  function createCell() {
    let cell = document.createElement("button");
    cell.classList.add("cell");
    cell.innerText = "";
    container.appendChild(cell);

    cell.addEventListener("click", () => gameInstance.playRound(cell));
    return cell;
  }

  function addToken(cell, token) {
    cell.innerText = token;
    if (token === "X") {
      cell.classList.add("player-one"); //Token colors
    } else if (token === "O") {
      cell.classList.add("player-two");
    }
  }

  function clearCells() {
    let cellArray = document.querySelectorAll(".cell");
    cellArray.forEach((cell) => {
      cell.innerText = "";
      cell.classList.remove("player-one", "player-two");
    });
  }

  //Game status messages
  function showStatus(status, player, token) {
    const turn = document.querySelector(".turn");

    switch (status) {
      case "turn":
        turn.innerText = `${token}: ${player}'s turn`;
        break;
      case "taken":
        turn.innerText = `This cell has been claimed!`;
        break;
      case "winner":
        turn.innerText = `${player} wins!`;
        break;
      case "tie":
        turn.innerText = `It's a tie!`;
        break;
    }
  }

  return {
    createCell,
    addToken,
    clearCells,
    showStatus,
  };
})();

//Store the gameboard as an array inside of a Gameboard object
function gameBoard() {
  let board = [];
  const rows = 3;
  const columns = 3;

  function createBoard() {
    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < columns; j++) {
        board[i].push(renderGame.createCell());
      }
    }
  }

  function checkWin() {
    for (let i = 0; i < board.length; i++) {
      if (
        board[i][0].innerText !== "" &&
        board[i][0].innerText === board[i][1].innerText &&
        board[i][0].innerText === board[i][2].innerText
      ) {
        return true;
      } else if (
        board[0][i].innerText !== "" &&
        board[0][i].innerText === board[1][i].innerText &&
        board[0][i].innerText === board[2][i].innerText
      ) {
        return true;
      }
    }
    if (
      board[0][0].innerText !== "" &&
      board[0][0].innerText === board[1][1].innerText &&
      board[0][0].innerText === board[2][2].innerText
    ) {
      return true;
    }
    if (
      board[2][0].innerText !== "" &&
      board[2][0].innerText === board[1][1].innerText &&
      board[2][0].innerText === board[0][2].innerText
    ) {
      return true;
    }
    return false;
  }

  function checkTie() {
    const filtered = [];
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j].innerText === "") {
          filtered.push(board[i][j]);
        }
      }
    }
    if (filtered.length < 1) {
      //Check if there are any empty cells
      return true;
    }
    return false;
  }

  function lockCells() {
    let cellArray = document.querySelectorAll(".cell");
    cellArray.forEach((cell) => {
      cell.setAttribute("disabled", true);
    });
  }

  function unlockCells() {
    let cellArray = document.querySelectorAll(".cell");
    cellArray.forEach((cell) => {
      cell.removeAttribute("disabled");
    });
  }

  return { createBoard, checkWin, checkTie, lockCells, unlockCells };
}

//Function for handling player data
function playerControls() {
  const players = [
    {
      name: "",
      userToken: "X",
    },
    {
      name: "",
      userToken: "O",
    },
  ];

  function setPlayers(player1, player2) {
    players[0].name = player1;
    players[1].name = player2;
  }
  let activePlayer = players[0];

  function initializeActive() {
    //Always start the game with player 1
    activePlayer = players[0];
  }

  function switchTurn() {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  }

  const getActivePlayer = () => activePlayer;

  return { setPlayers, initializeActive, switchTurn, getActivePlayer };
}

//Game flow
const gameInstance = playGame();
const players = playerControls();

function playGame() {
  let board = null;

  function initializeGame(name1 = "Player 1", name2 = "Player 2") {
    //Default parameters in case the modal is closed
    players.setPlayers(name1, name2);
    if (!board) {
      board = gameBoard();
      board.createBoard();
    }
    renderGame.showStatus(
      "turn",
      players.getActivePlayer().name,
      players.getActivePlayer().userToken
    );
  }

  function playRound(cell) {
    if (cell.innerText !== "") {
      renderGame.showStatus("taken");
    } else {
      const activePlayer = players.getActivePlayer(); // Retrieve the updated activePlayer
      const activeToken = activePlayer.userToken;
      renderGame.addToken(cell, activeToken);

      if (board.checkWin()) {
        renderGame.showStatus("winner", activePlayer.name);
        board.lockCells();
      } else if (board.checkTie()) {
        renderGame.showStatus("tie");
        board.lockCells();
      } else {
        players.switchTurn();
        renderGame.showStatus(
          "turn",
          players.getActivePlayer().name, //Get the active player again after each round
          players.getActivePlayer().userToken
        );
      }
    }
  }
  return { initializeGame, playRound };
}
