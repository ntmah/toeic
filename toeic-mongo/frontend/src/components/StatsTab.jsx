import React, { useEffect, useState } from 'react'
import { Btn, AgentBanner, Spinner } from './UI'
import { agentAPI } from '../data/api'
import { MODES } from '../data/questions'

export default function StatsTab({ stats, accuracy, weakest, totals, xp, onReset, user }) {
  const [sessions, setSessions] = useState([])
  const [loadingSessions, setLoadingSessions] = useState(false)
  const t = totals()
  const weak = weakest()
  const labels = { reading:'Reading', grammar:'Grammar', vocab:'Vocabulary', listening:'Listening' }
  const withData = MODES.filter(m => stats[m.id].done > 0)

  useEffect(() => {
    if (!user) return
    setLoadingSessions(true)
    agentAPI.getSessions()
      .then(setSessions)
      .catch(() => {})
      .finally(() => setLoadingSessions(false))
  }, [user])

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:16, padding:20 }}>
      {/* Tổng quát */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(120px,1fr))', gap:10 }}>
        {[{num:t.done,label:'Câu đã làm'},{num:t.correct,label:'Câu đúng'},{num:t.acc+'%',label:'Chính xác'},{num:xp,label:'Tổng XP'}].map(s => (
          <div key={s.label} style={{ background:'var(--bg2)', borderRadius:'var(--radius)', padding:'14px 12px', textAlign:'center' }}>
            <div style={{ fontSize:26, fontWeight:900, fontFamily:'var(--mono)', color:'var(--text)' }}>{s.num}</div>
            <div style={{ fontSize:11, color:'var(--text2)', fontWeight:700, marginTop:3 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      {withData.length > 0 && (
        <div style={{ background:'var(--coral-lt)', border:'1px solid var(--coral-md)', borderRadius:'var(--radius-lg)', padding:'14px 18px' }}>
          <div style={{ fontSize:13, fontWeight:800, color:'var(--coral)', marginBottom:10 }}>📊 Độ chính xác theo phần</div>
          {withData.map(m => {
            const acc = accuracy(m.id)
            const color = acc>=70?'var(--teal)':acc>=50?'var(--amber)':'var(--coral)'
            return (
              <div key={m.id} style={{ display:'flex', alignItems:'center', gap:10, margin:'6px 0' }}>
                <div style={{ width:100, fontWeight:700, fontSize:12, flexShrink:0 }}>{m.label}</div>
                <div style={{ flex:1, height:8, background:'var(--bg3)', borderRadius:99, overflow:'hidden' }}>
                  <div style={{ height:'100%', width:`${acc}%`, background:color, borderRadius:99, transition:'width .6s ease' }} />
                </div>
                <div style={{ fontSize:12, fontWeight:700, color:'var(--text2)', width:32, textAlign:'right' }}>{acc}%</div>
              </div>
            )
          })}
        </div>
      )}

      {/* Agent recommendation */}
      {weak && (
        <AgentBanner title="Agent gợi ý">
          Bạn đang yếu nhất ở <strong>{labels[weak]}</strong> ({accuracy(weak)}%). Lần luyện tiếp sẽ tự động tập trung vào phần này!
        </AgentBanner>
      )}

      {/* Session history – chỉ hiện nếu đã login */}
      {user && (
        <div>
          <div style={{ fontSize:12, fontWeight:800, color:'var(--text2)', textTransform:'uppercase', letterSpacing:.8, marginBottom:10 }}>
            Lịch sử luyện tập
          </div>
          {loadingSessions ? <Spinner /> : sessions.length === 0 ? (
            <div style={{ fontSize:13, color:'var(--text3)' }}>Chưa có session nào được lưu.</div>
          ) : sessions.map(s => (
            <div key={s.id} style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 0', borderBottom:'1px solid var(--border)' }}>
              <div style={{ fontSize:20 }}>{s.accuracy>=70?'🏆':s.accuracy>=50?'📈':'📉'}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, fontWeight:700 }}>{labels[s.mode] || s.mode}</div>
                <div style={{ fontSize:12, color:'var(--text2)' }}>{s.correct}/{s.total} đúng · {new Date(s.created_at).toLocaleDateString('vi-VN')}</div>
              </div>
              <div style={{ fontSize:14, fontWeight:900, fontFamily:'var(--mono)', color:'var(--purple)' }}>{s.est_score}</div>
            </div>
          ))}
        </div>
      )}

      {!user && (
        <div style={{ fontSize:13, color:'var(--text3)', textAlign:'center', padding:'8px 0' }}>
          🔒 Đăng nhập để lưu lịch sử luyện tập
        </div>
      )}

      <div style={{ borderTop:'1px solid var(--border)', paddingTop:12 }}>
        <Btn secondary small onClick={() => { if (confirm('Đặt lại thống kê?')) onReset() }}>
          Đặt lại thống kê
        </Btn>
      </div>
    </div>
  )
}
