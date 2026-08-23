import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import RatingStars from '../components/common/RatingStars';
import ProductCard from '../components/products/ProductCard';
import CheckoutModal from '../components/common/CheckoutModal';
import {
  Heart,
  ShoppingBag,
  Zap,
  Truck,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Plus,
  Minus,
  Share2,
  ArrowLeft
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart, cart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToast } = useToast();

  const product = products.find(p => String(p.id) === String(id));
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.image);
      setQuantity(1);
      window.scrollTo(0, 0);
    }
  }, [id, product]);

  if (!product) {
    return (
      <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '1rem' }}>Product Not Found</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          The product you are looking for does not exist or may have been removed.
        </p>
        <Link to="/products" className="btn btn-primary btn-lg">
          Browse All Products
        </Link>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);
  const inCartItem = cart.find(item => item.id === product.id);

  // Related products from the same category excluding current product
  const relatedProducts = products.filter(
    p => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast('Product link copied to clipboard!', 'info');
    }
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  return (
    <div className="product-detail-page animate-fade-in" style={{ padding: '2rem 0 5rem' }}>
      <div className="container">
        
        {/* Breadcrumb Navigation */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.875rem',
          color: 'var(--text-secondary)',
          marginBottom: '2rem',
          flexWrap: 'wrap'
        }} aria-label="Breadcrumb">
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <span>Home</span>
          </Link>
          <ChevronRight size={14} color="var(--text-muted)" />
          <Link to="/products">Products</Link>
          <ChevronRight size={14} color="var(--text-muted)" />
          <Link to={`/products?category=${encodeURIComponent(product.category)}`}>
            {product.category}
          </Link>
          <ChevronRight size={14} color="var(--text-muted)" />
          <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>
            {product.name}
          </span>
        </nav>

        {/* Main Product Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '3rem',
          alignItems: 'start'
        }} className="product-detail-grid">
          
          {/* Left Column: Image Gallery */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Main Stage Image */}
            <div style={{
              position: 'relative',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-md)',
              aspectRatio: '1 / 1'
            }}>
              <img
                src={selectedImage || product.image}
                alt={product.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease'
                }}
              />

              {/* Discount Tag */}
              {product.discount > 0 && (
                <span
                  className="badge badge-discount"
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    fontSize: '0.875rem',
                    padding: '0.35rem 0.75rem'
                  }}
                >
                  {product.discount}% OFF
                </span>
              )}

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product)}
                aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--bg-surface)',
                  color: isFavorited ? '#ef4444' : 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'var(--shadow-lg)'
                }}
              >
                <Heart
                  size={22}
                  fill={isFavorited ? '#ef4444' : 'none'}
                  stroke={isFavorited ? '#ef4444' : 'currentColor'}
                />
              </button>
            </div>

            {/* Thumbnail Carousel / List */}
            {product.images && product.images.length > 1 && (
              <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                {product.images.map((imgUrl, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(imgUrl)}
                    style={{
                      width: '72px',
                      height: '72px',
                      borderRadius: 'var(--radius-md)',
                      overflow: 'hidden',
                      border: selectedImage === imgUrl ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                      flexShrink: 0,
                      opacity: selectedImage === imgUrl ? 1 : 0.65,
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <img src={imgUrl} alt={`${product.name} thumbnail ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Details & Purchasing Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Header: Category & Share */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{
                fontSize: '0.8125rem',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--primary)',
                backgroundColor: 'var(--primary-light)',
                padding: '0.3rem 0.75rem',
                borderRadius: 'var(--radius-full)'
              }}>
                {product.category} • {product.brand}
              </span>

              <button
                onClick={handleShare}
                className="btn-icon"
                style={{ width: '36px', height: '36px' }}
                title="Share product"
                aria-label="Share product"
              >
                <Share2 size={16} />
              </button>
            </div>

            {/* Product Title */}
            <h1 style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
              fontWeight: '900',
              color: 'var(--text-primary)',
              lineHeight: 1.2,
              letterSpacing: '-0.03em'
            }}>
              {product.name}
            </h1>

            {/* Rating & Stock Status */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              <RatingStars rating={product.rating} reviews={product.reviews} size={18} />
              
              <div style={{ width: '1px', height: '18px', backgroundColor: 'var(--border-color)' }} />

              {product.inStock ? (
                <span className="badge-stock" style={{ color: 'var(--success)' }}>
                  <span className="badge-stock-dot" />
                  In Stock & Ready to Dispatch
                </span>
              ) : (
                <span className="badge-stock" style={{ color: 'var(--danger)' }}>
                  Temporarily Out of Stock
                </span>
              )}
            </div>

            {/* Pricing Section */}
            <div style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.25rem 1.5rem',
              display: 'flex',
              alignItems: 'baseline',
              gap: '1rem',
              flexWrap: 'wrap'
            }}>
              <span style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <>
                  <span style={{ fontSize: '1.15rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="badge badge-discount" style={{ fontSize: '0.875rem' }}>
                    Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')} ({product.discount}%)
                  </span>
                </>
              )}
              <div style={{ width: '100%', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Inclusive of all taxes. Free express shipping on orders over ₹999.
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                About this item
              </h3>
              <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                {product.description}
              </p>
            </div>

            {/* Quantity Stepper & Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                  Quantity:
                </span>
                
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  border: '1.5px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-surface)'
                }}>
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    aria-label="Decrease quantity"
                  >
                    <Minus size={15} />
                  </button>

                  <span style={{ width: '40px', textAlign: 'center', fontWeight: '800', fontSize: '0.9375rem' }}>
                    {quantity}
                  </span>

                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    aria-label="Increase quantity"
                  >
                    <Plus size={15} />
                  </button>
                </div>
              </div>

              {/* Purchase CTA Buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <button
                  onClick={() => addToCart(product, quantity)}
                  className="btn btn-secondary btn-lg"
                  id="detail-add-to-cart-btn"
                >
                  <ShoppingBag size={18} />
                  <span>{inCartItem ? `Add More (${inCartItem.quantity} in cart)` : 'Add to Cart'}</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="btn btn-primary btn-lg"
                  id="detail-buy-now-btn"
                >
                  <Zap size={18} />
                  <span>Buy Now</span>
                </button>
              </div>
            </div>

            {/* Trust Assurances */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0.75rem',
              padding: '1rem',
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-md)',
              textAlign: 'center',
              fontSize: '0.75rem',
              color: 'var(--text-secondary)',
              fontWeight: '600'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem' }}>
                <Truck size={18} color="var(--primary)" />
                <span>Fast Shipping</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem' }}>
                <RotateCcw size={18} color="var(--primary)" />
                <span>7-Day Return</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem' }}>
                <ShieldCheck size={18} color="var(--primary)" />
                <span>100% Genuine</span>
              </div>
            </div>

            {/* Technical Specifications */}
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div style={{ marginTop: '1rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                  Technical Specifications
                </h3>
                <div style={{
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  backgroundColor: 'var(--bg-surface)'
                }}>
                  {Object.entries(product.specifications).map(([key, val], idx) => (
                    <div
                      key={key}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        padding: '0.75rem 1rem',
                        backgroundColor: idx % 2 === 0 ? 'var(--bg-surface)' : 'var(--bg-secondary)',
                        fontSize: '0.875rem'
                      }}
                    >
                      <span style={{ fontWeight: '600', color: 'var(--text-secondary)' }}>{key}</span>
                      <span style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Carousel / Grid */}
        {relatedProducts.length > 0 && (
          <section style={{ marginTop: '5rem', paddingTop: '3rem', borderTop: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
              <div>
                <span className="section-tag">Similar Discoveries</span>
                <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                  Related {product.category} Products
                </h2>
              </div>
              <Link to={`/products?category=${encodeURIComponent(product.category)}`} className="btn btn-secondary btn-sm">
                View Category
              </Link>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '1.5rem'
            }}>
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      <style>{`
        @media (min-width: 900px) {
          .product-detail-grid {
            grid-template-columns: 1fr 1.1fr !important;
          }
        }
      `}</style>

      {/* Checkout Modal */}
      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
    </div>
  );
}
