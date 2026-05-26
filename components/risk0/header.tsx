'use client'

import { Bell, Settings } from 'lucide-react'

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-neon-green to-emerald-500 shadow-lg shadow-neon-green/20">
              <span className="text-base font-black text-primary-foreground">B</span>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3 items-center justify-center rounded-full border-2 border-background bg-neon-green" />
          </div>
          <div>
            <h1 className="text-base font-extrabold leading-none tracking-tight text-foreground">
              Bet<span className="text-neon-green">Mind</span>
            </h1>
            <p className="text-[10px] font-medium text-neon-green/70">AI Predictions</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button className="relative flex h-9 w-9 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
            <Bell className="h-4 w-4" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-neon-green" />
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  )
}
