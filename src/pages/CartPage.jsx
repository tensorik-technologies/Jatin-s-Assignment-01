import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/cart/CartItem';
import OrderSummary from '../components/cart/OrderSummary';
import EmptyState from '../components/common/EmptyState';
import CheckoutModal from '../components/common/CheckoutModal';
import { ShoppingBag, Trash2, ArrowLeft, ShieldCheck } from 'lucide-react';

export default function CartPage() {
  const { cart, totalItems, clearCart } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="container animate-fade-in" style={{ padding: '4rem 1.25rem 6rem' }}>
        <EmptyState
          icon={ShoppingBag}
          title="Your shopping cart is empty"
          description="Looks like you haven't added any items to your basket yet. Explore our top-rated collections and find what you love!"
          actionText="Start Shopping"
          actionLink="/products"
        />
      </div>
    );
  }

  return (
    <div className="cart-page animate-fade-in" style={{ padding: '2.5rem 0 5rem' }}>
      <div className="container">
        
        {/* Page Header */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          marginBottom: '2rem',
          paddingBottom: '1.25rem',
          borderBottom: '1px solid var(--border-color)'
        }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
              Shopping Cart
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', marginTop: '0.25rem' }}>
              You have <strong style={{ color: 'var(--primary)' }}>{totalItems}</strong> {totalItems === 1 ? 'item' : 'items'} in your basket
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link to="/products" className="btn btn-secondary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <ArrowLeft size={15} />
              <span>Continue Shopping</span>
            </Link>

            <button
              onClick={clearCart}
              className="btn btn-secondary btn-sm"
              style={{ color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
              title="Empty entire cart"
            >
              <Trash2 size={15} />
              <span>Clear Cart</span>
            </button>
          </div>
        </div>

        {/* Grid Layout: Cart Items List + Order Summary Sidebar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '2.5rem',
          alignItems: 'start'
        }} className="cart-grid-layout">
          
          {/* Left Column: Cart Items List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {cart.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Right Column: Sticky Order Summary */}
          <div style={{ position: 'sticky', top: '90px' }}>
            <OrderSummary onCheckout={() => setIsCheckoutOpen(true)} />
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 960px) {
          .cart-grid-layout {
            grid-template-columns: 1.5fr 1fr !important;
          }
        }
      `}</style>

      {/* Checkout Modal */}
      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
    </div>
  );
}
