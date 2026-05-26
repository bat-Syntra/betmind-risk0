import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'Transparency — BetMind',
  description: 'Every pick ever published. Closing line value log, sortable.',
}

const PICKS = [
  { date: '2026-05-25', event: 'Makhachev vs Oliveira', pick: 'Makhachev ML', odds: -165, close: -175, ev: '+3.2', clv: '+2.1', result: 'W' },
  { date: '2026-05-24', event: 'Celtics vs Pacers G5', pick: 'Celtics -4.5', odds: -110, close: -115, ev: '+2.8', clv: '+1.4', result: 'W' },
  { date: '2026-05-23', event: 'Chiefs vs Bills', pick: 'Over 49.5', odds: -108, close: -112, ev: '+2.1', clv: '+1.1', result: 'L' },
  { date: '2026-05-22', event: 'Man City vs Arsenal', pick: 'Man City ML', odds: +105, close: +100, ev: '+4.1', clv: '+1.5', result: 'W' },
  { date: '2026-05-21', event: 'Canelo vs Munguia', pick: 'Canelo ML', odds: -280, close: -310, ev: '+2.5', clv: '+3.2', result: 'W' },
  { date: '2026-05-20', event: 'Lakers vs Nuggets', pick: 'Nuggets -3', odds: -112, close: -118, ev: '+2.0', clv: '+1.8', result: 'L' },
  { date: '2026-05-19', event: 'Cowboys vs Eagles', pick: 'Eagles ML', odds: -130, close: -140, ev: '+3.4', clv: '+2.2', result: 'W' },
  { date: '2026-05-18', event: 'Liverpool vs Chelsea', pick: 'Draw +NB', odds: +260, close: +245, ev: '+2.9', clv: '+1.9', result: 'L' },
]

const SUMMARY = {
  total: 247,
  wins: 159,
  losses: 88,
  avgEV: '+2.8',
  avgCLV: '+1.7',
  roi: '+8.4',
}

export default function TransparencyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <Link
          href="/"
          className="mono mb-8 inline-flex items-center gap-1.5 text-[11px] text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3 w-3" />
          back to terminal
        </Link>

        <div className="mb-6">
          <p className="mono text-[10px] uppercase tracking-widest text-[#525252]">betmind / public log</p>
          <h1 className="mono mt-1 text-xl font-bold text-foreground">Transparency</h1>
          <p className="mono mt-1 text-[12px] text-muted-foreground">
            Every pick ever published. No edits. No deletions.
          </p>
        </div>

        {/* Summary stats */}
        <div className="mb-6 grid grid-cols-3 gap-2 border border-border bg-card p-3 sm:grid-cols-6">
          {[
            ['Total', SUMMARY.total],
            ['W', SUMMARY.wins],
            ['L', SUMMARY.losses],
            ['Avg EV', SUMMARY.avgEV + '%'],
            ['Avg CLV', SUMMARY.avgCLV + '%'],
            ['ROI', SUMMARY.roi + '%'],
          ].map(([label, value]) => (
            <div key={label as string} className="text-center">
              <p className="mono text-[10px] text-[#525252]">{label}</p>
              <p className="mono text-[13px] font-bold text-foreground tabular-nums">{value}</p>
            </div>
          ))}
        </div>

        {/* Pick table */}
        <div className="overflow-x-auto">
          <table className="mono w-full min-w-[600px] text-[11px]">
            <thead>
              <tr className="border-b border-border">
                {['Date', 'Event', 'Pick', 'Odds', 'Close', 'EV%', 'CLV%', 'Result'].map((h) => (
                  <th
                    key={h}
                    className="px-2 py-2 text-left font-semibold uppercase tracking-widest text-[#525252]"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PICKS.map((pick, i) => (
                <tr key={i} className="border-b border-border hover:bg-card transition-colors">
                  <td className="px-2 py-2 text-muted-foreground tabular-nums">{pick.date}</td>
                  <td className="px-2 py-2 text-foreground">{pick.event}</td>
                  <td className="px-2 py-2 text-foreground">{pick.pick}</td>
                  <td className="px-2 py-2 tabular-nums text-foreground">{pick.odds > 0 ? `+${pick.odds}` : pick.odds}</td>
                  <td className="px-2 py-2 tabular-nums text-muted-foreground">{pick.close > 0 ? `+${pick.close}` : pick.close}</td>
                  <td className="px-2 py-2 tabular-nums text-positive">{pick.ev}%</td>
                  <td className="px-2 py-2 tabular-nums text-positive">{pick.clv}%</td>
                  <td className="px-2 py-2 tabular-nums font-bold">
                    <span className={pick.result === 'W' ? 'text-positive' : 'text-negative'}>
                      {pick.result}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mono mt-4 text-[10px] text-[#525252]">
          Showing 8 of {SUMMARY.total} total picks. Full CSV export coming soon.
        </p>

        <div className="mt-12 border-t border-border pt-6">
          <p className="mono text-[10px] text-[#525252]">
            How EV and CLV are calculated →{' '}
            <Link href="/methodology" className="text-accent underline underline-offset-2">
              /methodology
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
