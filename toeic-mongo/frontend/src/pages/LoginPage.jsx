import React, { useState } from 'react'

export default function LoginPage({ onLogin, onRegister, onSkip }) {
  const [mode,     setMode]     = useState('login')
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [name,     setName]     = useState('')
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)

  const handleSubmit = async () => {
    setError(''); setLoading(true)
    try {
      if (mode === 'login') await onLogin(email, password)
      else                  await onRegister(email, password, name)
    } catch (e) {
      setError(e.response?.data?.detail || e.message || 'Có lỗi xảy ra')
    } finally {
      setLoading(false)
    }
  }

  const inp = {
    width:'100%', fontFamily:'var(--font)', fontSize:14,
    padding:'11px 14px', border:'1.5px solid var(--border2)',
    borderRadius:'var(--radius)', background:'var(--bg)',
    color:'var(--text)', outline:'none',
  }

  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'linear-gradient(135deg,#EEEDFE,#E1F5EE)' }}>
      <div style={{ background:'var(--bg)', borderRadius:'var(--radius-lg)', padding:'36px 32px', width:'100%', maxWidth:400, boxShadow:'0 8px 40px rgba(83,74,183,.15)', display:'flex', flexDirection:'column', gap:20 }}>

        <div style={{ textAlign:'center' }}>
          <div style={{ fontSize:28, fontWeight:900, color:'var(--purple)', letterSpacing:-1 }}>
            TOEIC<span style={{ color:'var(--teal)' }}>AI</span>
          </div>
          <div style={{ fontSize:13, color:'var(--text2)', marginTop:4 }}>AI Agent luyện TOEIC thông minh</div>
        </div>

        {/* Tab */}
        <div style={{ display:'flex', background:'var(--bg2)', borderRadius:'var(--radius)', padding:4, gap:4 }}>
          {['login','register'].map(m => (
            <button key={m} onClick={() => { setMode(m); setError('') }} style={{
              flex:1, fontFamily:'var(--font)', fontSize:13, fontWeight:700, padding:'8px',
              border:'none', borderRadius:10, cursor:'pointer', transition:'all .15s',
              background: mode===m ? 'var(--bg)' : 'transparent',
              color: mode===m ? 'var(--purple)' : 'var(--text2)',
              boxShadow: mode===m ? '0 1px 4px rgba(0,0,0,.08)' : 'none',
            }}>
              {m === 'login' ? 'Đăng nhập' : 'Tạo tài khoản'}
            </button>
          ))}
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {mode === 'register' && (
            <input style={inp} type="text" placeholder="Họ tên (tuỳ chọn)" value={name}
              onChange={e => setName(e.target.value)}
              onFocus={e => e.target.style.borderColor='var(--purple)'}
              onBlur={e => e.target.style.borderColor='var(--border2)'} />
          )}
          <input style={inp} type="email" placeholder="Email" value={email}
            onChange={e => setEmail(e.target.value)}
            onFocus={e => e.target.style.borderColor='var(--purple)'}
            onBlur={e => e.target.style.borderColor='var(--border2)'} />
          <input style={inp} type="password" placeholder="Mật khẩu" value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            onFocus={e => e.target.style.borderColor='var(--purple)'}
            onBlur={e => e.target.style.borderColor='var(--border2)'} />

          {error && (
            <div style={{ fontSize:12, color:'var(--coral)', padding:'8px 12px', background:'var(--coral-lt)', borderRadius:8 }}>
              {error}
            </div>
          )}

          <button onClick={handleSubmit} disabled={loading || !email || !password} style={{
            fontFamily:'var(--font)', fontSize:14, fontWeight:800, padding:12, border:'none',
            borderRadius:'var(--radius)', cursor: loading ? 'not-allowed' : 'pointer',
            background: loading ? 'var(--purple-md)' : 'var(--purple)', color:'#fff',
          }}>
            {loading ? '⏳ Đang xử lý...' : mode === 'login' ? 'Đăng nhập' : 'Tạo tài khoản'}
          </button>
        </div>

        <div style={{ textAlign:'center' }}>
          <span onClick={onSkip} style={{ fontSize:12, color:'var(--text3)', cursor:'pointer', textDecoration:'underline' }}>
            Dùng thử không cần đăng nhập
          </span>
        </div>
      </div>
    </div>
  )
}
