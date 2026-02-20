import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { password } = req.body || {}

  if (!password) {
    return res.status(400).json({ error: 'Password is required' })
  }

  const hash = process.env.ADMIN_PASSWORD_HASH
  const secret = process.env.JWT_SECRET

  if (!hash || !secret) {
    return res.status(500).json({ error: 'Server configuration error' })
  }

  const valid = await bcrypt.compare(password, hash)

  if (!valid) {
    return res.status(401).json({ error: 'Invalid password' })
  }

  const token = jwt.sign({ role: 'admin' }, secret, { expiresIn: '7d' })

  const isProduction = process.env.VERCEL_ENV === 'production'
  const cookie = [
    `admin_token=${token}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Strict',
    'Max-Age=604800',
    ...(isProduction ? ['Secure'] : []),
  ].join('; ')

  res.setHeader('Set-Cookie', cookie)
  return res.status(200).json({ success: true })
}
