'use client'

import { use, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowLeft,
  Clock,
  Zap,
  BarChart3,
  Lightbulb,
  MessageSquare,
  Send,
  Shield,
  TrendingUp,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { sampleEvents } from '@/lib/data'
import { getAnalysisForEvent, getStatComparisons } from '@/lib/analysis-data'
import { AIConfidenceCard } from '@/components/risk0/ai-confidence-card'
import { ProbabilityBar } from '@/components/risk0/probability-bar'
import { StatBar } from '@/components/risk0/stat-bar'
import { ValueBetCard } from '@/components/risk0/value-bet-card'
import { BadgePill } from '@/components/risk0/badge-pill'
import { FormBadges } from '@/components/risk0/form-badges'
import { BlurredContent } from '@/components/betmind/blurred-content'
import { trackLockedView } from '@/components/betmind/upgrade-toast'

function ParticipantAvatar({ name, shortName, large }: { name: string; shortName: string; large?: boolean }) {
  const colors = [
    'from-neon-green/30 to-neon-cyan/30',
    'from-hot-red/30 to-gold/30',
    'from-blue-500/30 to-purple-500/30',
    'from-orange-500/30 to-red-500/30',
  ]
  const colorIndex = name.length % colors.length
  const size = large ? 'h-20 w-20 text-xl' : 'h-14 w-14 text-sm'
  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full bg-gradient-to-br font-bold text-foreground',
        colors[colorIndex],
        size
      )}
    >
      {shortName.slice(0, 3)}
    </div>
  )
}

function formatDateTime(dateStr: string) {
  const date = new Date(dateStr)
  return {
    date: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
    time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
  }
}

const quickQuestions = [
  'Injury updates?',
  'Best parlay?',
  'Live betting strategy?',
  'Key players to watch?',
]

