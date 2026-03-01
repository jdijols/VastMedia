import { useState, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { getSrcSet, getOptimizedSrc } from '../../lib/image'

export default function PortfolioCarousel({
  item,
  onClick,
  className = '',
  priority = false,
}) {
  const images = item.images || []
  const [slide, setSlide] = useState({ current: 0, prev: null, direction: 'next' })
  const { current, prev, direction } = slide

  const handlePrevious = useCallback(
    (e) => {
      e.stopPropagation()
      setSlide((s) => ({
        current: (s.current - 1 + images.length) % images.length,
        prev: s.current,
        direction: 'prev',
      }))
    },
    [images.length],
  )

  const handleNext = useCallback(
    (e) => {
      e.stopPropagation()
      setSlide((s) => ({
        current: (s.current + 1) % images.length,
        prev: s.current,
        direction: 'next',
      }))
    },
    [images.length],
  )

  const handleClick = useCallback(
    () => onClick(item),
    [onClick, item],
  )

  if (images.length === 0) return null

  const getImageStyle = (i) => {
    if (i === current && prev === null) return {}
    if (i === current) {
      return {
        animation: `${direction === 'next' ? 'slide-in-from-right' : 'slide-in-from-left'} 500ms ease-out forwards`,
      }
    }
    if (i === prev) {
      return {
        animation: `${direction === 'next' ? 'slide-out-to-left' : 'slide-out-to-right'} 500ms ease-out forwards`,
      }
    }
    return {}
  }

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label={item.title || 'Image carousel'}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        role="button"
        tabIndex={0}
        className="absolute inset-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-inset"
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick() }
          if (e.key === 'ArrowLeft') { e.preventDefault(); handlePrevious(e) }
          if (e.key === 'ArrowRight') { e.preventDefault(); handleNext(e) }
        }}
        aria-label={`View full size — image ${current + 1} of ${images.length}`}
      >
        {images.map((src, i) => {
          if (i !== current && i !== prev) return null
          const srcSet = getSrcSet(src)
          return (
            <img
              key={src + i}
              src={getOptimizedSrc(src, 1200)}
              srcSet={srcSet}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              alt={item.title ? `${item.title} — image ${i + 1}` : `Portfolio image ${i + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
              style={getImageStyle(i)}
              loading={priority && i === 0 ? 'eager' : 'lazy'}
              fetchPriority={priority && i === 0 ? 'high' : undefined}
              decoding="async"
              onAnimationEnd={i === prev ? () => setSlide((s) => ({ ...s, prev: null })) : undefined}
            />
          )
        })}
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={handlePrevious}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/30 backdrop-blur-sm text-white/80 hover:bg-black/50 hover:text-white transition-all cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/30 backdrop-blur-sm text-white/80 hover:bg-black/50 hover:text-white transition-all cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight size={20} />
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5" role="tablist" aria-label="Carousel slide indicators">
            {images.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === current}
                aria-current={i === current ? 'true' : undefined}
                onClick={(e) => {
                  e.stopPropagation()
                  setSlide((s) => {
                    if (s.current === i) return s
                    return {
                      current: i,
                      prev: s.current,
                      direction: i > s.current ? 'next' : 'prev',
                    }
                  })
                }}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  i === current ? 'bg-white w-6' : 'bg-white/50 w-2'
                }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
