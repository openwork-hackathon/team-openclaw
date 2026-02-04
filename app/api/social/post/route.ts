import { NextRequest, NextResponse } from 'next/server';
import { neynarPostCast } from '@/lib/social/neynar';
import { moltbookPost } from '@/lib/social/moltbook';

/**
 * POST /api/social/post
 *
 * Body:
 * {
 *   "text": "...",
 *   "platform": "farcaster" | "moltbook" | "both" (default: "farcaster"),
 *   "signerUuid": "..." (optional; falls back to NEYNAR_SIGNER_UUID)
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const text = body?.text;
    const platform = (body?.platform || 'farcaster') as 'farcaster' | 'moltbook' | 'both';

    if (!text || typeof text !== 'string' || !text.trim()) {
      return NextResponse.json({ error: 'Missing text' }, { status: 400 });
    }

    const results: Record<string, unknown> = {};
    const errors: Record<string, string> = {};

    if (platform === 'farcaster' || platform === 'both') {
      try {
        const signerUuid = (body?.signerUuid || process.env.NEYNAR_SIGNER_UUID) as string | undefined;
        if (!signerUuid) throw new Error('Missing signerUuid (or NEYNAR_SIGNER_UUID)');
        results.farcaster = await neynarPostCast({ text, signerUuid });
      } catch (e) {
        errors.farcaster = String(e);
      }
    }

    if (platform === 'moltbook' || platform === 'both') {
      try {
        results.moltbook = await moltbookPost({ text });
      } catch (e) {
        errors.moltbook = String(e);
      }
    }

    const ok = Object.keys(errors).length === 0;
    return NextResponse.json(
      {
        ok,
        platform,
        results,
        errors: Object.keys(errors).length ? errors : undefined,
        at: new Date().toISOString(),
      },
      { status: ok ? 200 : 502 }
    );
  } catch (error) {
    console.error('Social post error:', error);
    return NextResponse.json({ error: 'Failed to post', details: String(error) }, { status: 500 });
  }
}
