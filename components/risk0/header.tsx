'use client'

import { Bell, Settings, LayoutGrid, Search, Ticket, Newspaper, User } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_TABS = [
  { id: 'home', label: 'Home', icon: LayoutGrid },
  { id: 'search', label: 'Search', icon: Search },
  { id: 'parlay', label: 'Parlay', icon: Ticket },
  { id: 'news', label: 'News', icon: Newspaper },
  { id: 'profile', label: 'Profile', icon: User },
]

export function Header({
  activeView,
  onViewChange,
}: {
  activeView?: string
  onViewChange?: (view: string) => void
}) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-2.5">
        {/* Wordmark */}
        <div className="flex shrink-0 items-center gap-0">
          <span className="mono text-sm font-bold tracking-tighter text-foreground">bet</span>
          <span className="mono text-sm font-bold tracking-tighter text-accent">mind</span>
        </div>

        {/* Desktop nav — hidden on mobile */}
        <nav className="hidden md:flex items-center gap-0.5">
          {NAV_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onViewChange?.(tab.id)}
              className={cn(
                'mono flex items-center gap-1.5 px-3 py-1.5 text-[11px] transition-colors',
                activeView === tab.id
                  ? 'text-accent'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <tab.icon className="h-3.5 w-3.5" strokeWidth={activeView === tab.id ? 2 : 1.5} />
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <button className="relative flex h-8 w-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground">
            <Bell className="h-4 w-4" />
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
          </button>
          <button className="flex h-8 w-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground">
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  )
}
