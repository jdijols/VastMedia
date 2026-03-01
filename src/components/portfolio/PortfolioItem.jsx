import { Play } from 'lucide-react'
import { getSrcSet, getOptimizedSrc } from '../../lib/image'

export default function PortfolioItem({
  item,
  onClick,
  className = '',
  priority = false,
  showPlayIcon = false,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
}) {
  const isVideo = item.type === 'video'
  const srcSet = getSrcSet(item.src)
  const label = item.title
    ? `View ${item.title}${isVideo ? ' (video)' : ''}`
    : isVideo ? 'View video' : 'View image'

  return (
    <div
      role="button"
      tabIndex={0}
      className={`relative overflow-hidden cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-inset ${className}`}
      onClick={() => onClick(item)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(item) } }}
      aria-label={label}
    >
      <img
        src={getOptimizedSrc(item.src, 800)}
        srcSet={srcSet}
        sizes={sizes}
        alt={item.title || 'Portfolio image'}
        className="absolute inset-0 w-full h-full object-cover"
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding="async"
      />

      {isVideo && showPlayIcon && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
          <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
            <Play className="w-6 h-6 text-white fill-white ml-0.5" />
          </div>
        </div>
      )}
    </div>
  )
}
