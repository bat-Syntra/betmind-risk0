export type Sport = 'football' | 'ufc' | 'nba' | 'nfl' | 'boxing' | 'nhl'

export interface Participant {
  id: string
  name: string
  shortName: string
  logo: string
  record?: string
  form?: ('W' | 'L' | 'D')[]
  stats?: Record<string, number>
}

export interface ValueBet {
  market: string
  currentOdds: number
  trueProbability: number
  expectedValue: number
  edge: number
  confidence: 'high' | 'medium' | 'low'
  reasoning: string
  suggestedStake: string
}

export interface Event {
  id: string
  sport: Sport
  league: string
  startTime: string
  status: 'upcoming' | 'live' | 'finished'
  participant1: Participant
  participant2: Participant
  odds: {
    home: number
    draw?: number
    away: number
    spread?: { line: number; homeOdds: number; awayOdds: number }
    total?: { line: number; over: number; under: number }
  }
  valueBets?: ValueBet[]
  aiConfidence: number
  badges: ('value' | 'hot' | 'sharp' | 'live')[]
}

export interface ParlayPick {
  eventId: string
  sport: Sport
  selection: string
  odds: number
  participant1Name: string
  participant2Name: string
}

export interface AIAnalysis {
  scenarios: Scenario[]
  probabilities: { home: number; draw?: number; away: number }
  valueBets: ValueBet[]
  keyInsights: string[]
  confidence: number
}

export interface Scenario {
  title: string
  probability: number
  description: string
}

export interface SportTab {
  id: string
  label: string
  count: number
}
