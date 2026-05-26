'use client'

import { cn } from '@/lib/utils'

type BadgeVariant = 'value' | 'hot' | 'sharp' | 'live' | 'premium'

const variantStyles: Record<BadgeVariant, string> = {
  value: 'border-positive/30 text-positive',
  hot: 'border-negative/30 text-negative',
  sharp: 'border-accent/30 text-accent',
  live: 'border-live-pulse/30 text-live-pulse',
  premium: 'border-accent/30 text-accent',
}

const variantLabels: Record<BadgeVariant, string> = {
  value: '+EV',
  hot: 'hot',
  sharp: 'sharp',
  live: 'LIVE',
  premium: 'pro',
}

export function BadgePill({ variant, label, className }: { variant: BadgeVariant; label?: string; className?: string }) {
  return (
    <span
      className={cn(
        'mono inline-flex items-center gap-1 border px-1 py-px text-[10px] tabular-nums',
        variantStyles[variant],
        variant === 'live' && 'live-pulse',
        className
      )}
    >
      {variant === 'live' && <span className="inline-block h-1 w-1 rounded-full bg-live-pulse" />}
      {label || variantLabels[variant]}
    </span>
  )
}
