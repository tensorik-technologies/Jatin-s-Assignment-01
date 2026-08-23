import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShoppingBag, ShieldCheck, Flame, TrendingUp } from 'lucide-react';

export default function Hero() {
  return (
    <section style={{
      background: 'var(--hero-gradient)',
      borderBottom: '1px solid var(--border-color)',
      padding: '4rem 0 5rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '3rem',
        alignItems: 'center'
      }}>
        <div style={{ maxWidth: '640px' }}>
          {/* Accent Pill */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 0.9rem',
            borderRadius: 'var(--radius-full)',
            background: 'var(--primary-light)',
            color: 'var(--primary)',
            fontSize: '0.8125rem',
            fontWeight: '700',
            letterSpacing: '0.04em',
            marginBottom: '1.25rem',
            boxShadow: 'var(--shadow-xs)'
          }}>
            <Sparkles size={16} />
            <span>THE NEXT-GEN SHOPPING DESTINATION</span>
          </div>

          {/* Main Headline */}
          <h1 style={{
            fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
            fontWeight: '900',
            letterSpacing: '-0.04em',
            lineHeight: 1.08,
            color: 'var(--text-primary)',
            marginBottom: '1.25rem'
          }}>
            BOOST YOUR <br />
            <span style={{
              background: 'var(--primary-gradient)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              SHOPPING EXPERIENCE
            </span>
          </h1>

          {/* Supporting Text */}
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            marginBottom: '2.25rem',
            maxWidth: '540px'
          }}>
            Discover great products, exciting deals and everything you need in one place. Handpicked top-rated electronics, fashion, home aesthetics, and gear with rapid delivery.
          </p>

          {/* CTA Buttons */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            alignItems: 'center'
          }}>
            <Link to="/products" className="btn btn-primary btn-lg" id="hero-shop-now-btn">
              <span>SHOP NOW</span>
              <ArrowRight size={18} />
            </Link>

            <Link to="/products?category=Electronics" className="btn btn-secondary btn-lg" id="hero-explore-deals-btn">
              <Flame size={18} color="#ef4444" />
              <span>EXPLORE DEALS</span>
            </Link>
          </div>

          {/* Quick Metrics Strip */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '2rem',
            marginTop: '3rem',
            paddingTop: '2rem',
            borderTop: '1px solid var(--border-color)'
          }}>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-primary)' }}>50,000+</div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: '600' }}>Happy Shoppers</div>
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-primary)' }}>4.8 ★</div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: '600' }}>Customer Rating</div>
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-primary)' }}>100%</div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: '600' }}>Verified Brands</div>
            </div>
          </div>
        </div>

        {/* Hero Visual Banner */}
        <div className="hero-visual-wrapper" style={{ position: 'relative' }}>
          <div style={{
            position: 'relative',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-xl)',
            border: '1px solid var(--border-color)',
            background: 'var(--bg-surface)'
          }}>
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1000&auto=format&fit=crop&q=80"
              alt="Basket Boost Premium E-Commerce Lifestyle"
              style={{
                width: '100%',
                height: '420px',
                objectFit: 'cover'
              }}
            />
            {/* Gradient Overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(15, 23, 42, 0.7) 0%, transparent 60%)'
            }} />
            <div style={{
              position: 'absolute',
              bottom: '1.5rem',
              left: '1.5rem',
              right: '1.5rem',
              color: '#ffffff'
            }}>
              <span className="badge badge-discount" style={{ marginBottom: '0.5rem' }}>Up to 50% OFF</span>
              <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#ffffff' }}>Curated Spring Tech & Style Collection</h3>
              <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.85)' }}>Exclusive member discounts automatically applied at checkout.</p>
            </div>
          </div>

          {/* Floating Floating Stat Badge 1 */}
          <div style={{
            position: 'absolute',
            top: '-15px',
            right: '-10px',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: '0.75rem 1rem',
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            animation: 'fadeIn 0.6s ease-out'
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: '#ecfdf5',
              color: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <TrendingUp size={18} />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>Flash Deal</div>
              <div style={{ fontSize: '0.875rem', fontWeight: '800', color: 'var(--text-primary)' }}>Flat ₹1,000 Off</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .container {
            grid-template-columns: 1.15fr 0.85fr !important;
          }
        }
      `}</style>
    </section>
  );
}
