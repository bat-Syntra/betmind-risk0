import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'Methodology — BetMind',
  description: 'Technical documentation for EV calculation, data sources, and limitations.',
}

export default function MethodologyPage() {
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
          <p className="mono text-[10px] uppercase tracking-widest text-[#525252]">betmind / docs</p>
          <h1 className="mono mt-1 text-xl font-bold text-foreground">Methodology</h1>
          <p className="mono mt-1 text-[12px] text-muted-foreground">
            Last updated: 2026-05-26 · v1.0.0
          </p>
        </div>

        <div className="space-y-8 border-l border-border pl-4">

          <section>
            <h2 className="mono mb-3 text-[13px] font-bold text-foreground">1. Data sources</h2>
            <div className="space-y-2">
              {[
                ['Pinnacle', 'Primary sharp book reference. No-vig lines used for true probability.'],
                ['BetCRIS', 'Latin American sharp market. Cross-validated against Pinnacle.'],
                ['Circa Sports', 'US sharp book. Used for NFL, NBA lines.'],
                ['Betfair Exchange', 'Peer-to-peer prices for liquidity confirmation.'],
                ['ESPN / Stats Perform', 'Injury reports, lineup data, historical stats.'],
                ['The Action Network', 'Sharp money percentages, public betting splits.'],
                ['SportRadar', 'Live event data, odds feeds (7 sources in status bar).'],
              ].map(([source, desc]) => (
                <div key={source} className="border border-border bg-card p-3">
                  <p className="mono text-[11px] font-semibold text-foreground">{source}</p>
                  <p className="mono mt-0.5 text-[11px] text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mono mb-3 text-[13px] font-bold text-foreground">2. EV calculation</h2>
            <div className="border border-border bg-card p-3 mb-3">
              <p className="mono text-[11px] text-muted-foreground">Formula:</p>
              <pre className="mono mt-2 text-[12px] text-positive">
{`EV% = (p_true × decimal_odds − 1) × 100

p_true = 1 / (line_home_no_vig)
line_no_vig = devigged from Pinnacle opening`}
              </pre>
            </div>
            <p className="mono text-[12px] leading-relaxed text-muted-foreground">
              Devigging uses the multiplicative method. We take Pinnacle opening lines (within 2min of market open) before sharp action moves them. This gives the cleanest signal.
            </p>
          </section>

          <section>
            <h2 className="mono mb-3 text-[13px] font-bold text-foreground">3. CLV (Closing Line Value)</h2>
            <div className="border border-border bg-card p-3 mb-3">
              <pre className="mono text-[12px] text-positive">
{`CLV% = (bet_odds / close_odds − 1) × 100`}
              </pre>
            </div>
            <p className="mono text-[12px] leading-relaxed text-muted-foreground">
              CLV measures whether you beat the market at close. A bettor with consistent positive CLV has a genuine edge, regardless of short-term results. Target: CLV &gt; +1.5% over 500+ bets.
            </p>
          </section>

          <section>
            <h2 className="mono mb-3 text-[13px] font-bold text-foreground">4. Sharp % signal</h2>
            <p className="mono text-[12px] leading-relaxed text-muted-foreground">
              &quot;Sharp %&quot; is derived from: (line movement direction matching sharp book consensus) × (reverse line movement flag) × (steam move detection within 90s). Normalized to 0–100 scale.
            </p>
          </section>

          <section>
            <h2 className="mono mb-3 text-[13px] font-bold text-foreground">5. Threshold for publication</h2>
            <p className="mono text-[12px] leading-relaxed text-muted-foreground">
              A pick is surfaced when: EV &gt; +2.0% AND sharp% &gt; 55 AND odds available at 3+ books. Parlays are not recommended (edge degrades multiplicatively).
            </p>
          </section>

          <section>
            <h2 className="mono mb-3 text-[13px] font-bold text-foreground">6. Known limitations</h2>
            <ul className="space-y-1.5">
              {[
                'Closing line data has ~30s latency from live market.',
                'Injury data from public sources. Late scratches may not be reflected.',
                'Odds on display may be 15min delayed for free accounts.',
                'Model does not account for correlated parlays.',
                'Small sample warning: EV is meaningless over < 200 bets.',
              ].map((l) => (
                <li key={l} className="mono flex items-start gap-2 text-[11px] text-muted-foreground">
                  <span className="mt-0.5 text-[#525252]">—</span>
                  {l}
                </li>
              ))}
            </ul>
          </section>

        </div>

        <div className="mt-12 border-t border-border pt-6">
          <p className="mono text-[10px] text-[#525252]">
            Questions or corrections →{' '}
            <Link href="/transparency" className="text-accent underline underline-offset-2">
              /transparency
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
