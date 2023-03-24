import "./checkerboard.css";
import React from "react";
import { getSquareClasses } from "../helper/helpers";

function Checkerboard(props) {
  const {
    board,
    handleSquareClick,
    selectedPiece,
    handleSquareMouseEnter,
    validMoves,
  } = props;

  return (
    <div className="checkerboard">
      {board.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((square, colIndex) => (
            <div
              className={getSquareClasses(
                colIndex,
                rowIndex,
                square,
                selectedPiece,
                validMoves
              )}
              key={`${rowIndex}-${colIndex}`}
              onClick={() => handleSquareClick(rowIndex, colIndex)}
              onMouseEnter={() => handleSquareMouseEnter(rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Checkerboard;
