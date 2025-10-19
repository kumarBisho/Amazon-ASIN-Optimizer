
import React from 'react';

export default function ComparisonCard({ original, optimized }: any) {
  // If only original is provided, show original; if only optimized, show optimized
  if (original && Object.keys(original).length > 0 && (!optimized || Object.keys(optimized).length === 0)) {
    return (
      <div>
        <div style={{ fontWeight: 600, marginBottom: 6 }}><strong>Title:</strong> {original.title}</div>
        <div style={{ marginBottom: 6 }}><strong>Bullet Points:</strong></div>
        <ul>{original.bullets?.map((b: string, i: number) => <li key={i}>{b}</li>)}</ul>
        <div style={{ marginTop: 8 }}><strong>Description:</strong></div>
        <p>{original.description}</p>
      </div>
    );
  }
  if (optimized && Object.keys(optimized).length > 0 && original && Object.keys(original).length > 0) {
    // Highlight changes
    const titleChanged = original.title !== optimized.optimizedTitle;
    const bulletsChanged = Array.isArray(original.bullets) && Array.isArray(optimized.optimizedBullets) &&
      (original.bullets.length !== optimized.optimizedBullets.length || original.bullets.some((b: string, i: number) => b !== optimized.optimizedBullets[i]));
    const descriptionChanged = original.description !== optimized.optimizedDescription;
    return (
      <div>
        <div style={{ fontWeight: 600, marginBottom: 6 }}>
          <strong>Title:</strong> <span style={titleChanged ? { background: '#fff3cd', padding: '2px 4px', borderRadius: 4 } : {}}>{optimized.optimizedTitle}</span>
        </div>
        <div style={{ marginBottom: 6 }}><strong>Bullet Points:</strong></div>
        <ul>
          {optimized.optimizedBullets?.map((b: string, i: number) => {
            const changed = !original.bullets || original.bullets[i] !== b;
            return <li key={i} style={changed ? { background: '#fff3cd', padding: '2px 4px', borderRadius: 4 } : {}}>{b}</li>;
          })}
        </ul>
        <div style={{ marginTop: 8 }}><strong>Description:</strong></div>
        <p style={descriptionChanged ? { background: '#fff3cd', padding: '2px 4px', borderRadius: 4 } : {}}>{optimized.optimizedDescription}</p>
        <div className="keywords" style={{ marginTop: 8 }}><strong>Keywords:</strong> {(optimized.keywordSuggestions || []).join(', ')}</div>
      </div>
    );
  }
  if (optimized && Object.keys(optimized).length > 0) {
    return (
      <div>
        <div style={{ fontWeight: 600, marginBottom: 6 }}><strong>Title:</strong> {optimized.optimizedTitle}</div>
        <div style={{ marginBottom: 6 }}><strong>Bullet Points:</strong></div>
        <ul>{optimized.optimizedBullets?.map((b: string, i: number) => <li key={i}>{b}</li>)}</ul>
        <div style={{ marginTop: 8 }}><strong>Description:</strong></div>
        <p>{optimized.optimizedDescription}</p>
        <div className="keywords" style={{ marginTop: 8 }}><strong>Keywords:</strong> {(optimized.keywordSuggestions || []).join(', ')}</div>
      </div>
    );
  }
  return null;
}
