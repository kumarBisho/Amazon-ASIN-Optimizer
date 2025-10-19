import React, { useEffect, useState } from 'react';
import { getHistory } from '../api/client';

export default function HistoryTable({ asin }: { asin: string }) {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!asin) return;
    setLoading(true);
    getHistory(asin)
      .then(r => { setRows(r || []); })
      .catch(() => setRows([]))
      .finally(() => setLoading(false));
  }, [asin]);

  if (loading) return <div className="card">Loading history...</div>;

  function handleExport() {
    const csv = [
      ['ID', 'Optimized Title', 'Date'],
      ...rows.map(row => [row.id, row.optimizedTitle, new Date(row.createdAt).toLocaleString()])
    ].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'optimization_history.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleShare() {
    const text = rows.map(row => `ID: ${row.id}\nTitle: ${row.optimizedTitle}\nDate: ${new Date(row.createdAt).toLocaleString()}`).join('\n---\n');
    if (navigator.share) {
      navigator.share({ title: 'Amazon ASIN Optimization History', text });
    } else {
      window.prompt('Copy history:', text);
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
        <button onClick={handleExport} style={{ background: '#007185', color: '#fff', border: 'none', borderRadius: 4, padding: '6px 14px', cursor: 'pointer', fontSize: '0.98rem' }}>Export CSV</button>
        <button onClick={handleShare} style={{ background: '#ff9900', color: '#232f3e', border: 'none', borderRadius: 4, padding: '6px 14px', cursor: 'pointer', fontSize: '0.98rem' }}>Share</button>
      </div>
      <table className="history-table">
        <thead>
          <tr><th>ID</th><th>Optimized Title</th><th>Date</th></tr>
        </thead>
        <tbody>
          {rows.length === 0 && <tr><td colSpan={3}><small>No history</small></td></tr>}
          {rows.map(row => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.optimizedTitle}</td>
              <td>{new Date(row.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
