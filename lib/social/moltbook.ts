export type MoltbookPostRequest = {
  text: string;
};

function buildAuthHeader(apiKey: string) {
  const headerName = (process.env.MOLTBOOK_AUTH_HEADER || 'authorization').toLowerCase();
  const scheme = process.env.MOLTBOOK_AUTH_SCHEME ?? 'Bearer';
  const value = scheme ? `${scheme} ${apiKey}` : apiKey;
  return { headerName, value };
}

function resolvePostUrl() {
  const explicit = process.env.MOLTBOOK_POST_URL;
  if (explicit) return explicit;

  const base = process.env.MOLTBOOK_API_URL;
  if (!base) {
    throw new Error('MOLTBOOK_POST_URL or MOLTBOOK_API_URL not configured');
  }

  // Default convention: POST {base}/posts
  return `${base.replace(/\/+$/, '')}/posts`;
}

/**
 * Generic “Moltbook” poster.
 *
 * Because Moltbook isn't a standard public API in this repo, we make the integration configurable
 * via env vars rather than hardcoding a spec.
 *
 * Required:
 * - MOLTBOOK_API_KEY
 * - (MOLTBOOK_POST_URL) OR (MOLTBOOK_API_URL)
 *
 * Optional:
 * - MOLTBOOK_AUTH_HEADER (default: authorization)
 * - MOLTBOOK_AUTH_SCHEME (default: Bearer). Set to empty string to send raw key.
 */
export async function moltbookPost(req: MoltbookPostRequest) {
  const apiKey = process.env.MOLTBOOK_API_KEY;
  if (!apiKey) throw new Error('MOLTBOOK_API_KEY not configured');

  const url = resolvePostUrl();
  const { headerName, value } = buildAuthHeader(apiKey);

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      [headerName]: value,
    },
    body: JSON.stringify({ text: req.text }),
  });

  const text = await res.text();
  if (!res.ok) {
    throw new Error(`Moltbook post failed (${res.status}): ${text}`);
  }

  try {
    return JSON.parse(text);
  } catch {
    return { raw: text };
  }
}
