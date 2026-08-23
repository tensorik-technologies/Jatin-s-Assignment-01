import React from 'react';

export default function SkeletonCard() {
  return (
    <div className="card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
      <div className="skeleton" style={{ width: '100%', height: '210px', borderRadius: 'var(--radius-md)' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="skeleton" style={{ width: '35%', height: '14px' }} />
        <div className="skeleton" style={{ width: '25%', height: '14px' }} />
      </div>
      <div className="skeleton" style={{ width: '85%', height: '20px' }} />
      <div className="skeleton" style={{ width: '50%', height: '16px' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
        <div className="skeleton" style={{ width: '40%', height: '24px' }} />
        <div className="skeleton" style={{ width: '45%', height: '36px', borderRadius: 'var(--radius-md)' }} />
      </div>
    </div>
  );
}
