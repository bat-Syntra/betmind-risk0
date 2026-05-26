'use client'

import { cn } from '@/lib/utils'

export function OddsButton({
  label,
  odds,
  isSelected,
  onClick,
  className,
}: {
  label: string
  odds: number
  isSelected?: boolean
  onClick?: () => void
  className?: string
}) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        onClick?.()
      }}
      className={cn(
        'flex flex-1 flex-col items-center gap-0.5 rounded-xl border px-2 py-1.5 transition-all active:scale-95',
        isSelected
          ? 'border-neon-green/40 bg-neon-green/10 text-neon-green'
          : 'border-transparent bg-secondary/60 text-foreground active:bg-secondary',
        className
      )}
    >
      <span className="text-[9px] font-medium text-muted-foreground">{label}</span>
      <span className="text-[13px] font-bold tabular-nums">{odds.toFixed(2)}</span>
    </button>
  )
}
