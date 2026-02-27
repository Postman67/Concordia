import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import * as api from '../api/federation'

const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY))
  const [loading, setLoading] = useState(true)

  // On mount, if a token exists try to load the profile
  useEffect(() => {
    if (token) {
      api.getProfile()
        .then((data) => setUser(data))
        .catch(() => {
          // Token invalid / expired – clear it
          localStorage.removeItem(TOKEN_KEY)
          setToken(null)
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [token])

  const saveToken = useCallback((newToken) => {
    localStorage.setItem(TOKEN_KEY, newToken)
    setToken(newToken)
  }, [])

  const signIn = useCallback(async (credentials) => {
    const data = await api.login(credentials)
    saveToken(data.token)
    setUser(data.user)
    return data
  }, [saveToken])

  const signUp = useCallback(async (credentials) => {
    const data = await api.register(credentials)
    saveToken(data.token)
    setUser(data.user)
    return data
  }, [saveToken])

  const signOut = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY)
    setToken(null)
    setUser(null)
  }, [])

  const refreshUser = useCallback(async () => {
    const data = await api.getProfile()
    setUser(data)
    return data
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser, token, loading, signIn, signUp, signOut, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
