export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const cookie = [
    'admin_token=',
    'Path=/',
    'HttpOnly',
    'SameSite=Strict',
    'Max-Age=0',
  ].join('; ')

  res.setHeader('Set-Cookie', cookie)
  return res.status(200).json({ success: true })
}
