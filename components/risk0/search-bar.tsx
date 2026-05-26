'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Star, Clock, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Event } from '@/lib/types'

function formatTime(dateStr: string) {
  const date = new Date(dateStr)
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
}

export function SearchView({
  events,
  favorites,
  onToggleFavorite,
}: {
  events: Event[]
  favorites: Set<string>
  onToggleFavorite: (id: string) => void
}) {
  const [query, setQuery] = useState('')
  const [filterFavs, setFilterFavs] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const results = useMemo(() => {
    let list = events
    if (filterFavs) list = list.filter((e) => favorites.has(e.id))
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(
        (e) =>
          e.participant1.name.toLowerCase().includes(q) ||
          e.participant2.name.toLowerCase().includes(q) ||
          e.league.toLowerCase().includes(q) ||
          e.sport.toLowerCase().includes(q)
      )
    }
    return list
  }, [events, query, filterFavs, favorites])

  return (
    <div className="flex flex-col">
      {/* Search input */}
      <div className="px-4 pt-2 pb-3">
        <div className="flex items-center gap-2 rounded-xl bg-secondary/80 px-3.5 py-2.5">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search matches, teams, leagues..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
          />
          {query.length > 0 && (
            <button onClick={() => setQuery('')} className="text-muted-foreground">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        {/* Filter chips */}
        <div className="mt-2.5 flex gap-2">
          <button
            onClick={() => setFilterFavs(false)}
            className={cn(
              'rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
              !filterFavs ? 'bg-neon-green/15 text-neon-green' : 'bg-secondary text-muted-foreground'
            )}
          >
            All Matches
          </button>
          <button
            onClick={() => setFilterFavs(true)}
            className={cn(
              'flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
              filterFavs ? 'bg-gold/15 text-gold' : 'bg-secondary text-muted-foreground'
            )}
          >
            <Star className={cn('h-3 w-3', filterFavs && 'fill-gold')} />
            Favorites
            {favorites.size > 0 && (
              <span className="ml-0.5 rounded-full bg-gold/20 px-1.5 text-[10px] font-bold text-gold">
                {favorites.size}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Results list */}
      <div className="flex-1 overflow-y-auto px-4 pb-24 scrollbar-none">
        {results.length === 0 ? (
          <div className="py-16 text-center">
            <Search className="mx-auto mb-3 h-8 w-8 text-muted-foreground/30" />
            <p className="text-sm text-muted-foreground">
              {filterFavs ? 'No favorites yet' : `No matches found`}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-1.5">
            {results.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: i * 0.03 }}
              >
                <div className="flex items-center gap-3 rounded-xl bg-secondary/40 px-3 py-3 active:bg-secondary/60">
                  <button
                    onClick={() => onToggleFavorite(event.id)}
                    className="shrink-0"
                  >
                    <Star
                      className={cn(
                        'h-4 w-4',
                        favorites.has(event.id) ? 'fill-gold text-gold' : 'text-muted-foreground/25'
                      )}
                    />
                  </button>
                  <Link href={`/analysis/${event.id}`} className="flex flex-1 items-center justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13px] font-semibold text-foreground">
                        {event.participant1.shortName} vs {event.participant2.shortName}
                      </p>
                      <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                        <span>{event.league}</span>
                        {event.status === 'live' && (
                          <span className="flex items-center gap-1 font-semibold text-hot-red">
                            <span className="h-1.5 w-1.5 rounded-full bg-hot-red live-pulse" />
                            LIVE
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1 text-[11px] tabular-nums text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {formatTime(event.startTime)}
                      </span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground/25" />
                    </div>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
