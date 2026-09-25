import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Search, Menu, X, ArrowUpRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import SearchBar from './SearchBar';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cartCount, openCart } = useCart();
  const location = useLocation();

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'SHOP ALL', path: '/shop' },
    { name: 'BESTSELLERS', path: '/shop?category=BESTSELLERS' },
    { name: 'OVERSIZED', path: '/shop?category=OVERSIZED' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-canvas/90 backdrop-blur-md border-b border-editorial transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Left: Mobile Menu Trigger + Brand Logo */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 text-editorial hover:bg-editorial hover:text-canvas transition-colors"
              aria-label="Open mobile menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <Link
              to="/"
              className="flex items-baseline gap-1.5 group select-none"
            >
              <span className="font-display text-2xl sm:text-3xl font-black tracking-tighter text-editorial group-hover:text-neon group-hover:bg-editorial px-1 -mx-1 transition-colors">
                SHITPRINT
              </span>
              <span className="w-2 h-2 bg-neon rounded-full inline-block group-hover:scale-150 transition-transform"></span>
            </Link>
          </div>

          {/* Center: Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path && !location.search;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-xs font-mono font-bold uppercase tracking-widest relative py-1 hover:text-editorial transition-colors ${
                    isActive ? 'text-editorial' : 'text-muted'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-editorial"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: Search & Cart Controls */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 sm:px-3 sm:py-2 text-editorial hover:bg-editorial hover:text-canvas border border-transparent hover:border-editorial text-xs font-mono font-bold flex items-center gap-1.5 transition-colors"
              aria-label="Search products"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">SEARCH</span>
            </button>

            {/* Cart Trigger */}
            <button
              onClick={openCart}
              className="p-2 sm:px-4 sm:py-2 bg-editorial text-canvas hover:bg-neon hover:text-editorial border border-editorial text-xs font-mono font-bold flex items-center gap-2 transition-all relative"
              aria-label="View bag"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">BAG</span>
              <span className="bg-neon text-editorial text-[10px] font-bold px-1.5 py-0.2 min-w-[18px] text-center">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      <SearchBar
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[100] md:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-editorial/80 backdrop-blur-sm"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="relative z-10 w-4/5 max-w-sm h-full bg-canvas border-r-2 border-editorial flex flex-col justify-between p-6 shadow-2xl"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-line">
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-2xl font-black tracking-tight text-editorial">
                      SHITPRINT
                    </span>
                    <span className="w-2 h-2 bg-neon rounded-full"></span>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1 hover:bg-editorial hover:text-canvas transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Links */}
                <nav className="mt-8 flex flex-col space-y-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="font-display text-2xl font-bold uppercase tracking-tight hover:text-neon hover:bg-editorial px-2 py-1 transition-colors flex items-center justify-between"
                    >
                      <span>{link.name}</span>
                      <ArrowUpRight className="w-5 h-5 opacity-40" />
                    </Link>
                  ))}
                  <Link
                    to="/shop?category=GRAPHIC"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-display text-2xl font-bold uppercase tracking-tight hover:text-neon hover:bg-editorial px-2 py-1 transition-colors flex items-center justify-between"
                  >
                    <span>GRAPHIC TEES</span>
                    <ArrowUpRight className="w-5 h-5 opacity-40" />
                  </Link>
                  <Link
                    to="/shop?category=NEW DROP"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-display text-2xl font-bold uppercase tracking-tight hover:text-neon hover:bg-editorial px-2 py-1 transition-colors flex items-center justify-between"
                  >
                    <span>NEW DROPS</span>
                    <ArrowUpRight className="w-5 h-5 opacity-40" />
                  </Link>
                </nav>
              </div>

              {/* Bottom Info */}
              <div className="border-t border-line pt-6 font-mono text-xs text-muted space-y-2">
                <p className="font-bold text-editorial uppercase">
                  WEAR YOUR BAD DECISIONS.
                </p>
                <p>Limited drops. Premium heavyweight cotton. Pan-India shipping.</p>
                <p className="text-[10px] text-muted/80 pt-2">
                  College Mini Project © {new Date().getFullYear()}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
