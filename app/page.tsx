'use client'

import { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp, ChevronRight } from 'lucide-react'
import { Header } from '@/components/risk0/header'
import { BottomNav } from '@/components/risk0/bottom-nav'
import { CounterStat } from '@/components/risk0/counter-stat'
import { SportTabs } from '@/components/risk0/sport-tabs'
import { EventCard } from '@/components/risk0/event-card'
import { SearchView } from '@/components/risk0/search-bar'
import { NewsView } from '@/components/risk0/news-feed'
import { ParlayView } from '@/components/risk0/parlay-builder'
import { sampleEvents, sportTabs, sportsNews } from '@/lib/data'
import { ParlayPick } from '@/lib/types'

export default function HomePage() {
  const [activeView, setActiveView] = useState('home')
  const [activeSport, setActiveSport] = useState('all')
  const [parlayPicks, setParlayPicks] = useState<ParlayPick[]>([])
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }, [])

  const filteredEvents = useMemo(() => {
    if (activeSport === 'all') return sampleEvents
    return sampleEvents.filter((e) => e.sport === activeSport)
  }, [activeSport])

  const filteredNews = useMemo(() => {
    if (activeSport === 'all') return sportsNews
    return sportsNews.filter((n) => n.sport === activeSport)
  }, [activeSport])

  const valueBetEvents = useMemo(() => {
    return sampleEvents.filter((e) => e.valueBets && e.valueBets.length > 0)
  }, [])

  const handleAddToParlay = (eventId: string, selection: string, odds: number) => {
    const event = sampleEvents.find((e) => e.id === eventId)
    if (!event) return
    if (parlayPicks.some((p) => p.eventId === eventId)) {
      setParlayPicks(parlayPicks.filter((p) => p.eventId !== eventId))
      return
    }
    setParlayPicks([
      ...parlayPicks,
      {
        eventId,
        sport: event.sport,
        selection,
        odds,
        participant1Name: event.participant1.name,
        participant2Name: event.participant2.name,
      },
    ])
  }

  const handleRemovePick = (eventId: string) => {
    setParlayPicks(parlayPicks.filter((p) => p.eventId !== eventId))
  }

  const handleClearParlay = () => setParlayPicks([])

  return (
    <div className="relative flex min-h-dvh flex-col bg-background">
      <Header />

      <AnimatePresence mode="wait">
        {activeView === 'home' && (
          <motion.main
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex-1 overflow-y-auto scrollbar-none"
          >
            {/* Stats */}
            <section className="grid grid-cols-2 gap-2 px-4 pt-4 pb-3">
              <CounterStat value={47} label="Active Events" highlight="cyan" />
              <CounterStat value={12} suffix=" +EV" label="Value Bets" highlight="green" />
              <CounterStat value={3} label="Arbitrage" highlight="gold" />
              <CounterStat value={4238} prefix="$" label="Weekly P/L" highlight="green" />
            </section>

            {/* Sport Tabs */}
            <section className="pb-3">
              <SportTabs tabs={sportTabs} activeTab={activeSport} onTabChange={setActiveSport} />
            </section>

            {/* Value Bets Highlight */}
            {activeSport === 'all' && valueBetEvents.length > 0 && (
              <section className="px-4 pb-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-neon-green" />
                    <h2 className="text-sm font-bold text-foreground">Top Value Bets</h2>
                  </div>
                  <button className="flex items-center gap-0.5 text-[11px] font-medium text-neon-green">
                    View All <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
                {/* Horizontal scroll on mobile */}
                <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible">
                  {valueBetEvents.slice(0, 3).map((event, i) => (
                    <div key={event.id} className="w-[85vw] shrink-0 md:w-auto">
                      <EventCard
                        event={event}
                        index={i}
                        isFavorite={favorites.has(event.id)}
                        onToggleFavorite={toggleFavorite}
                        onAddToParlay={handleAddToParlay}
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Live now section */}
            {filteredEvents.some(e => e.status === 'live') && (
              <section className="px-4 pb-4">
                <h2 className="mb-3 text-sm font-bold text-foreground">Live Now</h2>
                <div className="flex flex-col gap-3 md:grid md:grid-cols-2 lg:grid-cols-3">
                  {filteredEvents.filter(e => e.status === 'live').map((event, i) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      index={i}
                      isFavorite={favorites.has(event.id)}
                      onToggleFavorite={toggleFavorite}
                      onAddToParlay={handleAddToParlay}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* All Events */}
            <section className="px-4 pb-24">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-bold text-foreground">Upcoming</h2>
                <span className="rounded-lg bg-secondary px-2 py-0.5 text-[11px] font-medium tabular-nums text-muted-foreground">
                  {filteredEvents.filter(e => e.status !== 'live').length}
                </span>
              </div>
              <div className="flex flex-col gap-3 md:grid md:grid-cols-2 lg:grid-cols-3">
                {filteredEvents.filter(e => e.status !== 'live').map((event, i) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    index={i}
                    isFavorite={favorites.has(event.id)}
                    onToggleFavorite={toggleFavorite}
                    onAddToParlay={handleAddToParlay}
                  />
                ))}
              </div>
            </section>
          </motion.main>
        )}

        {activeView === 'search' && (
          <motion.main
            key="search"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex-1 overflow-y-auto scrollbar-none"
          >
            <SearchView
              events={sampleEvents}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          </motion.main>
        )}

        {activeView === 'parlay' && (
          <motion.main
            key="parlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex-1 overflow-y-auto pt-4 scrollbar-none"
          >
            <div className="mb-4 px-4">
              <h2 className="text-lg font-bold text-foreground">Parlay Builder</h2>
              <p className="text-xs text-muted-foreground">
                {parlayPicks.length === 0
                  ? 'Build your multi-bet slip'
                  : `${parlayPicks.length} pick${parlayPicks.length > 1 ? 's' : ''} selected`}
              </p>
            </div>
            <ParlayView
              picks={parlayPicks}
              onRemovePick={handleRemovePick}
              onClear={handleClearParlay}
            />
          </motion.main>
        )}

        {activeView === 'news' && (
          <motion.main
            key="news"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex-1 overflow-y-auto scrollbar-none"
          >
            <div className="px-4 pt-4 pb-3">
              <h2 className="text-lg font-bold text-foreground">Sports News</h2>
              <p className="text-xs text-muted-foreground">{sportsNews.length} updates</p>
            </div>
            <div className="pb-1">
              <SportTabs tabs={sportTabs} activeTab={activeSport} onTabChange={setActiveSport} />
            </div>
            <div className="pt-3">
              <NewsView news={filteredNews} />
            </div>
          </motion.main>
        )}

        {activeView === 'profile' && (
          <motion.main
            key="profile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex flex-1 flex-col items-center justify-center px-4"
          >
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
              <span className="text-2xl font-bold text-muted-foreground">U</span>
            </div>
            <h2 className="mb-1 text-lg font-bold text-foreground">Your Profile</h2>
            <p className="mb-6 text-sm text-muted-foreground">Track your performance</p>
            <div className="w-full max-w-sm space-y-3">
              <div className="flex items-center justify-between rounded-2xl bg-secondary/50 px-4 py-3.5">
                <span className="text-sm text-muted-foreground">Win Rate</span>
                <span className="text-sm font-bold text-neon-green">67%</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-secondary/50 px-4 py-3.5">
                <span className="text-sm text-muted-foreground">Total Bets</span>
                <span className="text-sm font-bold text-foreground">142</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-secondary/50 px-4 py-3.5">
                <span className="text-sm text-muted-foreground">Net Profit</span>
                <span className="text-sm font-bold text-neon-green">+$4,238</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-secondary/50 px-4 py-3.5">
                <span className="text-sm text-muted-foreground">Best Sport</span>
                <span className="text-sm font-bold text-gold">UFC</span>
              </div>
            </div>
          </motion.main>
        )}
      </AnimatePresence>

      <BottomNav
        activeTab={activeView}
        onTabChange={setActiveView}
        parlayCount={parlayPicks.length}
      />
    </div>
  )
}
