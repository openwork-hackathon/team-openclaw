import { NextRequest, NextResponse } from 'next/server';
import { geoAnalyzer } from '@/lib/geo/analyzer';

export const dynamic = 'force-dynamic';

// Geopolitics → crypto impact analysis.
//
// GET /api/geo?q=Israel%20Iran%20war
// GET /api/geo?q=Israel%20Iran%20war&news=1   (news-backed via GDELT)

export async function GET(request: NextRequest) {
  const topic = request.nextUrl.searchParams.get('q');
  const news = request.nextUrl.searchParams.get('news');
  const max = request.nextUrl.searchParams.get('max');

  if (!topic) return NextResponse.json({ error: 'Missing ?q=topic' }, { status: 400 });

  if (news === '1' || news === 'true') {
    return NextResponse.json(
      await geoAnalyzer.analyzeTopicWithNews(topic, {
        maxHeadlines: Math.max(1, Math.min(20, Number(max) || 8)),
      })
    );
  }

  return NextResponse.json(await geoAnalyzer.analyzeTopic(topic));
}

export async function POST(request: NextRequest) {
  const { topic, news, maxHeadlines } = await request.json();
  if (!topic) return NextResponse.json({ error: 'Missing topic' }, { status: 400 });

  if (news) {
    return NextResponse.json(
      await geoAnalyzer.analyzeTopicWithNews(topic, {
        maxHeadlines: Math.max(1, Math.min(20, Number(maxHeadlines) || 8)),
      })
    );
  }

  return NextResponse.json(await geoAnalyzer.analyzeTopic(topic));
}
