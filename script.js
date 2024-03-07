//Rendering
const renderGame = (function () {
  const submitBtn = document.querySelector(".submit");
  const playerOne = document.querySelector("#player1");
  const playerTwo = document.querySelector("#player2");
  const newGame = document.querySelector(".new-game");
  const rematch = document.querySelector(".play-again");
  const playerForm = document.querySelector("dialog");
  const closeDialog = document.querySelector(".close-dialog");
  const container = document.querySelector(".container");

  function openModal() {
    playerForm.showModal();
  }

  window.onload = openModal;

  closeDialog.addEventListener("click", () => {
    playerForm.close();
  });

  submitBtn.addEventListener("click", () =>
    gameInstance.initializeGame(playerOne.value, playerTwo.value)
  );

  newGame.addEventListener("click", openModal);
  // rematch.addEventListener("click", () => {
  //   playGame();
  // });

  function createCell() {
    let cell = document.createElement("button");
    cell.classList.add("cell");
    cell.innerText = "";
    container.appendChild(cell);

    cell.addEventListener("click", () => gameInstance.playRound(cell));
    return cell;
  }

  function clearCells() {
    let cellArray = document.querySelectorAll(".cell");
    cellArray.forEach((cell) => {
      cell.innerText = "";
    });
  }

  function addToken(cell, token) {
    cell.innerText = token;
  }

  function showStatus(status, player) {
    const turn = document.querySelector(".turn");

    switch (status) {
      case "turn":
        turn.innerText = `${player}'s turn`;
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
    clearCells,
    showStatus,
    addToken,
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
      return true;
    }
    return false;
  }

  return { createBoard, checkWin, checkTie };
}

//Your players are also going to be stored in objects, and you’re probably going to want an object to control the flow of the game itself.
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

  function switchTurn() {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  }

  const getActivePlayer = () => activePlayer;

  return { setPlayers, switchTurn, getActivePlayer };
}

//Game flow
const gameInstance = playGame();
function playGame() {
  let players = playerControls();
  let game;

  function initializeGame(name1, name2) {
    players.setPlayers(name1, name2);
    game = gameBoard();
    game.createBoard();
    renderGame.showStatus("turn", players.getActivePlayer().name);
  }

  function playRound(cell) {
    if (cell.innerText !== "") {
      renderGame.showStatus("taken");
    } else {
      const activePlayer = players.getActivePlayer(); // Retrieve the updated activePlayer
      const activeToken = activePlayer.userToken;
      renderGame.addToken(cell, activeToken);

      if (game.checkWin()) {
        renderGame.showStatus("winner", activePlayer.name);
        setTimeout(() => renderGame.clearCells(), 500);
      } else if (game.checkTie()) {
        renderGame.showStatus("tie");
        setTimeout(() => renderGame.clearCells(), 500);
      } else {
        players.switchTurn();
        renderGame.showStatus("turn", players.getActivePlayer().name);
      }
    }
  }
  return { initializeGame, playRound };
}
