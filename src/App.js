import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useBingo } from './hooks/useBingo';
import { initEmailJS, sendRunEmail } from './utils/email';
import Banner from './components/Banner';
import BingoCard from './components/BingoCard';
import CTABar from './components/CTABar';
import Toast from './components/Toast';
import { USERS, CURRENT_USER } from './config';
import './App.css';

initEmailJS();

export default function App() {
  const {
    board,
    myCount,
    combined,
    nextEmptyIndex,
    markRun,
    markBreak,
    incrementCount,
    syncJulieCount,
    resetBoard,
  } = useBingo();

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState('');
  const [streakTimer, setStreakTimer] = useState(null);
  const lastTappedState = useRef(null);

  // ── Handle magic sync link ──────────────────────────
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const syncUser = params.get('sync_user');
    const count = parseInt(params.get('count'), 10);

    if (syncUser && !isNaN(count)) {
      if (syncUser !== CURRENT_USER) {
        syncJulieCount(count);
        setToast(`${USERS[syncUser].name}'s count synced! 🔄`);
      }
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, [syncJulieCount]);

  // ── Cell tap — tap 1 = run, tap 2 = break ──────────
  const handleCellTap = (index) => {
    if (streakTimer) clearTimeout(streakTimer);

    let nextState;
    if (board[index] === null) {
      nextState = 'run';
    } else if (board[index] === 'run') {
      nextState = 'break';
    } else {
      nextState = 'run';
    }

    if (nextState === 'run') {
      markRun(index);
      setToast('Run 🏃 — tap again for break');
    } else {
      markBreak(index);
      setToast('Break 🛋️ — tap again for run');
    }

    lastTappedState.current = nextState;

    const timer = setTimeout(() => {
      if (lastTappedState.current === 'run') {
        incrementCount();
        setToast('Run counted! 🔥');
      }
      setStreakTimer(null);
    }, 3000);

    setStreakTimer(timer);
  };

  // ── CTAs — only send email, no board changes ────────
  const handleAction = useCallback(async (type) => {
    setLoading(true);
    const success = await sendRunEmail(type, myCount);
    setLoading(false);

    const msgs = {
      ran: 'Julie got your message 📬',
      shit_run: 'Julie got your message 📬',
      break: 'Not feeling it today — Julie knows 💛',
    };
    setToast(success ? msgs[type] : 'Email failed — check config');
  }, [myCount]);

  return (
    <div className="app">
      <Toast message={toast} onDone={() => setToast('')} />

      <div className="app-header">
        <h1 className="app-title">Running<br />Bingo</h1>
        <p className="app-subtitle">The running support group</p>
      </div>

      <Banner combined={combined} />

      <div className="app-bingo-section">
        <BingoCard
          board={board}
          nextEmptyIndex={nextEmptyIndex}
          onTapCell={handleCellTap}
        />
      </div>


      <CTABar
        onAction={handleAction}
        loading={loading}
      />

      {process.env.NODE_ENV === 'development' && (
        <button
          onClick={resetBoard}
          style={{
            position: 'fixed', top: 8, right: 8,
            background: 'rgba(0,0,0,0.1)', border: 'none',
            borderRadius: 8, padding: '4px 8px',
            fontSize: 11, color: '#FFB3DE', cursor: 'pointer'
          }}
        >
          reset
        </button>
      )}
    </div>
  );
}