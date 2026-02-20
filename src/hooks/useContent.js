import { useState, useEffect } from 'react'
import { DEFAULTS } from '../data/defaults'

export function useContent(section) {
  const [data, setData] = useState(DEFAULTS[section] ?? null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    fetch(`/api/content/${section}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (!cancelled && json) setData(json)
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [section])

  return { data, loading }
}
