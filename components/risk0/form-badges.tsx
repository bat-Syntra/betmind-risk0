'use client'

import { cn } from '@/lib/utils'

const resultColors = {
  W: 'bg-neon-green/20 text-neon-green',
  L: 'bg-hot-red/20 text-hot-red',
  D: 'bg-muted-foreground/20 text-muted-foreground',
}

export function FormBadges({ form }: { form: ('W' | 'L' | 'D')[] }) {
  return (
    <div className="flex items-center gap-1">
      {form.map((result, i) => (
        <span
          key={i}
          className={cn(
            'flex h-5 w-5 items-center justify-center rounded text-[10px] font-bold',
            resultColors[result]
          )}
        >
          {result}
        </span>
      ))}
    </div>
  )
}
