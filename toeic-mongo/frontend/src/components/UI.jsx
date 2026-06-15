import React from 'react'

export function TypingDots() {
  return (
    <div style={{ display:'flex', gap:4, alignItems:'center', padding:'2px 0' }}>
      {[0,1,2].map(i => (
        <div key={i} style={{ width:6, height:6, borderRadius:'50%', background:'var(--purple)', animation:`bop .9s ease-in-out ${i*0.15}s infinite` }} />
      ))}
    </div>
  )
}

export function AgentBanner({ icon='🤖', title, children, color='purple' }) {
  const colors = {
    purple: { bg:'linear-gradient(135deg,#EEEDFE,#E1F5EE)', border:'var(--purple-md)', titleColor:'var(--purple)', textColor:'#3C3489' },
    teal:   { bg:'var(--teal-lt)', border:'var(--teal-md)', titleColor:'var(--teal)', textColor:'#085041' },
  }
  const c = colors[color] || colors.purple
  return (
    <div style={{ background:c.bg, border:`1.5px solid ${c.border}`, borderRadius:'var(--radius-lg)', padding:'14px 18px', display:'flex', alignItems:'flex-start', gap:12 }}>
      <span style={{ fontSize:28, flexShrink:0 }}>{icon}</span>
      <div style={{ flex:1 }}>
        <div style={{ fontSize:13, fontWeight:800, color:c.titleColor, marginBottom:3 }}>{title}</div>
        <div style={{ fontSize:13, color:c.textColor, lineHeight:1.5 }}>{children}</div>
      </div>
    </div>
  )
}

export function Btn({ children, onClick, disabled, secondary, danger, small, style={} }) {
  const base = { fontFamily:'var(--font)', fontSize: small?12:14, fontWeight:800, padding: small?'7px 14px':'11px 24px', border:'none', borderRadius:'var(--radius)', display:'inline-flex', alignItems:'center', gap:6, transition:'all .12s', cursor:disabled?'not-allowed':'pointer', opacity:disabled?.5:1 }
  const v = danger ? { background:'var(--coral)', color:'#fff' }
          : secondary ? { background:'var(--bg)', color:'var(--text)', border:'1.5px solid var(--border2)' }
          : { background:'var(--purple)', color:'#fff' }
  return (
    <button onClick={onClick} disabled={disabled} style={{ ...base, ...v, ...style }}>
      {children}
    </button>
  )
}

export function Chip({ label, onClick }) {
  return (
    <button onClick={onClick} style={{ fontFamily:'var(--font)', fontSize:12, fontWeight:700, padding:'5px 12px', border:'1px solid var(--purple-md)', borderRadius:99, background:'var(--purple-lt)', color:'var(--purple)', cursor:'pointer', transition:'all .12s' }}
      onMouseEnter={e=>{e.currentTarget.style.background='var(--purple)';e.currentTarget.style.color='#fff'}}
      onMouseLeave={e=>{e.currentTarget.style.background='var(--purple-lt)';e.currentTarget.style.color='var(--purple)'}}
    >{label}</button>
  )
}

export function ChatMessage({ role, children }) {
  const isUser = role === 'user'
  return (
    <div style={{ display:'flex', gap:8, alignItems:'flex-start', flexDirection:isUser?'row-reverse':'row', animation:'fadeUp .2s ease' }}>
      <div style={{ width:30, height:30, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:800, flexShrink:0, background:isUser?'var(--teal-lt)':'var(--purple-lt)', color:isUser?'var(--teal)':'var(--purple)' }}>
        {isUser?'Tôi':'AI'}
      </div>
      <div style={{ maxWidth:'78%', fontSize:13.5, lineHeight:1.6, padding:'10px 13px', borderRadius:14, background:isUser?'var(--purple)':'var(--bg2)', color:isUser?'#fff':'var(--text)', borderBottomRightRadius:isUser?4:14, borderBottomLeftRadius:isUser?14:4 }}>
        {children}
      </div>
    </div>
  )
}

export function Spinner() {
  return (
    <div style={{ width:20, height:20, border:'2.5px solid var(--purple-lt)', borderTop:'2.5px solid var(--purple)', borderRadius:'50%', animation:'spin .8s linear infinite', margin:'0 auto' }} />
  )
}
