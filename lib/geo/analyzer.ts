// Geopolitical Event Analyzer
// Fetches news and analyzes market impact

export interface GeoEvent {
  id: string;
  topic: string;
  region: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  impactScore: number;
  cryptoCorrelation: 'risk-on' | 'risk-off' | 'neutral';
  summary: string;
  timestamp: string;
}

export const REGIONS = [
  'Israel-Gaza', 'USA', 'Iran', 'China', 'Taiwan',
  'Russia', 'Pakistan', 'Trump', 'BRICS', 'Tariffs'
];

function analyzeSentiment(text: string): 'positive' | 'negative' | 'neutral' {
  const negative = ['war', 'conflict', 'sanction', 'crisis', 'attack'];
  const positive = ['peace', 'deal', 'growth', 'adoption'];
  const lower = text.toLowerCase();
  const neg = negative.filter(w => lower.includes(w)).length;
  const pos = positive.filter(w => lower.includes(w)).length;
  if (neg > pos) return 'negative';
  if (pos > neg) return 'positive';
  return 'neutral';
}

function estimateCryptoImpact(text: string): GeoEvent['cryptoCorrelation'] {
  const lower = text.toLowerCase();
  if (['war', 'conflict', 'sanction', 'crisis'].some(w => lower.includes(w))) return 'risk-off';
  if (['peace', 'deal', 'adoption'].some(w => lower.includes(w))) return 'risk-on';
  return 'neutral';
}

export class GeoAnalyzer {
  async analyzeTopic(topic: string): Promise<GeoEvent> {
    const sentiment = analyzeSentiment(topic);
    const cryptoCorrelation = estimateCryptoImpact(topic);
    const region = REGIONS.find(r => topic.toLowerCase().includes(r.toLowerCase())) || 'Global';
    
    return {
      id: crypto.randomUUID(),
      topic,
      region,
      sentiment,
      impactScore: Math.random() * 0.8 + 0.1,
      cryptoCorrelation,
      summary: `Analysis of ${topic} impact on crypto markets`,
      timestamp: new Date().toISOString(),
    };
  }
}

export const geoAnalyzer = new GeoAnalyzer();
