'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Brain } from 'lucide-react'
import { cn } from '@/lib/utils'

export function AIConfidenceCard({ confidence }: { confidence: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  const level = confidence >= 80 ? 'High' : confidence >= 60 ? 'Medium' : 'Low'
  const levelColor =
    confidence >= 80 ? 'text-neon-green' : confidence >= 60 ? 'text-gold' : 'text-hot-red'
  const barColor =
    confidence >= 80
      ? 'from-neon-green/60 to-neon-green'
      : confidence >= 60
        ? 'from-gold/60 to-gold'
        : 'from-hot-red/60 to-hot-red'

  return (
    <div ref={ref} className="glass-card rounded-xl p-5">
      <div className="mb-4 flex items-center gap-2">
        <Brain className="h-5 w-5 text-neon-green" />
        <h3 className="text-lg font-bold text-foreground">AI Confidence</h3>
      </div>

      <div className="mb-2 flex items-end justify-between">
        <span className={cn('text-3xl font-bold tabular-nums', levelColor)}>
          {confidence}%
        </span>
        <span className={cn('text-sm font-semibold', levelColor)}>
          {level}
        </span>
      </div>

      <div className="mb-3 h-3 overflow-hidden rounded-full bg-secondary/50">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${confidence}%` } : {}}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
          className={cn('h-full rounded-full bg-gradient-to-r', barColor)}
        />
      </div>

      <p className="text-xs text-muted-foreground">
        Based on 50+ variables, historical data, and real-time analysis
      </p>
    </div>
  )
}
