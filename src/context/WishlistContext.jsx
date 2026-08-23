import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useToast } from './ToastContext';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useLocalStorage('basket_boost_wishlist', []);
  const { addToast } = useToast();

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      setWishlist(prev => prev.filter(item => item.id !== product.id));
      addToast(`Removed "${product.name.slice(0, 22)}..." from Wishlist`, 'info');
    } else {
      setWishlist(prev => [...prev, product]);
      addToast(`Added "${product.name.slice(0, 22)}..." to Wishlist`, 'success');
    }
  };

  const removeFromWishlist = (productId) => {
    const item = wishlist.find(p => p.id === productId);
    setWishlist(prev => prev.filter(p => p.id !== productId));
    if (item) {
      addToast(`Removed "${item.name.slice(0, 22)}..." from Wishlist`, 'info');
    }
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <WishlistContext.Provider value={{
      wishlist,
      wishlistCount: wishlist.length,
      isInWishlist,
      toggleWishlist,
      removeFromWishlist,
      clearWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
