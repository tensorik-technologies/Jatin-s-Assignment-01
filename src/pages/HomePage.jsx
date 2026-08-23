import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/home/Hero';
import CategorySection from '../components/home/CategorySection';
import ProductCard from '../components/products/ProductCard';
import { useProducts } from '../context/ProductContext';
import { Sparkles, Flame, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const { products } = useProducts();
  const featuredProducts = products.filter(p => p.featured).slice(0, 8);
  const trendingDeals = products.filter(p => p.discount >= 40).slice(0, 4);

  return (
    <div className="home-page animate-fade-in">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Shop by Category */}
      <CategorySection />

      {/* 3. Featured Products */}
      <section className="section" style={{ backgroundColor: 'var(--bg-surface)' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-tag">
              <Sparkles size={14} />
              <span>Editor's Choice</span>
            </div>
            <h2 className="section-title">Featured Products</h2>
            <p className="section-subtitle">
              Hand-picked premium selections with top customer ratings and proven performance.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem'
          }}>
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link to="/products" className="btn btn-primary btn-lg">
              <span>View All Products</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Trending Flash Deals Promotional Banner */}
      <section className="section" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container">
          <div style={{
            background: 'var(--primary-gradient)',
            borderRadius: 'var(--radius-xl)',
            padding: '3rem 2rem',
            color: '#ffffff',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-xl)'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '2.5rem',
              alignItems: 'center',
              position: 'relative',
              zIndex: 2
            }}>
              <div>
                <span className="badge" style={{ backgroundColor: '#ffffff', color: 'var(--primary)', marginBottom: '1rem', fontWeight: '800' }}>
                  ⚡ LIMITED TIME FLASH SALE
                </span>
                <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: '900', letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '1rem', color: '#ffffff' }}>
                  Up to 50% OFF on Top Audio & Tech Essentials
                </h2>
                <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.9)', maxWidth: '560px', marginBottom: '2rem' }}>
                  Upgrade your daily lifestyle and gear with cutting-edge noise-cancelling headphones, high-precision timepieces, and athletic wear.
                </p>
                <Link to="/products?category=Electronics" className="btn btn-lg" style={{ backgroundColor: '#ffffff', color: 'var(--primary)', fontWeight: '800' }}>
                  <span>Shop The Flash Sale</span>
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Hot Deals Grid */}
      <section className="section" style={{ backgroundColor: 'var(--bg-surface)' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-tag" style={{ background: '#fee2e2', color: '#ef4444' }}>
              <Flame size={14} />
              <span>Super Savers</span>
            </div>
            <h2 className="section-title">Biggest Discount Deals</h2>
            <p className="section-subtitle">
              Exclusive 40%+ price drops you won't want to miss.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '1.5rem'
          }}>
            {trendingDeals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
