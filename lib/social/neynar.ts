export type NeynarCastRequest = {
  text: string;
  signerUuid: string;
  parent?: {
    fid: number;
    hash: string;
  };
};

export async function neynarPostCast(req: NeynarCastRequest) {
  const apiKey = process.env.NEYNAR_API_KEY;
  if (!apiKey) throw new Error('NEYNAR_API_KEY not configured');

  // Neynar v2 create cast endpoint.
  // If Neynar changes their API, this will fail loudly and the caller will get the response body.
  const res = await fetch('https://api.neynar.com/v2/farcaster/cast', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      api_key: apiKey,
    },
    body: JSON.stringify({
      signer_uuid: req.signerUuid,
      text: req.text,
      parent: req.parent,
    }),
  });

  const text = await res.text();
  if (!res.ok) {
    throw new Error(`Neynar cast failed (${res.status}): ${text}`);
  }

  try {
    return JSON.parse(text);
  } catch {
    return { raw: text };
  }
}
