import { NextRequest, NextResponse } from 'next/server';
import { geoAnalyzer } from '../../../lib/geo/analyzer';

export async function GET(request: NextRequest) {
  const topic = request.nextUrl.searchParams.get('q');
  if (!topic) return NextResponse.json({ error: 'Missing ?q=topic' }, { status: 400 });
  return NextResponse.json(await geoAnalyzer.analyzeTopic(topic));
}

export async function POST(request: NextRequest) {
  const { topic } = await request.json();
  if (!topic) return NextResponse.json({ error: 'Missing topic' }, { status: 400 });
  return NextResponse.json(await geoAnalyzer.analyzeTopic(topic));
}
