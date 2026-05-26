'use client'

import { useState, useEffect } from 'react'

export function StatusBar() {
  const [syncAge, setSyncAge] = useState(3)

  useEffect(() => {
    const t = setInterval(() => {
      setSyncAge((s) => (s >= 59 ? 1 : s + 1))
    }, 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="flex h-8 items-center gap-0 overflow-x-auto border-b border-border bg-card px-3 scrollbar-none">
      <div className="flex shrink-0 items-center gap-1.5 pr-3">
        <span className="live-pulse inline-block h-1.5 w-1.5 rounded-full bg-live-pulse" />
        <span className="mono text-[10px] font-semibold text-live-pulse">LIVE</span>
      </div>
      <span className="mono shrink-0 pr-3 text-[10px] text-border">·</span>
      <span className="mono shrink-0 pr-3 text-[10px] text-muted-foreground">7 sources</span>
      <span className="mono shrink-0 pr-3 text-[10px] text-border">·</span>
      <span className="mono shrink-0 pr-3 text-[10px] text-muted-foreground">
        sync{' '}
        <span className="text-foreground">{syncAge}s ago</span>
      </span>
      <span className="mono shrink-0 pr-3 text-[10px] text-border">·</span>
      <span className="mono shrink-0 pr-3 text-[10px] text-muted-foreground">
        tracked: <span className="text-foreground">12</span>
      </span>
      <span className="mono shrink-0 pr-3 text-[10px] text-border">·</span>
      <span className="mono shrink-0 text-[10px] text-[#525252]">v1.0.0</span>
    </div>
  )
}
