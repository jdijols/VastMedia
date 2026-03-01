import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'
import { auth as authApi } from '../lib/admin-api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    authApi
      .verify()
      .then(() => setAuthenticated(true))
      .catch(() => setAuthenticated(false))
      .finally(() => setChecking(false))
  }, [])

  const login = useCallback(async (password) => {
    await authApi.login(password)
    setAuthenticated(true)
  }, [])

  const logout = useCallback(async () => {
    await authApi.logout()
    setAuthenticated(false)
  }, [])

  const value = useMemo(
    () => ({ authenticated, checking, login, logout }),
    [authenticated, checking, login, logout],
  )

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
