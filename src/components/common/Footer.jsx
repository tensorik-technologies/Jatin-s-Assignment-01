import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ShieldCheck, Truck, RotateCcw, Headphones, Mail, ArrowRight, Github, Twitter, Instagram, Linkedin, Heart } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { CATEGORIES } from '../../data/categories';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const { addToast } = useToast();

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      addToast('Thank you for subscribing to BASKET BOOST updates!', 'success');
      setNewsletterEmail('');
    }
  };

  return (
    <footer style={{
      backgroundColor: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border-color)',
      marginTop: 'auto',
      transition: 'background-color var(--transition-normal)'
    }}>
      {/* Value Proposition Highlights */}
      <div style={{ borderBottom: '1px solid var(--border-color)', padding: '2.5rem 0' }}>
        <div className="container" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'var(--primary-light)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Truck size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.9375rem', fontWeight: '700', color: 'var(--text-primary)' }}>Free Fast Delivery</h4>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>On all orders above ₹999 across India</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'var(--primary-light)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <RotateCcw size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.9375rem', fontWeight: '700', color: 'var(--text-primary)' }}>7-Day Easy Returns</h4>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>No questions asked instant replacements</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'var(--primary-light)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.9375rem', fontWeight: '700', color: 'var(--text-primary)' }}>100% Secure Checkout</h4>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Protected by 256-bit SSL encryption</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'var(--primary-light)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Headphones size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.9375rem', fontWeight: '700', color: 'var(--text-primary)' }}>24/7 Dedicated Support</h4>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Instant assistance via live chat and email</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container" style={{ padding: '4rem 1.25rem 3rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2.5rem'
        }}>
          {/* Col 1: Brand Info */}
          <div style={{ gridColumn: 'span 1' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'var(--primary-gradient)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff'
              }}>
                <ShoppingBag size={20} />
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: '900', color: 'var(--text-primary)' }}>
                BASKET <span style={{ color: 'var(--primary)' }}>BOOST</span>
              </span>
            </Link>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Boost your shopping experience. Discover hand-curated lifestyle, electronics, fashion, and home essentials with verified quality and lightning-fast delivery.
            </p>
            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="btn-icon" aria-label="GitHub">
                <Github size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="btn-icon" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="btn-icon" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="btn-icon" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 style={{ fontSize: '0.9375rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '1.25rem', letterSpacing: '-0.01em' }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <li>
                <Link to="/" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', transition: 'color 0.15s' }}>
                  Home Overview
                </Link>
              </li>
              <li>
                <Link to="/products" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', transition: 'color 0.15s' }}>
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/wishlist" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', transition: 'color 0.15s' }}>
                  Saved Wishlist
                </Link>
              </li>
              <li>
                <Link to="/cart" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', transition: 'color 0.15s' }}>
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link to="/products?sort=discount-high" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', transition: 'color 0.15s' }}>
                  Today's Top Deals
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Categories */}
          <div>
            <h4 style={{ fontSize: '0.9375rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '1.25rem', letterSpacing: '-0.01em' }}>
              Categories
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {CATEGORIES.filter(c => c.id !== 'all').slice(0, 5).map(cat => (
                <li key={cat.id}>
                  <Link
                    to={`/products?category=${encodeURIComponent(cat.slug)}`}
                    style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Newsletter Box */}
          <div>
            <h4 style={{ fontSize: '0.9375rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '1.25rem', letterSpacing: '-0.01em' }}>
              Stay Updated
            </h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1rem' }}>
              Subscribe to get special discount coupons, seasonal drops, and flash sales directly to your inbox.
            </p>
            <form onSubmit={handleNewsletterSubmit} style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="email"
                required
                placeholder="Enter email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="form-input"
                style={{ fontSize: '0.875rem', height: '42px' }}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '0 1rem', height: '42px' }} aria-label="Subscribe">
                <ArrowRight size={18} />
              </button>
            </form>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginTop: '0.5rem' }}>
              🔒 No spam. Unsubscribe anytime in 1 click.
            </span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid var(--border-color)',
          marginTop: '3rem',
          paddingTop: '1.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          fontSize: '0.8125rem',
          color: 'var(--text-muted)'
        }}>
          <div>
            © 2026 BASKET BOOST. All rights reserved. Built with React.js & Pure CSS.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
