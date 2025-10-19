import React, { useState } from 'react';
import { registerUser, loginUser, resetPassword } from '../api/client';

export default function AuthForm({ onLogin }: { onLogin: (user: any) => void }) {
  const [mode, setMode] = useState<'login' | 'register' | 'reset'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function validateEmail(email: string) {
    return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  }

  function handleModeChange(newMode: 'login' | 'register' | 'reset') {
    setMode(newMode);
    setError('');
    setEmail('');
    setPassword('');
    setConfirm('');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    setLoading(true);
    try {
      if (mode === 'register') {
        if (!password || password.length < 6) {
          setError('Password must be at least 6 characters');
          setLoading(false);
          return;
        }
        if (password !== confirm) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }
        const user = await registerUser(email, password);
        setLoading(false);
        onLogin(user);
        return;
      }
      if (mode === 'login') {
        if (!password) {
          setError('Password is required');
          setLoading(false);
          return;
        }
        const user = await loginUser(email, password);
        setLoading(false);
        onLogin(user);
        return;
      }
      if (mode === 'reset') {
        const resp = await resetPassword(email);
        setLoading(false);
        setError(resp.message || 'Password reset link sent to your email');
        return;
      }
    } catch (err: any) {
      setLoading(false);
      setError(err.message || 'Authentication failed');
    }
  }

  return (
    <form onSubmit={handleSubmit} aria-label="Authentication form" style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 340, margin: '0 auto', background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
      <h2 style={{ textAlign: 'center', color: '#232f3e', fontSize: '1.2rem' }}>
        {mode === 'login' ? 'Sign In' : mode === 'register' ? 'Register' : 'Reset Password'}
      </h2>
      <label htmlFor="email" style={{ fontWeight: 500 }}>Email</label>
      <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" aria-required="true" style={{ padding: '8px 12px', borderRadius: 4, border: '1px solid #d1d5db' }} />
      {(mode === 'login' || mode === 'register') && (
        <>
          <label htmlFor="password" style={{ fontWeight: 500 }}>Password</label>
          <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} aria-required="true" style={{ padding: '8px 12px', borderRadius: 4, border: '1px solid #d1d5db' }} />
        </>
      )}
      {mode === 'register' && (
        <>
          <label htmlFor="confirm" style={{ fontWeight: 500 }}>Confirm Password</label>
          <input id="confirm" type="password" value={confirm} onChange={e => setConfirm(e.target.value)} autoComplete="new-password" aria-required="true" style={{ padding: '8px 12px', borderRadius: 4, border: '1px solid #d1d5db' }} />
        </>
      )}
      {error && <div style={{ color: '#ff4d4f', fontSize: '0.97rem' }}>{error}</div>}
      <button type="submit" disabled={loading} style={{ background: '#007185', color: '#fff', border: 'none', borderRadius: 4, padding: '10px 0', fontWeight: 600, fontSize: '1rem', cursor: 'pointer' }}>{loading ? (mode === 'login' ? 'Signing in...' : mode === 'register' ? 'Registering...' : 'Sending...') : (mode === 'login' ? 'Sign In' : mode === 'register' ? 'Register' : 'Send Reset Link')}</button>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
        {mode !== 'login' && <button type="button" onClick={() => handleModeChange('login')} style={{ background: 'none', border: 'none', color: '#007185', cursor: 'pointer', fontSize: '0.98rem' }}>Sign In</button>}
        {mode !== 'register' && <button type="button" onClick={() => handleModeChange('register')} style={{ background: 'none', border: 'none', color: '#007185', cursor: 'pointer', fontSize: '0.98rem' }}>Register</button>}
        {mode !== 'reset' && <button type="button" onClick={() => handleModeChange('reset')} style={{ background: 'none', border: 'none', color: '#007185', cursor: 'pointer', fontSize: '0.98rem' }}>Forgot Password?</button>}
      </div>
    </form>
  );
}
