import React, { useState } from 'react';
import { optimizeAsin } from '../api/client';

export default function AsinForm({ onResult }: { onResult: (data: any) => void }) {
  const [asin, setAsin] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!asin.trim()) return alert('Enter ASIN');
    try {
      setLoading(true);
      const r = await optimizeAsin(asin.trim());
      // alert(asin);
      onResult(r);
    } catch (err) {
      if (err instanceof Error) {
        alert('Error optimizing ASIN: ' + err.message);
      } else {
        alert('Unknown error optimizing ASIN');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8, alignItems: 'center', width: '100%' }}>
      <input
        className="asin-input"
        value={asin}
        onChange={e => setAsin(e.target.value)}
        placeholder="Enter ASIN e.g. B0F2T674FJ"
      />
      <button type="submit" className="asin-btn" disabled={loading}>{loading ? 'Optimizing...' : 'Optimize'}</button>
    </form>
  );
}
