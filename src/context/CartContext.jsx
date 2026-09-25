import React, { createContext, useContext, useState, useEffect } from 'react';
import { BRAND_INFO } from '../data/products';

const CartContext = createContext(null);

const STORAGE_KEY = 'shitprint_cart_v1';

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to load cart from localStorage:', e);
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutOrder, setCheckoutOrder] = useState(null);
  const [toast, setToast] = useState({
    show: false,
    message: '',
    product: null,
    size: '',
  });

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage:', e);
    }
  }, [cartItems]);

  const showToast = (message, product, size) => {
    setToast({
      show: true,
      message,
      product,
      size,
    });
  };

  const dismissToast = () => {
    setToast(prev => ({ ...prev, show: false }));
  };

  const addToCart = (product, size, quantity = 1, openDrawer = false) => {
    if (!size) {
      return { success: false, error: 'Please select a size first' };
    }

    const itemKey = `${product.id}__${size}`;
    
    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => item.itemKey === itemKey);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      } else {
        return [
          ...prev,
          {
            itemKey,
            productId: product.id,
            product,
            size,
            quantity,
            addedAt: Date.now(),
          }
        ];
      }
    });

    showToast('Added to cart ✓', product, size);

    if (openDrawer) {
      setIsCartOpen(true);
    }

    return { success: true };
  };

  const updateQuantity = (itemKey, delta) => {
    setCartItems(prev => {
      return prev
        .map(item => {
          if (item.itemKey === itemKey) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const removeFromCart = (itemKey) => {
    setCartItems(prev => prev.filter(item => item.itemKey !== itemKey));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const cartSubtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const freeShippingThreshold = BRAND_INFO.freeShippingThreshold;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const isFreeShipping = cartSubtotal >= freeShippingThreshold && cartItems.length > 0;
  const shippingProgress = cartSubtotal === 0 ? 0 : Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const openCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };
  const closeCheckout = () => setIsCheckoutOpen(false);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartSubtotal,
        isCartOpen,
        setIsCartOpen,
        openCart,
        closeCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        toast,
        dismissToast,
        freeShippingThreshold,
        remainingForFreeShipping,
        isFreeShipping,
        shippingProgress,
        isCheckoutOpen,
        openCheckout,
        closeCheckout,
        checkoutOrder,
        setCheckoutOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
