'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { X } from 'lucide-react'
import { useState } from 'react'

const SOURCE_COPY: Record<string, string> = {
  twitter: 'You found us via Twitter.',
  reddit: 'You found us via Reddit.',
  telegram: 'You found us via Telegram.',
  email: 'You found us via email.',
}

function UTMBannerInner() {
  const params = useSearchParams()
  const utmSource = params.get('utm_source')
  const [dismissed, setDismissed] = useState(false)

  if (!utmSource || dismissed) return null

  const copy = SOURCE_COPY[utmSource] ?? `You found us via ${utmSource}.`

  return (
    <div className="flex items-center justify-between border-b-2 border-accent bg-accent/5 px-4 py-2.5">
      <div className="flex items-center gap-3">
        <span className="mono text-[11px] text-muted-foreground">{copy}</span>
        <button className="mono border border-accent px-2 py-0.5 text-[11px] font-semibold text-accent transition-colors hover:bg-accent hover:text-accent-foreground">
          Unlock free trial →
        </button>
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}

export function UTMBanner() {
  return (
    <Suspense fallback={null}>
      <UTMBannerInner />
    </Suspense>
  )
}
