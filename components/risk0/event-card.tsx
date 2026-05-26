'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Clock, Star, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Event } from '@/lib/types'
import { BadgePill } from './badge-pill'
import { OddsButton } from './odds-button'
import { UserAvatars } from '@/components/betmind/user-avatars'

function Avatar({ name, shortName }: { name: string; shortName: string }) {
  const hues: Record<string, string> = {
    A: 'from-emerald-500/25 to-teal-500/25',
    B: 'from-blue-500/25 to-cyan-500/25',
    C: 'from-amber-500/25 to-orange-500/25',
    D: 'from-rose-500/25 to-pink-500/25',
    E: 'from-violet-500/25 to-purple-500/25',
    F: 'from-sky-500/25 to-indigo-500/25',
    G: 'from-lime-500/25 to-green-500/25',
  }
  const letter = name.charAt(0).toUpperCase()
  const hue = hues[letter] || hues['A']
  return (
    <div
      className={cn(
        'flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-[11px] font-bold text-foreground',
        hue
      )}
    >
      {shortName.slice(0, 3).toUpperCase()}
    </div>
  )
}

function formatTime(dateStr: string) {
  const date = new Date(dateStr)
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
}

export function EventCard({
  event,
  index = 0,
  isFavorite,
  onToggleFavorite,
  onAddToParlay,
}: {
  event: Event
  index?: number
  isFavorite?: boolean
  onToggleFavorite?: (id: string) => void
  onAddToParlay?: (eventId: string, selection: string, odds: number) => void
}) {
  const { participant1, participant2 } = event

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="glass-card overflow-hidden rounded-2xl"
    >
      {/* Tap area for analysis */}
      <Link href={`/analysis/${event.id}`} className="block px-4 pt-3 pb-2.5">
        {/* Top row: league + meta */}
        <div className="mb-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              {event.league}
            </span>
            {event.status === 'live' && <BadgePill variant="live" />}
          </div>
          <div className="flex items-center gap-1.5">
            <span className="flex items-center gap-1 text-[11px] tabular-nums text-muted-foreground">
              <Clock className="h-3 w-3" />
              {formatTime(event.startTime)}
            </span>
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onToggleFavorite?.(event.id)
              }}
              className="rounded-lg p-1 transition-colors active:bg-secondary"
            >
              <Star
                className={cn(
                  'h-4 w-4 transition-colors',
                  isFavorite ? 'fill-gold text-gold' : 'text-muted-foreground/30'
                )}
              />
            </button>
          </div>
        </div>

        {/* Matchup */}
        <div className="mb-2.5 flex items-center gap-3">
          <div className="flex flex-1 items-center gap-2.5">
            <Avatar name={participant1.name} shortName={participant1.shortName} />
            <div className="min-w-0">
              <p className="truncate text-[13px] font-semibold text-foreground">{participant1.name}</p>
              {participant1.record && (
                <p className="text-[10px] text-muted-foreground">{participant1.record}</p>
              )}
            </div>
          </div>
          <span className="shrink-0 text-[10px] font-bold tracking-widest text-muted-foreground/50">VS</span>
          <div className="flex flex-1 items-center justify-end gap-2.5">
            <div className="min-w-0 text-right">
              <p className="truncate text-[13px] font-semibold text-foreground">{participant2.name}</p>
              {participant2.record && (
                <p className="text-[10px] text-muted-foreground">{participant2.record}</p>
              )}
            </div>
            <Avatar name={participant2.name} shortName={participant2.shortName} />
          </div>
        </div>

        {/* AI bar */}
        <div className="mb-2">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-[10px] font-medium text-muted-foreground">AI Confidence</span>
            <span className="text-[10px] font-bold tabular-nums text-neon-green">{event.aiConfidence}%</span>
          </div>
          <div className="h-1 w-full overflow-hidden rounded-full bg-secondary">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${event.aiConfidence}%` }}
              transition={{ duration: 0.7, delay: index * 0.04 + 0.2 }}
              className={cn(
                'h-full rounded-full',
                event.aiConfidence >= 75 ? 'bg-neon-green' : event.aiConfidence >= 60 ? 'bg-gold' : 'bg-hot-red'
              )}
            />
          </div>
        </div>

        {/* Badges */}
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {event.badges.filter(b => b !== 'live').map((badge) => (
              <BadgePill key={badge} variant={badge} />
            ))}
            {event.valueBets?.[0] && (
              <BadgePill variant="value" label={`+${event.valueBets[0].expectedValue.toFixed(1)}% EV`} />
            )}
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground/30" />
        </div>

        {/* User count on this pick */}
        {event.valueBets && event.valueBets.length > 0 && (
          <div className="mt-2 flex items-center gap-2">
            <UserAvatars count={Math.floor(Math.random() * 100) + 50} />
            <span className="text-[10px] text-muted-foreground">users on this pick</span>
          </div>
        )}
      </Link>

      {/* Odds strip */}
      <div className="flex gap-1.5 border-t border-border px-3 py-2">
        <OddsButton
          label={participant1.shortName}
          odds={event.odds.home}
          onClick={() => onAddToParlay?.(event.id, `${participant1.name} Win`, event.odds.home)}
        />
        {event.odds.draw !== undefined && (
          <OddsButton
            label="Draw"
            odds={event.odds.draw}
            onClick={() => onAddToParlay?.(event.id, 'Draw', event.odds.draw!)}
          />
        )}
        <OddsButton
          label={participant2.shortName}
          odds={event.odds.away}
          onClick={() => onAddToParlay?.(event.id, `${participant2.name} Win`, event.odds.away)}
        />
      </div>
    </motion.div>
  )
}
