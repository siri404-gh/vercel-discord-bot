export async function POST(req: Request) {
  const rawBody = await request.text();
  const rawBodyBuffer = Buffer.from(rawBody, 'utf-8');
  const json = JSON.parse(rawBodyBuffer.toString('utf-8'));
  console.log(json)
  return Response.json({ success: true })
}
