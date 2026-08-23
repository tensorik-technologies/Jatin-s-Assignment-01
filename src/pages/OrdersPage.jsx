import React from 'react';
import { Link } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';
import { useCart } from '../context/CartContext';
import { Package, Truck, CheckCircle2, Clock, XCircle, ArrowRight, ShoppingBag, ChevronRight } from 'lucide-react';
import EmptyState from '../components/common/EmptyState';

export default function OrdersPage() {
  const { orders } = useOrders();
  const { addToCart } = useCart();

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return {
          color: '#10b981',
          bg: '#ecfdf5',
          icon: CheckCircle2,
          text: 'Delivered'
        };
      case 'shipped':
        return {
          color: '#4f46e5',
          bg: '#eef2ff',
          icon: Truck,
          text: 'Shipped & In Transit'
        };
      case 'cancelled':
        return {
          color: '#ef4444',
          bg: '#fef2f2',
          icon: XCircle,
          text: 'Cancelled'
        };
      default:
        return {
          color: '#f59e0b',
          bg: '#fffbeb',
          icon: Clock,
          text: 'Processing Order'
        };
    }
  };

  if (orders.length === 0) {
    return (
      <div className="container animate-fade-in" style={{ padding: '4rem 1.25rem 6rem' }}>
        <EmptyState
          icon={Package}
          title="No orders found"
          description="You haven't placed any orders yet. Explore our top-rated collections and find items you love!"
          actionText="Start Shopping"
          actionLink="/products"
        />
      </div>
    );
  }

  return (
    <div className="orders-page animate-fade-in" style={{ padding: '2.5rem 0 5rem' }}>
      <div className="container">
        
        {/* Header */}
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
              My Orders & History
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', marginTop: '0.25rem' }}>
              Track shipments, review past orders, and download receipts.
            </p>
          </div>

          <Link to="/products" className="btn btn-secondary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span>Explore More Deals</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* Orders List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {orders.map(order => {
            const badge = getStatusBadge(order.status);
            const BadgeIcon = badge.icon;
            const formattedDate = new Date(order.date).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            });

            return (
              <div
                key={order.id}
                className="card"
                style={{
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem',
                  background: 'var(--bg-surface)'
                }}
              >
                {/* Order Top Bar */}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  paddingBottom: '1rem',
                  borderBottom: '1px solid var(--border-color)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>
                        Order ID
                      </div>
                      <div style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                        #{order.id}
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>
                        Date Placed
                      </div>
                      <div style={{ fontSize: '0.9375rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
                        {formattedDate}
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>
                        Total Amount
                      </div>
                      <div style={{ fontSize: '1rem', fontWeight: '900', color: 'var(--primary)' }}>
                        ₹{order.total?.toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>

                  {/* Status Pill */}
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.4rem 0.85rem',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: badge.bg,
                    color: badge.color,
                    fontSize: '0.8125rem',
                    fontWeight: '700'
                  }}>
                    <BadgeIcon size={16} />
                    <span>{badge.text}</span>
                  </div>
                </div>

                {/* Items List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {order.items?.map(item => (
                    <div
                      key={item.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '1rem',
                        flexWrap: 'wrap'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{
                            width: '64px',
                            height: '64px',
                            borderRadius: 'var(--radius-md)',
                            objectFit: 'cover',
                            backgroundColor: 'var(--bg-secondary)'
                          }}
                        />
                        <div>
                          <Link to={`/products/${item.id}`} style={{ textDecoration: 'none' }}>
                            <h4 style={{ fontSize: '0.9375rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                              {item.name}
                            </h4>
                          </Link>
                          <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                            Qty: <strong>{item.quantity}</strong> × ₹{item.price?.toLocaleString('en-IN')}
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                        <button
                          onClick={() => addToCart(item, 1)}
                          className="btn btn-secondary btn-sm"
                          title="Buy this item again"
                        >
                          <ShoppingBag size={14} />
                          <span>Buy Again</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Shipping & Payment summary */}
                <div style={{
                  paddingTop: '1rem',
                  borderTop: '1px solid var(--border-color)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.8125rem',
                  color: 'var(--text-muted)',
                  flexWrap: 'wrap',
                  gap: '0.5rem'
                }}>
                  <div>
                    Deliver to: <strong>{order.customer?.fullName}</strong>, {order.customer?.city} ({order.customer?.pincode})
                  </div>
                  <div>
                    Payment: <strong style={{ color: 'var(--text-primary)' }}>{order.paymentMethod}</strong>
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
