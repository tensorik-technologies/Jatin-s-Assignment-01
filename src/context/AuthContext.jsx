import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useToast } from './ToastContext';

const AuthContext = createContext();

const INITIAL_ADDRESSES = [
  {
    id: 'addr-1',
    name: 'Rahul Sharma',
    phone: '9876543210',
    type: 'Home',
    addressLine: '402 Palm Heights, Linking Road, Bandra West',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400050',
    isDefault: true
  },
  {
    id: 'addr-2',
    name: 'Rahul Sharma (Office)',
    phone: '9876543210',
    type: 'Work',
    addressLine: 'Tech Park Tower B, 5th Floor, BKC',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400051',
    isDefault: false
  }
];

const DEMO_USERS = [
  {
    email: 'customer@basketboost.com',
    password: 'password123',
    name: 'Rahul Sharma',
    phone: '+91 98765 43210',
    role: 'customer',
    memberSince: 'March 2024',
    tier: 'Boost Gold Member ⭐',
    coins: 450,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80'
  },
];

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useLocalStorage('basket_boost_auth_user', DEMO_USERS[0]);
  const [addresses, setAddresses] = useLocalStorage('basket_boost_addresses', INITIAL_ADDRESSES);
  const { addToast } = useToast();

  const isAuthenticated = Boolean(currentUser);
  // Update user profile info
  const updateProfile = (updatedFields) => {
    setCurrentUser(prev => {
      const updated = { ...prev, ...updatedFields };
      return updated;
    });
    addToast('Profile details updated successfully!', 'success');
  };

  // Address operations
  const addAddress = (addressData) => {
    const newAddress = {
      id: 'addr-' + Date.now(),
      isDefault: addresses.length === 0,
      ...addressData
    };
    setAddresses(prev => [newAddress, ...prev]);
    addToast('New delivery address saved!', 'success');
    return newAddress;
  };

  const updateAddress = (id, updatedFields) => {
    setAddresses(prev =>
      prev.map(addr => (addr.id === id ? { ...addr, ...updatedFields } : addr))
    );
    addToast('Address updated successfully!', 'success');
  };

  const deleteAddress = (id) => {
    setAddresses(prev => prev.filter(addr => addr.id !== id));
    addToast('Address removed', 'info');
  };

  const setDefaultAddress = (id) => {
    setAddresses(prev =>
      prev.map(addr => ({
        ...addr,
        isDefault: addr.id === id
      }))
    );
    addToast('Default delivery address updated', 'success');
  };

  // Login handler
  const login = (email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    
    const user = {
      email: cleanEmail,
      name: cleanEmail.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Valued Customer',
      phone: '+91 98765 43210',
      role: 'customer',
      memberSince: 'Recently Joined',
      tier: 'Boost Club Member',
      coins: 100,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80'
    };

    setCurrentUser(user);
    addToast(`Welcome back, ${user.name}!`, 'success');
    return { success: true, user };
  };

  // Register handler
  const register = ({ fullName, email, password }) => {
    const cleanEmail = email.trim().toLowerCase();
    const newUser = {
      name: fullName.trim(),
      email: cleanEmail,
      phone: '+91 98765 00000',
      role: 'customer',
      memberSince: 'Just Joined',
      tier: 'Boost Silver Member ⭐',
      coins: 100,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80'
    };

    setCurrentUser(newUser);
    addToast(`Account created! Welcome to Basket Boost, ${newUser.name}!`, 'success');
    return { success: true, user: newUser };
  };

  // Logout handler
  const logout = () => {
    setCurrentUser(null);
    addToast('You have been logged out successfully', 'info');
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      isAuthenticated,
      userProfile: currentUser || { name: 'Guest', email: '', role: 'customer', tier: 'Guest', coins: 0 },
      addresses,
      updateProfile,
      addAddress,
      updateAddress,
      deleteAddress,
      setDefaultAddress,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
