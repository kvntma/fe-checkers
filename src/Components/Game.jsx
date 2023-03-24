import "./game.css";
import React, { useEffect, useState } from "react";
import { initialBoard, initialState } from "../constants/constants";
import {
  getValidMoves,
  isSquareInList,
  getPlayerMoves,
  chooseRandomMove,
} from "../helper/helpers";
import Checkerboard from "./Checkerboard";
import { movePiece } from "../helper/board";

function Game() {
  const [board, setBoard] = useState(JSON.parse(JSON.stringify(initialBoard)));
  const [selectedPiece, setSelectedPiece] = useState(
    initialState.selectedPiece
  );
  const [currentPlayer, setCurrentPlayer] = useState(
    initialState.currentPlayer
  );
  const [validMoves, setValidMoves] = useState(initialState.validMoves);
  const [isPieceCapturable, setIsPieceCapturable] = useState(
    initialState.isPieceCapturable
  );
  const [AIMove, setAIMove] = useState(initialState.AIMove);
  const [moveCount, setMoveCount] = useState(initialState.moveCount);
  const [moveHistory, setMoveHistory] = useState(initialState.moveHistory);

  useEffect(() => {
    if (moveCount !== 0) {
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board]);

  useEffect(() => {
    const playerMoves = getPlayerMoves(currentPlayer, board);
    const pieceCapturable = playerMoves?.some((move) => move.captured);
    setIsPieceCapturable(pieceCapturable);
    if (currentPlayer === 2) {
      let validMovePool = playerMoves;
      if (pieceCapturable) {
        validMovePool = playerMoves.filter((move) => move.captured);
      }
      const { row, col, origRow, origCol } = chooseRandomMove(validMovePool);
      setAIMove({ row, col, origRow, origCol });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlayer]);

  useEffect(() => {
    if (currentPlayer === 2) {
      const validAIMoves = getValidMoves(
        AIMove.origRow,
        AIMove.origCol,
        2,
        board,
        isPieceCapturable
      );
      const newBoard = movePiece({
        setMoveCount,
        board,
        validMoves: validAIMoves,
        row: AIMove.row,
        col: AIMove.col,
        selectedPiece: { row: AIMove.origRow, col: AIMove.origCol },
      });
      setTimeout(() => {
        setBoard(newBoard);
        setSelectedPiece(null);
        setValidMoves([]);
      }, 700);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [AIMove]);

  const handleSquareClick = (row, col) => {
    const piece = board[row][col];
    // Check if it's the current player's turn
    if (piece !== currentPlayer && piece !== 0) {
      return;
    }

    if (piece !== 0) {
      setSelectedPiece({ row, col });
      setValidMoves(getValidMoves(row, col, piece, board, isPieceCapturable));
    }

    // If a piece is already selected, try to move it to the clicked square
    if (selectedPiece && isSquareInList({ row, col }, validMoves)) {
      const newBoard = movePiece({
        setMoveCount,
        board,
        validMoves,
        row,
        col,
        selectedPiece,
      });

      setBoard(newBoard);
      setMoveHistory([...moveHistory, JSON.parse(JSON.stringify(board))]);
      setSelectedPiece(null);
      setValidMoves([]);
    } else if (
      // If the clicked square is the selected piece, unselect it
      selectedPiece &&
      (piece === 0 || piece === selectedPiece.piece)
    ) {
      setSelectedPiece(null);
      setValidMoves([]);
    }
  };

  const handleSquareMouseEnter = (row, col) => {
    const piece = board[row][col];

    if (piece === 0 && !selectedPiece && validMoves?.length > 0)
      setValidMoves([]);
    if (piece === 0) return;
    // If no piece is selected, highlight the hovered square if it's a valid move
    if (!selectedPiece && piece === 1) {
      setValidMoves(getValidMoves(row, col, piece, board, isPieceCapturable));
    }
  };

  const resetGame = () => {
    if (moveHistory.length > 0) {
      setBoard(JSON.parse(JSON.stringify(initialBoard)));
      setSelectedPiece(initialState.selectedPiece);
      setCurrentPlayer(initialState.currentPlayer);
      setValidMoves(initialState.validMoves);
      setIsPieceCapturable(initialState.isPieceCapturable);
      setAIMove(initialState.AIMove);
      setMoveCount(initialState.moveCount);
      setMoveHistory(initialState.moveHistory);
    }
  };

  return (
    <>
      <button
        class="reset-button"
        onClick={resetGame}
        disabled={moveHistory.length === 0 || moveCount === 0}
      >
        Reset Game
      </button>
      <Checkerboard
        board={board}
        handleSquareClick={handleSquareClick}
        selectedPiece={selectedPiece}
        handleSquareMouseEnter={handleSquareMouseEnter}
        validMoves={validMoves}
      />
    </>
  );
}

export default Game;
