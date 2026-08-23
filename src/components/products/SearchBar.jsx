import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ value, onChange, placeholder = "Search products by name, brand, category..." }) {
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="form-input"
        style={{
          paddingLeft: '2.75rem',
          paddingRight: value ? '2.75rem' : '1rem',
          height: '46px',
          borderRadius: 'var(--radius-md)',
          fontSize: '0.9375rem'
        }}
        id="products-search-input"
      />
      
      {/* Search Icon */}
      <Search
        size={18}
        style={{
          position: 'absolute',
          left: '1rem',
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'var(--text-muted)',
          pointerEvents: 'none'
        }}
      />

      {/* Clear Button */}
      {value && (
        <button
          onClick={() => onChange('')}
          type="button"
          aria-label="Clear search"
          style={{
            position: 'absolute',
            right: '0.85rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4px',
            borderRadius: '50%',
            background: 'var(--bg-secondary)'
          }}
        >
          <X size={15} />
        </button>
      )}
    </div>
  );
}
