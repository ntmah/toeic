import React, { useState, useRef, useEffect } from 'react'
import { ChatMessage, TypingDots, Btn, Chip } from './UI'
import { agentAPI} from '../data/api'

const CHIPS = ['Phân biệt since/for', 'Mẹo làm Part 5 nhanh', 'Passive voice trong TOEIC', 'Chiến lược Part 7']

export default function ChatTab() {
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Chào bạn! 👋 Mình là AI tutor TOEIC – hỏi mình về ngữ pháp, từ vựng, chiến lược làm bài hay giải thích đáp án nhé!' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef()

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:'smooth' }) }, [messages])

  const send = async (text) => {
    const msg = text || input.trim()
    if (!msg || loading) return
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: msg }])
    setLoading(true)
    try {
      const history = messages
        .filter(m => m.role === 'user' || m.role === 'ai')
        .map(m => ({ role: m.role === 'ai' ? 'assistant' : 'user', content: m.content }))
      const reply = await agentAPI.chat(msg, [...history, { role: 'user', content: msg }])
      setMessages(prev => [...prev, { role: 'ai', content: reply }])
    } catch {
      setMessages(prev => [...prev, { role: 'ai', content: 'Không kết nối được. Thử lại nhé!' }])
    } finally {
      setLoading(false)
    }

  }

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:12, padding:20, flex:1 }}>
      <div style={{ flex:1, minHeight:300, maxHeight:420, overflowY:'auto', display:'flex', flexDirection:'column', gap:10 }}>
        {messages.map((m, i) => (
          <ChatMessage key={i} role={m.role}>{m.content}</ChatMessage>
        ))}
        {loading && (
          <ChatMessage role="ai"><TypingDots /></ChatMessage>
        )}
        <div ref={bottomRef} />
      </div>

      <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
        {CHIPS.map(c => <Chip key={c} label={c} onClick={() => send(c)} />)}
      </div>

      <div style={{ display:'flex', gap:8 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Hỏi AI tutor..."
          style={{
            flex:1, fontFamily:'var(--font)', fontSize:14, padding:'10px 14px',
            border:'1.5px solid var(--border2)', borderRadius:'var(--radius)',
            background:'var(--bg)', color:'var(--text)', outline:'none'
          }}
          onFocus={e => e.target.style.borderColor='var(--purple)'}
          onBlur={e => e.target.style.borderColor='var(--border2)'}
        />
        <Btn onClick={() => send()} disabled={loading || !input.trim()}>
          Gửi ↗
        </Btn>
      </div>
    </div>
  )
}
