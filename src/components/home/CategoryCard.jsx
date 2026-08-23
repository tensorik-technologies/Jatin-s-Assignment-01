import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Headphones, Shirt, Sparkles, Home, Activity, BookOpen, Watch, LayoutGrid } from 'lucide-react';

const iconMap = {
  Headphones,
  Shirt,
  Sparkles,
  Home,
  Activity,
  BookOpen,
  Watch,
  LayoutGrid
};

export default function CategoryCard({ category }) {
  const IconComponent = iconMap[category.icon] || LayoutGrid;

  return (
    <Link
      to={`/products?category=${encodeURIComponent(category.slug)}`}
      className="card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        height: '100%',
        position: 'relative'
      }}
    >
      <div style={{ position: 'relative', height: '150px', overflow: 'hidden' }}>
        <img
          src={category.image}
          alt={category.name}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease'
          }}
          className="category-card-img"
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(15, 23, 42, 0.75) 0%, rgba(15, 23, 42, 0.1) 60%)'
        }} />
        
        {/* Category Icon Badge */}
        <div style={{
          position: 'absolute',
          top: '0.75rem',
          left: '0.75rem',
          width: '36px',
          height: '36px',
          borderRadius: '10px',
          background: 'rgba(255, 255, 255, 0.9)',
          color: 'var(--primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(4px)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <IconComponent size={18} />
        </div>

        {/* Badge Pill */}
        {category.badge && (
          <span
            className="badge badge-discount"
            style={{
              position: 'absolute',
              top: '0.75rem',
              right: '0.75rem'
            }}
          >
            {category.badge}
          </span>
        )}

        <div style={{
          position: 'absolute',
          bottom: '0.75rem',
          left: '0.85rem',
          right: '0.85rem',
          color: '#ffffff'
        }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#ffffff', letterSpacing: '-0.02em' }}>
            {category.name}
          </h3>
        </div>
      </div>

      <div style={{
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 1,
        gap: '0.75rem'
      }}>
        <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
          {category.description}
        </p>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.8125rem',
          fontWeight: '700',
          color: 'var(--primary)'
        }}>
          <span>Explore Items</span>
          <ArrowRight size={15} />
        </div>
      </div>
    </Link>
  );
}
