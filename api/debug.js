export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  return res.status(200).json({
    env: {
      BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN ? `set (${process.env.BLOB_READ_WRITE_TOKEN.length} chars)` : 'MISSING',
      JWT_SECRET: process.env.JWT_SECRET ? `set (${process.env.JWT_SECRET.length} chars)` : 'MISSING',
      ADMIN_PASSWORD_HASH: process.env.ADMIN_PASSWORD_HASH ? `set (${process.env.ADMIN_PASSWORD_HASH.length} chars)` : 'MISSING',
    },
    node: process.version,
  })
}
