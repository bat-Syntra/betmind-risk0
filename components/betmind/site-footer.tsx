import Link from 'next/link'

export function SiteFooter() {
  return (
    <footer className="border-t border-border px-4 py-3">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-y-2 gap-x-4">
        <div className="flex items-center gap-3">
          <span className="mono flex items-center gap-1.5 text-[11px] text-[#525252]">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-positive" />
            v1.0.0
          </span>
          <span className="mono text-[11px] text-[#525252]">uptime 99.8%</span>
        </div>

        <nav className="flex flex-wrap items-center gap-3">
          <Link
            href="/methodology"
            className="mono text-[11px] text-muted-foreground transition-colors hover:text-foreground"
          >
            /methodology
          </Link>
          <Link
            href="/transparency"
            className="mono text-[11px] text-muted-foreground transition-colors hover:text-foreground"
          >
            /transparency
          </Link>
          <Link
            href="/changelog"
            className="mono text-[11px] text-muted-foreground transition-colors hover:text-foreground"
          >
            /changelog
          </Link>
        </nav>

        <span className="mono text-[11px] text-[#525252]">Made in Montreal</span>
      </div>
    </footer>
  )
}
