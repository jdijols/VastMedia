import { del } from '@vercel/blob'
import jwt from 'jsonwebtoken'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const token = req.cookies?.admin_token
  if (!token) {
    return res.status(401).json({ error: 'Not authenticated' })
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET)
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' })
  }

  const { url } = req.body || {}

  if (!url) {
    return res.status(400).json({ error: 'URL is required' })
  }

  try {
    await del(url)
    return res.status(200).json({ success: true })
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete media' })
  }
}
