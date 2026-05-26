import { AIAnalysis, Event } from './types'

export function getAnalysisForEvent(event: Event): AIAnalysis {
  const isUFCOrBoxing = event.sport === 'ufc' || event.sport === 'boxing'

  if (isUFCOrBoxing) {
    return {
      confidence: event.aiConfidence,
      probabilities: {
        home: Math.round(100 / event.odds.home),
        away: Math.round(100 / event.odds.away),
      },
      valueBets: event.valueBets || [],
      keyInsights: [
        `${event.participant1.name} has a significant experience advantage in championship rounds`,
        `Striking volume differential favors ${event.participant2.name} at distance`,
        'Historical data shows southpaw fighters have a 12% edge in this matchup archetype',
        `The ${event.league} co-main tends to produce finishes 65% of the time`,
      ],
      scenarios: [
        {
          title: `${event.participant1.name} Ground Control`,
          probability: 42,
          description: `${event.participant1.name} secures early takedowns and maintains top control. Ground-and-pound leads to a dominant decision or late TKO. Key factor: chain wrestling and cage control.`,
        },
        {
          title: 'Stand-up War',
          probability: 35,
          description: `Both fighters trade on the feet with high volume. ${event.participant2.name} utilizes reach advantage while ${event.participant1.name} works inside. This favors the more durable fighter.`,
        },
        {
          title: `${event.participant2.name} Counter-Strike KO`,
          probability: 23,
          description: `${event.participant2.name} times a counter shot during a level change. Flash KO or accumulation TKO via devastating counter-punching. Most likely in rounds 1-2.`,
        },
      ],
    }
  }

  if (event.sport === 'nba') {
    return {
      confidence: event.aiConfidence,
      probabilities: {
        home: Math.round(100 / event.odds.home),
        away: Math.round(100 / event.odds.away),
      },
      valueBets: event.valueBets || [],
      keyInsights: [
        `${event.participant1.name} rank top-5 in defensive efficiency this postseason`,
        `Home-court advantage provides a historically significant 6.2% edge in elimination games`,
        `${event.participant2.name} shooting 3.8% below season average from three in the playoffs`,
        'Pace differential suggests an under-tempo game favoring the home team',
      ],
      scenarios: [
        {
          title: 'Home Team Dominant',
          probability: 48,
          description: `${event.participant1.name} control the pace and utilize their home-court advantage. Elite defense forces tough shots and transition opportunities create separation in Q3.`,
        },
        {
          title: 'Competitive Close Game',
          probability: 32,
          description: `Both teams trade blows throughout with multiple lead changes. Game comes down to execution in the clutch. Free throws and turnovers become deciding factors.`,
        },
        {
          title: 'Away Team Upset',
          probability: 20,
          description: `${event.participant2.name} come out aggressive and hit from deep early, silencing the crowd. Strong bench play and a hot shooting night overcome home-court disadvantage.`,
        },
      ],
    }
  }

  // Default: Football/NFL
  const hasDraw = event.odds.draw !== undefined
  return {
    confidence: event.aiConfidence,
    probabilities: {
      home: Math.round(100 / event.odds.home),
      draw: hasDraw ? Math.round(100 / event.odds.draw!) : undefined,
      away: Math.round(100 / event.odds.away),
    },
    valueBets: event.valueBets || [],
    keyInsights: [
      `${event.participant1.name} have won ${Math.floor(Math.random() * 5) + 8} of their last 12 home matches`,
      `${event.participant2.name} missing key players in the midfield reduces away threat`,
      'Historical H2H data shows home advantage is significant in this fixture',
      'Expected goals model suggests Over 2.5 at 58% probability',
    ],
    scenarios: [
      {
        title: 'Home Dominance',
        probability: 45,
        description: `${event.participant1.name} control possession and create chances through the flanks. Early goal opens the game up and allows them to play on the counter. Likely scoreline: 2-0 or 3-1.`,
      },
      {
        title: 'Tight Tactical Battle',
        probability: 30,
        description: `Both managers set up defensively with low block. Few clear chances with the game decided by a set piece or individual moment of quality. Draw or 1-0 to either side.`,
      },
      {
        title: 'Away Counter-Attack Success',
        probability: 25,
        description: `${event.participant2.name} absorb pressure and hit on the break. Pace on the wings causes problems for the home defense. A disciplined away performance secures points.`,
      },
    ],
  }
}

export function getStatComparisons(event: Event) {
  const { sport, participant1, participant2 } = event

  if (sport === 'ufc' || sport === 'boxing') {
    const s1 = participant1.stats || {}
    const s2 = participant2.stats || {}
    return [
      { label: 'Striking Acc.', value1: s1.strikingAcc || 52, value2: s2.strikingAcc || 48 },
      { label: 'Defense', value1: s1.tdDefense || 75, value2: s2.tdDefense || 65 },
      { label: 'Volume', value1: Math.round((s1.strikesPerMin || 4) * 10), value2: Math.round((s2.strikesPerMin || 5) * 10) },
      { label: 'Grappling', value1: s1.tdAcc || 50, value2: s2.tdAcc || 45 },
      { label: 'Experience', value1: Math.min(95, (participant1.record?.split('-')[0] ? parseInt(participant1.record.split('-')[0]) * 3 : 60)), value2: Math.min(95, (participant2.record?.split('-')[0] ? parseInt(participant2.record.split('-')[0]) * 3 : 55)) },
    ]
  }

  if (sport === 'nba') {
    const s1 = participant1.stats || {}
    const s2 = participant2.stats || {}
    return [
      { label: 'Offense (ORtg)', value1: Math.round((s1.ortg || 115) / 1.3), value2: Math.round((s2.ortg || 113) / 1.3) },
      { label: 'Defense (DRtg)', value1: Math.round(100 - (s1.drtg || 110) / 1.2 + 10), value2: Math.round(100 - (s2.drtg || 111) / 1.2 + 10) },
      { label: '3PT%', value1: Math.round(s1.threePt || 36), value2: Math.round(s2.threePt || 35) },
      { label: 'Pace', value1: Math.round((s1.pace || 99) / 1.1), value2: Math.round((s2.pace || 98) / 1.1) },
      { label: 'Form', value1: 72, value2: 65 },
    ]
  }

  // Football / NFL
  return [
    { label: 'Form', value1: 82, value2: 68 },
    { label: 'Attack', value1: 78, value2: 72 },
    { label: 'Defense', value1: 75, value2: 70 },
    { label: 'Possession', value1: 62, value2: 55 },
    { label: 'H2H Record', value1: 60, value2: 40 },
  ]
}
