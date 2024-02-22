//store the gameboard as an array inside of a Gameboard object
function Gameboard(rows, columns) {
  let board = [];

  //Add clear function

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(createCell(j)); //This will eventually be a button for each cell
    }
  }

  function checkWin(board) {
    for (let i = 0; i < board.length; i++) {
      if (
        board[i][0] != " " &&
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
      board[0][2] != " " &&
      board[0][2] === board[1][1] &&
      board[0][2] === board[2][0]
    ) {
      return true;
    }
    return false;
  }

  return board; //return other board functions
}

//Your players are also going to be stored in objects, and you’re probably going to want an object to control the flow of the game itself.
// function gamePlay() {}

// function createPlayer (name, team, active) {
// 	return {name, team}, active;
// };
// // const players = [
//   {
//     name: playerOneName,
//     userToken: "X",
//     active: true,
// //   },
// //   {
// //     name: playerTwoName,
// //     userToken: "O",
//        active: false,
// //   },
// ];

function createCell(index) {
  let cellToken = "";
  const markCell = (token) => {
    cellToken = token;
  };
  const getToken = () => cellToken;

  return { index, markCell, getToken };
}

console.log(Gameboard(3, 3).length);
