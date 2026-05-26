'use client'

import { useState, useMemo, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { Header } from '@/components/risk0/header'
import { BottomNav } from '@/components/risk0/bottom-nav'
import { CounterStat } from '@/components/risk0/counter-stat'
import { SportTabs } from '@/components/risk0/sport-tabs'
import { EventCard } from '@/components/risk0/event-card'
import { SearchView } from '@/components/risk0/search-bar'
import { NewsView } from '@/components/risk0/news-feed'
import { ParlayView } from '@/components/risk0/parlay-builder'
import { StatusBar } from '@/components/betmind/status-bar'
import { IntroSlideover } from '@/components/betmind/intro-slideover'
import { ShortcutsOverlay } from '@/components/betmind/shortcuts-overlay'
import { CommandPalette } from '@/components/betmind/command-palette'
import { SiteFooter } from '@/components/betmind/site-footer'
import { UTMBanner } from '@/components/betmind/utm-banner'
import { ProfileView } from '@/components/betmind/profile-view'
import { sampleEvents, sportTabs, sportsNews } from '@/lib/data'
import { ParlayPick } from '@/lib/types'

const SPORT_KEYS = ['all', 'football', 'ufc', 'nba', 'nfl', 'boxing']

export default function HomePage() {
  const [activeView, setActiveView] = useState('home')
  const [activeSport, setActiveSport] = useState('all')
  const [parlayPicks, setParlayPicks] = useState<ParlayPick[]>([])
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [showShortcuts, setShowShortcuts] = useState(false)
  const [showCommand, setShowCommand] = useState(false)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName
      const isInput = tag === 'INPUT' || tag === 'TEXTAREA'
      if (e.key === 'Escape') { setShowShortcuts(false); setShowCommand(false) }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setShowCommand(true) }
      if (!isInput && e.key === '?') setShowShortcuts(true)
      if (!isInput && e.key === 'f') { setActiveView('search') }
      if (!isInput && ['1','2','3','4','5'].includes(e.key)) {
        const idx = parseInt(e.key) - 1
        if (SPORT_KEYS[idx]) setActiveSport(SPORT_KEYS[idx])
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

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
    <div className="relative mx-auto flex min-h-dvh w-full max-w-screen-xl flex-col bg-background">
      <UTMBanner />
      <Header activeView={activeView} onViewChange={setActiveView} />
      <StatusBar />

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
            <div className="mx-auto w-full max-w-5xl">
            {/* Stats */}
            <section className="grid grid-cols-3 gap-2 px-4 pt-3 pb-3">
              <CounterStat value={47} label="Active Events" highlight="cyan" />
              <CounterStat value={12} suffix=" +EV" label="Value Bets" highlight="green" />
              <CounterStat value={4238} prefix="$" label="Weekly P/L" highlight="green" />
            </section>

            {/* Sport Tabs */}
            <section className="pb-3">
              <SportTabs tabs={sportTabs} activeTab={activeSport} onTabChange={setActiveSport} />
            </section>

            {/* Value Bets */}
            {activeSport === 'all' && valueBetEvents.length > 0 && (
              <section className="px-4 pb-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="mono text-[11px] uppercase tracking-widest text-muted-foreground">+ev picks</span>
                  <button className="mono flex items-center gap-0.5 text-[11px] text-accent hover:text-foreground transition-colors">
                    all <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible">
                  {valueBetEvents.slice(0, 3).map((event, i) => (
                    <div key={event.id} className="w-[82vw] shrink-0 md:w-auto">
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
                <div className="mb-2 flex items-center gap-2">
                  <span className="live-pulse inline-block h-1.5 w-1.5 rounded-full bg-live-pulse" />
                  <span className="mono text-[11px] uppercase tracking-widest text-muted-foreground">live now</span>
                  <span className="mono text-[11px] text-live-pulse">
                    {filteredEvents.filter(e => e.status === 'live').length}
                  </span>
                </div>
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
              <div className="mb-2 flex items-center justify-between">
                <span className="mono text-[11px] uppercase tracking-widest text-muted-foreground">upcoming</span>
                <span className="mono text-[11px] text-[#525252] tabular-nums">
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

            <SiteFooter />
            <div className="h-24" />
            </div>
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
            <div className="mx-auto w-full max-w-5xl">
            <SearchView
              events={sampleEvents}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
            </div>
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
            <div className="mx-auto w-full max-w-5xl">
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
            </div>
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
            <div className="mx-auto w-full max-w-5xl">
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
            className="flex flex-1 flex-col overflow-hidden"
          >
            <ProfileView />
          </motion.main>
        )}
      </AnimatePresence>

      <button
        onClick={() => setShowShortcuts(true)}
        className="mono fixed bottom-20 right-3 z-30 hidden border border-border bg-card px-1.5 py-0.5 text-[10px] text-[#525252] transition-colors hover:text-foreground md:block"
        aria-label="Show keyboard shortcuts"
      >
        ? shortcuts
      </button>
      <IntroSlideover />
      <AnimatePresence>
        {showShortcuts && <ShortcutsOverlay onClose={() => setShowShortcuts(false)} />}
        {showCommand && <CommandPalette onClose={() => setShowCommand(false)} />}
      </AnimatePresence>

      <BottomNav
        activeTab={activeView}
        onTabChange={setActiveView}
        parlayCount={parlayPicks.length}
      />
    </div>
  )
}
