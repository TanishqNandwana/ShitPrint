import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Flame, Sparkles, Star, Zap, CheckCircle2 } from 'lucide-react';
import { PRODUCTS, BRAND_INFO } from '../data/products';
import ProductCard from '../components/ProductCard';
import Button from '../components/Button';

export default function Home() {
  const navigate = useNavigate();

  // Pick 4 featured products for the featured section
  const featuredProducts = PRODUCTS.filter((p) => p.featured).slice(0, 4);

  // New arrivals (tagged with NEW DROP)
  const newArrivals = PRODUCTS.filter((p) => p.isNew).slice(0, 4);

  // Hero product highlight: Lowcost or Tax Me Daddy
  const heroProduct = PRODUCTS.find((p) => p.id === 'sp-003') || PRODUCTS[0];

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. HERO SECTION */}
      <section className="relative border-b border-editorial overflow-hidden bg-grain pt-6 sm:pt-12 pb-12 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Bold Typography & CTAs */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="inline-flex items-center gap-2 bg-editorial text-canvas font-mono text-xs px-3 py-1 uppercase tracking-widest border border-editorial">
                <span className="w-2 h-2 bg-neon rounded-full animate-pulse-subtle"></span>
                <span>LIMITED RUN • DROP 04 LIVE</span>
              </div>

              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tight text-editorial leading-[0.92]">
                WEAR YOUR <br />
                <span className="text-stroke-thick hover:text-editorial transition-colors">
                  BAD
                </span>{" "}
                DECISIONS.
              </h1>

              <p className="font-mono text-sm sm:text-base text-muted max-w-xl leading-relaxed">
                Antisocial streetwear for people who refuse to blend into corporate beige. Heavyweight combed cotton, razor-sharp parody graphics, and unapologetic attitude.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button
                  onClick={() => navigate('/shop')}
                  variant="primary"
                  size="lg"
                  icon={ArrowRight}
                >
                  SHOP THE DROP
                </Button>

                <Button
                  onClick={() => navigate('/shop?category=BESTSELLERS')}
                  variant="secondary"
                  size="lg"
                >
                  EXPLORE BESTSELLERS
                </Button>
              </div>

              {/* Mini Social Proof */}
              <div className="pt-6 border-t border-line/60 flex items-center gap-6 font-mono text-xs text-muted">
                <div className="flex items-center gap-1.5">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="font-bold text-editorial">4.9/5 RATING</span>
                </div>
                <span>•</span>
                <span>OVER 2,500+ DELIVERED IN INDIA</span>
              </div>
            </motion.div>

            {/* Right Column: Hero Visual Showcase */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              className="lg:col-span-5 relative"
            >
              <div className="relative border-2 border-editorial bg-surface shadow-2xl p-6 sm:p-8 overflow-hidden group">
                {/* Floating Tag */}
                <div className="absolute top-4 left-4 z-10 bg-editorial text-canvas font-mono text-xs font-bold px-3 py-1 uppercase tracking-wider flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-neon" />
                  <span>HOTTEST DROP</span>
                </div>

                {/* Hero T-shirt Image */}
                <div className="relative aspect-[4/5] flex items-center justify-center bg-canvas border border-line overflow-hidden p-6">
                  <img
                    src={heroProduct.image}
                    alt={heroProduct.name}
                    className="w-full h-full object-contain filter drop-shadow-xl transition-transform duration-700 ease-out group-hover:scale-108 group-hover:rotate-1"
                  />
                </div>

                {/* Hero Item Details */}
                <div className="mt-4 pt-4 border-t border-line flex items-center justify-between">
                  <div>
                    <h2 className="font-sans font-bold text-lg text-editorial">
                      {heroProduct.name}
                    </h2>
                    <p className="font-mono text-xs text-muted">
                      {heroProduct.color} • {heroProduct.material.split('(')[0]}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-xl font-black text-editorial">
                      ₹{heroProduct.price}
                    </span>
                    <Link
                      to={`/product/${heroProduct.id}`}
                      className="block font-mono text-[11px] font-bold text-editorial underline mt-0.5"
                    >
                      VIEW DROP →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Decorative Background Accent */}
              <div className="absolute -bottom-4 -right-4 w-full h-full bg-neon border-2 border-editorial -z-10 hidden sm:block"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. BRAND STATEMENT TICKER */}
      <section className="bg-editorial text-canvas py-10 border-y border-darkline overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center space-y-4">
          <span className="font-mono text-xs uppercase tracking-widest text-neon">
            THE MANIFESTO
          </span>
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight max-w-4xl mx-auto leading-tight">
            "NOT EVERYONE NEEDS ANOTHER BASIC T-SHIRT. YOU NEED ONE PEOPLE ACTUALLY NOTICE."
          </h2>
          <p className="font-mono text-xs sm:text-sm text-muted max-w-2xl mx-auto">
            Printed on high-density 240+ GSM cotton with zero toxic corporate optimism.
          </p>
        </div>
      </section>

      {/* 3. FEATURED DROPS (4 PRODUCTS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-editorial mb-8">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted mb-1">
              <Zap className="w-3.5 h-3.5 text-neon" />
              <span>HANDPICKED STREETWEAR</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-editorial">
              FEATURED DROPS
            </h2>
          </div>

          <Link
            to="/shop"
            className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-editorial hover:text-neon hover:bg-editorial px-3 py-1.5 border border-editorial transition-all w-fit"
          >
            <span>VIEW ALL 10 PIECES</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </section>

      {/* 4. CATEGORY NAVIGATION BANNERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="pb-6 border-b border-editorial mb-8">
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            COLLECTION ARCHIVE
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-editorial mt-1">
            SHOP BY SILHOUETTE
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: "GRAPHIC TEES",
              subtitle: "Subversive parodies & satire",
              category: "GRAPHIC",
              tag: "POPULAR",
              bg: "bg-surface",
            },
            {
              title: "OVERSIZED FIT",
              subtitle: "260+ GSM boxy silhouettes",
              category: "OVERSIZED",
              tag: "HEAVYWEIGHT",
              bg: "bg-surface",
            },
            {
              title: "BESTSELLERS",
              subtitle: "High rotation cult favorites",
              category: "BESTSELLERS",
              tag: "TRENDING",
              bg: "bg-surface",
            },
            {
              title: "NEW DROPS",
              subtitle: "Drop 04 fresh prints",
              category: "NEW DROP",
              tag: "LIMITED",
              bg: "bg-surface",
            },
          ].map((cat, i) => (
            <div
              key={cat.title}
              onClick={() => navigate(`/shop?category=${cat.category}`)}
              className="p-6 border border-line hover:border-editorial bg-surface cursor-pointer group transition-all duration-300 flex flex-col justify-between h-48 relative overflow-hidden"
            >
              <div className="flex justify-between items-start">
                <span className="font-mono text-[10px] font-bold px-2 py-0.5 bg-canvas border border-line text-editorial uppercase">
                  {cat.tag}
                </span>
                <ArrowUpRight className="w-5 h-5 text-muted group-hover:text-editorial group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>

              <div>
                <h3 className="font-sans font-bold text-xl uppercase tracking-tight group-hover:text-neon group-hover:bg-editorial px-1 -mx-1 inline-block transition-colors">
                  {cat.title}
                </h3>
                <p className="font-mono text-xs text-muted mt-1">
                  {cat.subtitle}
                </p>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-neon scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </div>
          ))}
        </div>
      </section>

      {/* 5. NEW ARRIVALS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-editorial mb-8">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted mb-1">
              <Sparkles className="w-3.5 h-3.5 text-neon" />
              <span>FRESH OFF THE SCREEN PRESS</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-editorial">
              NEW ARRIVALS
            </h2>
          </div>

          <Link
            to="/shop?category=NEW DROP"
            className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-editorial hover:text-neon hover:bg-editorial px-3 py-1.5 border border-editorial transition-all w-fit"
          >
            <span>EXPLORE DROP 04</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          {newArrivals.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </section>

      {/* 6. EDITORIAL QUALITY CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-surface border-2 border-editorial p-6 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="font-mono text-xs uppercase tracking-widest text-muted">
                THE CRAFT &amp; SPECIFICATION
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-bold uppercase tracking-tight text-editorial">
                HEAVYWEIGHT 240 GSM. NEVER SEE-THROUGH.
              </h2>
              <p className="font-mono text-xs sm:text-sm text-muted leading-relaxed max-w-2xl">
                Every ShitPrint tee is crafted from 100% bio-washed combed cotton with double-needle hems and high-density ribbing. Screen printed by hand with eco-friendly plastisol ink that withstands 50+ wash cycles without cracking.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 font-mono text-xs">
                <div className="border border-line p-3 bg-canvas">
                  <div className="font-bold text-editorial uppercase">BIO-POLISHED</div>
                  <div className="text-muted text-[11px]">Silky anti-pilling feel</div>
                </div>
                <div className="border border-line p-3 bg-canvas">
                  <div className="font-bold text-editorial uppercase">PRE-SHRUNK</div>
                  <div className="text-muted text-[11px]">Zero surprise post-wash</div>
                </div>
                <div className="border border-line p-3 bg-canvas col-span-2 sm:col-span-1">
                  <div className="font-bold text-editorial uppercase">BOX CUT</div>
                  <div className="text-muted text-[11px]">Signature drop shoulder</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-center items-start lg:items-end space-y-4">
              <div className="font-mono text-xs text-muted uppercase">
                READY TO UPGRADE YOUR WARDROBE?
              </div>
              <Button
                onClick={() => navigate('/shop')}
                variant="primary"
                size="lg"
                icon={ArrowRight}
              >
                OPEN CATALOGUE
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FINAL HERO CTA */}
      <section className="bg-editorial text-canvas py-16 sm:py-24 border-y-2 border-editorial relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 text-center space-y-6 relative z-10">
          <span className="font-mono text-xs uppercase tracking-widest text-neon font-bold">
            DROP 04 ALMOST SOLD OUT
          </span>

          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-tight">
            READY TO MAKE A STATEMENT?
          </h2>

          <p className="font-mono text-xs sm:text-sm text-muted max-w-lg mx-auto">
            Choose from all 10 parody graphics. Free shipping across India on orders above ₹999.
          </p>

          <div className="pt-4 flex justify-center">
            <Button
              onClick={() => navigate('/shop')}
              variant="neon"
              size="lg"
              icon={ArrowRight}
            >
              SHOP ALL PRODUCTS
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
