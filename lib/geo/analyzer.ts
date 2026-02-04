// Geopolitical Event Analyzer
// Lightweight heuristics + optional news-backed analysis.

import { fetchGdeltArticles } from '@/lib/news/gdelt';

export interface GeoEvent {
  id: string;
  topic: string;
  region: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  impactScore: number;
  cryptoCorrelation: 'risk-on' | 'risk-off' | 'neutral';
  summary: string;
  timestamp: string;
  headlines?: Array<{ title: string; url: string }>;
}

export const REGIONS = [
  'Israel-Gaza', 'USA', 'Iran', 'China', 'Taiwan',
  'Russia', 'Pakistan', 'Trump', 'BRICS', 'Tariffs'
];

function analyzeSentiment(text: string): 'positive' | 'negative' | 'neutral' {
  const negative = ['war', 'conflict', 'sanction', 'crisis', 'attack', 'strike'];
  const positive = ['peace', 'deal', 'growth', 'adoption', 'ceasefire'];
  const lower = text.toLowerCase();
  const neg = negative.filter(w => lower.includes(w)).length;
  const pos = positive.filter(w => lower.includes(w)).length;
  if (neg > pos) return 'negative';
  if (pos > neg) return 'positive';
  return 'neutral';
}

function estimateCryptoImpact(text: string): 'risk-on' | 'risk-off' | 'neutral' {
  const lower = text.toLowerCase();
  if (['war', 'conflict', 'sanction', 'crisis', 'attack', 'strike'].some(w => lower.includes(w))) return 'risk-off';
  if (['peace', 'deal', 'adoption', 'ceasefire'].some(w => lower.includes(w))) return 'risk-on';
  return 'neutral';
}

function pickRegion(text: string) {
  return REGIONS.find(r => text.toLowerCase().includes(r.toLowerCase())) || 'Global';
}

export class GeoAnalyzer {
  async analyzeTopic(topic: string): Promise<GeoEvent> {
    const sentiment = analyzeSentiment(topic);
    const cryptoCorrelation = estimateCryptoImpact(topic);
    const region = pickRegion(topic);

    return {
      id: crypto.randomUUID(),
      topic,
      region,
      sentiment,
      // Heuristic score for now.
      impactScore: Math.random() * 0.8 + 0.1,
      cryptoCorrelation,
      summary: `Analysis of "${topic}" impact on crypto markets`,
      timestamp: new Date().toISOString(),
    };
  }

  async analyzeTopicWithNews(topic: string, opts?: { maxHeadlines?: number }) {
    const maxHeadlines = Math.max(1, Math.min(20, opts?.maxHeadlines ?? 8));
    const news = await fetchGdeltArticles({ query: topic, maxRecords: maxHeadlines });

    const headlineText = news.articles.map(a => a.title).join(' | ');
    const sentiment = analyzeSentiment(`${topic} ${headlineText}`);
    const cryptoCorrelation = estimateCryptoImpact(`${topic} ${headlineText}`);
    const region = pickRegion(`${topic} ${headlineText}`);

    return {
      id: crypto.randomUUID(),
      topic,
      region,
      sentiment,
      impactScore: Math.random() * 0.8 + 0.1,
      cryptoCorrelation,
      summary: `News-backed analysis of "${topic}" based on ${news.articles.length} headlines`,
      timestamp: new Date().toISOString(),
      headlines: news.articles.slice(0, maxHeadlines).map(a => ({ title: a.title, url: a.url })),
    } satisfies GeoEvent;
  }
}

export const geoAnalyzer = new GeoAnalyzer();
