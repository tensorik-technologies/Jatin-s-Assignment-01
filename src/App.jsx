import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { OrderProvider } from './context/OrderContext';
import { WishlistProvider } from './context/WishlistContext';
import { CartProvider } from './context/CartContext';
import ScrollToTop from './components/common/ScrollToTop';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Customer Pages
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import OrdersPage from './pages/OrdersPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <ProductProvider>
            <OrderProvider>
              <WishlistProvider>
                <CartProvider>
                  <Router>
                    <ScrollToTop />
                    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                      <Navbar />
                      <main style={{ flex: 1 }}>
                        <Routes>
                          {/* Customer Storefront Routes */}
                          <Route path="/" element={<HomePage />} />
                          <Route path="/products" element={<ProductsPage />} />
                          <Route path="/products/:id" element={<ProductDetailPage />} />
                          <Route path="/cart" element={<CartPage />} />
                          <Route path="/wishlist" element={<WishlistPage />} />
                          <Route path="/orders" element={<OrdersPage />} />

                          {/* Fallback 404 Route */}
                          <Route path="*" element={<NotFoundPage />} />
                        </Routes>
                      </main>
                      <Footer />
                    </div>
                  </Router>
                </CartProvider>
              </WishlistProvider>
            </OrderProvider>
          </ProductProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
