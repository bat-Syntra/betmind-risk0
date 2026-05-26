"use client";

import { TrendingUp } from 'lucide-react';

const trendingPicks = [
  { fighter: 'Makhachev', users: 892, sport: 'UFC' },
  { team: 'Lakers -5.5', users: 654, sport: 'NBA' },
  { team: 'Chiefs ML', users: 521, sport: 'NFL' },
  { team: 'Man City', users: 438, sport: 'Football' },
];

export function TrendingPicks() {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp className="w-5 h-5 text-neon-green" />
        <h3 className="text-lg font-bold">Trending Picks</h3>
      </div>
      <div className="flex gap-2 overflow-x-auto scrollbar-none pb-2">
        {trendingPicks.map((pick, i) => (
          <div 
            key={i}
            className="bg-white/5 hover:bg-white/10 rounded-full px-4 py-2 whitespace-nowrap transition-all cursor-pointer border border-white/5"
          >
            <span className="text-neon-green font-bold">+{pick.users}</span>
            <span className="text-gray-400 ml-1">on {pick.fighter || pick.team}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
