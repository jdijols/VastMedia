import { handleUpload } from '@vercel/blob'
import jwt from 'jsonwebtoken'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const response = await handleUpload({
      body: req.body,
      request: req,
      onBeforeGenerateToken: async () => {
        const token = req.cookies?.admin_token
        if (!token) throw new Error('Not authenticated')

        try {
          jwt.verify(token, process.env.JWT_SECRET)
        } catch {
          throw new Error('Invalid or expired token')
        }

        return {
          allowedContentTypes: [
            'image/jpeg',
            'image/png',
            'image/webp',
            'image/gif',
            'video/mp4',
            'video/webm',
            'video/quicktime',
          ],
          maximumSizeInBytes: 500 * 1024 * 1024,
        }
      },
      onUploadCompleted: async () => {},
    })

    return res.status(200).json(response)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}
