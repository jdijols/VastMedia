import { useState, useRef } from 'react'
import { upload } from '@vercel/blob/client'
import { Upload, X, Film, ImageIcon } from 'lucide-react'

export default function MediaUploader({ value, onChange, accept = 'image/*,video/*' }) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef(null)

  const isVideo = value && /\.(mp4|webm|mov)/i.test(value)

  async function handleFile(e) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError('')

    try {
      const blob = await upload(file.name, file, {
        access: 'public',
        handleUploadUrl: '/api/media/upload',
      })
      onChange(blob.url)
    } catch (err) {
      setError(err.message || 'Upload failed')
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  function handleRemove() {
    onChange('')
  }

  return (
    <div>
      {value ? (
        <div className="relative rounded-xl overflow-hidden border border-brand-200 bg-brand-50">
          {isVideo ? (
            <video
              src={value}
              className="w-full h-48 object-cover"
              muted
              playsInline
            />
          ) : (
            <img
              src={value}
              alt="Preview"
              className="w-full h-48 object-cover"
            />
          )}
          <div className="absolute top-2 right-2 flex gap-2">
            <button
              type="button"
              onClick={handleRemove}
              className="p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors cursor-pointer"
              title="Remove"
            >
              <X size={14} />
            </button>
          </div>
          <div className="absolute bottom-2 left-2">
            <span className="inline-flex items-center gap-1 bg-black/60 text-white text-xs px-2 py-1 rounded-md">
              {isVideo ? <Film size={12} /> : <ImageIcon size={12} />}
              {isVideo ? 'Video' : 'Image'}
            </span>
          </div>
        </div>
      ) : (
        <label
          className={`flex flex-col items-center justify-center h-48 rounded-xl border-2 border-dashed transition-colors cursor-pointer ${
            uploading
              ? 'border-brand-400 bg-brand-50'
              : 'border-brand-200 hover:border-brand-400 hover:bg-brand-50'
          }`}
        >
          {uploading ? (
            <>
              <div className="w-8 h-8 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin mb-3" />
              <p className="text-sm text-brand-500">Uploading...</p>
            </>
          ) : (
            <>
              <Upload size={24} className="text-brand-400 mb-3" />
              <p className="text-sm text-brand-600 font-medium">
                Click to upload
              </p>
              <p className="text-xs text-brand-400 mt-1">
                Images or videos
              </p>
            </>
          )}
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            onChange={handleFile}
            className="hidden"
            disabled={uploading}
          />
        </label>
      )}

      {error && (
        <p className="text-red-500 text-xs mt-2">{error}</p>
      )}
    </div>
  )
}
