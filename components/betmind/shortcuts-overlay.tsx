'use client'

import { X } from 'lucide-react'
import { motion } from 'framer-motion'

const SHORTCUTS = [
  { key: '⌘K', label: 'Command palette' },
  { key: '?', label: 'Show shortcuts' },
  { key: '1 – 5', label: 'Switch sport tab' },
  { key: 'F', label: 'Focus search / filter' },
  { key: 'Esc', label: 'Close / dismiss' },
]

export function ShortcutsOverlay({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 6 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 6 }}
        transition={{ duration: 0.12 }}
        className="w-72 border border-border bg-card p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between">
          <span className="mono text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
            Keyboard shortcuts
          </span>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="space-y-2.5">
          {SHORTCUTS.map((s) => (
            <div key={s.key} className="flex items-center justify-between">
              <span className="mono text-[11px] text-muted-foreground">{s.label}</span>
              <kbd className="mono rounded border border-border bg-secondary px-1.5 py-0.5 text-[10px] text-foreground">
                {s.key}
              </kbd>
            </div>
          ))}
        </div>
        <div className="mt-4 border-t border-border pt-3">
          <p className="mono text-[10px] text-[#525252]">
            Press <kbd className="rounded border border-border bg-secondary px-1 text-[9px]">Esc</kbd> to close
          </p>
        </div>
      </motion.div>
    </div>
  )
}
