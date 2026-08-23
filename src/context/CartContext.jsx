import React, { createContext, useContext, useState, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useToast } from './ToastContext';
import { useWishlist } from './WishlistContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useLocalStorage('basket_boost_cart', []);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const { addToast } = useToast();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // Add product to cart with specified quantity
  const addToCart = (product, quantity = 1) => {
    if (!product || !product.id) return;

    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(item => item.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });

    addToast(`✓ "${product.name.slice(0, 22)}..." added to cart!`, 'success');
  };

  // Update item quantity (min 1)
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove item completely from cart
  const removeFromCart = (productId) => {
    const item = cart.find(i => i.id === productId);
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
    if (item) {
      addToast(`Removed "${item.name.slice(0, 22)}..." from cart`, 'info');
    }
  };

  // Move an item from Cart to Wishlist
  const moveToWishlist = (product) => {
    removeFromCart(product.id);
    if (!isInWishlist(product.id)) {
      toggleWishlist(product);
    } else {
      addToast(`"${product.name.slice(0, 22)}..." is in your Wishlist`, 'info');
    }
  };

  // Move an item from Wishlist to Cart
  const moveToCartFromWishlist = (product) => {
    addToCart(product, 1);
  };

  // Clear cart entirely (e.g. after order checkout)
  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Apply discount coupon
  const applyCoupon = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'BOOST10') {
      setAppliedCoupon({ code: 'BOOST10', discountPercent: 10, label: '10% Launch Discount' });
      addToast('Promo code BOOST10 applied (10% OFF)!', 'success');
      return { success: true, message: '10% discount applied!' };
    } else if (cleanCode === 'BOOST20') {
      setAppliedCoupon({ code: 'BOOST20', discountPercent: 20, label: '20% Super Saver' });
      addToast('Promo code BOOST20 applied (20% OFF)!', 'success');
      return { success: true, message: '20% discount applied!' };
    } else {
      addToast('Invalid coupon code. Try BOOST10 or BOOST20', 'danger');
      return { success: false, message: 'Invalid promo code' };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addToast('Promo code removed', 'info');
  };

  // Financial calculations
  const { totalItems, subtotal, originalSubtotal, savings, deliveryFee, couponDiscount, finalTotal } = useMemo(() => {
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const originalSubtotal = cart.reduce((acc, item) => acc + ((item.originalPrice || item.price) * item.quantity), 0);
    const productSavings = Math.max(0, originalSubtotal - subtotal);

    // Free delivery above ₹999 if cart not empty
    const deliveryFee = subtotal > 0 && subtotal < 999 ? 99 : 0;

    // Coupon discount
    const couponDiscount = appliedCoupon ? Math.round((subtotal * appliedCoupon.discountPercent) / 100) : 0;
    const finalTotal = Math.max(0, subtotal - couponDiscount + deliveryFee);
    const totalSavings = productSavings + couponDiscount;

    return {
      totalItems,
      subtotal,
      originalSubtotal,
      savings: totalSavings,
      deliveryFee,
      couponDiscount,
      finalTotal
    };
  }, [cart, appliedCoupon]);

  return (
    <CartContext.Provider value={{
      cart,
      totalItems,
      subtotal,
      originalSubtotal,
      savings,
      deliveryFee,
      couponDiscount,
      finalTotal,
      appliedCoupon,
      addToCart,
      updateQuantity,
      removeFromCart,
      moveToWishlist,
      moveToCartFromWishlist,
      clearCart,
      applyCoupon,
      removeCoupon
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
