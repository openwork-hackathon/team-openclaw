import { NextRequest, NextResponse } from 'next/server';
import { geoAnalyzer } from '../../../lib/geo/analyzer';

function toItem(e: any) {
  return {
    title: `${e.region}: ${e.topic}`,
    summary: e.summary,
    sentiment: e.sentiment,
    impactScore: e.impactScore,
    cryptoCorrelation: e.cryptoCorrelation,
    timestamp: e.timestamp,
  };
}

export async function GET(request: NextRequest) {
  const topic = request.nextUrl.searchParams.get('q');

  // Default: return a small board of monitored topics.
  if (!topic) {
    const topics = [
      'Israel-Gaza ceasefire talks',
      'US tariff escalation',
      'China-Taiwan naval activity',
      'BRICS settlement headlines',
    ];

    const events = await Promise.all(topics.map(t => geoAnalyzer.analyzeTopic(t)));
    return NextResponse.json({ news: events.map(toItem) });
  }

  const event = await geoAnalyzer.analyzeTopic(topic);
  return NextResponse.json({ news: [toItem(event)] });
}

export async function POST(request: NextRequest) {
  const { topic } = await request.json().catch(() => ({}));
  if (!topic) {
    return NextResponse.json(
      { error: 'Missing topic' },
      { status: 400 }
    );
  }
  const event = await geoAnalyzer.analyzeTopic(topic);
  return NextResponse.json({ news: [toItem(event)] });
}
