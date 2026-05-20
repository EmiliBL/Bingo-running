import { useLocalStorage } from './useLocalStorage';

const TOTAL_CELLS = 25; // 5x5 grid

// Each cell can be: null | 'run' | 'break'
function makeEmptyBoard() {
  return Array(TOTAL_CELLS).fill(null);
}

export function useBingo() {
  const [board, setBoard] = useLocalStorage('bingo_board', makeEmptyBoard());
  const [myCount, setMyCount] = useLocalStorage('my_run_count', 0);
  const [julieCount, setJulieCount] = useLocalStorage('julie_run_count', 0);
  const [tapCounts, setTapCounts] = useLocalStorage('tap_counts', Array(TOTAL_CELLS).fill(0));

  const combined = myCount + julieCount;

  // Find the next empty cell index
  const nextEmptyIndex = board.findIndex((cell) => cell === null);

  // Tap a cell:
  // 1 tap = 'run'
  // 3 taps = 'break'
  // tap on filled = nothing
  function tapCell(index) {
    if (board[index] !== null) return; // already filled
    if (index !== nextEmptyIndex) return; // must fill in order

    const newTapCounts = [...tapCounts];
    newTapCounts[index] = (newTapCounts[index] || 0) + 1;
    setTapCounts(newTapCounts);

    return newTapCounts[index]; // return tap count so App can decide CTA
  }

  function markRun(index) {
    const newBoard = [...board];
    newBoard[index] = 'run';
    setBoard(newBoard);
    setMyCount((c) => c + 1);
    // reset tap count for this cell
    const newTapCounts = [...tapCounts];
    newTapCounts[index] = 0;
    setTapCounts(newTapCounts);
  }

  function markBreak(index) {
    const newBoard = [...board];
    newBoard[index] = 'break';
    setBoard(newBoard);
    const newTapCounts = [...tapCounts];
    newTapCounts[index] = 0;
    setTapCounts(newTapCounts);
  }

  // Called when Julie taps the magic link in her email
  function syncJulieCount(count) {
    setJulieCount(count);
  }

  function resetBoard() {
    setBoard(makeEmptyBoard());
    setTapCounts(Array(TOTAL_CELLS).fill(0));
  }

  return {
    board,
    myCount,
    julieCount,
    combined,
    nextEmptyIndex,
    tapCounts,
    tapCell,
    markRun,
    markBreak,
    syncJulieCount,
    resetBoard,
  };
}
