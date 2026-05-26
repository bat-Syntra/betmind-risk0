'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Trash2, Ticket } from 'lucide-react'
import { ParlayPick } from '@/lib/types'

export function ParlayView({
  picks,
  onRemovePick,
  onClear,
}: {
  picks: ParlayPick[]
  onRemovePick: (eventId: string) => void
  onClear: () => void
}) {
  const combinedOdds = picks.reduce((acc, pick) => acc * pick.odds, 1)
  const suggestedStake = 45
  const potentialPayout = combinedOdds * suggestedStake

  return (
    <div className="flex flex-col px-4 pb-24">
      {picks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/60">
            <Ticket className="h-7 w-7 text-muted-foreground/40" />
          </div>
          <p className="mb-1 text-sm font-semibold text-foreground">No picks yet</p>
          <p className="text-center text-xs text-muted-foreground">
            Tap odds on any match to start building your parlay
          </p>
        </div>
      ) : (
        <>
          {/* Picks list */}
          <div className="mb-4 flex flex-col gap-2">
            <AnimatePresence>
              {picks.map((pick) => (
                <motion.div
                  key={pick.eventId}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center justify-between rounded-2xl bg-secondary/50 px-4 py-3"
                >
                  <div>
                    <p className="text-[13px] font-semibold text-foreground">{pick.selection}</p>
                    <p className="text-[11px] text-muted-foreground">
                      {pick.participant1Name} vs {pick.participant2Name}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold tabular-nums text-neon-green">
                      {pick.odds.toFixed(2)}
                    </span>
                    <button
                      onClick={() => onRemovePick(pick.eventId)}
                      className="flex h-7 w-7 items-center justify-center rounded-lg bg-hot-red/10 text-hot-red transition-colors active:bg-hot-red/20"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary card */}
          <div className="mb-4 rounded-2xl bg-neon-green/5 p-4">
            <div className="mb-3 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Combined Odds</span>
                <span className="text-sm font-bold tabular-nums text-foreground">{combinedOdds.toFixed(2)}x</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Expected Value</span>
                <span className="text-sm font-bold text-neon-green">+12.8% EV</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">AI Confidence</span>
                <span className="text-sm font-bold text-neon-cyan">68%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Kelly Stake</span>
                <span className="text-sm font-bold text-foreground">${suggestedStake}</span>
              </div>
            </div>
            <div className="border-t border-border pt-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Potential Payout</span>
                <span className="text-xl font-black tabular-nums text-neon-green">
                  ${potentialPayout.toFixed(0)}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <button className="mb-3 w-full rounded-2xl bg-neon-green py-3.5 text-sm font-bold text-primary-foreground transition-all active:scale-[0.98] active:bg-neon-green/90">
            Place Parlay
          </button>
          <button
            onClick={onClear}
            className="flex w-full items-center justify-center gap-1.5 py-2 text-xs font-medium text-muted-foreground transition-colors active:text-hot-red"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Clear All Picks
          </button>
        </>
      )}
    </div>
  )
}
