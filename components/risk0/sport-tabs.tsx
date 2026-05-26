'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { SportTab } from '@/lib/types'

export function SportTabs({
  tabs,
  activeTab,
  onTabChange,
}: {
  tabs: SportTab[]
  activeTab: string
  onTabChange: (id: string) => void
}) {
  return (
    <div className="flex gap-1.5 overflow-x-auto px-4 pb-1 scrollbar-none">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            'relative shrink-0 rounded-xl px-3.5 py-2 text-[13px] font-medium transition-colors',
            activeTab === tab.id
              ? 'text-primary-foreground'
              : 'text-muted-foreground active:text-foreground'
          )}
        >
          {activeTab === tab.id && (
            <motion.div
              layoutId="sportTab"
              className="absolute inset-0 rounded-xl bg-neon-green"
              transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-1.5">
            {tab.label}
            <span
              className={cn(
                'text-[10px] font-bold tabular-nums',
                activeTab === tab.id ? 'text-primary-foreground/60' : 'text-muted-foreground/50'
              )}
            >
              {tab.count}
            </span>
          </span>
        </button>
      ))}
    </div>
  )
}
