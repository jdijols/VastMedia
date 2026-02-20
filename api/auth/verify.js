import jwt from 'jsonwebtoken'

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const token = req.cookies?.admin_token

  if (!token) {
    return res.status(401).json({ error: 'Not authenticated' })
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET)
    return res.status(200).json({ authenticated: true })
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' })
  }
}
