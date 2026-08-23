import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="container animate-fade-in" style={{
      padding: '6rem 1.5rem',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh'
    }}>
      <div style={{
        fontSize: 'clamp(5rem, 12vw, 8rem)',
        fontWeight: '900',
        lineHeight: 1,
        letterSpacing: '-0.05em',
        background: 'var(--primary-gradient)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '1rem'
      }}>
        404
      </div>

      <h1 style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
        Oops! This page went out of stock.
      </h1>

      <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '450px', marginBottom: '2.5rem', lineHeight: 1.6 }}>
        The link you clicked may be broken, or the item page might have been permanently relocated. Let's get you back on track!
      </p>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link to="/" className="btn btn-secondary btn-lg">
          <Home size={18} />
          <span>Go to Homepage</span>
        </Link>
        <Link to="/products" className="btn btn-primary btn-lg">
          <ShoppingBag size={18} />
          <span>Back to Shopping</span>
        </Link>
      </div>
    </div>
  );
}
