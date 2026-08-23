import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye, Star, Zap } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import RatingStars from '../common/RatingStars';

export default function ProductCard({ product }) {
  const { addToCart, cart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isFavorited = isInWishlist(product.id);
  const inCartItem = cart.find(item => item.id === product.id);

  return (
    <div
      className="card product-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative',
        background: 'var(--bg-card)'
      }}
    >
      {/* Image Container with Wishlist & Badges */}
      <div style={{
        position: 'relative',
        width: '100%',
        paddingTop: '80%', /* 4:3 Aspect Ratio */
        backgroundColor: 'var(--bg-secondary)',
        overflow: 'hidden'
      }}>
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          className="product-image"
        />

        {/* Badges Container (Discount / New / Trending) */}
        <div style={{
          position: 'absolute',
          top: '0.75rem',
          left: '0.75rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.35rem',
          zIndex: 2
        }}>
          {product.discount > 0 && (
            <span className="badge badge-discount">
              {product.discount}% OFF
            </span>
          )}
          {product.isNew && (
            <span className="badge badge-new">
              NEW
            </span>
          )}
          {product.featured && !product.isNew && (
            <span className="badge" style={{ background: 'var(--primary-gradient)', color: '#ffffff' }}>
              <Zap size={11} /> FEATURED
            </span>
          )}
        </div>

        {/* Wishlist Floating Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
          style={{
            position: 'absolute',
            top: '0.75rem',
            right: '0.75rem',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'var(--bg-surface)',
            color: isFavorited ? '#ef4444' : 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-md)',
            zIndex: 2,
            transition: 'transform 0.2s ease, color 0.2s ease'
          }}
          className="wishlist-btn-heart"
        >
          <Heart
            size={18}
            fill={isFavorited ? '#ef4444' : 'none'}
            stroke={isFavorited ? '#ef4444' : 'currentColor'}
          />
        </button>
      </div>

      {/* Product Content Body */}
      <div style={{
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'space-between',
        gap: '0.75rem'
      }}>
        {/* Category & Brand & Stock Status */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
            <span style={{
              fontSize: '0.75rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'var(--primary)'
            }}>
              {product.category} • {product.brand}
            </span>
            
            {product.inStock ? (
              <span className="badge-stock" style={{ color: 'var(--success)' }}>
                <span className="badge-stock-dot" />
                In Stock
              </span>
            ) : (
              <span className="badge-stock" style={{ color: 'var(--danger)' }}>
                Out of Stock
              </span>
            )}
          </div>

          {/* Product Title */}
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
              height: '2.8rem'
            }}>
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div style={{ marginTop: '0.5rem' }}>
            <RatingStars rating={product.rating} reviews={product.reviews} size={14} />
          </div>
        </div>

        {/* Price & Actions */}
        <div>
          {/* Price Row */}
          <div style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '0.5rem',
            marginBottom: '1rem'
          }}>
            <span style={{
              fontSize: '1.35rem',
              fontWeight: '900',
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em'
            }}>
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span style={{
                fontSize: '0.875rem',
                color: 'var(--text-muted)',
                textDecoration: 'line-through'
              }}>
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Buttons: Add to Cart & View Details */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '0.5rem' }}>
            <button
              onClick={() => addToCart(product, 1)}
              className="btn btn-primary"
              style={{
                padding: '0.65rem 0.85rem',
                fontSize: '0.875rem',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem'
              }}
              id={`add-to-cart-${product.id}`}
            >
              <ShoppingBag size={16} />
              <span>{inCartItem ? `In Cart (${inCartItem.quantity})` : 'Add to Cart'}</span>
            </button>

            <Link
              to={`/products/${product.id}`}
              className="btn btn-secondary"
              style={{
                padding: '0.65rem',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title="View Product Details"
              aria-label="View Product Details"
            >
              <Eye size={17} />
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .product-card:hover .product-image {
          transform: scale(1.06);
        }
        .wishlist-btn-heart:hover {
          transform: scale(1.15);
        }
      `}</style>
    </div>
  );
}
