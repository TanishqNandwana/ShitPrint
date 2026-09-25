import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  Zap,
  Ruler,
  Truck,
  ShieldCheck,
  RotateCcw,
  Check,
  ChevronDown,
  Star,
  Sparkles,
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import SizeGuideModal from '../components/SizeGuideModal';
import Button from '../components/Button';

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, openCheckout } = useCart();

  const product = PRODUCTS.find((p) => p.id === id);

  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('details'); // 'details' | 'specs' | 'care' | 'shipping'

  // Scroll to top on id change
  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedSize('');
    setQuantity(1);
    setSizeError(false);
  }, [id]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-24 text-center">
        <h2 className="font-sans text-3xl font-black uppercase text-editorial">
          PRODUCT NOT FOUND
        </h2>
        <p className="font-mono text-xs text-muted mt-2 mb-6">
          This drop might have sold out or does not exist.
        </p>
        <Button onClick={() => navigate('/shop')} variant="primary">
          RETURN TO SHOP
        </Button>
      </div>
    );
  }

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  // Related products (from same category or general drops, excluding current)
  const relatedProducts = PRODUCTS
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const handleSelectSize = (size) => {
    setSelectedSize(size);
    if (sizeError) setSizeError(false);
  };

  const handleAddToCart = (openDrawer = false) => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    addToCart(product, selectedSize, quantity, openDrawer);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    addToCart(product, selectedSize, quantity, false);
    openCheckout();
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-6">
        <nav className="flex items-center space-x-2 font-mono text-xs uppercase text-muted">
          <Link to="/" className="hover:text-editorial transition-colors">
            HOME
          </Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-editorial transition-colors">
            SHOP
          </Link>
          <span>/</span>
          <span className="text-editorial font-bold truncate max-w-[200px] sm:max-w-none">
            {product.name}
          </span>
        </nav>
      </div>

      {/* Main Product Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Big Product Photography Showcase */}
          <div className="lg:col-span-7">
            <div className="sticky top-28 space-y-4">
              <div className="relative aspect-[4/5] bg-surface border-2 border-editorial flex items-center justify-center p-6 sm:p-12 overflow-hidden group shadow-lg">
                {/* Badge tags */}
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 pointer-events-none">
                  {product.badge && (
                    <span className="bg-editorial text-canvas font-mono text-xs font-bold px-3 py-1 uppercase tracking-wider">
                      {product.badge}
                    </span>
                  )}
                  {discountPercent > 0 && (
                    <span className="bg-neon text-editorial font-mono text-xs font-bold px-2.5 py-0.5 uppercase tracking-wider">
                      SAVE {discountPercent}%
                    </span>
                  )}
                </div>

                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain filter drop-shadow-2xl transition-transform duration-500 ease-out group-hover:scale-108"
                />

                <div className="absolute bottom-4 right-4 bg-canvas/90 backdrop-blur-sm border border-line px-2 py-1 font-mono text-[10px] text-muted uppercase">
                  HIGH RES STUDIO PHOTOGRAPHY
                </div>
              </div>

              {/* Quality Badges */}
              <div className="grid grid-cols-3 gap-3 font-mono text-[11px] text-center">
                <div className="p-2.5 border border-line bg-surface">
                  <div className="font-bold text-editorial uppercase">240+ GSM</div>
                  <div className="text-muted">Heavy Cotton</div>
                </div>
                <div className="p-2.5 border border-line bg-surface">
                  <div className="font-bold text-editorial uppercase">BIO-WASH</div>
                  <div className="text-muted">Zero Shrink</div>
                </div>
                <div className="p-2.5 border border-line bg-surface">
                  <div className="font-bold text-editorial uppercase">SILK SCREEN</div>
                  <div className="text-muted">Matte Finish</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Product Configurator & Purchasing */}
          <div className="lg:col-span-5 space-y-6">
            {/* Title & Category */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono uppercase text-muted mb-2">
                <span>CATEGORY: {product.category}</span>
                <span>SKU: {product.sku}</span>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-editorial leading-tight">
                {product.name}
              </h1>

              <p className="font-mono text-sm text-muted mt-2">
                {product.subtitle}
              </p>
            </div>

            {/* Price Row */}
            <div className="flex items-baseline gap-3 pb-6 border-b border-line">
              <span className="font-mono text-3xl font-black text-editorial">
                ₹{product.price}
              </span>
              <span className="font-mono text-base text-muted line-through">
                ₹{product.originalPrice}
              </span>
              <span className="bg-neon/30 text-editorial font-mono text-xs font-bold px-2 py-0.5 border border-neon">
                INCLUSIVE OF ALL TAXES
              </span>
            </div>

            {/* Stock Alert */}
            {product.stock && (
              <div className="flex items-center gap-2 text-xs font-mono text-amber-700 bg-amber-50 border border-amber-200 p-2.5">
                <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse-subtle"></span>
                <span>⚡ Only {product.stock} pieces remaining from Drop 04 production run.</span>
              </div>
            )}

            {/* Size Selector */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="font-mono text-xs font-bold uppercase tracking-wider text-editorial flex items-center gap-1.5">
                  <span>SELECT SIZE:</span>
                  {selectedSize ? (
                    <span className="text-neon bg-editorial px-2 py-0.2">{selectedSize}</span>
                  ) : (
                    <span className="text-muted font-normal">(REQUIRED)</span>
                  )}
                </label>

                <button
                  type="button"
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-xs font-mono uppercase text-muted hover:text-editorial flex items-center gap-1 underline underline-offset-2"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>SIZE GUIDE</span>
                </button>
              </div>

              {/* Size Buttons */}
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((size) => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => handleSelectSize(size)}
                      className={`py-3 text-xs font-mono font-bold uppercase transition-all border ${
                        isSelected
                          ? 'bg-editorial text-canvas border-editorial shadow-md ring-2 ring-neon'
                          : 'bg-surface text-editorial border-line hover:border-editorial'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>

              {/* Validation Warning */}
              {sizeError && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-1.5 text-xs font-mono text-red-600 bg-red-50 border border-red-200 p-2 font-bold"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>PLEASE SELECT A SIZE BEFORE ADDING TO BAG.</span>
                </motion.div>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="space-y-2">
              <label className="font-mono text-xs font-bold uppercase tracking-wider text-muted">
                QUANTITY:
              </label>
              <div className="flex items-center w-36 border-2 border-editorial bg-surface font-mono text-sm">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2.5 hover:bg-line/40 transition-colors flex-1 text-center"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-4 font-bold text-center flex-1">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-2.5 hover:bg-line/40 transition-colors flex-1 text-center"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions: Add to Cart + Buy Now */}
            <div className="space-y-3 pt-4">
              <Button
                onClick={() => handleAddToCart(true)}
                variant="primary"
                size="lg"
                fullWidth
                icon={ShoppingBag}
              >
                ADD TO CART
              </Button>

              <Button
                onClick={handleBuyNow}
                variant="neon"
                size="lg"
                fullWidth
                icon={Zap}
              >
                BUY NOW (INSTANT CHECKOUT)
              </Button>
            </div>

            {/* Highlights Mini List */}
            <div className="border-t border-line pt-6 space-y-2.5 font-mono text-xs text-muted">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Free dispatch across India on orders above ₹999</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>7-Day hassle-free exchanges with pickup</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Dispatches from Bengaluru hub within 24 hours</span>
              </div>
            </div>

            {/* Tabbed Specification Accordions */}
            <div className="border border-line bg-surface mt-8 divide-y divide-line">
              {/* Tab 1: Description */}
              <div className="p-4">
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-editorial mb-2">
                  GARMENT DESCRIPTION
                </h4>
                <p className="font-mono text-xs text-muted leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Tab 2: Material & Fit */}
              <div className="p-4 space-y-2 text-xs font-mono">
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-editorial mb-2">
                  FIT &amp; FABRIC SPECIFICATIONS
                </h4>
                <div className="grid grid-cols-2 gap-2 text-muted">
                  <div>
                    <span className="font-bold text-editorial">MATERIAL:</span>
                    <p>{product.material}</p>
                  </div>
                  <div>
                    <span className="font-bold text-editorial">SILHOUETTE:</span>
                    <p>{product.fit}</p>
                  </div>
                  <div>
                    <span className="font-bold text-editorial">PRINT TECH:</span>
                    <p>{product.print}</p>
                  </div>
                  <div>
                    <span className="font-bold text-editorial">COLORWAY:</span>
                    <p>{product.color}</p>
                  </div>
                </div>
              </div>

              {/* Tab 3: Care Instructions */}
              <div className="p-4">
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-editorial mb-2">
                  CARE &amp; WASH INSTRUCTIONS
                </h4>
                <p className="font-mono text-xs text-muted leading-relaxed">
                  {product.care}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 pt-12 border-t border-editorial">
        <div className="flex items-end justify-between pb-6 mb-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-muted">
              MORE FROM DROP 04
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-editorial mt-1">
              YOU MIGHT ALSO REGRET BUYING
            </h2>
          </div>
          <Link
            to="/shop"
            className="font-mono text-xs font-bold uppercase text-editorial hover:underline flex items-center gap-1"
          >
            <span>VIEW CATALOGUE</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          {relatedProducts.map((p, index) => (
            <ProductCard key={p.id} product={p} index={index} />
          ))}
        </div>
      </section>

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />
    </div>
  );
}
