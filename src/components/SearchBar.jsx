import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowUpRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';

export default function SearchBar({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const filteredProducts = query.trim() === ''
    ? []
    : PRODUCTS.filter((item) => {
        const q = query.toLowerCase();
        return (
          item.name.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.subtitle.toLowerCase().includes(q) ||
          item.tags.some(t => t.toLowerCase().includes(q))
        );
      });

  const handleSelectProduct = (id) => {
    onClose();
    navigate(`/product/${id}`);
  };

  const handleViewAllShop = () => {
    onClose();
    navigate(`/shop?search=${encodeURIComponent(query)}`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[90] flex flex-col">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-editorial/80 backdrop-blur-sm"
          />

          {/* Search Panel */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="relative z-10 w-full bg-canvas border-b-2 border-editorial shadow-2xl pt-6 pb-8 px-4 sm:px-8 max-h-[85vh] flex flex-col"
          >
            <div className="max-w-4xl mx-auto w-full">
              {/* Top Row with Close */}
              <div className="flex items-center justify-between pb-4 border-b border-line">
                <span className="font-mono text-xs uppercase tracking-widest text-muted">
                  SEARCH THE CATALOGUE [ESC TO CLOSE]
                </span>
                <button
                  onClick={onClose}
                  className="p-1 hover:bg-editorial hover:text-canvas transition-colors"
                  aria-label="Close search"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Input Form */}
              <div className="relative mt-6 flex items-center">
                <Search className="w-7 h-7 text-editorial mr-3 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && query.trim()) {
                      handleViewAllShop();
                    }
                  }}
                  placeholder="TYPE TO SEARCH T-SHIRTS, PARODIES, STYLES..."
                  className="w-full bg-transparent text-xl sm:text-2xl md:text-3xl font-bold font-sans uppercase tracking-tight placeholder:text-muted/40 focus:outline-none"
                />
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    className="text-xs font-mono uppercase bg-editorial/10 hover:bg-editorial hover:text-canvas px-2 py-1 transition-colors ml-2"
                  >
                    CLEAR
                  </button>
                )}
              </div>

              {/* Quick Tags Suggestions */}
              {query.trim() === '' && (
                <div className="mt-8 pt-6 border-t border-line/60">
                  <p className="text-xs font-mono uppercase text-muted tracking-wider mb-3">
                    POPULAR SEARCHES:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["OVERSIZED", "GRAPHIC", "BESTSELLERS", "TIRED", "TAX ME", "FEDUP", "GAYS"].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setQuery(tag)}
                        className="text-xs font-mono uppercase px-3 py-1.5 border border-line bg-surface hover:border-editorial hover:bg-editorial hover:text-canvas transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Results Container */}
              {query.trim() !== '' && (
                <div className="mt-6 overflow-y-auto max-h-[50vh] pr-2">
                  <div className="flex items-center justify-between pb-3 text-xs font-mono text-muted uppercase">
                    <span>{filteredProducts.length} PRODUCTS FOUND</span>
                    {filteredProducts.length > 0 && (
                      <button
                        onClick={handleViewAllShop}
                        className="text-editorial font-bold hover:underline flex items-center gap-1"
                      >
                        <span>VIEW ALL IN SHOP</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {filteredProducts.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-lg font-bold font-sans">NO DROPS FOUND MATCHING "{query.toUpperCase()}"</p>
                      <p className="text-xs font-mono text-muted mt-2">
                        Try searching for 'oversized', 'graphic', 'nirmala', 'crocodile', or check our Shop page.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {filteredProducts.map((product) => (
                        <div
                          key={product.id}
                          onClick={() => handleSelectProduct(product.id)}
                          className="flex items-center gap-4 p-3 border border-line bg-surface hover:border-editorial cursor-pointer group transition-all"
                        >
                          <div className="w-16 h-18 bg-canvas border border-line/60 shrink-0 overflow-hidden flex items-center justify-center p-1">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-[10px] font-mono uppercase tracking-widest text-muted">
                              {product.category}
                            </span>
                            <h4 className="text-sm font-bold truncate group-hover:text-neon group-hover:bg-editorial px-1 -mx-1 inline-block transition-colors">
                              {product.name}
                            </h4>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="font-mono text-xs font-bold">₹{product.price}</span>
                              <span className="font-mono text-[10px] text-muted line-through">₹{product.originalPrice}</span>
                            </div>
                          </div>
                          <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
