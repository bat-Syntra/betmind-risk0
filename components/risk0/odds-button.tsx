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
        'flex flex-1 flex-col items-center gap-0.5 border px-2 py-1.5 transition-colors',
        isSelected
          ? 'border-accent/40 bg-accent/10 text-accent'
          : 'border-border bg-secondary text-foreground hover:border-accent/20',
        className
      )}
    >
      <span className="text-[9px] text-muted-foreground">{label}</span>
      <span className="mono text-[13px] font-semibold tabular-nums">{odds > 0 ? `+${odds}` : odds}</span>
    </button>
  )
}
