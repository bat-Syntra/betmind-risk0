'use client'

import { cn } from '@/lib/utils'

type BadgeVariant = 'value' | 'hot' | 'sharp' | 'live' | 'premium'

const variantStyles: Record<BadgeVariant, string> = {
  value: 'bg-neon-green/10 text-neon-green',
  hot: 'bg-hot-red/10 text-hot-red',
  sharp: 'bg-gold/10 text-gold',
  live: 'bg-hot-red/15 text-hot-red',
  premium: 'bg-gold/10 text-gold',
}

const variantLabels: Record<BadgeVariant, string> = {
  value: '+EV Value',
  hot: 'Hot',
  sharp: 'Sharp',
  live: 'LIVE',
  premium: 'PRO',
}

export function BadgePill({ variant, label, className }: { variant: BadgeVariant; label?: string; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-semibold',
        variantStyles[variant],
        variant === 'live' && 'live-pulse',
        className
      )}
    >
      {variant === 'live' && <span className="inline-block h-1.5 w-1.5 rounded-full bg-hot-red" />}
      {label || variantLabels[variant]}
    </span>
  )
}
