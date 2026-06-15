import React, { useEffect, useState } from 'react'
import { AgentBanner, TypingDots, Btn } from './UI'
import { agentAPI } from '../data/api'
import { MODES } from '../data/questions'

export default function HomeTab({ stats, accuracy, weakest, selectedMode, onSelectMode, onStart, user }) {
  const [agentMsg, setAgentMsg] = useState(null)
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    setLoading(true)
    agentAPI.analyze(stats)
      .then(data => { setAgentMsg(data.message); if (data.weakest) onSelectMode(data.weakest) })
      .catch(() => setAgentMsg('Hãy làm bài để Agent theo dõi và đề xuất lộ trình phù hợp!'))
      .finally(() => setLoading(false))
  }, [stats])

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:16, padding:20 }}>
      {user && (
        <div style={{ fontSize:13, color:'var(--text2)', fontWeight:600 }}>
          Xin chào, <strong style={{ color:'var(--purple)' }}>{user.email}</strong> 👋
        </div>
      )}

      <AgentBanner title="AI Agent phân tích điểm yếu">
        {loading ? <TypingDots /> : agentMsg}
      </AgentBanner>

      <div style={{ fontSize:12, fontWeight:800, color:'var(--text2)', textTransform:'uppercase', letterSpacing:.8 }}>
        Chọn phần luyện tập
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))', gap:10 }}>
        {MODES.map(m => {
          const acc  = accuracy(m.id)
          const weak = weakest() === m.id
          const sel  = selectedMode === m.id
          return (
            <div key={m.id} onClick={() => onSelectMode(m.id)} style={{
              border:`1.5px solid ${weak?'var(--coral)':sel?'var(--purple)':'var(--border)'}`,
              borderRadius:'var(--radius-lg)', padding:'14px 10px', cursor:'pointer',
              textAlign:'center', transition:'all .15s', position:'relative',
              background: sel ? 'var(--purple-lt)' : 'var(--bg)',
            }}>
              {weak && (
                <div style={{ position:'absolute', top:-10, left:'50%', transform:'translateX(-50%)', fontSize:10, fontWeight:800, background:'var(--coral)', color:'#fff', padding:'2px 8px', borderRadius:99, whiteSpace:'nowrap' }}>
                  ⚠ Cần luyện thêm
                </div>
              )}
              <div style={{ fontSize:28, marginBottom:6 }}>{m.icon}</div>
              <div style={{ fontSize:13, fontWeight:800 }}>{m.label}</div>
              <div style={{ fontSize:11, color:'var(--text2)', marginTop:2 }}>{m.sub}</div>
              <div style={{ fontSize:11, fontWeight:700, marginTop:4, color: acc===null?'var(--text3)':acc>=70?'var(--teal)':'var(--coral)' }}>
                {acc===null ? '—' : `${acc}% đúng`}
              </div>
            </div>
          )
        })}
      </div>

      <div style={{ display:'flex', justifyContent:'flex-end' }}>
        <Btn onClick={onStart}>▶ Bắt đầu luyện</Btn>
      </div>
    </div>
  )
}
