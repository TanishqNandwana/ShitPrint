import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, ShieldCheck, Sparkles, Truck, RefreshCw } from 'lucide-react';
import Button from './Button';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-editorial text-canvas border-t-2 border-editorial pt-16 pb-8 px-4 sm:px-8 mt-24">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Value Props Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 border-b border-darkline">
          <div className="flex items-start gap-4 p-4 bg-darksurface border border-darkline">
            <Truck className="w-6 h-6 text-neon shrink-0 mt-0.5" />
            <div>
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-canvas">
                EXPRESS DISPATCH
              </h4>
              <p className="text-xs text-muted font-mono mt-1">
                Free shipping on all orders over ₹999. Dispatched from Bengaluru within 24 hours.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-darksurface border border-darkline">
            <Sparkles className="w-6 h-6 text-neon shrink-0 mt-0.5" />
            <div>
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-canvas">
                HEAVYWEIGHT 240+ GSM
              </h4>
              <p className="text-xs text-muted font-mono mt-1">
                Zero cheap polyester. 100% combed biowashed cotton that outlasts your bad habits.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-darksurface border border-darkline">
            <RefreshCw className="w-6 h-6 text-neon shrink-0 mt-0.5" />
            <div>
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-canvas">
                7-DAY HASSLE-FREE EXCHANGE
              </h4>
              <p className="text-xs text-muted font-mono mt-1">
                Wrong size? Ordered while intoxicated? Exchange it with zero questions asked.
              </p>
            </div>
          </div>
        </div>

        {/* Middle: Brand Bio + Quick Links + Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Brand Philosophy */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-3xl font-black tracking-tighter text-canvas">
                SHITPRINT
              </span>
              <span className="w-2 h-2 bg-neon rounded-full inline-block"></span>
            </div>
            <p className="font-mono text-xs text-muted leading-relaxed max-w-md">
              A fictional contemporary streetwear brand created for an interactive frontend college mini project. Dedicated to unapologetic parody, satire, and heavyweight graphic tees designed for people who refuse to blend into corporate beige.
            </p>
            <div className="pt-2 font-mono text-[11px] text-neon uppercase tracking-widest font-bold">
              WEAR YOUR BAD DECISIONS.
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-8 font-mono text-xs">
            <div>
              <h5 className="font-bold text-canvas uppercase tracking-widest mb-4">
                EXPLORE
              </h5>
              <ul className="space-y-2.5 text-muted">
                <li>
                  <Link to="/shop" className="hover:text-neon transition-colors">
                    ALL PRODUCTS
                  </Link>
                </li>
                <li>
                  <Link to="/shop?category=GRAPHIC" className="hover:text-neon transition-colors">
                    GRAPHIC TEES
                  </Link>
                </li>
                <li>
                  <Link to="/shop?category=OVERSIZED" className="hover:text-neon transition-colors">
                    OVERSIZED FIT
                  </Link>
                </li>
                <li>
                  <Link to="/shop?category=BESTSELLERS" className="hover:text-neon transition-colors">
                    BESTSELLERS
                  </Link>
                </li>
                <li>
                  <Link to="/shop?category=NEW DROP" className="hover:text-neon transition-colors">
                    DROP 04
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-canvas uppercase tracking-widest mb-4">
                PROJECT
              </h5>
              <ul className="space-y-2.5 text-muted">
                <li>
                  <span className="hover:text-canvas cursor-pointer">TECH STACK</span>
                </li>
                <li>
                  <span className="hover:text-canvas cursor-pointer">REACT + VITE</span>
                </li>
                <li>
                  <span className="hover:text-canvas cursor-pointer">TAILWIND CSS</span>
                </li>
                <li>
                  <span className="hover:text-canvas cursor-pointer">FRAMER MOTION</span>
                </li>
                <li>
                  <span className="hover:text-canvas cursor-pointer">COLLEGE DEMO</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-4 space-y-4">
            <h5 className="font-mono text-xs font-bold uppercase tracking-widest text-canvas">
              VIP DROPS &amp; REBELLION ALERTS
            </h5>
            <p className="font-mono text-xs text-muted">
              Get pinged 15 minutes before the next parody drop hits the servers.
            </p>

            {subscribed ? (
              <div className="bg-darksurface border border-neon p-4 text-xs font-mono text-neon flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>YOU'RE ON THE LIST. PREPARE YOUR WALLET.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="YOUR EMAIL ADDRESS"
                  className="flex-1 bg-darksurface border border-darkline px-3 py-2.5 text-xs font-mono uppercase text-canvas placeholder:text-muted/60 focus:outline-none focus:border-neon"
                />
                <button
                  type="submit"
                  className="bg-neon text-editorial hover:bg-canvas px-4 py-2.5 text-xs font-mono font-bold uppercase transition-colors shrink-0"
                >
                  JOIN
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Massive Typography Banner */}
        <div className="overflow-hidden select-none border-y border-darkline py-6 my-8">
          <div className="font-display font-black text-6xl sm:text-8xl lg:text-9xl text-darksurface hover:text-darkline/60 tracking-tighter whitespace-nowrap transition-colors">
            SHITPRINT® STREETWEAR
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-muted gap-4">
          <p>© {new Date().getFullYear()} SHITPRINT CLOTHING. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>FRONTEND MINI PROJECT</span>
            <span>•</span>
            <span>NO REAL ORDERS CHARGED</span>
            <span>•</span>
            <span className="text-neon">HANDCRAFTED IN INDIA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
