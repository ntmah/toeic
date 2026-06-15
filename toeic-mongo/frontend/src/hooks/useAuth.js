import { useState, useEffect, useCallback } from 'react'
import { agentAPI } from '../data/api'

export function useAuth() {
  const [user,    setUser]    = useState(null)
  const [loading, setLoading] = useState(true)

  // Khôi phục session từ localStorage khi app load
  useEffect(() => {
    const stored = localStorage.getItem('toeic_user')
    const token  = localStorage.getItem('toeic_token')
    if (stored && token) setUser(JSON.parse(stored))
    setLoading(false)
  }, [])

  const _saveSession = (data) => {
    const u = { id: data.user_id, email: data.email, full_name: data.full_name || '' }
    localStorage.setItem('toeic_token', data.access_token)
    localStorage.setItem('toeic_user',  JSON.stringify(u))
    setUser(u)
  }

  const login = useCallback(async (email, password) => {
    const data = await agentAPI.login(email, password)
    _saveSession(data)
  }, [])

  const register = useCallback(async (email, password, fullName = '') => {
    const data = await agentAPI.register(email, password, fullName)
    _saveSession(data)
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem('toeic_token')
    localStorage.removeItem('toeic_user')
    setUser(null)
  }, [])

  return { user, loading, login, register, signOut }
}
