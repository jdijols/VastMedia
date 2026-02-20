import { list, put } from '@vercel/blob'
import jwt from 'jsonwebtoken'
import { DEFAULTS } from '../../src/data/defaults.js'

async function getBlob(section) {
  const { blobs } = await list({ prefix: `content/${section}.json`, limit: 1 })
  if (blobs.length === 0) return null
  const res = await fetch(blobs[0].url)
  return res.json()
}

function verifyAuth(req) {
  const token = req.cookies?.admin_token
  if (!token) return false
  try {
    jwt.verify(token, process.env.JWT_SECRET)
    return true
  } catch {
    return false
  }
}

export default async function handler(req, res) {
  const { section } = req.query

  const validSections = [
    'homepage',
    'testimonials',
    'pricing',
    'about',
    'portfolio-real-estate',
    'portfolio-videography',
    'portfolio-portraits',
    'portfolio-events',
    'footer',
  ]

  if (!validSections.includes(section)) {
    return res.status(400).json({ error: 'Invalid section' })
  }

  if (req.method === 'GET') {
    try {
      const data = await getBlob(section)
      res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=3600')
      return res.status(200).json(data || DEFAULTS[section])
    } catch (error) {
      console.error('Blob get error:', error)
      return res.status(200).json(DEFAULTS[section])
    }
  }

  if (req.method === 'PUT') {
    if (!verifyAuth(req)) {
      return res.status(401).json({ error: 'Not authenticated' })
    }

    try {
      const blob = await put(`content/${section}.json`, JSON.stringify(req.body), {
        access: 'public',
        addRandomSuffix: false,
        allowOverwrite: true,
        contentType: 'application/json',
      })
      return res.status(200).json({ success: true, url: blob.url })
    } catch (error) {
      console.error('Blob put error:', error)
      return res.status(500).json({
        error: error?.message || 'Failed to save content',
      })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
