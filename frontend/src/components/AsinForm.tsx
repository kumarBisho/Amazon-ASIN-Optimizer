import React, { useState } from 'react';
import { optimizeProductUrl } from '../api/client';

export default function AsinForm({ onResult }: { onResult: (data: any) => void }) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) return alert('Enter Amazon product URL');
    try {
      setLoading(true);
  const r = await optimizeProductUrl(url.trim());
  onResult(r);
  setUrl('');
    } catch (err) {
      if (err instanceof Error) {
        alert('Error optimizing product: ' + err.message);
      } else {
        alert('Unknown error optimizing product');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8, alignItems: 'center', width: '100%' }}>
      <input
        className="asin-input"
        value={url}
        onChange={e => setUrl(e.target.value)}
        placeholder="Paste Amazon product URL here"
      />
      <button type="submit" className="asin-btn" disabled={loading}>{loading ? (
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span className="spinner" style={{ width: 18, height: 18, border: '2px solid #ff9900', borderTop: '2px solid #fff', borderRadius: '50%', animation: 'spin 1s linear infinite', display: 'inline-block' }}></span>
          Optimizing...
        </span>
      ) : 'Optimize'}</button>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </form>
  );
}
