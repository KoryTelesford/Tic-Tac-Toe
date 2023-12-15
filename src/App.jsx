import { useState } from 'react';
import './App.css'

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else if (squares.every(square => square !== null)) {
    status = "It's a tie";
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  console.log(status)

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [XScore, setXScore] = useState(0);
  const [OScore, setOScore] = useState(0);
  const [TieScore, setTieScore] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  
    const winner = calculateWinner(nextSquares);
    if (winner === 'X') {
      setXScore(prevXScore => {
        const newScore = prevXScore + 1;
        localStorage.setItem('XScore', newScore);
        return newScore;
      });
    } else if (winner === 'O') {
      setOScore(prevOScore => {
        const newScore = prevOScore + 1;
        localStorage.setItem('OScore', newScore);
        return newScore;
      });
    } else if (nextSquares.every(square => square !== null)) {
      setTieScore(prevTieScore => {
        const newScore = prevTieScore + 1;
        localStorage.setItem('TieScore', newScore);
        return newScore;
      });
    }
  }
  

  return (
    <div className="game">
      <div className='Bar'>
       <div className='Bar_Me'>
        <button id="close_bar"> X </button>
        <h2> Menu </h2>
       </div>
       <div className='Re_Menijm'>
        <div className='Bar_Butto'>
          <button id="reset_bar"> Reset Board </button>
        </div>
        <div className='Bar_Butto'>
          <button id="menunujn_bar"> Main Menu </button>
        </div>
      </div>
      
       
      </div>
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      {/* <div className="game-info">
        <ol>{moves}</ol>
      </div> */}
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

