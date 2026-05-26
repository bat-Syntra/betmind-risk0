"use client";

import { useState } from 'react';
import { Lock } from 'lucide-react';

interface BlurredContentProps {
  children: React.ReactNode;
  requiredTier: 'pro' | 'alpha';
  previewText?: string;
}

export function BlurredContent({ children, requiredTier, previewText }: BlurredContentProps) {
  const [userTier] = useState<'free' | 'pro' | 'alpha'>('free');
  
  const hasAccess = userTier === requiredTier || userTier === 'alpha';
  
  if (hasAccess) {
    return <>{children}</>;
  }
  
  const price = requiredTier === 'pro' ? '29' : '99';
  const tierName = requiredTier === 'pro' ? 'Pro' : 'Alpha';
  
  return (
    <div className="relative">
      <div className="blur-md pointer-events-none select-none">
        {children}
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm rounded-lg">
        <div className="text-center p-4">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-neon-green/20 flex items-center justify-center">
            <Lock className="w-6 h-6 text-neon-green" />
          </div>
          <p className="text-white font-semibold mb-1">
            {tierName} Feature
          </p>
          <p className="text-gray-400 text-sm mb-3 max-w-[200px]">
            {previewText || 'Unlock to see full analysis'}
          </p>
          <button className="px-6 py-2 bg-neon-green hover:bg-neon-green/90 text-black font-bold rounded-lg transition-all transform hover:scale-105">
            Unlock for ${price}/mo
          </button>
        </div>
      </div>
    </div>
  );
}
