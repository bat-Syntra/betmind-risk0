'use client'

import { useState } from 'react'
import { Lock, LogOut, Zap, TrendingUp, BarChart2, ChevronRight, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from './auth-context'
import { AuthModal } from './auth-modal'

const FREE_FEATURES = [
  'Track up to 50 bets',
  'Win rate & net P/L',
  'CLV per pick',
  'Sports news & picks feed',
  'Parlay builder (3-leg)',
]

const PRO_FEATURES = [
  'Unlimited bet tracking',
  'Real-time odds (no 15min delay)',
  'Full CLV history graph',
  'Bookmaker health monitor',
  'Advanced filters (+EV threshold)',
  'API access',
  'Priority support',
]

function BlurredStatRow({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between border border-border bg-card px-3 py-2.5">
      <span className="mono text-[12px] text-muted-foreground">{label}</span>
      <div className="flex items-center gap-2">
        <span className="mono select-none text-[12px] font-semibold text-foreground blur-sm">
          ██████
        </span>
        <Lock className="h-3 w-3 text-[#525252]" />
      </div>
    </div>
  )
}

function ProBadge() {
  return (
    <span className="mono border border-accent/40 bg-accent/10 px-1.5 py-0.5 text-[10px] font-bold text-accent">
      PRO
    </span>
  )
}

export function ProfileView() {
  const { user, loading, isPro, signOut } = useAuth()
  const [showAuth, setShowAuth] = useState(false)

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <span className="mono text-[11px] text-[#525252]">loading...</span>
      </div>
    )
  }

  /* ─── UNAUTHENTICATED ─── */
  if (!user) {
    return (
      <>
        <div className="flex flex-1 flex-col overflow-y-auto scrollbar-none pb-24">
          {/* Header */}
          <div className="border-b border-border px-4 py-3">
            <p className="mono text-[10px] uppercase tracking-widest text-[#525252]">betmind / profile</p>
          </div>

          {/* Teaser: blurred stats */}
          <div className="relative px-4 pt-4">
            <div className="pointer-events-none select-none">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center bg-secondary border border-border">
                  <span className="mono text-base font-bold text-muted-foreground blur-sm">JD</span>
                </div>
                <div>
                  <p className="mono text-[12px] font-semibold text-foreground blur-sm">user@example.com</p>
                  <p className="mono text-[10px] text-muted-foreground blur-sm">Free account</p>
                </div>
              </div>

              <div className="space-y-1.5">
                <BlurredStatRow label="Win Rate" />
                <BlurredStatRow label="Total Bets" />
                <BlurredStatRow label="Net P/L" />
                <BlurredStatRow label="CLV avg" />
                <BlurredStatRow label="Best Sport" />
              </div>
            </div>

            {/* Overlay CTA */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/75 px-6">
              <div className="w-full border border-border bg-card p-5 text-center">
                <div className="mono mb-1 text-[10px] uppercase tracking-widest text-[#525252]">
                  sign in required
                </div>
                <h2 className="mono mb-1 text-[15px] font-bold text-foreground">
                  Your stats are locked
                </h2>
                <p className="mono mb-4 text-[11px] leading-relaxed text-muted-foreground">
                  Create a free account to track your bets, win rate, CLV, and P/L across all sports.
                </p>
                <button
                  onClick={() => setShowAuth(true)}
                  className="mono mb-2 flex w-full items-center justify-center gap-1.5 border border-accent bg-accent/10 py-2.5 text-[12px] font-semibold text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  → Create free account
                </button>
                <button
                  onClick={() => setShowAuth(true)}
                  className="mono flex w-full items-center justify-center gap-1.5 border border-border py-2 text-[11px] text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                >
                  Sign in
                </button>
              </div>
            </div>
          </div>

          {/* Feature comparison */}
          <div className="px-4 pt-6 pb-4 space-y-4">
            <p className="mono text-[10px] uppercase tracking-widest text-[#525252]">what you get</p>

            <div className="grid grid-cols-2 gap-2">
              {/* Free */}
              <div className="border border-border p-3">
                <p className="mono mb-2 text-[11px] font-bold text-foreground">Free</p>
                <ul className="space-y-1.5">
                  {FREE_FEATURES.map(f => (
                    <li key={f} className="mono flex items-start gap-1.5 text-[10px] text-muted-foreground">
                      <Check className="mt-0.5 h-3 w-3 shrink-0 text-positive" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pro */}
              <div className="border border-accent/30 p-3 bg-accent/5">
                <div className="mb-2 flex items-center gap-1.5">
                  <p className="mono text-[11px] font-bold text-foreground">Pro</p>
                  <ProBadge />
                </div>
                <p className="mono mb-2 text-[10px] text-muted-foreground">Everything in Free +</p>
                <ul className="space-y-1.5">
                  {PRO_FEATURES.slice(0, 4).map(f => (
                    <li key={f} className="mono flex items-start gap-1.5 text-[10px] text-muted-foreground">
                      <Zap className="mt-0.5 h-3 w-3 shrink-0 text-accent" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button
              onClick={() => setShowAuth(true)}
              className="mono w-full border border-border py-2.5 text-[11px] text-muted-foreground transition-colors hover:border-accent hover:text-accent"
            >
              → Start tracking free — no credit card
            </button>
          </div>
        </div>

        <AnimatePresence>
          {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
        </AnimatePresence>
      </>
    )
  }

  /* ─── AUTHENTICATED ─── */
  const initials = (user.email ?? 'U').slice(0, 2).toUpperCase()
  const emailDisplay = user.user_metadata?.full_name ?? user.email ?? 'User'

  return (
    <>
      <div className="flex flex-1 flex-col overflow-y-auto scrollbar-none pb-24">
        {/* Header */}
        <div className="border-b border-border px-4 py-3">
          <p className="mono text-[10px] uppercase tracking-widest text-[#525252]">betmind / profile</p>
        </div>

        {/* User identity */}
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-secondary border border-border">
            <span className="mono text-sm font-bold text-foreground">{initials}</span>
          </div>
          <div className="min-w-0">
            <p className="mono truncate text-[12px] font-semibold text-foreground">{emailDisplay}</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              {isPro ? (
                <ProBadge />
              ) : (
                <span className="mono text-[10px] text-muted-foreground">Free account</span>
              )}
            </div>
          </div>
          <button
            onClick={signOut}
            className="ml-auto flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
          >
            <LogOut className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Stats */}
        <div className="px-4 pt-4 pb-3">
          <p className="mono mb-2 text-[10px] uppercase tracking-widest text-[#525252]">your stats</p>
          <div className="space-y-1.5">
            {[
              { label: 'Win Rate', value: '—', color: 'text-foreground' },
              { label: 'Total Bets', value: '0', color: 'text-foreground' },
              { label: 'Net P/L', value: '$0.00', color: 'text-foreground' },
            ].map(({ label, value, color }) => (
              <div key={label} className="flex items-center justify-between border border-border bg-card px-3 py-2.5">
                <span className="mono text-[12px] text-muted-foreground">{label}</span>
                <span className={`mono text-[12px] font-semibold tabular-nums ${color}`}>{value}</span>
              </div>
            ))}

            {/* CLV — locked for free users */}
            <div className="flex items-center justify-between border border-border bg-card px-3 py-2.5">
              <span className="mono text-[12px] text-muted-foreground">CLV avg</span>
              {isPro ? (
                <span className="mono text-[12px] font-semibold tabular-nums text-positive">—</span>
              ) : (
                <div className="flex items-center gap-1.5">
                  <span className="mono select-none text-[12px] font-semibold text-foreground blur-sm">+1.8%</span>
                  <Lock className="h-3 w-3 text-accent" />
                </div>
              )}
            </div>
          </div>
          <p className="mono mt-2 text-[10px] text-[#525252]">
            Add your first bet via the Parlay tab to start tracking.
          </p>
        </div>

        {/* Pro upsell — only for free users */}
        {!isPro && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="mx-4 mb-4 border border-accent/30 bg-accent/5 p-4"
          >
            <div className="mb-3 flex items-center gap-2">
              <Zap className="h-4 w-4 text-accent" />
              <span className="mono text-[12px] font-bold text-foreground">Upgrade to Pro</span>
              <ProBadge />
            </div>
            <ul className="mb-3 space-y-1.5">
              {PRO_FEATURES.map(f => (
                <li key={f} className="mono flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <ChevronRight className="h-3 w-3 shrink-0 text-accent" />
                  {f}
                </li>
              ))}
            </ul>
            <button className="mono flex w-full items-center justify-center gap-1.5 border border-accent bg-accent/10 py-2.5 text-[12px] font-semibold text-accent transition-colors hover:bg-accent hover:text-accent-foreground">
              <Zap className="h-3.5 w-3.5" />
              Unlock Pro — coming soon
            </button>
            <p className="mono mt-2 text-center text-[10px] text-[#525252]">
              Early access pricing available
            </p>
          </motion.div>
        )}

        {/* Pro features unlocked */}
        {isPro && (
          <div className="mx-4 mb-4 border border-positive/20 bg-positive/5 p-3">
            <div className="flex items-center gap-2">
              <BarChart2 className="h-4 w-4 text-positive" />
              <span className="mono text-[11px] font-semibold text-positive">Pro features active</span>
            </div>
            <p className="mono mt-1 text-[10px] text-muted-foreground">
              Real-time odds · Unlimited tracking · CLV history
            </p>
          </div>
        )}

        {/* Quick links */}
        <div className="px-4 space-y-1.5">
          <p className="mono mb-2 text-[10px] uppercase tracking-widest text-[#525252]">resources</p>
          {[
            { label: '/methodology', href: '/methodology', icon: TrendingUp },
            { label: '/transparency', href: '/transparency', icon: BarChart2 },
            { label: '/changelog', href: '/changelog', icon: ChevronRight },
          ].map(({ label, href, icon: Icon }) => (
            <a
              key={href}
              href={href}
              className="mono flex items-center justify-between border border-border px-3 py-2 text-[11px] text-muted-foreground transition-colors hover:border-accent/30 hover:text-foreground"
            >
              <div className="flex items-center gap-2">
                <Icon className="h-3.5 w-3.5" />
                {label}
              </div>
              <ChevronRight className="h-3 w-3 text-[#525252]" />
            </a>
          ))}
        </div>

        {/* Sign out */}
        <div className="px-4 pt-4">
          <button
            onClick={signOut}
            className="mono flex w-full items-center justify-center gap-2 border border-border py-2.5 text-[11px] text-muted-foreground transition-colors hover:border-negative/30 hover:text-negative"
          >
            <LogOut className="h-3.5 w-3.5" />
            Sign out
          </button>
        </div>
      </div>
    </>
  )
}
