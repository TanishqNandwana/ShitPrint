import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Toast() {
  const { toast, dismissToast, openCart } = useCart();

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        dismissToast();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast.show, dismissToast]);

  return (
    <AnimatePresence>
      {toast.show && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="fixed bottom-6 right-6 z-[100] max-w-sm w-full mx-auto px-4 sm:px-0"
        >
          <div className="bg-editorial text-canvas border-2 border-neon p-4 shadow-2xl flex items-center gap-3">
            {toast.product && (
              <div className="w-12 h-14 bg-surface/10 border border-darkline shrink-0 overflow-hidden flex items-center justify-center">
                <img
                  src={toast.product.image}
                  alt={toast.product.name}
                  className="w-full h-full object-contain p-0.5"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 text-neon font-mono text-xs font-bold uppercase tracking-wider">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>{toast.message}</span>
              </div>
              {toast.product && (
                <p className="text-sm font-semibold truncate text-canvas mt-0.5">
                  {toast.product.name}
                  {toast.size && (
                    <span className="text-xs text-muted font-mono ml-2 border border-darkline px-1 py-0.2">
                      SIZE {toast.size}
                    </span>
                  )}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  dismissToast();
                  openCart();
                }}
                className="bg-neon text-editorial text-xs font-mono font-bold px-2.5 py-1.5 uppercase hover:bg-canvas transition-colors flex items-center gap-1"
              >
                <span>CART</span>
                <ArrowRight className="w-3 h-3" />
              </button>
              <button
                onClick={dismissToast}
                className="text-muted hover:text-canvas transition-colors p-1"
                aria-label="Close notification"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
