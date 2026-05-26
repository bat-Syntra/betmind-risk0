'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Eye, EyeOff, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

type Tab = 'signup' | 'signin'

export function AuthModal({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<Tab>('signup')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)

    try {
      if (tab === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { plan: 'free' } },
        })
        if (error) throw error
        setSuccess('Check your email to confirm your account.')
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        onClose()
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    setGoogleLoading(true)
    setError(null)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/` },
    })
    if (error) { setError(error.message); setGoogleLoading(false) }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 px-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: -8, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.98 }}
        transition={{ duration: 0.15 }}
        className="w-full max-w-sm border border-border bg-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div>
            <p className="mono text-[10px] uppercase tracking-widest text-[#525252]">betmind / auth</p>
          </div>
          <button onClick={onClose} className="text-muted-foreground transition-colors hover:text-foreground">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Tab toggle */}
        <div className="flex border-b border-border">
          <button
            onClick={() => { setTab('signup'); setError(null); setSuccess(null) }}
            className={`mono flex-1 py-2.5 text-[11px] transition-colors ${
              tab === 'signup'
                ? 'border-b-2 border-accent text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            create account
          </button>
          <button
            onClick={() => { setTab('signin'); setError(null); setSuccess(null) }}
            className={`mono flex-1 py-2.5 text-[11px] transition-colors ${
              tab === 'signin'
                ? 'border-b-2 border-accent text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            sign in
          </button>
        </div>

        <div className="p-4 space-y-3">
          {/* Plan info for signup */}
          <AnimatePresence>
            {tab === 'signup' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="border border-positive/20 bg-positive/5 p-2.5"
              >
                <p className="mono text-[10px] font-semibold text-positive">Free account includes:</p>
                <ul className="mt-1 space-y-0.5">
                  {['Track up to 50 bets', 'Win rate & net P/L', 'CLV tracking', 'Sports news & picks'].map(f => (
                    <li key={f} className="mono flex items-center gap-1.5 text-[10px] text-muted-foreground">
                      <span className="text-positive">+</span> {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-2.5">
            <div>
              <label className="mono block text-[10px] uppercase tracking-widest text-[#525252] mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="mono w-full border border-border bg-secondary px-3 py-2 text-[12px] text-foreground placeholder:text-[#525252] outline-none focus:border-accent transition-colors"
              />
            </div>
            <div>
              <label className="mono block text-[10px] uppercase tracking-widest text-[#525252] mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  placeholder="min. 6 characters"
                  className="mono w-full border border-border bg-secondary px-3 py-2 pr-9 text-[12px] text-foreground placeholder:text-[#525252] outline-none focus:border-accent transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPw ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>

            {/* Error / success */}
            {error && (
              <p className="mono text-[11px] text-negative border border-negative/20 bg-negative/5 px-2.5 py-1.5">
                {error}
              </p>
            )}
            {success && (
              <p className="mono text-[11px] text-positive border border-positive/20 bg-positive/5 px-2.5 py-1.5">
                {success}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mono flex w-full items-center justify-center gap-2 border border-accent bg-accent/10 py-2.5 text-[12px] font-semibold text-accent transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
            >
              {loading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              {tab === 'signup' ? '→ Create free account' : '→ Sign in'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-2">
            <div className="flex-1 border-t border-border" />
            <span className="mono text-[10px] text-[#525252]">or</span>
            <div className="flex-1 border-t border-border" />
          </div>

          {/* Google OAuth */}
          <button
            onClick={handleGoogle}
            disabled={googleLoading}
            className="mono flex w-full items-center justify-center gap-2 border border-border py-2.5 text-[12px] text-muted-foreground transition-colors hover:border-foreground hover:text-foreground disabled:opacity-50"
          >
            {googleLoading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            )}
            Continue with Google
          </button>

          {tab === 'signin' && (
            <button className="mono w-full text-center text-[10px] text-[#525252] hover:text-muted-foreground transition-colors">
              Forgot password?
            </button>
          )}
        </div>
      </motion.div>
    </div>
  )
}
