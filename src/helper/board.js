export const movePiece = ({
  board,
  validMoves,
  row,
  col,
  selectedPiece,
  setMoveCount,
}) => {
  const newBoard = [...board];
  // If the move is a capture, remove the captured piece from the board
  const capturingMove = validMoves?.find(
    (move) => move.row === row && move.col === col && move.captured
  );
  if (capturingMove) {
    const { captured } = capturingMove;
    newBoard[captured.row][captured.col] = 0;
  }

  // Update the board with the new piece position
  newBoard[row][col] = board[selectedPiece.row][selectedPiece.col];
  newBoard[selectedPiece.row][selectedPiece.col] = 0;
  setMoveCount((moveCount) => moveCount + 1);
  return newBoard;
};
