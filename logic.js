let players = ['x', 'o'];
let activePlayer = 0;
let board = [];
let fieldSize = 3;
let symbol;

function startGame() {
  board = createBoard(fieldSize);
  renderBoard(board);
  activePlayer = 0;
}

function createBoard(fieldSize) {
  let board = [];
  for (let i = 0; i < fieldSize; i++) {
    board.push([]);
    for (let j = 0; j < fieldSize; j++) {
      board[i].push('');
    }
  }
  return board;
}

function click(row, col) {
  symbol = players[activePlayer];
  board[row][col] = symbol;  
  renderBoard(board);
  
  controlWinner(board);
  
  if (activePlayer === 0) {
          activePlayer = 1;
          } else {
          activePlayer = 0;
          }
}

function controlWinner(board) {
  let winner = activePlayer;
  symbol = players[activePlayer];
  let sumSymbolDiagonalR = 0;
  let sumSymbolDiagonalL = 0;
  for (let i = 0; i < fieldSize; i++) {
    let sumSymbolRow = 0;
    let sumSymbolCol = 0;
    
    for (let j = 0; j < fieldSize; j++) {
      if (board[i][j] === symbol) {
        sumSymbolRow ++;
      };
      if (board[j][i] === symbol) {
        sumSymbolCol ++;
      };
      if (board[i][j] === symbol && i === j) {
        sumSymbolDiagonalR ++;
      }
      if (board[i][j] === symbol && i === fieldSize - 1 - j) {
        sumSymbolDiagonalL ++;
      }
    }
  if (sumSymbolRow === fieldSize ||  sumSymbolCol === fieldSize || sumSymbolDiagonalR === fieldSize || sumSymbolDiagonalL === fieldSize) {
    showWinner(winner);
  };
  }
}