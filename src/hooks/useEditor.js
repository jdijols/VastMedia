import { useState, useEffect, useCallback, useRef } from 'react'
import { content as contentApi } from '../lib/admin-api'
import { DEFAULTS } from '../data/defaults'

export function useEditor(section) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const [dirty, setDirty] = useState(false)
  const savedTimer = useRef(null)

  useEffect(() => {
    contentApi
      .get(section)
      .then((json) => setData(json))
      .catch(() => setData(DEFAULTS[section]))
      .finally(() => setLoading(false))
  }, [section])

  const update = useCallback((updater) => {
    setData((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater
      return next
    })
    setDirty(true)
    setSaved(false)
  }, [])

  const save = useCallback(async () => {
    setSaving(true)
    setError('')
    try {
      await contentApi.update(section, data)
      setSaved(true)
      setDirty(false)
      if (savedTimer.current) clearTimeout(savedTimer.current)
      savedTimer.current = setTimeout(() => setSaved(false), 2500)
    } catch (err) {
      setError(err.message || 'Failed to save')
    } finally {
      setSaving(false)
    }
  }, [section, data])

  const reset = useCallback(() => {
    setData(DEFAULTS[section])
    setDirty(true)
    setSaved(false)
  }, [section])

  return { data, loading, saving, saved, error, dirty, update, save, reset }
}
