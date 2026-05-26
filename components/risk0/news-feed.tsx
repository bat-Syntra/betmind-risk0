'use client'

import { motion } from 'framer-motion'
import { Clock, ChevronRight, AlertTriangle, TrendingUp, Info } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { NewsItem } from '@/lib/data'

const impactConfig: Record<string, { icon: React.ReactNode; style: string; label: string }> = {
  high: {
    icon: <AlertTriangle className="h-3 w-3" />,
    style: 'bg-hot-red/10 text-hot-red',
    label: 'High',
  },
  medium: {
    icon: <TrendingUp className="h-3 w-3" />,
    style: 'bg-gold/10 text-gold',
    label: 'Medium',
  },
  low: {
    icon: <Info className="h-3 w-3" />,
    style: 'bg-neon-cyan/10 text-neon-cyan',
    label: 'Low',
  },
}

export function NewsView({ news }: { news: NewsItem[] }) {
  return (
    <div className="flex flex-col gap-2 px-4 pb-24">
      {news.map((item, i) => {
        const impact = impactConfig[item.impact]
        return (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: i * 0.04 }}
            className="glass-card group rounded-2xl p-3.5 active:bg-secondary/30"
          >
            {/* Impact + tag */}
            <div className="mb-2 flex items-center gap-2">
              <span className={cn('inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-semibold', impact.style)}>
                {impact.icon}
                {impact.label}
              </span>
              <span className="rounded-md bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                {item.tag}
              </span>
            </div>

            {/* Title */}
            <h3 className="mb-1.5 text-[13px] font-semibold leading-snug text-foreground">
              {item.title}
            </h3>
            <p className="mb-2.5 text-[12px] leading-relaxed text-muted-foreground line-clamp-2">
              {item.summary}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-medium text-muted-foreground/60">{item.source}</span>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-[10px] text-muted-foreground/60">
                  <Clock className="h-2.5 w-2.5" />
                  {item.timestamp}
                </span>
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/20" />
              </div>
            </div>
          </motion.article>
        )
      })}
    </div>
  )
}
