'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift() ?? null
  return null
}

function setCookie(name: string, val: string, days = 365) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${name}=${val}; expires=${expires}; path=/`
}

export function IntroSlideover() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (getCookie('intro_seen')) return
    if (typeof window !== 'undefined' && window.innerWidth >= 768) return
    const timer = setTimeout(() => setVisible(true), 2500)
    return () => clearTimeout(timer)
  }, [])

  const dismiss = () => {
    setCookie('intro_seen', '1')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 bg-background/60"
            onClick={dismiss}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed right-0 top-0 z-40 flex h-full w-[340px] max-w-[92vw] flex-col border-l border-border bg-card"
          >
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <span className="mono text-xs font-bold text-foreground">What is BetMind?</span>
            <button
              onClick={dismiss}
              className="rounded p-1 text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            <p className="mono text-[12px] leading-relaxed text-muted-foreground">
              BetMind scans closing lines from sharp books (Pinnacle, Circa, BetCRIS) and surfaces positive expected value bets in real time.
            </p>
            <p className="mono text-[12px] leading-relaxed text-muted-foreground">
              Every pick is logged publicly. No backdating. No cherry-picking.
            </p>

            <div className="border border-border p-3">
              <p className="mono mb-2 text-[11px] font-semibold text-foreground">EV calculation</p>
              <p className="mono text-[11px] leading-relaxed text-muted-foreground">
                EV% = (true_prob × decimal_odds − 1) × 100
              </p>
              <p className="mono mt-1 text-[11px] leading-relaxed text-muted-foreground">
                True probability derived from Pinnacle no-vig line.
              </p>
            </div>

            <div className="border border-border p-3">
              <p className="mono mb-2 text-[11px] font-semibold text-foreground">CLV tracking</p>
              <p className="mono text-[11px] leading-relaxed text-muted-foreground">
                Closing line value measures if you beat the book at close. Positive CLV long-term = profitable edge.
              </p>
            </div>

            <Link
              href="/methodology"
              className="mono block text-[11px] text-accent underline underline-offset-2 hover:text-foreground transition-colors"
              onClick={dismiss}
            >
              → Full methodology & data sources
            </Link>
            <Link
              href="/transparency"
              className="mono block text-[11px] text-accent underline underline-offset-2 hover:text-foreground transition-colors"
              onClick={dismiss}
            >
              → Public pick log (every bet ever published)
            </Link>
          </div>

          <div className="border-t border-border p-4">
            <button
              onClick={dismiss}
              className="mono w-full border border-border py-2 text-[12px] text-muted-foreground transition-colors hover:border-accent hover:text-foreground"
            >
              Got it — dismiss
            </button>
          </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
