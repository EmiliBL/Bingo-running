import React from 'react';
import './BingoCard.css';


export default function BingoCard({ board, nextEmptyIndex, onTapCell }) {
  return (
    <div className="bingo-wrap">
      <div className="bingo-header">
        <h2 className="bingo-title">Bingo Card</h2>
        <p className="bingo-hint">Tap 1 time for run, tap two times for break</p>
      </div>

      <div className="bingo-grid">
        {board.map((cell, i) => (
          <Cell
            key={i}
            state={cell}
            isNext={i === nextEmptyIndex}
            onTap={() => onTapCell(i)}
          />
        ))}
      </div>
    </div>
  );
}

function Cell({ state, isNext, onTap }) {
  return (
    <button
      className={[
        'bingo-cell',
        state === 'run' ? 'bingo-cell--run' : '',
        state === 'break' ? 'bingo-cell--break' : '',
        isNext ? 'bingo-cell--next' : '',
        !state && !isNext ? 'bingo-cell--empty' : '',
      ].join(' ')}
      onClick={onTap}
      disabled={false}
    >
      {state === 'run' && (
        <img
          src="/stickers/run_sticker.svg"
          alt="ran"
          className="cell-sticker"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      )}
      {state === 'break' && (
        <img
          src="/stickers/break_sticker.svg"
          alt="break"
          className="cell-sticker"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      )}
    </button>
  );
}
