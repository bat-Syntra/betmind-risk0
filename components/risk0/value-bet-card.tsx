'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Target, BarChart3 } from 'lucide-react'
import { ValueBet } from '@/lib/types'
import { BadgePill } from './badge-pill'

export function ValueBetCard({ bet, index = 0 }: { bet: ValueBet; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="rounded-lg border border-neon-green/20 bg-neon-green/5 p-4"
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground">{bet.market}</span>
        <BadgePill variant="value" label={`+${bet.expectedValue.toFixed(1)}% EV`} />
      </div>

      <div className="mb-3 grid grid-cols-3 gap-3">
        <div className="flex flex-col items-center gap-1 rounded-lg bg-secondary/30 p-2">
          <BarChart3 className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Odds</span>
          <span className="text-sm font-bold text-foreground">{bet.currentOdds.toFixed(2)}</span>
        </div>
        <div className="flex flex-col items-center gap-1 rounded-lg bg-secondary/30 p-2">
          <Target className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">AI Prob</span>
          <span className="text-sm font-bold text-neon-green">{bet.trueProbability}%</span>
        </div>
        <div className="flex flex-col items-center gap-1 rounded-lg bg-secondary/30 p-2">
          <TrendingUp className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Edge</span>
          <span className="text-sm font-bold text-neon-cyan">{bet.edge.toFixed(1)}%</span>
        </div>
      </div>

      <p className="mb-3 text-xs leading-relaxed text-muted-foreground">{bet.reasoning}</p>

      <div className="flex items-center justify-between rounded-lg bg-neon-green/10 px-3 py-2">
        <span className="text-xs text-muted-foreground">Suggested Stake</span>
        <span className="text-sm font-bold text-neon-green">{bet.suggestedStake}</span>
      </div>
    </motion.div>
  )
}
