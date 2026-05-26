"use client";

import { useState, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';

export function UpgradeToast() {
  const [isVisible, setIsVisible] = useState(false);
  const [viewCount, setViewCount] = useState(0);

  useEffect(() => {
    const count = parseInt(localStorage.getItem('lockedViewCount') || '0');
    setViewCount(count);
    
    if (count >= 3 && !localStorage.getItem('upgradeToastDismissed')) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('upgradeToastDismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 animate-slide-up">
      <div className="bg-gradient-to-r from-neon-green to-neon-cyan rounded-lg p-4 shadow-2xl relative">
        <button 
          onClick={handleDismiss}
          className="absolute top-2 right-2 text-black/60 hover:text-black"
        >
          <X className="w-4 h-4" />
        </button>
        
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-black" />
          </div>
          <div className="flex-1">
            <p className="text-black font-bold text-lg">Unlock all predictions</p>
            <p className="text-black/70 text-sm mb-3">Join 2,847 winning bettors</p>
            <button className="bg-black text-neon-green px-6 py-2 rounded-lg font-bold hover:bg-gray-900 transition-all transform hover:scale-105">
              Start Free Trial →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function trackLockedView() {
  if (typeof window !== 'undefined') {
    const count = parseInt(localStorage.getItem('lockedViewCount') || '0');
    localStorage.setItem('lockedViewCount', String(count + 1));
  }
}
