import React, { useState, useEffect } from 'react';
import AsinForm from './components/AsinForm';
import ComparisonCard from './components/ComparisonCard';
import HistoryTable from './components/HistoryTable';
import AuthForm from './components/AuthForm';
import ContactPage from './components/ContactPage';
import './App.css';
import logo from './assets/product_optimizer_logo.png';

export default function App() {
  const [result, setResult] = useState<any>(null);
  const [asin, setAsin] = useState<string>('');
  const [user, setUser] = useState<any>(() => {
    try {
      const raw = localStorage.getItem('user');
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  });
  // Remove showContact state, we'll open contact info in a new tab

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [user]);

  if (!user) {
    return <AuthForm onLogin={setUser} />;
  }

  return (
    <>
      <div className="app-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '0 18px', position: 'relative', minHeight: 80 }} aria-label="Amazon ASIN Optimizer Header">
  <img src={logo} alt="Amazon ASIN Optimizer Logo" style={{ width: 40, height: 40, marginRight: 18, position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)', borderRadius: '20%' }} />
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 600, letterSpacing: 1 }}>Amazon Product Optimizer</div>
          <div style={{ fontSize: '1rem', fontWeight: 400, color: '#ff9900', marginTop: 2 }}>Boost your Amazon listings with AI-powered optimization</div>
        </div>
        <div style={{ position: 'absolute', right: 18, top: '50%', transform: 'translateY(-50%)', display: 'flex', gap: 10 }}>
          <button
            style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 18px', fontSize: '1rem', cursor: 'pointer', fontWeight: 500 }}
            onClick={() => {
              setUser(null);
              window.location.reload();
            }}
            aria-label="Logout"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="container" aria-label="Main Content">
        {/* Removed old button section, now in header */}
        <div className="step-guide" style={{ marginBottom: 24, background: '#f3f4f6', borderRadius: 8, padding: '18px 16px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }} aria-label="Step Guide">
          <h2 style={{ fontSize: '1.15rem', color: '#232f3e', margin: '0 0 10px 0' }}>How to use Amazon ASIN Optimizer</h2>
          <ol style={{ paddingLeft: 18, margin: 0, color: '#444', fontSize: '1rem' }}>
            <li>Paste your Amazon product URL in the input box below.</li>
            <li>Click <b>Optimize</b> to analyze and improve your listing.</li>
            <li>Compare the original and optimized results side-by-side.</li>
            <li>Review your optimization history for previous results.</li>
          </ol>
        </div>
        <div className="asin-form" aria-label="ASIN Form">
          <AsinForm onResult={(r: any) => { setResult(r); setAsin(r?.asin || ''); }} />
        </div>
        <div style={{ marginBottom: 18, color: '#555', fontSize: '0.98rem' }}>
          <span title="Paste the full Amazon product link, e.g. https://www.amazon.in/dp/B0F2T674FJ">Enter an Amazon product URL and click <b>Optimize</b></span>
        </div>

        {result && (
          <>
            <div className="optimization-section" aria-label="Optimization Section">
              <div className="optimization-card" aria-label="Original Listing">
                <h3>Original Listing</h3>
                <ComparisonCard original={result.original} optimized={{}} />
              </div>
              <div className="optimization-card" aria-label="Optimized Listing">
                <h3>Optimized Listing</h3>
                <ComparisonCard original={{}} optimized={result.optimized} />
              </div>
            </div>
            <div className="history-section" aria-label="History Section">
              <h3 style={{marginBottom: 8}}>Optimization History</h3>
              <HistoryTable asin={asin} />
            </div>
          </>
        )}
      </div>
    </>
  );
}
