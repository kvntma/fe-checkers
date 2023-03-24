import classNames from "classnames";

export const isSquareInList = (square, moves) => {
  return moves?.some(
    (move) => move.row === square.row && move.col === square.col
  );
};

export const getValidMoves = (row, col, player, board, isPieceCapturable) => {
  const moves = [];
  let capturingMoves = [];

  // Check for capturing moves
  if (player === 1) {
    //capture piece to the left
    if (
      col > 0 && // checks left side of board
      row > 1 && // checks top of board
      board[row - 1][col - 1] === 2 &&
      board[row - 2][col - 2] === 0
    ) {
      capturingMoves.push({
        row: row - 2,
        col: col - 2,
        captured: { row: row - 1, col: col - 1 },
      });
    }
    //capture piece to the right
    if (
      col < 7 && // checks right side of board
      row > 1 && // checks top of board
      board[row - 1][col + 1] === 2 &&
      board[row - 2][col + 2] === 0
    ) {
      capturingMoves.push({
        row: row - 2,
        col: col + 2,
        captured: { row: row - 1, col: col + 1 },
      });
    }
  } else {
    //player 2 capturing moves
    if (
      row < 7 && // checks bottom of board
      col > 1 && // checks left side of board
      board[row + 1][col - 1] === 1 &&
      board[row + 2][col - 2] === 0
    ) {
      capturingMoves.push({
        row: row + 2,
        col: col - 2,
        captured: { row: row + 1, col: col - 1 },
      });
    }
    //capture piece to the right from top (player 2)
    if (
      row < 7 && // checks bottom of board
      col < 7 && // checks right side of board
      board[row + 1][col + 1] === 1 &&
      board[row + 2][col + 2] === 0
    ) {
      capturingMoves.push({
        row: row + 2,
        col: col + 2,
        captured: { row: row + 1, col: col + 1 },
      });
    }
  }

  // force capturing moves
  if (capturingMoves?.length > 0) {
    return capturingMoves;
  }

  if (isPieceCapturable) return;

  // Check for non-capturing moves
  if (player === 1) {
    if (col > 0 && row > 0 && board[row - 1][col - 1] === 0) {
      moves.push({ row: row - 1, col: col - 1 });
    }
    if (col < 7 && row > 0 && board[row - 1][col + 1] === 0) {
      moves.push({ row: row - 1, col: col + 1 });
    }
  } else {
    if (col > 0 && row < 7 && board[row + 1][col - 1] === 0) {
      moves.push({ row: row + 1, col: col - 1 });
    }
    if (col < 7 && row < 7 && board[row + 1][col + 1] === 0) {
      moves.push({ row: row + 1, col: col + 1 });
    }
  }

  return moves;
};

export const getPlayerMoves = (player, board) => {
  const moves = [];
  for (let row = 0; row < board?.length; row++) {
    for (let col = 0; col < board[row]?.length; col++) {
      if (board[row][col] === player) {
        const validMoves = getValidMoves(row, col, player, board);
        validMoves.forEach((move) => {
          moves.push({
            ...move,
            origRow: row,
            origCol: col,
          });
        });
      }
    }
  }
  return moves;
};

export const getSquareClasses = (
  colIndex,
  rowIndex,
  square,
  selectedPiece,
  validMoves
) => {
  const squareClasses = classNames("square", {
    light: colIndex % 2 === rowIndex % 2,
    dark: colIndex % 2 !== rowIndex % 2,
    "red-piece": square === 1,
    "black-piece": square === 2,
    selected:
      selectedPiece &&
      selectedPiece.row === rowIndex &&
      selectedPiece.col === colIndex,
    "valid-move": isSquareInList({ row: rowIndex, col: colIndex }, validMoves),
  });

  return squareClasses;
};

export function chooseRandomMove(moves) {
  const randomIndex = Math.floor(Math.random() * moves.length);
  return moves[randomIndex];
}
