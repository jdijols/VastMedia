import { useEffect, useRef, useCallback, useState } from 'react'
import { X } from 'lucide-react'

const MIN_SCALE = 1
const MAX_SCALE = 5

export default function MediaPreview({ item, onClose }) {
  const containerRef = useRef(null)
  const mediaRef = useRef(null)
  const [scale, setScale] = useState(1)
  const [translate, setTranslate] = useState({ x: 0, y: 0 })
  const [isClosing, setIsClosing] = useState(false)

  const gestureState = useRef({
    isPinching: false,
    isPanning: false,
    startDistance: 0,
    startScale: 1,
    startTranslate: { x: 0, y: 0 },
    startCenter: { x: 0, y: 0 },
    lastTouchCenter: { x: 0, y: 0 },
    panStart: { x: 0, y: 0 },
  })

  const resetTransform = useCallback(() => {
    setScale(1)
    setTranslate({ x: 0, y: 0 })
  }, [])

  const handleClose = useCallback(() => {
    setIsClosing(true)
    setTimeout(() => onClose(), 200)
  }, [onClose])

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') handleClose()
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [handleClose])

  const getTouchDistance = (t1, t2) =>
    Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY)

  const getTouchCenter = (t1, t2) => ({
    x: (t1.clientX + t2.clientX) / 2,
    y: (t1.clientY + t2.clientY) / 2,
  })

  const clampTranslate = useCallback((tx, ty, s) => {
    if (s <= 1) return { x: 0, y: 0 }
    const el = mediaRef.current
    if (!el) return { x: tx, y: ty }
    const rect = el.getBoundingClientRect()
    const maxX = (rect.width * (s - 1)) / (2 * s)
    const maxY = (rect.height * (s - 1)) / (2 * s)
    return {
      x: Math.max(-maxX, Math.min(maxX, tx)),
      y: Math.max(-maxY, Math.min(maxY, ty)),
    }
  }, [])

  const handleTouchStart = useCallback((e) => {
    if (e.touches.length === 2) {
      e.preventDefault()
      const g = gestureState.current
      g.isPinching = true
      g.isPanning = false
      g.startDistance = getTouchDistance(e.touches[0], e.touches[1])
      g.startScale = scale
      g.startTranslate = { ...translate }
      g.startCenter = getTouchCenter(e.touches[0], e.touches[1])
    } else if (e.touches.length === 1 && scale > 1) {
      const g = gestureState.current
      g.isPanning = true
      g.panStart = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      g.startTranslate = { ...translate }
    }
  }, [scale, translate])

  const handleTouchMove = useCallback((e) => {
    const g = gestureState.current

    if (g.isPinching && e.touches.length === 2) {
      e.preventDefault()
      const dist = getTouchDistance(e.touches[0], e.touches[1])
      const newScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, g.startScale * (dist / g.startDistance)))
      const center = getTouchCenter(e.touches[0], e.touches[1])
      const dx = (center.x - g.startCenter.x) / newScale
      const dy = (center.y - g.startCenter.y) / newScale
      const newTx = g.startTranslate.x + dx
      const newTy = g.startTranslate.y + dy
      const clamped = clampTranslate(newTx, newTy, newScale)
      setScale(newScale)
      setTranslate(clamped)
    } else if (g.isPanning && e.touches.length === 1 && scale > 1) {
      e.preventDefault()
      const dx = (e.touches[0].clientX - g.panStart.x) / scale
      const dy = (e.touches[0].clientY - g.panStart.y) / scale
      const newTx = g.startTranslate.x + dx
      const newTy = g.startTranslate.y + dy
      const clamped = clampTranslate(newTx, newTy, scale)
      setTranslate(clamped)
    }
  }, [scale, clampTranslate])

  const handleTouchEnd = useCallback((e) => {
    const g = gestureState.current
    if (e.touches.length < 2) g.isPinching = false
    if (e.touches.length === 0) g.isPanning = false
    if (scale <= 1) resetTransform()
  }, [scale, resetTransform])

  const handleBackdropClick = (e) => {
    if (e.target === containerRef.current && scale <= 1) {
      handleClose()
    }
  }

  const handleDoubleTap = useCallback(() => {
    if (scale > 1) {
      resetTransform()
    } else {
      setScale(2.5)
    }
  }, [scale, resetTransform])

  const lastTapRef = useRef(0)
  const handleTap = useCallback((e) => {
    if (e.touches && e.touches.length > 0) return
    const now = Date.now()
    if (now - lastTapRef.current < 300) {
      handleDoubleTap()
    }
    lastTapRef.current = now
  }, [handleDoubleTap])

  const isVideo = item.type === 'video'
  const transformStyle = {
    transform: `scale(${scale}) translate(${translate.x}px, ${translate.y}px)`,
    transition: gestureState.current.isPinching || gestureState.current.isPanning
      ? 'none'
      : 'transform 0.2s ease-out',
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/95 ${
        isClosing ? 'animate-fade-out' : 'animate-fade-in'
      }`}
      ref={containerRef}
      onClick={handleBackdropClick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchEndCapture={handleTap}
      style={{ touchAction: 'none' }}
    >
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 z-60 p-2 rounded-full bg-white/10 backdrop-blur-sm text-white/80 hover:text-white hover:bg-white/20 transition-all duration-200 cursor-pointer"
        aria-label="Close preview"
      >
        <X size={20} />
      </button>

      <div className="w-full h-full flex items-center justify-center p-4 pointer-events-none">
        {isVideo ? (
          <video
            ref={mediaRef}
            src={item.src}
            poster={item.poster}
            controls
            autoPlay
            playsInline
            className="max-w-full max-h-full object-contain pointer-events-auto"
            style={transformStyle}
          />
        ) : (
          <img
            ref={mediaRef}
            src={item.src.replace(/w=\d+/, 'w=1600').replace(/q=\d+/, 'q=90')}
            alt={item.title}
            className="max-w-full max-h-full object-contain pointer-events-auto select-none"
            style={transformStyle}
            draggable={false}
          />
        )}
      </div>
    </div>
  )
}
