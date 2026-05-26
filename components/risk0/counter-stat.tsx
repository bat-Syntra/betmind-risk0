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
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={cn('flex flex-col gap-0.5 rounded-2xl bg-secondary/50 p-3.5', className)}
    >
      <span className="text-[10px] font-medium text-muted-foreground">{label}</span>
      <span className={cn('text-xl font-bold tabular-nums', highlight && colors[highlight])}>
        {prefix}{displayed.toLocaleString()}{suffix}
      </span>
    </motion.div>
  )
}
