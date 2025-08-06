import { useState } from 'react';
import './App.css';
// Square Component
function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

// Main Board Component
export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(squares);
  const status = winner
    ? `🎉 Winner: ${winner}`
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  function handleClick(index) {
    if (squares[index] || winner) return;

    const nextSquares = [...squares];
    nextSquares[index] = xIsNext ? 'X' : 'O';

    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  // 3x3 board using map (instead of repeating rows)
  const renderSquare = (i) => (
    <Square
      key={i}
      value={squares[i]}
      onClick={() => handleClick(i)}
    />
  );

  const boardRows = [0, 1, 2].map((row) => (
    <div key={row} className="board-row">
      {renderSquare(row * 3)}
      {renderSquare(row * 3 + 1)}
      {renderSquare(row * 3 + 2)}
    </div>
  ));

  return (
    <div className="game">
      <div className="status">{status}</div>
      {boardRows}
    </div>
  );
}

// Winner Logic
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6],            // Diagonals
  ];

  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}
