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

  return (
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
  );
}
