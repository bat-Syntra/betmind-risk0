'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export function CounterStat({
  value,
  prefix = '',
  suffix = '',
  label,
  highlight,
  className,
}: {
  value: number
  prefix?: string
  suffix?: string
  label: string
  highlight?: 'green' | 'gold' | 'red' | 'cyan'
  pulse?: boolean
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [displayed, setDisplayed] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const duration = 1200
    const steps = 40
    const increment = value / steps
    let current = 0
    const delay = setTimeout(() => {
      const timer = setInterval(() => {
        current += increment
        if (current >= value) {
          setDisplayed(value)
          clearInterval(timer)
        } else {
          setDisplayed(Math.floor(current))
        }
      }, duration / steps)
      return () => clearInterval(timer)
    }, 150)
    return () => clearTimeout(delay)
  }, [mounted, value])

  const colors = {
    green: 'text-neon-green',
    gold: 'text-gold',
    red: 'text-hot-red',
    cyan: 'text-neon-cyan',
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={cn('flex flex-col gap-0.5 border border-border bg-card p-3', className)}
    >
      <span className="mono text-[10px] text-muted-foreground">{label}</span>
      <span className={cn('mono text-xl font-bold tabular-nums', highlight && colors[highlight])}>
        {prefix}{displayed.toLocaleString()}{suffix}
      </span>
    </motion.div>
  )
}
