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
      <button type="submit" className="asin-btn" disabled={loading}>{loading ? 'Optimizing...' : 'Optimize'}</button>
    </form>
  );
}
