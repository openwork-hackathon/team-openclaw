// GDELT news fetcher (no API key required)
// Docs: https://blog.gdeltproject.org/gdelt-doc-2-1-api-debuts/

export interface GdeltArticle {
  url: string;
  title: string;
  sourceCountry?: string;
  domain?: string;
  seendate?: string;
  language?: string;
  snippet?: string;
}

export interface GdeltResponse {
  query: string;
  fetchedAt: string;
  count: number;
  articles: GdeltArticle[];
}

function toInt(v: string | null | undefined, d: number) {
  const n = Number(v);
  return Number.isFinite(n) ? n : d;
}

export async function fetchGdeltArticles(opts: {
  query: string;
  maxRecords?: number;
  mode?: 'ArtList' | 'timelinevol' | string;
  sort?: 'HybridRel' | 'DateDesc' | string;
  format?: 'json' | string;
  timeoutMs?: number;
}): Promise<GdeltResponse> {
  const {
    query,
    maxRecords = 25,
    mode = 'ArtList',
    sort = 'HybridRel',
    format = 'json',
    timeoutMs = 12_000,
  } = opts;

  if (!query?.trim()) throw new Error('Missing query');

  const u = new URL('https://api.gdeltproject.org/api/v2/doc/doc');
  u.searchParams.set('query', query);
  u.searchParams.set('mode', mode);
  u.searchParams.set('format', format);
  u.searchParams.set('maxrecords', String(Math.max(1, Math.min(250, maxRecords))));
  u.searchParams.set('sort', sort);

  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), timeoutMs);

  try {
    const res = await fetch(u.toString(), {
      signal: ac.signal,
      headers: {
        // A real UA helps with some edge cases / proxies.
        'user-agent': 'openclaw-hackathon/1.0 (+https://github.com/openwork-hackathon/team-openclaw)',
      },
      // Next.js: avoid caching for dynamic content.
      cache: 'no-store',
    });

    if (!res.ok) throw new Error(`GDELT HTTP ${res.status}`);

    type GdeltArticleJson = {
      url?: unknown;
      title?: unknown;
      sourceCountry?: unknown;
      domain?: unknown;
      seendate?: unknown;
      language?: unknown;
      snippet?: unknown;
    };

    type GdeltJson = {
      articles?: unknown;
      totalArticles?: unknown;
    };

    const json = (await res.json()) as unknown as GdeltJson;

    const rawArticles = Array.isArray(json?.articles) ? (json.articles as GdeltArticleJson[]) : [];

    const articles: GdeltArticle[] = rawArticles
      .map((a) => ({
        url: String(a?.url || ''),
        title: String(a?.title || ''),
        sourceCountry: a?.sourceCountry ? String(a.sourceCountry) : undefined,
        domain: a?.domain ? String(a.domain) : undefined,
        seendate: a?.seendate ? String(a.seendate) : undefined,
        language: a?.language ? String(a.language) : undefined,
        snippet: a?.snippet ? String(a.snippet) : undefined,
      }))
      .filter((a) => a.url && a.title);

    const total = json?.totalArticles;
    const count = toInt(
      typeof total === 'string' ? total : typeof total === 'number' ? String(total) : null,
      articles.length
    );

    return {
      query,
      fetchedAt: new Date().toISOString(),
      count,
      articles,
    };
  } finally {
    clearTimeout(t);
  }
}
