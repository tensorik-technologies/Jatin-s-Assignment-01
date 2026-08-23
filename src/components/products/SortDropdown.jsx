import React from 'react';
import { ArrowUpDown } from 'lucide-react';

export default function SortDropdown({ value, onChange }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <label htmlFor="sort-select" style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-secondary)', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
        <ArrowUpDown size={15} />
        <span>Sort By:</span>
      </label>
      <select
        id="sort-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="form-select"
        style={{ minWidth: '175px', height: '42px', padding: '0.5rem 2rem 0.5rem 0.85rem' }}
      >
        <option value="featured">Featured Picks</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
        <option value="rating">Highest Rated</option>
        <option value="discount-high">Biggest Discounts</option>
      </select>
    </div>
  );
}
