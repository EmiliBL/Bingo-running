import React from 'react';
import './CTABar.css';

export default function CTABar({ onAction, loading, pendingIndex, tapCount }) {
  // Show CTAs only if a cell is being tapped (tapCount > 0)
  // Or always show them for clarity

  return (
    <div className="cta-bar">
      <button
        className="cta cta--ghost"
        onClick={() => onAction('break')}
        disabled={loading}
      >
        Didn't feel like it
      </button>

      <button
        className="cta cta--mid"
        onClick={() => onAction('shit_run')}
        disabled={loading}
      >
        Shit run, but did it
      </button>

      <button
        className="cta cta--primary"
        onClick={() => onAction('ran')}
        disabled={loading}
      >
        {loading ? 'Sending…' : 'I RAN TODAY 🏃'}
      </button>
    </div>
  );
}
