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
            Last updated: 2026-05-26 · v1.0.1
          </p>
          <p className="mono mt-2 text-[12px] leading-relaxed text-muted-foreground">
            How we surface +EV markets — the math, the signals, and the boundaries we know about. No marketing, no logos.
          </p>
        </div>

        <div className="space-y-8 border-l border-border pl-4">

          <section>
            <h2 className="mono mb-3 text-[13px] font-bold text-foreground">1. Reference data</h2>
            <p className="mono mb-3 text-[12px] leading-relaxed text-muted-foreground">
              The system aggregates prices and signals from a curated set of references chosen for accuracy, not visibility. We don&apos;t publish the list — that&apos;s intentional, see §7.
            </p>
            <div className="space-y-1.5">
              {[
                ['Sharp market consensus', 'A basket of low-vig reference books, used to estimate true probabilities.'],
                ['Regulated sharp markets', 'Cross-validation on major North American leagues.'],
                ['Exchange liquidity', 'Peer-to-peer prices as a sanity check on bookmaker odds.'],
                ['Event metadata', 'Injury reports, confirmed lineups, weather, historical splits.'],
                ['Market intelligence', 'Sharp-money flow, reverse-line-movement flags, steam detection.'],
                ['Streaming odds feeds', 'Real-time refresh across every tracked market.'],
              ].map(([label, desc]) => (
                <div key={label} className="border border-border bg-card p-3">
                  <p className="mono text-[11px] font-semibold text-foreground">{label}</p>
                  <p className="mono mt-0.5 text-[11px] text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
            <p className="mono mt-3 text-[11px] text-muted-foreground">
              If you want to know whether a specific book was covered for a given pick, the answer is in the{' '}
              <Link href="/transparency" className="text-accent underline underline-offset-2">transparency log</Link>.
              {' '}Every published pick lists the books that priced it at publication.
            </p>
          </section>

          <section>
            <h2 className="mono mb-3 text-[13px] font-bold text-foreground">2. EV calculation</h2>
            <div className="border border-border bg-card p-3 mb-3">
              <pre className="mono text-[12px] text-positive">
{`EV%    = (p_true × decimal_odds − 1) × 100
p_true = 1 / no_vig_implied_odds`}
              </pre>
            </div>
            <p className="mono text-[12px] leading-relaxed text-muted-foreground">
              True probability is obtained by removing the bookmaker margin from sharp consensus lines at the moment of market open, before late action displaces them. Default: multiplicative devig method. Logarithmic and Shin variants are exposed under advanced filters.
            </p>
            <p className="mono mt-2 text-[12px] leading-relaxed text-muted-foreground">
              The EV figure shown next to each pick is the edge against the best price available at publication — not the price you&apos;ll see at click time. Lines move.
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
              CLV measures whether you beat the line at close. A bettor with persistent positive CLV has a real edge regardless of short-term win rate. Target: CLV &gt; +1.5% averaged over 500+ settled bets.
            </p>
            <p className="mono mt-2 text-[12px] leading-relaxed text-muted-foreground">
              CLV is the only metric we trust for long-horizon evaluation. Hit rate, profit, and ROI on small samples are noise.
            </p>
          </section>

          <section>
            <h2 className="mono mb-3 text-[13px] font-bold text-foreground">4. Sharp signal</h2>
            <p className="mono text-[12px] leading-relaxed text-muted-foreground">
              Three independent inputs blended into one normalized score (0–100):
            </p>
            <ul className="mt-2 space-y-1.5">
              {[
                'Directional agreement across our reference books',
                'Reverse line movement (line moves against the public)',
                'Steam detection (synchronized moves across multiple books within a narrow window)',
              ].map((l) => (
                <li key={l} className="mono flex items-start gap-2 text-[11px] text-muted-foreground">
                  <span className="mt-0.5 shrink-0 text-[#525252]">—</span>
                  {l}
                </li>
              ))}
            </ul>
            <p className="mono mt-2 text-[11px] text-muted-foreground">
              Score &gt; 55: sharp side aligns with model. &gt; 75: unanimous. &lt; 40: not published.
            </p>
          </section>

          <section>
            <h2 className="mono mb-3 text-[13px] font-bold text-foreground">5. Publication threshold</h2>
            <div className="border border-border bg-card p-3 mb-3">
              <pre className="mono text-[12px] text-positive">
{`EV    > +2.0%
Sharp > 55
Books ≥ 3 offering the price`}
              </pre>
            </div>
            <p className="mono text-[12px] leading-relaxed text-muted-foreground">
              Parlays are not algorithmically recommended. Combined edge degrades multiplicatively and most parlay structures hide correlation that the math doesn&apos;t catch.
            </p>
          </section>

          <section>
            <h2 className="mono mb-3 text-[13px] font-bold text-foreground">6. Known limitations</h2>
            <ul className="space-y-1.5">
              {[
                'Closing-line data carries ~30s latency from the underlying market.',
                'Injury and lineup data is pulled from public feeds. Late scratches and warmup decisions may not propagate in time.',
                'Free accounts see odds with a 15-minute display delay.',
                'The model does not estimate correlation across legs in custom parlays.',
                'Small-sample warning: EV figures over fewer than 200 settled bets are statistically meaningless.',
              ].map((l) => (
                <li key={l} className="mono flex items-start gap-2 text-[11px] text-muted-foreground">
                  <span className="mt-0.5 shrink-0 text-[#525252]">—</span>
                  {l}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mono mb-3 text-[13px] font-bold text-foreground">7. Why we don&apos;t publish the source list</h2>
            <ul className="space-y-2">
              {[
                ['Operational', "Naming the reference books invites them to throttle or block our access. The stack was assembled to survive that pressure — naming it defeats the point."],
                ['Honest', "The value isn't which sources we use, it's how they're combined, devigged, and timed. A vendor list wouldn't help you reproduce the signal."],
                ['Boring', "A public source list reads like a brochure. We're shipping a tool, not selling logos."],
              ].map(([title, desc]) => (
                <li key={title as string} className="border border-border bg-card p-3 list-none">
                  <p className="mono text-[11px] font-semibold text-foreground">{title}</p>
                  <p className="mono mt-0.5 text-[11px] text-muted-foreground">{desc}</p>
                </li>
              ))}
            </ul>
          </section>

        </div>

        <div className="mt-12 border-t border-border pt-6 space-y-1">
          <p className="mono text-[11px] text-muted-foreground">
            Found a methodological error? Open it on{' '}
            <Link href="/transparency" className="text-accent underline underline-offset-2">/transparency</Link>.
          </p>
          <p className="mono text-[11px] text-muted-foreground">
            We post corrections in the{' '}
            <Link href="/changelog" className="text-accent underline underline-offset-2">/changelog</Link>.
          </p>
        </div>
      </div>
    </div>
  )
}
