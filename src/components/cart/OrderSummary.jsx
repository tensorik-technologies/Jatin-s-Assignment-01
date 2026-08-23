import React, { useState } from 'react';
import { Tag, ShieldCheck, ArrowRight, Check, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function OrderSummary({ onCheckout }) {
  const {
    totalItems,
    subtotal,
    originalSubtotal,
    savings,
    deliveryFee,
    couponDiscount,
    finalTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon
  } = useCart();

  const [couponInput, setCouponInput] = useState('');

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput);
      setCouponInput('');
    }
  };

  return (
    <div style={{
      backgroundColor: 'var(--bg-surface)',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-lg)',
      padding: '1.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.25rem',
      boxShadow: 'var(--shadow-sm)'
    }}>
      <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
        Order Summary
      </h3>

      {/* Pricing Breakdown */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.9375rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
          <span>Price ({totalItems} items)</span>
          <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>
            ₹{originalSubtotal.toLocaleString('en-IN')}
          </span>
        </div>

        {savings > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--success)' }}>
            <span>Retail Discount</span>
            <span style={{ fontWeight: '700' }}>
              - ₹{savings.toLocaleString('en-IN')}
            </span>
          </div>
        )}

        {appliedCoupon && (
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--primary)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span>Coupon ({appliedCoupon.code})</span>
              <button
                onClick={removeCoupon}
                style={{ color: 'var(--danger)', display: 'flex', alignItems: 'center' }}
                title="Remove coupon"
                aria-label="Remove coupon"
              >
                <X size={13} />
              </button>
            </span>
            <span style={{ fontWeight: '700' }}>
              - ₹{couponDiscount.toLocaleString('en-IN')}
            </span>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
          <span>Delivery Charges</span>
          <span>
            {deliveryFee === 0 ? (
              <span style={{ color: 'var(--success)', fontWeight: '700' }}>FREE</span>
            ) : (
              <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>₹{deliveryFee}</span>
            )}
          </span>
        </div>

        {subtotal < 999 && subtotal > 0 && (
          <div style={{
            fontSize: '0.75rem',
            color: 'var(--primary)',
            background: 'var(--primary-light)',
            padding: '0.5rem 0.75rem',
            borderRadius: 'var(--radius-sm)',
            fontWeight: '600'
          }}>
            💡 Add ₹{(999 - subtotal).toLocaleString('en-IN')} more to unlock FREE Delivery!
          </div>
        )}

        <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '0.25rem 0' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-primary)' }}>Total Amount</span>
          <span style={{ fontSize: '1.45rem', fontWeight: '900', color: 'var(--primary)', letterSpacing: '-0.03em' }}>
            ₹{finalTotal.toLocaleString('en-IN')}
          </span>
        </div>

        {savings > 0 && (
          <div style={{
            fontSize: '0.8125rem',
            fontWeight: '700',
            color: 'var(--success)',
            textAlign: 'right'
          }}>
            You will save ₹{savings.toLocaleString('en-IN')} on this order!
          </div>
        )}
      </div>

      {/* Coupon Application Box */}
      <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '0.5rem' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <input
            type="text"
            placeholder="Promo Code (BOOST10)"
            value={couponInput}
            onChange={(e) => setCouponInput(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '2.25rem', textTransform: 'uppercase', height: '42px', fontSize: '0.875rem' }}
          />
          <Tag size={15} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        </div>
        <button type="submit" className="btn btn-secondary" style={{ height: '42px', padding: '0 1.25rem', fontSize: '0.875rem' }}>
          Apply
        </button>
      </form>

      {/* Checkout CTA */}
      <button
        onClick={onCheckout}
        disabled={totalItems === 0}
        className="btn btn-primary btn-block btn-lg"
        id="proceed-to-checkout-btn"
      >
        <span>Proceed to Checkout</span>
        <ArrowRight size={18} />
      </button>

      {/* Security guarantee */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
        <ShieldCheck size={16} color="var(--success)" />
        <span>Safe & Secure 256-Bit SSL Encrypted Checkout</span>
      </div>
    </div>
  );
}
