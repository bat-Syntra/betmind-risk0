'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { cn } from '@/lib/utils'

export function ProbabilityBar({
  label,
  percentage,
  color = 'green',
  delay = 0,
}: {
  label: string
  percentage: number
  color?: 'green' | 'cyan' | 'red' | 'gold'
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  const barColors = {
    green: 'from-neon-green/80 to-neon-green',
    cyan: 'from-neon-cyan/80 to-neon-cyan',
    red: 'from-hot-red/80 to-hot-red',
    gold: 'from-gold/80 to-gold',
  }

  const bgColors = {
    green: 'bg-neon-green/10',
    cyan: 'bg-neon-cyan/10',
    red: 'bg-hot-red/10',
    gold: 'bg-gold/10',
  }

  return (
    <div ref={ref} className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-foreground">{label}</span>
        <span
          className={cn(
            'font-bold tabular-nums',
            color === 'green' && 'text-neon-green',
            color === 'cyan' && 'text-neon-cyan',
            color === 'red' && 'text-hot-red',
            color === 'gold' && 'text-gold'
          )}
        >
          {percentage}%
        </span>
      </div>
      <div className={cn('h-2.5 overflow-hidden rounded-full', bgColors[color])}>
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percentage}%` } : {}}
          transition={{ duration: 1, ease: 'easeOut', delay }}
          className={cn('h-full rounded-full bg-gradient-to-r', barColors[color])}
        />
      </div>
    </div>
  )
}
