import { useState, useCallback } from 'react'
import MediaPreview from '../ui/MediaPreview'
import Spinner from '../ui/Spinner'

export default function PortfolioWrapper({ items, children }) {
  const [previewItem, setPreviewItem] = useState(null)
  const handleClose = useCallback(() => setPreviewItem(null), [])

  if (!items) {
    return <Spinner className="py-24" label="Loading portfolio items" />
  }

  return (
    <div aria-live="polite">
      {children({ items, onItemClick: setPreviewItem })}

      {previewItem && (
        <MediaPreview item={previewItem} onClose={handleClose} />
      )}
    </div>
  )
}
