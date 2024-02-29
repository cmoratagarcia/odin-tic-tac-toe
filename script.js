//store the gameboard as an array inside of a Gameboard object
function gameBoard() {
  const board = [];
  const rows = 3;
  const columns = 3;

  //Add clear function

  function createBoard() {
    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < columns; j++) {
        board[i].push(renderGame().createCell());
      }
    }
    return board;
  }

  const getBoard = () => board;

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

  return { getBoard, createBoard, checkWin }; //return all board functions
}
let game = gameBoard();
game.createBoard();
let board = game.getBoard();
const players = playerControls("Adam", "Eve");
renderGame().showTurn(players.getActivePlayer().name);

//Your players are also going to be stored in objects, and you’re probably going to want an object to control the flow of the game itself.
function playerControls(player1, player2) {
  const players = [
    {
      name: player1,
      userToken: "X",
    },
    {
      name: player2,
      userToken: "O",
    },
  ];

  let activePlayer = players[0];

  function switchTurn() {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  }

  const getActivePlayer = () => activePlayer;

  return { switchTurn, getActivePlayer };
}

//Rendering
function renderGame() {
  function createCell() {
    let container = document.querySelector(".container");
    let cell = document.createElement("button");
    cell.classList.add("cell");
    cell.innerText = "";
    container.appendChild(cell);

    cell.addEventListener("click", () => playGame().playRound(cell));
    return cell;
  }
  function showTurn(player) {
    const turn = document.querySelector(".turn");
    turn.innerText = `${player}'s turn`;
  }

  const addToken = (cell, token) => {
    cell.innerText = token;
  };
  return { createCell, showTurn, addToken };
}

function playGame() {
  function playRound(cell) {
    if (cell.innerText !== "") {
      alert("This cell has been claimed!");
    } else {
      const activePlayer = players.getActivePlayer(); // Retrieve the updated activePlayer
      const activeToken = activePlayer.userToken;
      renderGame().addToken(cell, activeToken);

      if (game.checkWin()) {
        alert("done!");
      }
      players.switchTurn();

      renderGame().showTurn(activePlayer.name);
    }
  }
  return { playRound };
}
