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
                'relative flex flex-col items-center gap-0.5 rounded-xl px-3 py-1.5 transition-all duration-200',
                isActive
                  ? 'bg-neon-green/10 text-neon-green'
                  : 'text-muted-foreground hover:text-foreground'
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
              <span className={cn('text-[10px] font-medium', isActive && 'font-bold')}>{tab.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
