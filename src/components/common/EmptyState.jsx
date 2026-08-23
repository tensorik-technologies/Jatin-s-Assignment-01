import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export default function EmptyState({
  icon: Icon = ShoppingBag,
  title = "No items found",
  description = "We couldn't find what you were looking for.",
  actionText = "Continue Shopping",
  actionLink = "/products",
  onActionClick
}) {
  return (
    <div style={{
      textAlign: 'center',
      padding: '4rem 1.5rem',
      maxWidth: '480px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      animation: 'fadeIn 0.4s ease-out'
    }}>
      <div style={{
        width: '84px',
        height: '84px',
        borderRadius: '50%',
        background: 'var(--primary-light)',
        color: 'var(--primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1.5rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <Icon size={40} strokeWidth={1.75} />
      </div>

      <h3 style={{
        fontSize: '1.5rem',
        fontWeight: '800',
        color: 'var(--text-primary)',
        marginBottom: '0.6rem',
        letterSpacing: '-0.02em'
      }}>
        {title}
      </h3>

      <p style={{
        fontSize: '0.975rem',
        color: 'var(--text-secondary)',
        marginBottom: '2rem',
        lineHeight: 1.5
      }}>
        {description}
      </p>

      {onActionClick ? (
        <button onClick={onActionClick} className="btn btn-primary btn-lg">
          <span>{actionText}</span>
          <ArrowRight size={18} />
        </button>
      ) : (
        <Link to={actionLink} className="btn btn-primary btn-lg">
          <span>{actionText}</span>
          <ArrowRight size={18} />
        </Link>
      )}
    </div>
  );
}
