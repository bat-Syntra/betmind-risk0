'use client'

import { Bell, Settings } from 'lucide-react'

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-neon-green">
            <span className="text-xs font-black tracking-tighter text-primary-foreground">R0</span>
          </div>
          <div>
            <h1 className="text-sm font-bold leading-none text-foreground">
              Risk<span className="text-neon-green">0</span>
            </h1>
            <p className="text-[10px] font-medium text-muted-foreground">AI Predictions</p>
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
