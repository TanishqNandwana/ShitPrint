import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import AnnouncementBar from './components/AnnouncementBar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import Toast from './components/Toast';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Product from './pages/Product';
import { useCart } from './context/CartContext';

// Helper to scroll to top on route change
function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    // Only scroll to top if not just changing query params on shop
    if (!search || !pathname.includes('/shop')) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}

export default function App() {
  const { isCheckoutOpen, closeCheckout } = useCart();

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-editorial selection:bg-neon selection:text-editorial">
      <ScrollToTop />
      
      {/* Announcement Bar */}
      <AnnouncementBar />

      {/* Sticky Navbar */}
      <Navbar />

      {/* Main Pages Content */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="*" element={<Shop />} />
        </Routes>
      </main>

      {/* Slide-in Cart Drawer */}
      <CartDrawer />

      {/* Simulated Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={closeCheckout}
      />

      {/* Floating Animated Toast */}
      <Toast />

      {/* Streetwear Editorial Footer */}
      <Footer />
    </div>
  );
}
