import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import RatingStars from '../components/common/RatingStars';
import {
  User,
  ShoppingBag,
  Heart,
  MapPin,
  Tag,
  Coins,
  Edit2,
  Trash2,
  Plus,
  Check,
  Copy,
  LogOut,
  Camera,
  Calendar,
  Phone,
  Mail,
  Save,
  Package,
  ArrowRight,
  Sparkles,
  X
} from 'lucide-react';

const AVATAR_PRESETS = [
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80'
];

export default function ProfilePage() {
  const {
    userProfile,
    updateProfile,
    addresses,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    logout,
    
  } = useAuth();

  const { orders } = useOrders();
  const { wishlist, removeFromWishlist } = useWishlist();
  const { totalItems, addToCart } = useCart();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState('details'); // 'details' | 'addresses' | 'orders' | 'wishlist' | 'coupons'

  // Personal Info Form State
  const [profileForm, setProfileForm] = useState({
    name: userProfile.name || '',
    email: userProfile.email || '',
    phone: userProfile.phone || '+91 98765 43210',
    birthday: '1998-05-15',
    bio: 'Tech enthusiast, music lover, and frequent online shopper.'
  });

  const [isEditingAvatar, setIsEditingAvatar] = useState(false);

  // Address Modal State
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [addressForm, setAddressForm] = useState({
    name: '',
    phone: '',
    type: 'Home',
    addressLine: '',
    city: '',
    state: 'Maharashtra',
    pincode: ''
  });

  // Handle File Upload from device
  const handleImageFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      addToast('Please select a valid image file (PNG, JPG, WEBP)', 'danger');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      addToast('Image size should be less than 5MB', 'danger');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Url = event.target.result;
      updateProfile({ avatar: base64Url });
      setIsEditingAvatar(false);
      addToast('Profile picture uploaded successfully!', 'success');
    };
    reader.readAsDataURL(file);
  };

  // Handle Profile Form Submit
  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile({
      name: profileForm.name,
      email: profileForm.email,
      phone: profileForm.phone
    });
  };

  // Open Address Modal
  const handleOpenAddAddress = () => {
    setEditingAddressId(null);
    setAddressForm({
      name: userProfile.name || '',
      phone: userProfile.phone || '',
      type: 'Home',
      addressLine: '',
      city: '',
      state: 'Maharashtra',
      pincode: ''
    });
    setIsAddressModalOpen(true);
  };

  const handleOpenEditAddress = (addr) => {
    setEditingAddressId(addr.id);
    setAddressForm({
      name: addr.name,
      phone: addr.phone,
      type: addr.type,
      addressLine: addr.addressLine,
      city: addr.city,
      state: addr.state,
      pincode: addr.pincode
    });
    setIsAddressModalOpen(true);
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    if (!addressForm.addressLine.trim() || !addressForm.city.trim() || !addressForm.pincode.trim()) {
      addToast('Please complete required address fields', 'danger');
      return;
    }

    if (editingAddressId) {
      updateAddress(editingAddressId, addressForm);
    } else {
      addAddress(addressForm);
    }
    setIsAddressModalOpen(false);
  };

  const copyCoupon = (code) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
      addToast(`Coupon "${code}" copied to clipboard!`, 'success');
    }
  };

  return (
    <div className="profile-dashboard-page animate-fade-in" style={{ padding: '2.5rem 0 6rem', backgroundColor: 'var(--bg-primary)' }}>
      <div className="container">
        
        {/* =========================================================================
            1. User Profile Header & Overview Card
            ========================================================================= */}
        <div style={{
          backgroundColor: 'var(--bg-surface)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-color)',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: 'var(--shadow-sm)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Accent Glow Background */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '6px',
            background: 'var(--primary-gradient)'
          }} />

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem'
          }}>
            
            {/* Avatar & Personal Title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ position: 'relative' }}>
                <img
                  src={userProfile.avatar}
                  alt={userProfile.name}
                  style={{
                    width: '92px',
                    height: '92px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '3px solid var(--primary)',
                    boxShadow: 'var(--shadow-md)'
                  }}
                />
                <button
                  onClick={() => setIsEditingAvatar(prev => !prev)}
                  style={{
                    position: 'absolute',
                    bottom: '0',
                    right: '0',
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--primary)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid var(--bg-surface)',
                    boxShadow: 'var(--shadow-sm)',
                    cursor: 'pointer'
                  }}
                  title="Change Avatar"
                >
                  <Camera size={14} />
                </button>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <h1 style={{ fontSize: '1.75rem', fontWeight: '900', color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
                    {userProfile.name}
                  </h1>
                  <span className="badge" style={{ background: 'var(--primary-gradient)', color: '#ffffff', fontSize: '0.75rem', fontWeight: '800' }}>
                    {userProfile.tier || 'Boost Gold Member ⭐'}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '0.35rem', flexWrap: 'wrap' }}>
                  <span>{userProfile.email}</span>
                  <span>•</span>
                  <span>{userProfile.phone}</span>
                  <span>•</span>
                  <span style={{ color: 'var(--text-muted)' }}>Member since {userProfile.memberSince || '2024'}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button onClick={logout} className="btn btn-secondary btn-sm" style={{ color: 'var(--danger)' }}>
                <LogOut size={15} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Avatar Preset & Upload Selector Tray */}
          {isEditingAvatar && (
            <div style={{
              marginTop: '1.5rem',
              padding: '1.25rem',
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              animation: 'fadeIn 0.2s ease-out'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                  Update Profile Picture
                </span>
                <button
                  onClick={() => setIsEditingAvatar(false)}
                  className="btn-icon"
                  style={{ width: '28px', height: '28px' }}
                >
                  <X size={14} />
                </button>
              </div>

              {/* Option A: Direct File Upload from Device */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <label
                  className="btn btn-primary btn-sm"
                  style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  <Camera size={15} />
                  <span>Upload Image from Device</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileUpload}
                    style={{ display: 'none' }}
                  />
                </label>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Supports PNG, JPG, GIF, WEBP up to 5MB
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '0.25rem 0' }}>
                <hr style={{ flex: 1, border: 'none', borderTop: '1px solid var(--border-color)' }} />
                <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>or choose preset</span>
                <hr style={{ flex: 1, border: 'none', borderTop: '1px solid var(--border-color)' }} />
              </div>

              {/* Option B: Choose from Presets */}
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {AVATAR_PRESETS.map((presetUrl, idx) => (
                  <img
                    key={idx}
                    src={presetUrl}
                    alt={`Preset ${idx + 1}`}
                    onClick={() => {
                      updateProfile({ avatar: presetUrl });
                      setIsEditingAvatar(false);
                    }}
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      cursor: 'pointer',
                      border: userProfile.avatar === presetUrl ? '3px solid var(--primary)' : '2px solid transparent',
                      boxShadow: 'var(--shadow-sm)',
                      transition: 'transform 0.15s ease'
                    }}
                    className="avatar-preset-img"
                    title={`Select Avatar ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* 4 Interactive Profile Stats Counters */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '1rem',
            marginTop: '2rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid var(--border-color)'
          }}>
            {/* Orders */}
            <div
              onClick={() => setActiveTab('orders')}
              style={{
                padding: '1rem',
                backgroundColor: activeTab === 'orders' ? 'var(--primary-light)' : 'var(--bg-secondary)',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', marginBottom: '0.25rem' }}>
                <ShoppingBag size={18} />
                <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase' }}>Orders</span>
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--text-primary)' }}>
                {orders.length}
              </div>
            </div>

            {/* Wishlist */}
            <div
              onClick={() => setActiveTab('wishlist')}
              style={{
                padding: '1rem',
                backgroundColor: activeTab === 'wishlist' ? 'var(--primary-light)' : 'var(--bg-secondary)',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ef4444', marginBottom: '0.25rem' }}>
                <Heart size={18} />
                <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase' }}>Wishlist</span>
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--text-primary)' }}>
                {wishlist.length}
              </div>
            </div>

            {/* Cart Items */}
            <Link
              to="/cart"
              style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-md)',
                textDecoration: 'none'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', marginBottom: '0.25rem' }}>
                <Package size={18} />
                <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase' }}>Cart Items</span>
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--text-primary)' }}>
                {totalItems}
              </div>
            </Link>

            {/* Coins Balance */}
            <div
              onClick={() => setActiveTab('coupons')}
              style={{
                padding: '1rem',
                backgroundColor: activeTab === 'coupons' ? '#fffbeb' : 'var(--bg-secondary)',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#d97706', marginBottom: '0.25rem' }}>
                <Coins size={18} />
                <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase' }}>Boost Coins</span>
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--text-primary)' }}>
                {userProfile.coins || 450} <span style={{ fontSize: '0.8125rem', fontWeight: '600', color: 'var(--text-muted)' }}>(= ₹{userProfile.coins || 450})</span>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            2. Interactive Tabs Layout
            ========================================================================= */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '2rem'
        }} className="profile-layout-grid">
          
          {/* Left: Tab Sidebar Navigation */}
          <div style={{
            backgroundColor: 'var(--bg-surface)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border-color)',
            padding: '1rem',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.35rem'
          }}>
            {[
              { id: 'details', label: 'Personal Information', icon: User },
              { id: 'addresses', label: 'Saved Delivery Addresses', icon: MapPin },
              { id: 'orders', label: 'My Orders & Tracking', icon: ShoppingBag, count: orders.length },
              { id: 'wishlist', label: 'Saved Wishlist', icon: Heart, count: wishlist.length },
              { id: 'coupons', label: 'Vouchers & Reward Coins', icon: Tag }
            ].map(tab => {
              const TabIcon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.85rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    fontWeight: isSelected ? '800' : '600',
                    fontSize: '0.875rem',
                    backgroundColor: isSelected ? 'var(--primary-light)' : 'transparent',
                    color: isSelected ? 'var(--primary)' : 'var(--text-primary)',
                    textAlign: 'left',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <TabIcon size={18} color={isSelected ? 'var(--primary)' : 'var(--text-muted)'} />
                    <span>{tab.label}</span>
                  </div>
                  {tab.count !== undefined && (
                    <span className="badge" style={{ backgroundColor: isSelected ? 'var(--primary)' : 'var(--bg-secondary)', color: isSelected ? '#ffffff' : 'var(--text-secondary)' }}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right: Tab Content Panes */}
          <div style={{
            backgroundColor: 'var(--bg-surface)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border-color)',
            padding: '2rem',
            boxShadow: 'var(--shadow-sm)'
          }}>
            
            {/* TAB 1: PERSONAL INFORMATION */}
            {activeTab === 'details' && (
              <div className="animate-fade-in">
                <div style={{ marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                    Personal Information & Settings
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                    Manage your account details and contact preferences.
                  </p>
                </div>

                <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={profileForm.name}
                        onChange={(e) => setProfileForm(f => ({ ...f, name: e.target.value }))}
                        className="form-input"
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={profileForm.email}
                        onChange={(e) => setProfileForm(f => ({ ...f, email: e.target.value }))}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm(f => ({ ...f, phone: e.target.value }))}
                        className="form-input"
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        value={profileForm.birthday}
                        onChange={(e) => setProfileForm(f => ({ ...f, birthday: e.target.value }))}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                      Profile Bio
                    </label>
                    <textarea
                      rows={2}
                      value={profileForm.bio}
                      onChange={(e) => setProfileForm(f => ({ ...f, bio: e.target.value }))}
                      className="form-input"
                      style={{ resize: 'none' }}
                    />
                  </div>

                  <div>
                    <button type="submit" className="btn btn-primary" style={{ display: 'inline-flex', gap: '0.4rem' }}>
                      <Save size={16} />
                      <span>Save Profile Changes</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB 2: SAVED DELIVERY ADDRESSES */}
            {activeTab === 'addresses' && (
              <div className="animate-fade-in">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                      Saved Delivery Addresses
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                      Manage delivery destinations for fast, one-click checkout.
                    </p>
                  </div>
                  <button onClick={handleOpenAddAddress} className="btn btn-primary btn-sm">
                    <Plus size={16} />
                    <span>Add New Address</span>
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                  {addresses.map(addr => (
                    <div
                      key={addr.id}
                      style={{
                        padding: '1.25rem',
                        backgroundColor: 'var(--bg-secondary)',
                        borderRadius: 'var(--radius-lg)',
                        border: addr.isDefault ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                        position: 'relative'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span className="badge badge-new" style={{ textTransform: 'uppercase' }}>
                            {addr.type}
                          </span>
                          <strong style={{ fontSize: '0.9375rem', color: 'var(--text-primary)' }}>{addr.name}</strong>
                          {addr.isDefault && (
                            <span className="badge badge-success">✓ Default</span>
                          )}
                        </div>

                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button
                            onClick={() => handleOpenEditAddress(addr)}
                            className="btn-icon"
                            style={{ width: '30px', height: '30px' }}
                            title="Edit Address"
                          >
                            <Edit2 size={13} />
                          </button>
                          <button
                            onClick={() => deleteAddress(addr.id)}
                            className="btn-icon"
                            style={{ width: '30px', height: '30px', color: 'var(--danger)' }}
                            title="Delete Address"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>

                      <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                        {addr.addressLine}, {addr.city}, {addr.state} - <strong>{addr.pincode}</strong>
                      </p>
                      <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                        Contact: {addr.phone}
                      </div>

                      {!addr.isDefault && (
                        <button
                          onClick={() => setDefaultAddress(addr.id)}
                          style={{
                            fontSize: '0.75rem',
                            fontWeight: '700',
                            color: 'var(--primary)',
                            marginTop: '0.75rem',
                            display: 'inline-block'
                          }}
                        >
                          Make this default address
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: MY ORDERS */}
            {activeTab === 'orders' && (
              <div className="animate-fade-in">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                      Order History & Shipment Tracking
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                      Real-time shipment milestones and order receipts.
                    </p>
                  </div>
                  <Link to="/orders" className="btn btn-secondary btn-sm">
                    <span>Full Orders View</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>

                {orders.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                    No orders placed yet.
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {orders.map(order => (
                      <div
                        key={order.id}
                        style={{
                          padding: '1.25rem',
                          backgroundColor: 'var(--bg-secondary)',
                          borderRadius: 'var(--radius-lg)',
                          border: '1px solid var(--border-color)'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                          <div>
                            <strong style={{ fontSize: '0.9375rem', color: 'var(--text-primary)' }}>Order #{order.id}</strong>
                            <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginLeft: '0.5rem' }}>
                              • {new Date(order.date).toLocaleDateString()}
                            </span>
                          </div>
                          <span className="badge badge-success" style={{ textTransform: 'capitalize' }}>
                            {order.status}
                          </span>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.75rem' }}>
                          {order.items?.map(item => (
                            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                              <span style={{ color: 'var(--text-secondary)' }}>{item.quantity}x {item.name}</span>
                              <strong style={{ color: 'var(--text-primary)' }}>₹{(item.price * item.quantity).toLocaleString('en-IN')}</strong>
                            </div>
                          ))}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
                          <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Total: <strong style={{ color: 'var(--primary)', fontSize: '1rem' }}>₹{order.total?.toLocaleString('en-IN')}</strong></span>
                          <button
                            onClick={() => {
                              order.items?.forEach(it => addToCart(it, 1));
                            }}
                            className="btn btn-secondary btn-sm"
                          >
                            <span>Buy Items Again</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: SAVED WISHLIST */}
            {activeTab === 'wishlist' && (
              <div className="animate-fade-in">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                      Saved Wishlist Items ({wishlist.length})
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                      Products you love saved for future checkout.
                    </p>
                  </div>
                  <Link to="/wishlist" className="btn btn-secondary btn-sm">
                    View Wishlist Page
                  </Link>
                </div>

                {wishlist.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                    Your wishlist is empty. Tap the heart icon on any product to save it here!
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                    {wishlist.map(p => (
                      <div key={p.id} className="card" style={{ padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <img src={p.image} alt={p.name} style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />
                        <h4 style={{ fontSize: '0.875rem', fontWeight: '700', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {p.name}
                        </h4>
                        <div style={{ fontSize: '0.9375rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                          ₹{p.price.toLocaleString('en-IN')}
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '0.35rem', marginTop: 'auto' }}>
                          <button onClick={() => addToCart(p, 1)} className="btn btn-primary btn-sm" style={{ padding: '0.4rem', fontSize: '0.75rem' }}>
                            Add to Cart
                          </button>
                          <button onClick={() => removeFromWishlist(p.id)} className="btn-icon" style={{ width: '28px', height: '28px', color: 'var(--danger)' }}>
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 5: VOUCHERS & REWARD COINS */}
            {activeTab === 'coupons' && (
              <div className="animate-fade-in">
                <div style={{ marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                    Active Vouchers & Loyalty Rewards
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                    Redeem exclusive discount coupons and Boost Club reward points.
                  </p>
                </div>

                {/* Coin balance highlight */}
                <div style={{
                  padding: '1.5rem',
                  background: 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)',
                  borderRadius: 'var(--radius-lg)',
                  color: '#ffffff',
                  marginBottom: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}>
                  <div>
                    <div style={{ fontSize: '0.8125rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Loyalty Points Balance
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: '900', lineHeight: 1.1 }}>
                      {userProfile.coins || 450} Boost Coins
                    </div>
                    <div style={{ fontSize: '0.8125rem', opacity: 0.9 }}>
                      Earn 1 Boost Coin for every ₹10 spent on the store.
                    </div>
                  </div>
                  <span className="badge" style={{ backgroundColor: '#ffffff', color: '#d97706', fontSize: '0.875rem', fontWeight: '800' }}>
                    Worth ₹{userProfile.coins || 450} OFF
                  </span>
                </div>

                {/* Coupons List */}
                <h4 style={{ fontSize: '1rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                  Available Promo Codes
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                  {[
                    { code: 'BOOST10', discount: '10% OFF', desc: 'Valid on all catalog items with no minimum purchase required.' },
                    { code: 'BOOST20', discount: '20% OFF', desc: 'Special super saver discount on orders over ₹2,000.' },
                    { code: 'FREESHIP', discount: 'Free Delivery', desc: 'Enjoy zero delivery fees on any order size.' }
                  ].map(coupon => (
                    <div
                      key={coupon.code}
                      style={{
                        padding: '1.25rem',
                        backgroundColor: 'var(--bg-secondary)',
                        borderRadius: 'var(--radius-lg)',
                        border: '1.5px dashed var(--primary)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        gap: '0.75rem'
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '1.1rem', fontWeight: '900', color: 'var(--primary)' }}>
                            {coupon.code}
                          </span>
                          <span className="badge badge-discount">{coupon.discount}</span>
                        </div>
                        <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '0.5rem', lineHeight: 1.4 }}>
                          {coupon.desc}
                        </p>
                      </div>

                      <button
                        onClick={() => copyCoupon(coupon.code)}
                        className="btn btn-secondary btn-sm"
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}
                      >
                        <Copy size={13} />
                        <span>Copy Code</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Address Add/Edit Modal */}
      {isAddressModalOpen && (
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
            maxWidth: '520px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: 'var(--shadow-xl)',
            border: '1px solid var(--border-color)',
            position: 'relative',
            padding: '2rem 1.75rem'
          }}>
            <button
              onClick={() => setIsAddressModalOpen(false)}
              className="btn-icon"
              style={{ position: 'absolute', top: '1.25rem', right: '1.25rem' }}
            >
              <X size={18} />
            </button>

            <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
              {editingAddressId ? 'Edit Delivery Address' : 'Add New Delivery Address'}
            </h2>

            <form onSubmit={handleAddressSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                    Recipient Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={addressForm.name}
                    onChange={(e) => setAddressForm(f => ({ ...f, name: e.target.value }))}
                    className="form-input"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                    Contact Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={addressForm.phone}
                    onChange={(e) => setAddressForm(f => ({ ...f, phone: e.target.value }))}
                    className="form-input"
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                  Address Type
                </label>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  {['Home', 'Work', 'Other'].map(type => (
                    <label key={type} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer', fontSize: '0.875rem' }}>
                      <input
                        type="radio"
                        name="addrType"
                        checked={addressForm.type === type}
                        onChange={() => setAddressForm(f => ({ ...f, type }))}
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                  Street / Flat / Landmark *
                </label>
                <textarea
                  rows={2}
                  required
                  value={addressForm.addressLine}
                  onChange={(e) => setAddressForm(f => ({ ...f, addressLine: e.target.value }))}
                  className="form-input"
                  style={{ resize: 'none' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={addressForm.city}
                    onChange={(e) => setAddressForm(f => ({ ...f, city: e.target.value }))}
                    className="form-input"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                    Pincode *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={addressForm.pincode}
                    onChange={(e) => setAddressForm(f => ({ ...f, pincode: e.target.value }))}
                    className="form-input"
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setIsAddressModalOpen(false)} className="btn btn-secondary btn-block">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-block">
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 860px) {
          .profile-layout-grid {
            grid-template-columns: 280px 1fr !important;
          }
        }
        .avatar-preset-img:hover {
          transform: scale(1.15);
        }
      `}</style>
    </div>
  );
}
