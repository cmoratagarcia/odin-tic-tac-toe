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
        board[i].push(renderGame().createCell()); //This will eventually be a button for each cell
      }
    }
  }
  const getBoard = () => board;

  const addToken = (cell, token) => {
    cell.innerText = token;
  };

  function checkWin() {
    for (let i = 0; i < board.length; i++) {
      if (
        board[i][0] != " " && //Change to undefined? or use inner HTML when buttons
        board[i][0] === board[i][1] &&
        board[i][0] === board[i][2]
      ) {
        return true;
      } else if (
        board[0][i] != " " &&
        board[0][i] === board[1][i] &&
        board[0][i] === board[2][i]
      ) {
        return true;
      }
    }
    //Diagonals
    if (
      board[0][0] != " " &&
      board[0][0] === board[1][1] &&
      board[0][0] === board[2][2]
    ) {
      return true;
    }
    if (
      board[2][0] != " " &&
      board[2][0] === board[1][1] &&
      board[2][0] === board[0][2]
    ) {
      return true;
    }
    return false;
  }

  return { getBoard, createBoard, addToken, checkWin }; //return all board functions
}

//Your players are also going to be stored in objects, and you’re probably going to want an object to control the flow of the game itself.
function playerControls(player1, player2) {
  let playerOneName = player1;
  let playerTwoName = player2;

  const players = [
    {
      name: playerOneName,
      userToken: "X",
    },
    {
      name: playerTwoName,
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
const players = playerControls();
function renderGame() {
  function createCell() {
    let container = document.querySelector(".container");
    let cell = document.createElement("button");
    cell.classList.add("cell");
    cell.innerText = "";
    container.appendChild(cell);

    cell.addEventListener("click", () => playRound(cell));
  }

  function playRound(cell) {
    if (cell.innerText !== "") {
      alert("This cell has been claimed!");
    } else {
      players.switchTurn();

      let activePlayer = players.getActivePlayer(); // Retrieve the updated activePlayer
      let activeToken = activePlayer.userToken;
      gameBoard().addToken(cell, activeToken);
    }
  }

  return { createCell, playRound };
}

gameBoard().createBoard();
console.log(`First active ${playerControls().getActivePlayer().userToken}`);
