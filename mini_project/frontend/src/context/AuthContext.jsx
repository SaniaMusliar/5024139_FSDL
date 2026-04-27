import React, { createContext, useContext, useState, useEffect } from 'react'
import { getMe } from '../api'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('eg_token')
    const savedUser = localStorage.getItem('eg_user')
    if (token && savedUser) {
      setUser(JSON.parse(savedUser))
      getMe()
        .then(res => {
          setUser(res.data.user)
          localStorage.setItem('eg_user', JSON.stringify(res.data.user))
        })
        .catch(() => logout())
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = (token, userData) => {
    localStorage.setItem('eg_token', token)
    localStorage.setItem('eg_user', JSON.stringify(userData))
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('eg_token')
    localStorage.removeItem('eg_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be inside AuthProvider')
  return ctx
}
