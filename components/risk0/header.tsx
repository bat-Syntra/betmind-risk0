'use client'

import { Bell, Settings } from 'lucide-react'

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-2.5">
        <div className="flex items-center gap-0">
          <span className="mono text-sm font-bold tracking-tighter text-foreground">bet</span>
          <span className="mono text-sm font-bold tracking-tighter text-accent">mind</span>
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
