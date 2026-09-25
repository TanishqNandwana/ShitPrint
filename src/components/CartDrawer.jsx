import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Button from './Button';

export default function CartDrawer() {
  const {
    cartItems,
    cartCount,
    cartSubtotal,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    remainingForFreeShipping,
    isFreeShipping,
    shippingProgress,
    openCheckout,
  } = useCart();

  const navigate = useNavigate();

  const handleEmptyCartCta = () => {
    closeCart();
    navigate('/shop');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-[95] flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-editorial/80 backdrop-blur-sm"
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="relative z-10 w-full max-w-md bg-canvas border-l-2 border-editorial h-full flex flex-col shadow-2xl"
          >
            {/* Drawer Header */}
            <div className="p-5 border-b border-line flex items-center justify-between bg-editorial text-canvas">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-neon" />
                <h3 className="font-sans font-bold text-base uppercase tracking-wider">
                  SHOPPING BAG ({cartCount})
                </h3>
              </div>
              <button
                onClick={closeCart}
                className="p-1 hover:text-neon transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Indicator */}
            <div className="bg-editorial/5 border-b border-line p-4">
              <div className="flex items-center justify-between text-xs font-mono uppercase mb-2">
                <div className="flex items-center gap-1.5 font-bold">
                  <Truck className="w-4 h-4 text-editorial" />
                  {isFreeShipping ? (
                    <span className="text-emerald-700">YOU UNLOCKED FREE SHIPPING!</span>
                  ) : (
                    <span>₹{remainingForFreeShipping} MORE FOR FREE SHIPPING</span>
                  )}
                </div>
                <span className="text-muted">{shippingProgress}%</span>
              </div>
              <div className="w-full h-1.5 bg-line overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${shippingProgress}%` }}
                  transition={{ duration: 0.5 }}
                  className={`h-full ${isFreeShipping ? 'bg-emerald-500' : 'bg-editorial'}`}
                />
              </div>
            </div>

            {/* Cart Items List */}
            {cartItems.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 border-2 border-dashed border-line flex items-center justify-center mb-4 text-muted">
                  <ShoppingBag className="w-8 h-8 opacity-40" />
                </div>
                <h4 className="font-sans font-bold text-lg uppercase tracking-tight text-editorial">
                  YOUR CART IS EMPTY.
                </h4>
                <p className="font-mono text-xs text-muted max-w-xs mt-2 mb-6">
                  FIND SOMETHING YOU'LL REGRET BUYING.
                </p>
                <Button
                  onClick={handleEmptyCartCta}
                  variant="primary"
                  size="md"
                  icon={ArrowRight}
                >
                  EXPLORE DROP
                </Button>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 divide-y divide-line/60">
                {cartItems.map((item) => (
                  <div
                    key={item.itemKey}
                    className="pt-4 first:pt-0 flex gap-4 group"
                  >
                    {/* Thumbnail */}
                    <div
                      onClick={() => {
                        closeCart();
                        navigate(`/product/${item.product.id}`);
                      }}
                      className="w-20 h-24 bg-surface border border-line shrink-0 cursor-pointer overflow-hidden p-1 flex items-center justify-center hover:border-editorial transition-colors"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-1">
                          <h4
                            onClick={() => {
                              closeCart();
                              navigate(`/product/${item.product.id}`);
                            }}
                            className="font-bold text-sm leading-snug truncate cursor-pointer hover:underline"
                          >
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.itemKey)}
                            className="text-muted hover:text-red-500 p-1 transition-colors"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center gap-2 mt-1">
                          <span className="font-mono text-xs bg-line/60 px-1.5 py-0.5 font-bold uppercase">
                            SIZE: {item.size}
                          </span>
                          <span className="font-mono text-xs text-muted">
                            {item.product.category}
                          </span>
                        </div>
                      </div>

                      {/* Quantity & Price */}
                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-line/40">
                        {/* Qty Controls */}
                        <div className="flex items-center border border-editorial bg-surface font-mono text-xs">
                          <button
                            onClick={() => updateQuantity(item.itemKey, -1)}
                            className="p-1.5 hover:bg-line/40 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 font-bold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.itemKey, 1)}
                            className="p-1.5 hover:bg-line/40 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <div className="font-mono text-sm font-bold">
                            ₹{item.product.price * item.quantity}
                          </div>
                          {item.quantity > 1 && (
                            <div className="font-mono text-[10px] text-muted">
                              ₹{item.product.price} each
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Drawer Footer with Subtotal and Checkout CTA */}
            {cartItems.length > 0 && (
              <div className="p-4 sm:p-5 border-t border-editorial bg-canvas font-mono space-y-3">
                <div className="flex justify-between items-center text-xs text-muted uppercase">
                  <span>TAXES &amp; DUTIES</span>
                  <span>CALCULATED AT STEP</span>
                </div>

                <div className="flex justify-between items-baseline border-b border-line pb-3">
                  <span className="text-xs uppercase font-bold">BAG SUBTOTAL</span>
                  <span className="font-sans text-xl font-extrabold text-editorial">
                    ₹{cartSubtotal}
                  </span>
                </div>

                <Button
                  onClick={openCheckout}
                  variant="primary"
                  size="lg"
                  fullWidth
                  icon={ArrowRight}
                >
                  PROCEED TO CHECKOUT
                </Button>

                <p className="text-[10px] text-center text-muted uppercase tracking-wider">
                  SHITPRINT GUARANTEE • 7-DAY EASY EXCHANGES
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
