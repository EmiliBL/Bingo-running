import { useLocalStorage } from './useLocalStorage';

const TOTAL_CELLS = 30;

function makeEmptyBoard() {
  return Array(TOTAL_CELLS).fill(null);
}

export function useBingo() {
  const [board, setBoard] = useLocalStorage('bingo_board', makeEmptyBoard());
  const [myCount, setMyCount] = useLocalStorage('my_run_count', 0);
  const [julieCount, setJulieCount] = useLocalStorage('julie_run_count', 0);

  const combined = myCount + julieCount;
  const nextEmptyIndex = board.findIndex((cell) => cell === null);

  function markRun(index) {
    const newBoard = [...board];
    newBoard[index] = 'run';
    setBoard(newBoard);
  }

  function markBreak(index) {
    const newBoard = [...board];
    newBoard[index] = 'break';
    setBoard(newBoard);
  }

  function incrementCount() {
    setMyCount((c) => c + 1);
  }

  function syncJulieCount(count) {
    setJulieCount(count);
  }

  function resetBoard() {
    setBoard(makeEmptyBoard());
    setMyCount(0);
  }

  return {
    board,
    myCount,
    julieCount,
    combined,
    nextEmptyIndex,
    markRun,
    markBreak,
    incrementCount,
    syncJulieCount,
    resetBoard,
  };
}