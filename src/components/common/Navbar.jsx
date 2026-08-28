import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Heart,
  Search,
  Menu,
  X,
  Sparkles,
  ChevronRight,
  Zap,
  User,
  Package
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import ThemeToggle from './ThemeToggle';
import { CATEGORIES } from '../../data/categories';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { totalItems } = useCart();
  const { wishlistCount } = useWishlist();
  const { isAuthenticated, userProfile } = useAuth();
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  const navLinkStyle = ({ isActive }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    fontWeight: isActive ? '700' : '600',
    color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
    fontSize: '0.9375rem',
    padding: '0.5rem 0.75rem',
    borderRadius: 'var(--radius-md)',
    transition: 'all 0.15s ease'
  });

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backgroundColor: 'var(--bg-glass)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-color)',
      transition: 'background-color var(--transition-normal), border-color var(--transition-normal)'
    }}>
      {/* Top Banner with Role Switcher */}
      <div style={{
        background: 'var(--primary-gradient)',
        color: '#ffffff',
        fontSize: '0.75rem',
        fontWeight: '700',
        letterSpacing: '0.03em',
        padding: '0.35rem 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Zap size={14} className="animate-pulse" />
          <span>LIMITED PERIOD: Use code <strong>BOOST10</strong> for 10% OFF on all orders!</span>
        </div>
      </div>

      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 'var(--header-height)' }}>
        
        {/* Brand Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', textDecoration: 'none' }} id="brand-logo">
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'var(--primary-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            boxShadow: '0 4px 12px rgba(79, 70, 229, 0.35)',
            transform: 'rotate(-4deg)'
          }}>
            <ShoppingBag size={22} strokeWidth={2.5} />
          </div>
          <div>
            <div style={{
              fontSize: '1.25rem',
              fontWeight: '900',
              letterSpacing: '-0.03em',
              color: 'var(--text-primary)',
              lineHeight: 1.1,
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}>
              <span>BASKET</span>
              <span style={{
                background: 'var(--primary-gradient)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>BOOST</span>
            </div>
            <span style={{ fontSize: '0.6875rem', fontWeight: '700', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Premium Store
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'none', alignItems: 'center', gap: '0.5rem' }} className="desktop-nav-links">
          <NavLink to="/" style={navLinkStyle}>
            Home
          </NavLink>
          <NavLink to="/products" style={navLinkStyle}>
            Products
          </NavLink>
          <NavLink to="/orders" style={navLinkStyle}>
            My Orders
          </NavLink>
        </nav>

        {/* Desktop Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          style={{ display: 'none', position: 'relative', width: '250px' }}
          className="desktop-search-form"
        >
          <input
            type="text"
            placeholder="Search products, brands..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-input"
            style={{
              paddingLeft: '2.5rem',
              paddingRight: '1rem',
              height: '40px',
              fontSize: '0.875rem',
              borderRadius: 'var(--radius-full)'
            }}
          />
          <Search
            size={16}
            style={{
              position: 'absolute',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)',
              pointerEvents: 'none'
            }}
          />
        </form>

        {/* Actions (Wishlist, Cart, Theme, Mobile Menu) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          
          <ThemeToggle />

          {/* Wishlist Link with Badge */}
          <Link
            to="/wishlist"
            className="btn-icon"
            style={{ position: 'relative' }}
            aria-label="View Wishlist"
            title="Wishlist"
            id="nav-wishlist-btn"
          >
            <Heart size={20} />
            {wishlistCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                backgroundColor: '#ef4444',
                color: '#ffffff',
                fontSize: '0.6875rem',
                fontWeight: '800',
                borderRadius: 'var(--radius-full)',
                minWidth: '18px',
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 4px',
                boxShadow: '0 2px 5px rgba(239, 68, 68, 0.4)'
              }}>
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart Link with Badge */}
          <Link
            to="/cart"
            className="btn-icon"
            style={{
              position: 'relative',
              backgroundColor: totalItems > 0 ? 'var(--primary-light)' : 'var(--bg-surface)',
              color: totalItems > 0 ? 'var(--primary)' : 'var(--text-primary)',
              borderColor: totalItems > 0 ? 'var(--primary)' : 'var(--border-color)'
            }}
            aria-label="View Shopping Cart"
            title="Shopping Cart"
            id="nav-cart-btn"
          >
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                backgroundColor: 'var(--primary)',
                color: '#ffffff',
                fontSize: '0.6875rem',
                fontWeight: '800',
                borderRadius: 'var(--radius-full)',
                minWidth: '18px',
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 4px',
                boxShadow: '0 2px 5px rgba(79, 70, 229, 0.4)'
              }}>
                {totalItems}
              </span>
            )}
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="btn-icon mobile-menu-btn"
            style={{ display: 'inline-flex' }}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Collapsible Navigation Menu */}
      {mobileMenuOpen && (
        <div style={{
          backgroundColor: 'var(--bg-surface)',
          borderTop: '1px solid var(--border-color)',
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          animation: 'fadeIn 0.2s ease-out'
        }}>
          {/* Mobile Search Form */}
          <form onSubmit={handleSearchSubmit} style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Search products, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{
                paddingLeft: '2.5rem',
                borderRadius: 'var(--radius-full)',
                height: '44px'
              }}
            />
            <Search
              size={18}
              style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)'
              }}
            />
          </form>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem',
                borderRadius: 'var(--radius-md)',
                fontWeight: '600',
                color: 'var(--text-primary)'
              }}
            >
              <span>Home</span>
              <ChevronRight size={16} color="var(--text-muted)" />
            </Link>

            <Link
              to="/products"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem',
                borderRadius: 'var(--radius-md)',
                fontWeight: '600',
                color: 'var(--text-primary)'
              }}
            >
              <span>All Products</span>
              <ChevronRight size={16} color="var(--text-muted)" />
            </Link>

            <Link
              to="/orders"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem',
                borderRadius: 'var(--radius-md)',
                fontWeight: '600',
                color: 'var(--text-primary)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Package size={18} color="var(--primary)" />
                <span>My Orders</span>
              </div>
              <ChevronRight size={16} color="var(--text-muted)" />
            </Link>

            <div style={{ padding: '0.5rem 0.75rem', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Categories
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', padding: '0 0.5rem' }}>
              {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                <Link
                  key={cat.id}
                  to={`/products?category=${encodeURIComponent(cat.slug)}`}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    padding: '0.5rem 0.75rem',
                    background: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: 'var(--text-secondary)'
                  }}
                >
                  {cat.name}
                </Link>
              ))}
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '0.5rem 0' }} />

            <Link
              to="/wishlist"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem',
                borderRadius: 'var(--radius-md)',
                fontWeight: '600',
                color: 'var(--text-primary)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Heart size={18} color="#ef4444" />
                <span>Wishlist</span>
              </div>
              <span className="badge badge-discount">{wishlistCount}</span>
            </Link>

            <Link
              to="/cart"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem',
                borderRadius: 'var(--radius-md)',
                fontWeight: '600',
                color: 'var(--text-primary)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShoppingBag size={18} color="var(--primary)" />
                <span>Shopping Cart</span>
              </div>
              <span className="badge badge-new">{totalItems} items</span>
            </Link>
          </nav>
        </div>
      )}

      <style>{`
        @media (min-width: 900px) {
          .desktop-nav-links {
            display: flex !important;
          }
          .desktop-search-form {
            display: block !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
