import { useEffect, useRef, useCallback, useState } from 'react'
import { X } from 'lucide-react'
import { getOptimizedSrc } from '../../lib/image'

export default function MediaPreview({ item, onClose }) {
  const containerRef = useRef(null)
  const [isClosing, setIsClosing] = useState(false)

  const handleClose = useCallback(() => {
    setIsClosing(true)
    setTimeout(() => onClose(), 200)
  }, [onClose])

  useEffect(() => {
    const previouslyFocused = document.activeElement

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose()
        return
      }
      if (e.key === 'Tab') {
        const focusable = containerRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        )
        if (!focusable || focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'

    requestAnimationFrame(() => {
      containerRef.current?.querySelector('button')?.focus()
    })

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus()
    }
  }, [handleClose])

  const handleBackdropClick = (e) => {
    if (e.target === containerRef.current) handleClose()
  }

  const isVideo = item.type === 'video'
  const isCarousel = item.type === 'carousel' && item.images?.length > 0
  const sources = isCarousel ? item.images : item.src ? [item.src] : []
  const isSingleImage = !isVideo && sources.length === 1

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Media preview"
      className={`fixed inset-0 z-50 bg-black/95 overflow-y-auto overflow-x-hidden ${
        isClosing ? 'animate-fade-out' : 'animate-fade-in'
      }`}
      ref={containerRef}
      onClick={handleBackdropClick}
    >
      <button
        onClick={handleClose}
        className="fixed top-4 right-4 z-60 p-2 rounded-full bg-white/10 backdrop-blur-sm text-white/80 hover:text-white hover:bg-white/20 transition-all duration-200 cursor-pointer"
        aria-label="Close preview"
      >
        <X size={20} />
      </button>

      <div className={`flex flex-col ${isSingleImage ? 'min-h-full' : ''}`}>
        {isVideo ? (
          <video
            src={item.src}
            poster={item.poster}
            controls
            autoPlay
            playsInline
            className="w-full"
          />
        ) : (
          sources.map((src, i) => (
            <img
              key={src + i}
              src={getOptimizedSrc(src, 2000)}
              alt={item.title || `Preview ${i + 1}`}
              className={`w-full select-none ${isSingleImage ? 'my-auto' : ''}`}
              draggable={false}
              decoding="async"
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          ))
        )}
      </div>
    </div>
  )
}
