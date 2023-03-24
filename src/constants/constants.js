export const initialBoard = [
  [0, 2, 0, 2, 0, 2, 0, 2], // row 0
  [2, 0, 2, 0, 2, 0, 2, 0], // row 1
  [0, 2, 0, 2, 0, 2, 0, 2], // row 1
  [0, 0, 0, 0, 0, 0, 0, 0], // row 3
  [0, 0, 0, 0, 0, 0, 0, 0], // row 4
  [1, 0, 1, 0, 1, 0, 1, 0], // row 5
  [0, 1, 0, 1, 0, 1, 0, 1], // row 6
  [1, 0, 1, 0, 1, 0, 1, 0], // row 7
];

export const initialState = {
  selectedPiece: null,
  currentPlayer: 1,
  validMoves: [],
  isPieceCapturable: false,
  AIMove: {},
  moveCount: 0,
  moveHistory: [],
};
