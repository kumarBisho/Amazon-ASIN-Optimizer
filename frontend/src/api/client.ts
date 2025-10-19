const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api';



export async function optimizeProductUrl(url: string) {
  const res = await fetch(`${API_BASE}/optimize`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url })
  });
  let errorMsg = 'Failed to optimize';
  if (!res.ok) {
    try {
      const data = await res.json();
      if (data && data.error) errorMsg = data.error;
    } catch {}
    throw new Error(errorMsg);
  }
  return res.json();
}

export async function getHistory(asin: string) {
  const res = await fetch(`${API_BASE}/history/${asin}`);
  if (!res.ok) throw new Error('Failed to fetch history');
  return res.json();
}
