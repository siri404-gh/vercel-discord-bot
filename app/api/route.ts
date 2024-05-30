import crypto from 'crypto';

const sha1 = crypto.createHash('sha1')
const INTEGRATION_SECRET = 'P5uBgq3Qvaq3MD69ndDlvBSd'
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1245528235400368248/KWhw4RKvHAWsoka6e3lZvexYzqNfE1fBdxEnLjU-9T7lrSFeHwy5lEbVG7NwUpZPyNgc'

export async function POST(request: Request) {
  const rawBody = await request.text();
  const rawBodyBuffer = Buffer.from(rawBody, 'utf-8');
  const json = JSON.parse(rawBodyBuffer.toString('utf-8'));
  const bodySignature = sha1(rawBodyBuffer, INTEGRATION_SECRET);
 
  if (bodySignature !== request.headers.get('x-vercel-signature')) {
    console.log('Invalid bodySignature')
    return Response.json({
      code: 'invalid_signature',
      error: "signature didn't match",
    });
  }
  
  const { id, payload: { name }, type } = json
  try {
    await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        username: 'Vercel',
        content: type,
        avatar_url: 'https://avatars.githubusercontent.com/u/14985020?s=200&v=4'
      })
    }) 
  } catch (err) { 
    console.log('2', err) 
  }
  return Response.json({ success: true })
}
