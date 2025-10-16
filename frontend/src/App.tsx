
import React, { useState } from 'react';
import AsinForm from './components/AsinForm';
import ComparisonCard from './components/ComparisonCard';
import HistoryTable from './components/HistoryTable';
import './App.css';

export default function App() {
  const [result, setResult] = useState<any>(null);
  const [asin, setAsin] = useState<string>('');

  return (
    <>
      <div className="app-header">
        Amazon ASIN Optimizer
      </div>
      <div className="container">
        <div className="asin-form">
          <AsinForm onResult={(r: any) => { setResult(r); setAsin(r?.asin || ''); }} />
        </div>
        <div style={{ marginBottom: 18, color: '#555', fontSize: '0.98rem' }}>
          Enter an ASIN (e.g. <b>B0F2T674FJ</b>) and click <b>Optimize</b>
        </div>

        {result && (
          <>
            <div className="optimization-section">
              <div className="optimization-card">
                <h3>Original Listing</h3>
                <ComparisonCard original={result.original} optimized={{}} />
              </div>
              <div className="optimization-card">
                <h3>Optimized Listing</h3>
                <ComparisonCard original={{}} optimized={result.optimized} />
              </div>
            </div>
            <div className="history-section">
              <h3 style={{marginBottom: 8}}>Optimization History</h3>
              <HistoryTable asin={asin} />
            </div>
          </>
        )}
      </div>
    </>
  );
}
