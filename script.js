//store the gameboard as an array inside of a Gameboard object
function Gameboard(rows, columns) {
  let board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(createCell(j));
    }
  }

  return board;
}

//Your players are also going to be stored in objects, and you’re probably going to want an object to control the flow of the game itself.
// function gamePlay() {}
// const players = [
//   {
//     name: playerOneName,
//     userToken: "X",
//   },
//   {
//     name: playerTwoName,
//     userToken: "O",
//   },
// ];
function createCell(index) {
  let cellToken = "";
  const markCell = (token) => {
    cellToken = token;
  };
  return { index, cellToken };
}
console.log(Gameboard(3, 3));
