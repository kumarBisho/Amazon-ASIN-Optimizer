import React from 'react';

export default function ContactInfoPage() {
  return (
    <div style={{ maxWidth: 480, margin: '40px auto', background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', padding: 32 }}>
      <h2 style={{ color: '#232f3e', marginBottom: 18 }}>Contact Support</h2>
      <div style={{ fontSize: '1.05rem', color: '#444', marginBottom: 12 }}>
        For any queries or support, reach out to us:
      </div>
      <div style={{ fontSize: '1rem', color: '#232f3e', marginBottom: 8 }}>
        <strong>Email:</strong> <a href="mailto:support@asinoptimizer.com" style={{ color: '#007185' }}>support@asinoptimizer.com</a>
      </div>
      <div style={{ fontSize: '1rem', color: '#232f3e', marginBottom: 8 }}>
        <strong>Phone:</strong> <a href="tel:+911234567890" style={{ color: '#007185' }}>+91 12345 67890</a>
      </div>
      <div style={{ fontSize: '1rem', color: '#232f3e', marginBottom: 8 }}>
        <strong>Website:</strong> <a href="https://asinoptimizer.com" target="_blank" rel="noopener" style={{ color: '#007185' }}>asinoptimizer.com</a>
      </div>
      <div style={{ fontSize: '0.98rem', color: '#555', marginTop: 18 }}>
        We aim to respond to all queries within 24 hours.
      </div>
    </div>
  );
}
