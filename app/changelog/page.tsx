import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'Changelog — BetMind',
  description: 'Versioned release notes.',
}

const RELEASES = [
  {
    version: 'v1.0.0',
    date: '2026-05-26',
    tag: 'current',
    changes: [
      'Initial public release',
      'Real-time +EV scanning across 6 sports (UFC, NBA, NFL, Football, Boxing, NHL)',
      'CLV tracking per pick',
      'Sharp money % signal from 7 sources',
      'Free tier: delayed odds 15min. Pro tier: real-time.',
      'Keyboard shortcuts: ⌘K palette, ? overlay, 1-5 sport tabs',
      'Public pick log at /transparency',
      'Methodology documentation at /methodology',
      'New visitor intro slide-over (cookie-based, dismiss once)',
    ],
  },
  {
    version: 'v0.9.0',
    date: '2026-05-10',
    tag: 'beta',
    changes: [
      'Private beta launch',
      'Core dashboard with event cards',
      'Parlay builder (3-leg max in free tier)',
      'Sports news feed with impact tagging',
      'Analysis page with value bet breakdown',
    ],
  },
  {
    version: 'v0.5.0',
    date: '2026-04-01',
    tag: 'alpha',
    changes: [
      'Alpha release to first 50 users',
      'Static event data for testing',
      'Basic odds display',
      'Sport tab filtering',
    ],
  },
]

const ROADMAP = [
  ['v1.1.0', 'Auth system + user accounts'],
  ['v1.2.0', 'Stripe integration (Pro tier)'],
  ['v1.3.0', 'Real-time WebSocket odds updates'],
  ['v1.4.0', 'CLV history graph per pick'],
  ['v1.5.0', 'Bankroll tracker + Kelly criterion'],
  ['v2.0.0', 'API access for Pro users'],
]

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-4 py-8">
        <Link
          href="/"
          className="mono mb-8 inline-flex items-center gap-1.5 text-[11px] text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3 w-3" />
          back to terminal
        </Link>

        <div className="mb-8">
          <p className="mono text-[10px] uppercase tracking-widest text-[#525252]">betmind / releases</p>
          <h1 className="mono mt-1 text-xl font-bold text-foreground">Changelog</h1>
          <p className="mono mt-1 text-[12px] text-muted-foreground">
            Indie-style release notes. No marketing speak.
          </p>
        </div>

        <div className="space-y-8">
          {RELEASES.map((release) => (
            <div key={release.version} className="border-l-2 border-border pl-4">
              <div className="mb-3 flex items-center gap-2">
                <span className="mono text-[13px] font-bold text-foreground">{release.version}</span>
                <span className="mono text-[11px] text-[#525252]">{release.date}</span>
                {release.tag === 'current' && (
                  <span className="mono border border-positive/30 px-1 text-[10px] text-positive">
                    current
                  </span>
                )}
                {release.tag === 'beta' && (
                  <span className="mono border border-accent/30 px-1 text-[10px] text-accent">
                    beta
                  </span>
                )}
              </div>
              <ul className="space-y-1.5">
                {release.changes.map((change) => (
                  <li key={change} className="mono flex items-start gap-2 text-[11px] text-muted-foreground">
                    <span className="mt-0.5 text-[#525252]">+</span>
                    {change}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-border pt-6">
          <h2 className="mono mb-4 text-[12px] font-bold text-foreground">Roadmap (planned)</h2>
          <div className="space-y-2">
            {ROADMAP.map(([version, desc]) => (
              <div key={version} className="mono flex items-center gap-3 text-[11px]">
                <span className="w-16 shrink-0 text-[#525252]">{version}</span>
                <span className="text-muted-foreground">{desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
