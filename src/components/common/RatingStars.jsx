import React from 'react';
import { Star, StarHalf } from 'lucide-react';

export default function RatingStars({ rating = 0, reviews, size = 15, showText = true }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.4;
  const emptyStars = Math.max(0, 5 - fullStars - (hasHalfStar ? 1 : 0));

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', color: '#f59e0b', gap: '1px' }}>
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} size={size} fill="#f59e0b" stroke="#f59e0b" />
        ))}
        {hasHalfStar && (
          <StarHalf size={size} fill="#f59e0b" stroke="#f59e0b" />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} size={size} stroke="var(--border-color)" fill="transparent" />
        ))}
      </div>
      {showText && (
        <span style={{ fontSize: '0.8125rem', fontWeight: '700', color: 'var(--text-primary)' }}>
          {rating.toFixed(1)}
          {reviews !== undefined && (
            <span style={{ fontWeight: '500', color: 'var(--text-muted)', marginLeft: '0.25rem' }}>
              ({reviews})
            </span>
          )}
        </span>
      )}
    </div>
  );
}
