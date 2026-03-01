import { useState, useCallback } from 'react'
import MediaPreview from './MediaPreview'
import Spinner from './Spinner'
import { getSrcSet, getOptimizedSrc } from '../../lib/image'

export default function PortfolioGrid({ items }) {
  const [previewItem, setPreviewItem] = useState(null)
  const handleClose = useCallback(() => setPreviewItem(null), [])

  if (!items) {
    return <Spinner className="py-24" />
  }

  return (
    <>
      <div className="grid gap-1 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => {
          const srcSet = getSrcSet(item.src)
          return (
            <div
              key={item.id || item.src}
              role="button"
              tabIndex={0}
              className={`relative overflow-hidden cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-inset ${
                i === 0
                  ? 'sm:col-span-2 sm:row-span-2 aspect-[3/2] lg:aspect-auto'
                  : 'aspect-[3/2]'
              }`}
              onClick={() => setPreviewItem(item)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setPreviewItem(item) } }}
              aria-label={item.title ? `View ${item.title}` : 'View image'}
            >
              <img
                src={getOptimizedSrc(item.src, i === 0 ? 1200 : 800)}
                srcSet={srcSet}
                sizes={
                  i === 0
                    ? '(max-width: 640px) 100vw, 66vw'
                    : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                }
                alt={item.title || 'Portfolio image'}
                className="absolute inset-0 w-full h-full object-cover"
                loading={i < 4 ? 'eager' : 'lazy'}
                fetchPriority={i === 0 ? 'high' : undefined}
                decoding="async"
              />
            </div>
          )
        })}
      </div>

      {previewItem && (
        <MediaPreview item={previewItem} onClose={handleClose} />
      )}
    </>
  )
}
