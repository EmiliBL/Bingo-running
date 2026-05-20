import React from 'react';
import './BingoCard.css';

// Sticker images — drop these in /public/stickers/
// run_sticker.png and break_sticker.png
// For now we use colored circles as fallback

export default function BingoCard({ board, nextEmptyIndex, onTapCell }) {
  return (
    <div className="bingo-wrap">
      <div className="bingo-header">
        <h2 className="bingo-title">Bingo Card</h2>
        <p className="bingo-hint">Tap to log a run · Tap 3× for break</p>
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
      disabled={!!state && state !== null}
    >
      {state === 'run' && (
        <img
          src="/stickers/run_sticker.png"
          alt="ran"
          className="cell-sticker"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      )}
      {state === 'break' && (
        <img
          src="/stickers/break_sticker.png"
          alt="break"
          className="cell-sticker"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      )}
    </button>
  );
}
