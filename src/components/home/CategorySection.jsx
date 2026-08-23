import React from 'react';
import { CATEGORIES } from '../../data/categories';
import CategoryCard from './CategoryCard';
import { Layers } from 'lucide-react';

export default function CategorySection() {
  const displayCategories = CATEGORIES.filter(c => c.id !== 'all');

  return (
    <section className="section" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Layers size={14} />
            <span>Shop By Category</span>
          </div>
          <h2 className="section-title">Explore Our Diverse Departments</h2>
          <p className="section-subtitle">
            From premier electronics and contemporary fashion to wellness and artisanal home essentials.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '1.5rem'
        }}>
          {displayCategories.map(category => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
