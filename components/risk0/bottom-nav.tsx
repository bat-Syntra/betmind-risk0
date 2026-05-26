'use client'

import { LayoutGrid, Search, Ticket, Newspaper, User } from 'lucide-react'
import { cn } from '@/lib/utils'

const tabs = [
  { id: 'home', label: 'Home', icon: LayoutGrid },
  { id: 'search', label: 'Search', icon: Search },
  { id: 'parlay', label: 'Parlay', icon: Ticket },
  { id: 'news', label: 'News', icon: Newspaper },
  { id: 'profile', label: 'Profile', icon: User },
] as const

export function BottomNav({
  activeTab,
  onTabChange,
  parlayCount = 0,
}: {
  activeTab: string
  onTabChange: (tab: string) => void
  parlayCount?: number
}) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-xl pb-safe md:hidden">
      <div className="mx-auto flex max-w-lg items-center justify-around px-2 py-1">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                'relative flex flex-col items-center gap-0.5 rounded-xl px-3 py-1.5 transition-colors',
                isActive ? 'text-neon-green' : 'text-muted-foreground'
              )}
            >
              <div className="relative">
                <Icon className="h-5 w-5" strokeWidth={isActive ? 2.5 : 1.5} />
                {tab.id === 'parlay' && parlayCount > 0 && (
                  <span className="absolute -right-2 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-neon-green px-1 text-[9px] font-bold text-primary-foreground">
                    {parlayCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium">{tab.label}</span>
              {isActive && (
                <span className="absolute -top-1 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-neon-green" />
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
