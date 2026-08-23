import React from 'react';
import { CATEGORIES } from '../../data/categories';

export default function CategoryFilter({ selectedCategory, onSelectCategory }) {
  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.5rem',
      alignItems: 'center'
    }}>
      {CATEGORIES.map(category => {
        const isSelected = selectedCategory.toLowerCase() === category.slug.toLowerCase();
        return (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.slug)}
            className={`btn btn-sm ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
            style={{
              borderRadius: 'var(--radius-full)',
              padding: '0.45rem 1rem',
              fontSize: '0.8125rem',
              fontWeight: isSelected ? '700' : '600'
            }}
            id={`category-filter-${category.id}`}
          >
            {category.name}
          </button>
        );
      })}
    </div>
  );
}
