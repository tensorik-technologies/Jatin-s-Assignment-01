import React from 'react';
import { IndianRupee, RotateCcw } from 'lucide-react';

export default function PriceFilter({ min = 0, max = 200000, currentMax, onChange, onReset }) {
  return (
    <div style={{
      backgroundColor: 'var(--bg-surface)',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-md)',
      padding: '1.25rem'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
        <span style={{ fontSize: '0.875rem', fontWeight: '700', color: 'var(--text-primary)' }}>
          Max Price Filter
        </span>
        <button
          onClick={onReset}
          style={{
            fontSize: '0.75rem',
            color: 'var(--primary)',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem'
          }}
          title="Reset price filter"
        >
          <RotateCcw size={12} />
          <span>Reset</span>
        </button>
      </div>

      {/* Slider Input */}
      <input
        type="range"
        min={min}
        max={max}
        step={1000}
        value={currentMax}
        onChange={(e) => onChange(Number(e.target.value))}
        id="price-range-slider"
      />

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '0.75rem',
        fontSize: '0.8125rem'
      }}>
        <span style={{ color: 'var(--text-muted)' }}>₹{min.toLocaleString('en-IN')}</span>
        <span style={{
          fontWeight: '800',
          color: 'var(--primary)',
          background: 'var(--primary-light)',
          padding: '0.2rem 0.6rem',
          borderRadius: 'var(--radius-sm)'
        }}>
          Up to ₹{currentMax.toLocaleString('en-IN')}
        </span>
      </div>
    </div>
  );
}
