import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Check, ShoppingBag, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product, index = 0 }) {
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [justAdded, setJustAdded] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleQuickAddClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsQuickAddOpen(!isQuickAddOpen);
  };

  const handleSelectSizeAndAdd = (e, size) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedSize(size);
    const result = addToCart(product, size, 1, false);
    if (result.success) {
      setJustAdded(true);
      setTimeout(() => {
        setJustAdded(false);
        setIsQuickAddOpen(false);
        setSelectedSize(null);
      }, 1200);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative flex flex-col bg-surface border border-line hover:border-editorial transition-all duration-300 h-full"
    >
      {/* Top Badges */}
      <div className="absolute top-3 left-3 right-3 z-10 flex justify-between items-start pointer-events-none">
        <div className="flex flex-col gap-1">
          {product.badge && (
            <span className="bg-editorial text-canvas text-[10px] font-mono font-bold px-2 py-0.5 uppercase tracking-wider">
              {product.badge}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="bg-neon text-editorial text-[10px] font-mono font-bold px-2 py-0.5 uppercase tracking-wider">
              -{discountPercent}%
            </span>
          )}
        </div>

        <span className="bg-canvas/90 backdrop-blur-sm border border-line text-editorial text-[9px] font-mono uppercase px-1.5 py-0.5 tracking-widest">
          {product.category}
        </span>
      </div>

      {/* Image Container with Zoom */}
      <Link
        to={`/product/${product.id}`}
        className="relative block w-full aspect-[4/5] bg-canvas overflow-hidden border-b border-line p-4 sm:p-6 flex items-center justify-center cursor-pointer"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain filter contrast-[1.02] transition-transform duration-500 ease-out group-hover:scale-108 group-hover:rotate-[-0.5deg]"
          loading="lazy"
        />

        {/* Quick Add Overlay on Desktop Hover */}
        <div className="absolute bottom-3 left-3 right-3 hidden sm:flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-auto">
          {!isQuickAddOpen ? (
            <button
              onClick={handleQuickAddClick}
              className="w-full bg-editorial text-canvas hover:bg-neon hover:text-editorial py-2.5 px-3 text-xs font-mono font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>QUICK ADD</span>
            </button>
          ) : (
            <div className="w-full bg-editorial text-canvas p-2 shadow-2xl flex flex-col gap-1.5 border border-neon">
              <div className="text-[10px] font-mono text-neon uppercase font-bold flex justify-between items-center">
                <span>SELECT SIZE:</span>
                <span
                  onClick={handleQuickAddClick}
                  className="cursor-pointer text-muted hover:text-canvas"
                >
                  ✕
                </span>
              </div>
              <div className="grid grid-cols-5 gap-1">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={(e) => handleSelectSizeAndAdd(e, size)}
                    className="bg-canvas text-editorial hover:bg-neon text-xs font-mono font-bold py-1 transition-colors"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </Link>

      {/* Mobile Quick Add Size Trigger */}
      <div className="sm:hidden border-b border-line bg-canvas/50 px-3 py-2">
        {!isQuickAddOpen ? (
          <button
            onClick={handleQuickAddClick}
            className="w-full bg-editorial text-canvas py-1.5 text-[11px] font-mono font-bold uppercase flex items-center justify-center gap-1"
          >
            <Plus className="w-3 h-3" />
            <span>QUICK ADD</span>
          </button>
        ) : (
          <div className="flex items-center justify-between gap-1">
            <span className="text-[10px] font-mono text-muted uppercase">SIZE:</span>
            <div className="flex gap-1">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={(e) => handleSelectSizeAndAdd(e, size)}
                  className="bg-editorial text-canvas hover:bg-neon hover:text-editorial px-2 py-0.5 text-[10px] font-mono font-bold"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Product Information */}
      <div className="p-3 sm:p-4 flex flex-col justify-between flex-1">
        <div>
          <Link to={`/product/${product.id}`} className="block group-hover:underline">
            <h3 className="font-sans font-bold text-sm sm:text-base leading-snug tracking-tight text-editorial line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-muted font-mono mt-0.5 line-clamp-1">
            {product.subtitle}
          </p>
        </div>

        <div className="mt-3 pt-2.5 border-t border-line/60 flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-sm sm:text-base font-bold text-editorial">
              ₹{product.price}
            </span>
            <span className="font-mono text-xs text-muted line-through">
              ₹{product.originalPrice}
            </span>
          </div>

          <span className="text-[10px] font-mono text-muted uppercase">
            {product.fit.split(' ')[0]}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
