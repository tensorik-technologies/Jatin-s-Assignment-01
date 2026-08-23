import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import RatingStars from '../components/common/RatingStars';
import EmptyState from '../components/common/EmptyState';
import { Heart, ShoppingBag, Trash2, ArrowLeft, Eye } from 'lucide-react';

export default function WishlistPage() {
  const { wishlist, wishlistCount, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart, cart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="container animate-fade-in" style={{ padding: '4rem 1.25rem 6rem' }}>
        <EmptyState
          icon={Heart}
          title="Your wishlist is empty"
          description="Save items you love by tapping the heart icon on any product card, and find them easily right here!"
          actionText="Discover Products"
          actionLink="/products"
        />
      </div>
    );
  }

  return (
    <div className="wishlist-page animate-fade-in" style={{ padding: '2.5rem 0 5rem' }}>
      <div className="container">
        
        {/* Page Header */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          marginBottom: '2.5rem',
          paddingBottom: '1.25rem',
          borderBottom: '1px solid var(--border-color)'
        }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
              My Wishlist
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', marginTop: '0.25rem' }}>
              You have <strong style={{ color: 'var(--primary)' }}>{wishlistCount}</strong> saved {wishlistCount === 1 ? 'item' : 'items'}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link to="/products" className="btn btn-secondary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <ArrowLeft size={15} />
              <span>Continue Shopping</span>
            </Link>

            <button
              onClick={clearWishlist}
              className="btn btn-secondary btn-sm"
              style={{ color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
              title="Clear all wishlist items"
            >
              <Trash2 size={15} />
              <span>Clear Wishlist</span>
            </button>
          </div>
        </div>

        {/* Wishlist Items Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '1.5rem'
        }}>
          {wishlist.map(product => {
            const inCart = cart.find(item => item.id === product.id);

            return (
              <div
                key={product.id}
                className="card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  position: 'relative'
                }}
              >
                {/* Image */}
                <div style={{
                  position: 'relative',
                  width: '100%',
                  paddingTop: '80%',
                  backgroundColor: 'var(--bg-secondary)',
                  overflow: 'hidden'
                }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />

                  {/* Remove from Wishlist Button */}
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="btn-icon"
                    style={{
                      position: 'absolute',
                      top: '0.75rem',
                      right: '0.75rem',
                      width: '34px',
                      height: '34px',
                      color: 'var(--danger)',
                      backgroundColor: 'var(--bg-surface)'
                    }}
                    title="Remove from wishlist"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 size={16} />
                  </button>

                  {product.discount > 0 && (
                    <span
                      className="badge badge-discount"
                      style={{ position: 'absolute', top: '0.75rem', left: '0.75rem' }}
                    >
                      {product.discount}% OFF
                    </span>
                  )}
                </div>

                {/* Body Details */}
                <div style={{
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  justifyContent: 'space-between',
                  gap: '0.75rem'
                }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--primary)', textTransform: 'uppercase' }}>
                      {product.category} • {product.brand}
                    </span>

                    <Link to={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
                      <h3 style={{
                        fontSize: '1rem',
                        fontWeight: '700',
                        color: 'var(--text-primary)',
                        lineHeight: 1.4,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        height: '2.8rem',
                        marginTop: '0.25rem'
                      }}>
                        {product.name}
                      </h3>
                    </Link>

                    <div style={{ marginTop: '0.35rem' }}>
                      <RatingStars rating={product.rating} reviews={product.reviews} size={14} />
                    </div>
                  </div>

                  <div>
                    {/* Price */}
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '1rem' }}>
                      <span style={{ fontSize: '1.25rem', fontWeight: '900', color: 'var(--text-primary)' }}>
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '0.5rem' }}>
                      <button
                        onClick={() => addToCart(product, 1)}
                        className="btn btn-primary"
                        style={{ padding: '0.65rem', fontSize: '0.875rem' }}
                      >
                        <ShoppingBag size={16} />
                        <span>{inCart ? `In Cart (${inCart.quantity})` : 'Move to Cart'}</span>
                      </button>

                      <Link
                        to={`/products/${product.id}`}
                        className="btn btn-secondary"
                        style={{ padding: '0.65rem' }}
                        title="View Details"
                        aria-label="View Details"
                      >
                        <Eye size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
