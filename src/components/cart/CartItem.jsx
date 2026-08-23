import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Heart, Plus, Minus } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart, moveToWishlist } = useCart();

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '90px 1fr auto',
      gap: '1.25rem',
      padding: '1.25rem',
      backgroundColor: 'var(--bg-surface)',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-lg)',
      alignItems: 'center',
      transition: 'border-color var(--transition-fast)'
    }} className="cart-item-card">
      
      {/* Thumbnail */}
      <Link to={`/products/${item.id}`} style={{ display: 'block', borderRadius: 'var(--radius-md)', overflow: 'hidden', height: '90px', width: '90px', flexShrink: 0 }}>
        <img
          src={item.image}
          alt={item.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Link>

      {/* Info & Quantity */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--primary)', textTransform: 'uppercase' }}>
          {item.category} • {item.brand}
        </span>

        <Link to={`/products/${item.id}`} style={{ textDecoration: 'none' }}>
          <h4 style={{ fontSize: '0.975rem', fontWeight: '700', color: 'var(--text-primary)', lineHeight: 1.3 }}>
            {item.name}
          </h4>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.25rem' }}>
          <span style={{ fontSize: '0.9375rem', fontWeight: '800', color: 'var(--text-primary)' }}>
            ₹{item.price.toLocaleString('en-IN')}
          </span>
          {item.originalPrice && item.originalPrice > item.price && (
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
              ₹{item.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        {/* Quantity Controls & Wishlist Action */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            border: '1.5px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--bg-secondary)',
            overflow: 'hidden'
          }}>
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
              style={{
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: item.quantity <= 1 ? 'var(--text-muted)' : 'var(--text-primary)',
                cursor: item.quantity <= 1 ? 'not-allowed' : 'pointer'
              }}
              aria-label="Decrease quantity"
            >
              <Minus size={14} />
            </button>

            <span style={{
              width: '36px',
              textAlign: 'center',
              fontWeight: '700',
              fontSize: '0.875rem',
              color: 'var(--text-primary)'
            }}>
              {item.quantity}
            </span>

            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              style={{
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-primary)'
              }}
              aria-label="Increase quantity"
            >
              <Plus size={14} />
            </button>
          </div>

          {/* Move to Wishlist */}
          <button
            onClick={() => moveToWishlist(item)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontSize: '0.8125rem',
              fontWeight: '600',
              color: 'var(--text-secondary)'
            }}
            title="Move to Wishlist"
          >
            <Heart size={14} />
            <span>Save for Later</span>
          </button>
        </div>
      </div>

      {/* Right Column: Total Price & Remove Button */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        height: '100%',
        gap: '1rem'
      }}>
        <button
          onClick={() => removeFromCart(item.id)}
          className="btn-icon"
          style={{ width: '32px', height: '32px', color: 'var(--danger)' }}
          aria-label="Remove item from cart"
          title="Remove from cart"
        >
          <Trash2 size={16} />
        </button>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Subtotal</div>
          <div style={{ fontSize: '1.15rem', fontWeight: '900', color: 'var(--text-primary)' }}>
            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 540px) {
          .cart-item-card {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
}
