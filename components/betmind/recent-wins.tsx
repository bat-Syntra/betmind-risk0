"use client";

import { useEffect, useState } from 'react';

const wins = [
  { user: 'sharpmoney23', amount: 1247, bet: 'parlay' },
  { user: 'betking_', amount: 892, bet: '3-leg parlay' },
  { user: 'ufcfanatic', amount: 2150, bet: 'Makhachev KO' },
  { user: 'nbasharp', amount: 675, bet: 'Lakers spread' },
  { user: 'parlaymaster', amount: 1580, bet: '5-leg parlay' },
];

export function RecentWins() {
  const [currentWin, setCurrentWin] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWin((prev) => (prev + 1) % wins.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const win = wins[currentWin];

  return (
    <div className="bg-neon-green/10 border border-neon-green/20 rounded-lg p-3 mb-4 overflow-hidden">
      <div className="flex items-center gap-2 text-sm animate-fade-in">
        <span className="text-2xl">💰</span>
        <span className="text-gray-400">@{win.user} just hit a</span>
        <span className="text-neon-green font-bold">${win.amount.toLocaleString()}</span>
        <span className="text-gray-400">{win.bet}</span>
      </div>
    </div>
  );
}
