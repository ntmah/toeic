import { useState, useCallback } from 'react'
import { agentAPI } from '../data/api'

const initStats = () => ({
  reading:   { done: 0, correct: 0 },
  grammar:   { done: 0, correct: 0 },
  vocab:     { done: 0, correct: 0 },
  listening: { done: 0, correct: 0 },
})

export function useStats(isLoggedIn = false) {
  const [stats, setStats] = useState(initStats)
  const [xp, setXp]       = useState(0)

  // Gọi sau khi login để load stats từ Supabase
  const loadFromServer = useCallback((serverStats, serverXp = 0) => {
    setStats(prev => ({ ...prev, ...serverStats }))
    setXp(serverXp)
  }, [])

  const recordAnswer = useCallback((mode, isCorrect) => {
    setStats(prev => ({
      ...prev,
      [mode]: {
        done:    prev[mode].done + 1,
        correct: prev[mode].correct + (isCorrect ? 1 : 0),
      }
    }))
    const gained = isCorrect ? 20 : 5
    setXp(prev => prev + gained)

    // Sync lên Supabase nếu đã login
    if (isLoggedIn) {
      agentAPI.upsertStats(mode, 1, isCorrect ? 1 : 0)
    }
  }, [isLoggedIn])

  const reset = useCallback(() => { setStats(initStats()); setXp(0) }, [])

  const accuracy = useCallback((mode) => {
    const s = stats[mode]
    return s.done > 0 ? Math.round(s.correct / s.done * 100) : null
  }, [stats])

  const weakest = useCallback(() => {
    const modes = Object.keys(stats)
    const withData = modes.filter(m => stats[m].done > 0)
    if (!withData.length) return null
    return withData.reduce((a, b) =>
      (stats[a].correct / stats[a].done) < (stats[b].correct / stats[b].done) ? a : b
    )
  }, [stats])

  const totals = useCallback(() => {
    let done = 0, correct = 0
    Object.values(stats).forEach(s => { done += s.done; correct += s.correct })
    return { done, correct, acc: done > 0 ? Math.round(correct / done * 100) : 0 }
  }, [stats])

  return { stats, xp, loadFromServer, recordAnswer, reset, accuracy, weakest, totals }
}
