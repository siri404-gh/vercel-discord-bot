export async function POST(request: Request) {
  const rawBody = await request.text();
  const rawBodyBuffer = Buffer.from(rawBody, 'utf-8');
  const json = JSON.parse(rawBodyBuffer.toString('utf-8'));
  const { id, payload: { name }, type } = json
  console.log(1, name, type)
  try {
    console.log(2, 'about to post')
    await fetch('https://discord.com/api/webhooks/1245528235400368248/KWhw4RKvHAWsoka6e3lZvexYzqNfE1fBdxEnLjU-9T7lrSFeHwy5lEbVG7NwUpZPyNgc', {
      method: 'POST',
      // "body": "username=a&content=mb&avatar_url=https://avatars.githubusercontent.com/u/14985020?s=200&v=4",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Vercel',
        content: type,
        avatar_url: 'https://avatars.githubusercontent.com/u/14985020?s=200&v=4'
      })
    }) 
  } catch (err) { 
    console.log('2', err) 
  }
  return Response.json({ success: true })
}
