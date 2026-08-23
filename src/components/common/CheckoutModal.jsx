import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Truck, CreditCard, Banknote, Smartphone } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useOrders } from '../../context/OrderContext';

const loadRazorpay = () => new Promise((resolve, reject) => {
  if (window.Razorpay) {
    resolve(window.Razorpay);
    return;
  }

  const existingScript = document.querySelector('script[data-razorpay-checkout]');
  if (existingScript) {
    existingScript.addEventListener('load', () => resolve(window.Razorpay), { once: true });
    existingScript.addEventListener('error', () => reject(new Error('Unable to load Razorpay')), { once: true });
    return;
  }

  const script = document.createElement('script');
  script.src = 'https://checkout.razorpay.com/v1/checkout.js';
  script.async = true;
  script.dataset.razorpayCheckout = 'true';
  script.onload = () => resolve(window.Razorpay);
  script.onerror = () => reject(new Error('Unable to load Razorpay'));
  document.body.appendChild(script);
});

export default function CheckoutModal({ isOpen, onClose }) {
  const { cart, finalTotal, subtotal, savings, deliveryFee, couponDiscount, appliedCoupon, clearCart } = useCart();
  const { addOrder } = useOrders();
  const [step, setStep] = useState('form'); // 'form' | 'success'
  const [orderId, setOrderId] = useState('');
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'upi'
  });

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.phone.trim() || formData.phone.length < 10) newErrors.phone = 'Valid 10-digit phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Street Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.pincode.trim() || formData.pincode.length < 6) newErrors.pincode = 'Valid 6-digit Pincode is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const finalizeOrder = (serverOrder) => {
    const newOrder = addOrder({
      customer: { ...formData },
      items: serverOrder.items,
      subtotal: serverOrder.subtotal,
      deliveryFee: serverOrder.deliveryFee,
      discount: serverOrder.discount,
      total: serverOrder.total,
      paymentMethod: serverOrder.paymentMethod,
      paymentId: serverOrder.paymentId || '',
      paymentStatus: serverOrder.paymentStatus,
      serverOrderId: serverOrder.id,
    });

    setOrderId(serverOrder.id || newOrder.id);
    setIsPaymentLoading(false);
    setStep('success');
    clearCart();
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setPaymentError('');

    setIsPaymentLoading(true);
    try {
      const createResponse = await fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.map(({ id, quantity }) => ({ id, quantity })),
          couponCode: appliedCoupon?.code,
          customer: formData,
          paymentMethod: formData.paymentMethod,
        }),
      });
      const created = await createResponse.json();
      if (!createResponse.ok) throw new Error(created.error || 'Unable to create your order.');

      if (formData.paymentMethod === 'cod') {
        finalizeOrder(created.order);
        return;
      }

      const Razorpay = await loadRazorpay();
      const payment = new Razorpay({
        key: created.razorpay.key,
        amount: created.razorpay.amount,
        currency: created.razorpay.currency,
        name: 'Basket Boost',
        description: 'Basket Boost order payment',
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone
        },
        notes: {
          delivery_city: formData.city,
          delivery_pincode: formData.pincode
        },
        theme: {
          color: '#4f46e5'
        },
        order_id: created.razorpay.orderId,
        handler: async (response) => {
          try {
            const verifyResponse = await fetch('/api/orders/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(response),
            });
            const verified = await verifyResponse.json();
            if (!verifyResponse.ok) throw new Error(verified.error || 'Payment verification failed.');
            finalizeOrder({ ...verified.order, paymentId: response.razorpay_payment_id });
          } catch (error) {
            setIsPaymentLoading(false);
            setPaymentError(error.message || 'We could not verify your payment. Please contact support.');
          }
        },
        modal: {
          ondismiss: () => setIsPaymentLoading(false)
        }
      });

      payment.on('payment.failed', (response) => {
        setIsPaymentLoading(false);
        setPaymentError(response.error?.description || 'Payment failed. Please try again.');
      });
      payment.open();
    } catch (error) {
      setIsPaymentLoading(false);
      setPaymentError(error.message || 'Unable to start payment. Please try again.');
    }
  };

  const handleClose = () => {
    setStep('form');
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      address: '',
      city: '',
      pincode: '',
      paymentMethod: 'upi'
    });
    setErrors({});
    setPaymentError('');
    setIsPaymentLoading(false);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 10000,
      backgroundColor: 'rgba(0, 0, 0, 0.65)',
      backdropFilter: 'blur(5px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      animation: 'fadeIn 0.2s ease-out'
    }}>
      <div style={{
        backgroundColor: 'var(--bg-surface)',
        borderRadius: 'var(--radius-xl)',
        maxWidth: '560px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: 'var(--shadow-xl)',
        border: '1px solid var(--border-color)',
        position: 'relative'
      }}>
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="btn-icon"
          style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', zIndex: 10 }}
          aria-label="Close checkout modal"
        >
          <X size={20} />
        </button>

        {step === 'form' ? (
          <div style={{ padding: '2rem 1.75rem' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary)', fontWeight: '700', fontSize: '0.8125rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <ShieldCheck size={16} />
                <span>100% Secure Checkout</span>
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-primary)', marginTop: '0.25rem' }}>
                Complete Your Order
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                Total Payable: <strong style={{ color: 'var(--primary)', fontSize: '1.125rem' }}>₹{finalTotal.toLocaleString('en-IN')}</strong> ({cart.length} unique items)
              </p>
            </div>

            <form onSubmit={handlePlaceOrder} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Rahul Sharma"
                  className="form-input"
                />
                {errors.fullName && <span style={{ color: 'var(--danger)', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.fullName}</span>}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10-digit Mobile"
                    className="form-input"
                  />
                  {errors.phone && <span style={{ color: 'var(--danger)', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.phone}</span>}
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@domain.com"
                    className="form-input"
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                  Delivery Address *
                </label>
                <textarea
                  name="address"
                  rows={2}
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Flat / House No., Street, Landmark"
                  className="form-input"
                  style={{ resize: 'none' }}
                />
                {errors.address && <span style={{ color: 'var(--danger)', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.address}</span>}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g. Mumbai"
                    className="form-input"
                  />
                  {errors.city && <span style={{ color: 'var(--danger)', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.city}</span>}
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                    Pincode *
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="e.g. 400001"
                    maxLength={6}
                    className="form-input"
                  />
                  {errors.pincode && <span style={{ color: 'var(--danger)', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.pincode}</span>}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '0.6rem' }}>
                  Payment Method
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
                  {[
                    { id: 'upi', label: 'UPI / QR', icon: Smartphone },
                    { id: 'card', label: 'Cards / Net', icon: CreditCard },
                    { id: 'cod', label: 'Pay on Delivery', icon: Banknote }
                  ].map(method => {
                    const MethodIcon = method.icon;
                    const isSelected = formData.paymentMethod === method.id;
                    return (
                      <label
                        key={method.id}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.35rem',
                          padding: '0.75rem 0.5rem',
                          border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                          background: isSelected ? 'var(--primary-light)' : 'var(--bg-secondary)',
                          color: isSelected ? 'var(--primary)' : 'var(--text-primary)',
                          borderRadius: 'var(--radius-md)',
                          cursor: 'pointer',
                          textAlign: 'center',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.id}
                          checked={isSelected}
                          onChange={handleChange}
                          style={{ display: 'none' }}
                        />
                        <MethodIcon size={20} />
                        <span style={{ fontSize: '0.75rem', fontWeight: '700' }}>{method.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div style={{ marginTop: '0.75rem' }}>
                {paymentError && (
                  <p role="alert" style={{ color: 'var(--danger)', fontSize: '0.8125rem', marginBottom: '0.75rem' }}>
                    {paymentError}
                  </p>
                )}
                <button type="submit" className="btn btn-primary btn-block btn-lg" id="confirm-order-btn" disabled={isPaymentLoading}>
                  <span>{isPaymentLoading ? 'Opening secure payment...' : formData.paymentMethod === 'cod' ? `Place Order (₹${finalTotal.toLocaleString('en-IN')})` : `Pay securely (₹${finalTotal.toLocaleString('en-IN')})`}</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div style={{ padding: '3.5rem 2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'var(--success-light)',
              color: 'var(--success)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.25rem'
            }}>
              <CheckCircle2 size={48} />
            </div>

            <span className="badge badge-success" style={{ marginBottom: '0.5rem' }}>Order Confirmed</span>
            <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Thank you for shopping!
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', maxWidth: '380px', marginBottom: '1.5rem' }}>
              Your order <strong style={{ color: 'var(--primary)' }}>#{orderId}</strong> has been received and is being prepared for dispatch.
            </p>

            <div style={{
              width: '100%',
              background: 'var(--bg-secondary)',
              padding: '1.25rem',
              borderRadius: 'var(--radius-md)',
              textAlign: 'left',
              marginBottom: '2rem',
              fontSize: '0.875rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                <Truck size={18} color="var(--primary)" />
                <span>Estimated Delivery: 2-4 Business Days</span>
              </div>
              <p style={{ color: 'var(--text-secondary)' }}>
                Deliver to: <strong>{formData.fullName}</strong>, {formData.address}, {formData.city} - {formData.pincode}
              </p>
            </div>

            <button onClick={handleClose} className="btn btn-primary btn-block btn-lg">
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
