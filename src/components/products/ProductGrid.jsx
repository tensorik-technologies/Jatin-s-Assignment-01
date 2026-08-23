import React from 'react';
import ProductCard from './ProductCard';
import SkeletonCard from '../common/SkeletonCard';
import EmptyState from '../common/EmptyState';
import { SearchX } from 'lucide-react';

export default function ProductGrid({
  products = [],
  isLoading = false,
  onResetFilters
}) {
  if (isLoading) {
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '1.5rem'
      }}>
        {[...Array(8)].map((_, idx) => (
          <SkeletonCard key={idx} />
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <EmptyState
        icon={SearchX}
        title="No products found"
        description="Try searching for another keyword or adjust your category and price filters."
        actionText="Reset All Filters"
        onActionClick={onResetFilters}
      />
    );
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: '1.5rem'
    }} id="product-grid-container">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
