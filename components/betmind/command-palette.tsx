'use client'

import { useEffect, useState } from 'react'
import { Command } from 'cmdk'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { sampleEvents } from '@/lib/data'

export function CommandPalette({ onClose }: { onClose: () => void }) {
  const router = useRouter()
  const [search, setSearch] = useState('')

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  const navigate = (path: string) => {
    router.push(path)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-background/80 pt-16 px-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.12 }}
        className="w-full max-w-lg border border-border bg-card overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <Command className="font-mono text-[12px]" shouldFilter={true}>
          <div className="flex items-center border-b border-border px-3">
            <span className="mono text-[11px] text-muted-foreground pr-2">⌘</span>
            <Command.Input
              autoFocus
              value={search}
              onValueChange={setSearch}
              placeholder="Search events, pages, commands..."
              className="mono flex-1 bg-transparent py-3 text-[12px] text-foreground placeholder:text-[#525252] outline-none"
            />
            <button
              onClick={onClose}
              className="mono text-[10px] text-[#525252] border border-border px-1.5 py-0.5 ml-2 hover:text-foreground transition-colors"
            >
              esc
            </button>
          </div>

          <Command.List className="max-h-72 overflow-y-auto p-1 scrollbar-none">
            <Command.Empty className="mono py-6 text-center text-[11px] text-[#525252]">
              No results for &quot;{search}&quot;
            </Command.Empty>

            <Command.Group
              heading=""
              className="[&_[cmdk-group-heading]]:mono [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-[#525252]"
            >
              {[
                { label: 'Home', path: '/' },
                { label: 'Methodology', path: '/methodology' },
                { label: 'Transparency', path: '/transparency' },
                { label: 'Changelog', path: '/changelog' },
              ].map((item) => (
                <Command.Item
                  key={item.path}
                  value={item.label}
                  onSelect={() => navigate(item.path)}
                  className="mono flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-[12px] text-foreground data-[selected=true]:bg-secondary"
                >
                  <span className="text-[#525252]">→</span>
                  {item.label}
                </Command.Item>
              ))}
            </Command.Group>

            {sampleEvents.length > 0 && (
              <Command.Group
                heading="Events"
                className="mt-1 [&_[cmdk-group-heading]]:mono [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-[#525252]"
              >
                {sampleEvents.slice(0, 8).map((event) => (
                  <Command.Item
                    key={event.id}
                    value={`${event.participant1.name} ${event.participant2.name} ${event.league}`}
                    onSelect={() => navigate(`/analysis/${event.id}`)}
                    className="mono flex cursor-pointer items-center justify-between rounded-sm px-2 py-1.5 text-[12px] text-foreground data-[selected=true]:bg-secondary"
                  >
                    <span>
                      {event.participant1.shortName} vs {event.participant2.shortName}
                    </span>
                    <span className="text-[10px] text-[#525252]">{event.league}</span>
                  </Command.Item>
                ))}
              </Command.Group>
            )}
          </Command.List>
        </Command>
      </motion.div>
    </div>
  )
}
