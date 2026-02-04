export type MoltbookPostRequest = {
  text: string;
};

export async function moltbookPost(req: MoltbookPostRequest) {
  void req;
  const apiKey = process.env.MOLTBOOK_API_KEY;
  if (!apiKey) throw new Error('MOLTBOOK_API_KEY not configured');

  // Moltbook API is not standardized here yet; keep as a stub with a clear error message.
  // Implement once endpoint + auth scheme are confirmed.
  throw new Error('Moltbook posting not implemented: missing API spec');
}
