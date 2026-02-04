import { NextRequest, NextResponse } from 'next/server';
import { fetchGdeltArticles } from '@/lib/news/gdelt';

export const dynamic = 'force-dynamic';

// Geopolitical news feed endpoint (GDELT)
// No API key required.
//
// Usage:
//   GET /api/news?q=Israel%20Iran%20war&max=20

export async function GET(request: NextRequest) {
  try {
    const q = request.nextUrl.searchParams.get('q') || 'Israel Iran war OR tariff OR sanctions';
    const max = request.nextUrl.searchParams.get('max');

    const result = await fetchGdeltArticles({
      query: q,
      maxRecords: Math.max(1, Math.min(100, Number(max) || 25)),
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('News analysis error:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch geopolitical news',
        hint: 'Try adding ?q=your+search+query',
      },
      { status: 500 }
    );
  }
}
