import React, { useState, useEffect, useCallback } from 'react';
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
    syncJulieCount,
    resetBoard,
  } = useBingo();

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState('');

  // ── Handle magic sync link ──────────────────────────
  // When Julie taps the email link, URL has ?sync_user=emilie&count=12
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const syncUser = params.get('sync_user');
    const count = parseInt(params.get('count'), 10);

    if (syncUser && !isNaN(count)) {
      // Only sync the OTHER user's count into our localStorage
      if (syncUser !== CURRENT_USER) {
        syncJulieCount(count);
        setToast(`${USERS[syncUser].name}'s count synced! 🔄`);
      }
      // Clean the URL without reloading
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, [syncJulieCount]);

  // ── Handle CTA taps ────────────────────────────────
  const handleAction = useCallback(async (type) => {
    if (nextEmptyIndex === -1) {
      setToast('Board complete! 🎉 New month, new card.');
      return;
    }

    const isRun = type === 'ran' || type === 'shit_run';

    // Update the board locally first (feels instant)
    if (isRun) {
      markRun(nextEmptyIndex);
    } else {
      markBreak(nextEmptyIndex);
    }

    // Send email to the other person
    setLoading(true);
    const newCount = isRun ? myCount + 1 : myCount;
    const success = await sendRunEmail(type, newCount);
    setLoading(false);

    if (success) {
      const msgs = {
        ran: 'Run logged! Julie got your message 📬',
        shit_run: 'Logged! Even a shit run counts 💪',
        break: 'Rest day logged 🛋️',
      };
      setToast(msgs[type]);
    } else {
      setToast('Logged! (Email failed — check config)');
    }
  }, [nextEmptyIndex, markRun, markBreak, myCount]);

  return (
    <div className="app">
      <Toast message={toast} onDone={() => setToast('')} />

      {/* Header */}
      <div className="app-header">
        <h1 className="app-title">Running<br />Bingo</h1>
        <p className="app-subtitle">The running support group</p>
      </div>

      {/* Banner with photos + counter */}
      <Banner combined={combined} />

      {/* Bingo grid */}
      <BingoCard
        board={board}
        nextEmptyIndex={nextEmptyIndex}
        onTapCell={() => {}} /* tapping cell is decorative; CTAs do the action */
      />

      {/* Spacer so content isn't hidden behind fixed CTAs */}
      <div style={{ height: 160 }} />

      {/* Fixed bottom CTAs */}
      <CTABar
        onAction={handleAction}
        loading={loading}
      />

      {/* Dev only: reset board */}
      {process.env.NODE_ENV === 'development' && (
        <button
          onClick={resetBoard}
          style={{
            position: 'fixed', top: 8, right: 8,
            background: 'rgba(0,0,0,0.1)', border: 'none',
            borderRadius: 8, padding: '4px 8px',
            fontSize: 11, color: '#532F07', cursor: 'pointer'
          }}
        >
          reset
        </button>
      )}
    </div>
  );
}
