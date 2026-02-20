import { useState } from 'react'
import MediaPreview from './MediaPreview'

export default function PortfolioGrid({ items }) {
  const [previewItem, setPreviewItem] = useState(null)

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <div
            key={i}
            className={`group relative overflow-hidden rounded-2xl cursor-pointer ${
              i === 0
                ? 'sm:col-span-2 sm:row-span-2 aspect-[3/2] lg:aspect-auto'
                : 'aspect-[3/2]'
            }`}
            onClick={() => setPreviewItem(item)}
          >
            <img
              src={item.src}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading={i < 4 ? 'eager' : 'lazy'}
              fetchpriority={i === 0 ? 'high' : undefined}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <div>
                <p className="text-white font-semibold">{item.title}</p>
                {item.subtitle && (
                  <p className="text-brand-300 text-sm mt-1">{item.subtitle}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {previewItem && (
        <MediaPreview
          item={previewItem}
          onClose={() => setPreviewItem(null)}
        />
      )}
    </>
  )
}
