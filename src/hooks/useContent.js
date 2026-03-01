import { useState, useEffect } from 'react'
import { DEFAULTS } from '../data/defaults'

const cache = new Map()

export function useContent(section) {
  const [data, setData] = useState(() => cache.get(section) ?? null)
  const [loading, setLoading] = useState(!cache.has(section))

  useEffect(() => {
    if (cache.has(section)) {
      setData(cache.get(section))
      setLoading(false)
      return
    }

    let cancelled = false

    fetch(`/api/content/${section}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        const result = json ?? DEFAULTS[section] ?? null
        cache.set(section, result)
        if (!cancelled) setData(result)
      })
      .catch(() => {
        const fallback = DEFAULTS[section] ?? null
        cache.set(section, fallback)
        if (!cancelled) setData(fallback)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [section])

  return { data, loading }
}
