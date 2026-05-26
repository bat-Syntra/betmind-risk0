'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export function StatBar({
  label,
  value1,
  value2,
  delay = 0,
}: {
  label: string
  value1: number
  value2: number
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <div ref={ref} className="flex flex-col gap-1">
      <div className="flex items-center justify-between text-sm">
        <span className="font-bold tabular-nums text-neon-green">{value1}%</span>
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
        <span className="font-bold tabular-nums text-hot-red">{value2}%</span>
      </div>
      <div className="flex h-2 gap-1 overflow-hidden rounded-full">
        <div className="flex flex-1 justify-end overflow-hidden rounded-l-full bg-neon-green/10">
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: `${value1}%` } : {}}
            transition={{ duration: 0.8, ease: 'easeOut', delay }}
            className="h-full rounded-l-full bg-gradient-to-l from-neon-green to-neon-green/60"
          />
        </div>
        <div className="flex flex-1 overflow-hidden rounded-r-full bg-hot-red/10">
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: `${value2}%` } : {}}
            transition={{ duration: 0.8, ease: 'easeOut', delay }}
            className="h-full rounded-r-full bg-gradient-to-r from-hot-red to-hot-red/60"
          />
        </div>
      </div>
    </div>
  )
}