export default function AnalysisPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [chatInput, setChatInput] = useState('')

  const event = sampleEvents.find((e) => e.id === id)

  if (!event) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-grid">
        <div className="text-center">
          <h1 className="mb-2 text-2xl font-bold text-foreground">Event Not Found</h1>
          <Link href="/" className="text-sm text-neon-green hover:underline">
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  const analysis = getAnalysisForEvent(event)
  const statComparisons = getStatComparisons(event)
  const { participant1, participant2 } = event
  const dt = formatDateTime(event.startTime)
  const isUFCOrBoxing = event.sport === 'ufc' || event.sport === 'boxing'

  return (
    <div className="min-h-screen bg-grid">
      {/* Top Bar */}
      <div className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3 lg:px-6">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Events
          </Link>
        </div>
      </div>

      <main className="mx-auto max-w-5xl px-4 py-6 lg:px-6">
        {/* Match Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card mb-6 rounded-xl p-6"
        >
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">{event.league}</span>
            <div className="flex items-center gap-2">
              {event.status === 'live' && <BadgePill variant="live" />}
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {dt.date} &middot; {dt.time}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            {/* Participant 1 */}
            <div className="flex flex-1 flex-col items-center gap-2 text-center">
              <ParticipantAvatar name={participant1.name} shortName={participant1.shortName} large />
              <h2 className="text-lg font-bold text-foreground">{participant1.name}</h2>
              {participant1.record && (
                <span className="text-xs text-muted-foreground">{participant1.record}</span>
              )}
              {participant1.form && <FormBadges form={participant1.form} />}
            </div>

            {/* VS */}
            <div className="flex flex-col items-center gap-1">
              <Zap className="h-6 w-6 text-neon-green/60" />
              <span className="text-sm font-bold text-muted-foreground">VS</span>
            </div>

            {/* Participant 2 */}
            <div className="flex flex-1 flex-col items-center gap-2 text-center">
              <ParticipantAvatar name={participant2.name} shortName={participant2.shortName} large />
              <h2 className="text-lg font-bold text-foreground">{participant2.name}</h2>
              {participant2.record && (
                <span className="text-xs text-muted-foreground">{participant2.record}</span>
              )}
              {participant2.form && <FormBadges form={participant2.form} />}
            </div>
          </div>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            {/* AI Confidence */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <AIConfidenceCard confidence={analysis.confidence} />
            </motion.div>

            {/* Probabilities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="glass-card rounded-xl p-5"
            >
              <div className="mb-4 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-neon-cyan" />
                <h3 className="text-lg font-bold text-foreground">Exact Probabilities</h3>
              </div>
              <div className="flex flex-col gap-4">
                <ProbabilityBar
                  label={`${participant1.name} Win`}
                  percentage={analysis.probabilities.home}
                  color="green"
                  delay={0.3}
                />
                {analysis.probabilities.draw !== undefined && (
                  <ProbabilityBar
                    label="Draw"
                    percentage={analysis.probabilities.draw}
                    color="cyan"
                    delay={0.5}
                  />
                )}
                <ProbabilityBar
                  label={`${participant2.name} Win`}
                  percentage={analysis.probabilities.away}
                  color="red"
                  delay={0.7}
                />
              </div>
            </motion.div>

            {/* Statistical Comparison */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="glass-card rounded-xl p-5"
            >
              <div className="mb-1 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-gold" />
                <h3 className="text-lg font-bold text-foreground">Statistical Comparison</h3>
              </div>
              <div className="mb-4 flex items-center justify-between text-[10px] font-semibold text-muted-foreground">
                <span>{participant1.shortName}</span>
                <span>{participant2.shortName}</span>
              </div>
              <div className="flex flex-col gap-3">
                {statComparisons.map((stat, i) => (
                  <StatBar
                    key={stat.label}
                    label={stat.label}
                    value1={stat.value1}
                    value2={stat.value2}
                    delay={0.1 * i}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
            {/* Tactical Scenarios */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="glass-card rounded-xl p-5"
            >
              <div className="mb-4 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-gold" />
                <h3 className="text-lg font-bold text-foreground">
                  {isUFCOrBoxing ? 'Fight Analysis' : 'Tactical Scenarios'}
                </h3>
              </div>
              <BlurredContent requiredTier="pro" previewText="See detailed AI scenarios and predictions">
                <div className="flex flex-col gap-3">
                  {analysis.scenarios.map((scenario, i) => (
                  <motion.div
                    key={scenario.title}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
                    className="rounded-lg border border-border/50 bg-secondary/20 p-4"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-semibold text-foreground">{scenario.title}</span>
                      <span className="rounded-full bg-neon-cyan/10 px-2 py-0.5 text-xs font-bold text-neon-cyan">
                        {scenario.probability}%
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {scenario.description}
                    </p>
                  </motion.div>
                  ))}
                </div>
              </BlurredContent>
            </motion.div>

            {/* Value Bets */}
            {analysis.valueBets.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="glass-card rounded-xl border-neon-green/20 p-5"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-neon-green" />
                    <h3 className="text-lg font-bold text-foreground">Value Bets (+EV)</h3>
                  </div>
                  <BadgePill variant="premium" />
                </div>
                <BlurredContent requiredTier="pro" previewText="Unlock exact +EV percentages and betting edges">
                  <div className="flex flex-col gap-3">
                    {analysis.valueBets.map((bet, i) => (
                      <ValueBetCard key={bet.market} bet={bet} index={i} />
                    ))}
                  </div>
                </BlurredContent>
              </motion.div>
            )}

            {/* AI Chat */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="glass-card rounded-xl p-5"
            >
              <div className="mb-2 flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-neon-cyan" />
                <h3 className="text-lg font-bold text-foreground">Chat with AI</h3>
              </div>
              <p className="mb-4 text-xs text-muted-foreground">
                Ask anything about this match
              </p>

              <BlurredContent requiredTier="pro" previewText="Chat with AI for personalized insights">
                {/* Quick Questions */}
                <div className="mb-4 flex flex-wrap gap-2">
                {quickQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => setChatInput(q)}
                    className="rounded-full border border-border/50 bg-secondary/30 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-neon-cyan/30 hover:text-foreground"
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* Chat Input */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask about this match..."
                  className="flex-1 rounded-lg border border-border/50 bg-secondary/30 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-neon-cyan/30 focus:outline-none focus:ring-1 focus:ring-neon-cyan/20"
                />
                <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-neon-green to-neon-cyan text-primary-foreground transition-all hover:shadow-lg hover:shadow-neon-green/20">
                  <Send className="h-4 w-4" />
                </button>
              </div>
              </BlurredContent>
            </motion.div>
          </div>
        </div>

        {/* Key Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="glass-card mt-6 rounded-xl p-5"
        >
          <div className="mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-neon-green" />
            <h3 className="text-lg font-bold text-foreground">Key Insights</h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {analysis.keyInsights.map((insight, i) => (
              <div
                key={i}
                className="flex items-start gap-2 rounded-lg bg-secondary/20 p-3"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neon-green/10 text-[10px] font-bold text-neon-green">
                  {i + 1}
                </span>
                <p className="text-xs leading-relaxed text-muted-foreground">{insight}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </main>

      {/* Sticky Bottom CTA */}
      <div className="sticky bottom-0 z-40 border-t border-border/50 bg-background/80 backdrop-blur-xl lg:hidden">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div>
            <span className="text-xs text-muted-foreground">Best Odds</span>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-neon-green">{event.odds.home.toFixed(2)}</span>
              <span className="text-xs text-muted-foreground">|</span>
              <span className="text-lg font-bold text-foreground">{event.odds.away.toFixed(2)}</span>
            </div>
          </div>
          <button className="rounded-lg bg-gradient-to-r from-neon-green to-neon-cyan px-6 py-2.5 text-sm font-bold text-primary-foreground transition-all hover:shadow-lg hover:shadow-neon-green/20">
            Add to Parlay
          </button>
        </div>
      </div>
    </div>
  )
}
