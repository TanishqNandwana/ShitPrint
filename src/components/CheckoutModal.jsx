import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, ShieldCheck, Truck, CreditCard, Smartphone, Banknote, ArrowRight, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { BRAND_INFO } from '../data/products';
import Button from './Button';

export default function CheckoutModal({ isOpen, onClose }) {
  const { cartItems, cartSubtotal, isFreeShipping, clearCart } = useCart();

  const [step, setStep] = useState('form'); // 'form' | 'processing' | 'success'
  const [formData, setFormData] = useState({
    name: 'Tanishq Nandwana',
    email: 'tanishq@example.com',
    phone: '9876543210',
    address: 'Flat 402, Neo Heights, MG Road',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560001',
    paymentMethod: 'upi',
  });

  const [discountCode, setDiscountCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const [orderSummary, setOrderSummary] = useState(null);

  if (!isOpen) return null;

  const shippingFee = isFreeShipping ? 0 : 99;
  const grandTotal = Math.max(0, cartSubtotal + shippingFee - discountAmount);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');
    const code = discountCode.trim().toUpperCase();

    if (code === 'SHIT10') {
      const discount = Math.round(cartSubtotal * 0.1);
      setDiscountAmount(discount);
      setCouponSuccess('10% REBELLION DISCOUNT APPLIED!');
    } else if (code === 'FREESHIP') {
      setDiscountAmount(shippingFee);
      setCouponSuccess('FREE SHIPPING UNLOCKED!');
    } else {
      setCouponError('INVALID PROMO CODE. TRY "SHIT10"');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setStep('processing');

    setTimeout(() => {
      const orderId = `SP-${Math.floor(100000 + Math.random() * 900000)}`;
      const completedOrder = {
        orderId,
        items: [...cartItems],
        total: grandTotal,
        discount: discountAmount,
        shipping: shippingFee,
        customer: { ...formData },
        placedAt: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      setOrderSummary(completedOrder);
      setStep('success');
      clearCart();

      // Fire festive confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#DFFF00', '#111111', '#FFFFFF', '#FF3366'],
      });
    }, 1200);
  };

  const handleClose = () => {
    setStep('form');
    setOrderSummary(null);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={step === 'processing' ? undefined : handleClose}
          className="fixed inset-0 bg-editorial/85 backdrop-blur-md"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          className="relative z-10 bg-canvas border-2 border-editorial max-w-3xl w-full shadow-2xl my-auto max-h-[92vh] overflow-y-auto"
        >
          {step === 'form' && (
            <div>
              {/* Header */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-line bg-editorial text-canvas sticky top-0 z-20">
                <div className="flex items-center gap-2">
                  <span className="bg-neon text-editorial font-mono text-xs px-2 py-0.5 font-bold uppercase">
                    SIMULATED
                  </span>
                  <h2 className="font-sans text-lg sm:text-xl font-bold uppercase tracking-tight">
                    EXPRESS STREETWEAR CHECKOUT
                  </h2>
                </div>
                <button
                  onClick={handleClose}
                  className="p-1 hover:text-neon transition-colors"
                  aria-label="Close checkout"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handlePlaceOrder} className="p-4 sm:p-8 space-y-8">
                {/* Order Summary Preview */}
                <div className="bg-surface border border-line p-4">
                  <div className="flex items-center justify-between text-xs font-mono uppercase text-muted mb-3">
                    <span>ITEMS IN ORDER ({cartItems.length})</span>
                    <span>SUBTOTAL: ₹{cartSubtotal}</span>
                  </div>

                  <div className="divide-y divide-line/40 max-h-36 overflow-y-auto pr-1">
                    {cartItems.map((item) => (
                      <div key={item.itemKey} className="py-2 flex items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2 truncate">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-8 h-10 object-contain bg-canvas border border-line shrink-0"
                          />
                          <div className="truncate">
                            <span className="font-bold">{item.product.name}</span>
                            <span className="text-muted ml-2 font-mono">[{item.size}] × {item.quantity}</span>
                          </div>
                        </div>
                        <span className="font-mono font-bold shrink-0">
                          ₹{item.product.price * item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Promo Code Box */}
                  <div className="mt-4 pt-4 border-t border-line">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value)}
                        placeholder="DISCOUNT CODE (e.g. SHIT10)"
                        className="flex-1 bg-canvas border border-line px-3 py-2 text-xs font-mono uppercase placeholder:text-muted/60 focus:outline-none focus:border-editorial"
                      />
                      <button
                        type="button"
                        onClick={handleApplyCoupon}
                        className="bg-editorial text-canvas hover:bg-neon hover:text-editorial px-4 py-2 text-xs font-mono font-bold uppercase transition-colors"
                      >
                        APPLY
                      </button>
                    </div>
                    {couponSuccess && (
                      <p className="text-xs font-mono text-emerald-600 mt-1.5 flex items-center gap-1 font-bold">
                        <Sparkles className="w-3.5 h-3.5" />
                        {couponSuccess}
                      </p>
                    )}
                    {couponError && (
                      <p className="text-xs font-mono text-red-500 mt-1.5 font-bold">
                        {couponError}
                      </p>
                    )}
                  </div>
                </div>

                {/* Shipping Details */}
                <div className="space-y-4">
                  <h3 className="font-mono text-xs uppercase font-bold tracking-widest text-muted border-b border-line pb-2 flex items-center gap-2">
                    <Truck className="w-4 h-4 text-editorial" />
                    <span>1. SHIPPING DESTINATION</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                    <div>
                      <label className="block text-muted uppercase mb-1">FULL NAME *</label>
                      <input
                        type="text"
                        required
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full bg-surface border border-line p-2.5 font-sans focus:outline-none focus:border-editorial"
                      />
                    </div>
                    <div>
                      <label className="block text-muted uppercase mb-1">PHONE NUMBER (+91) *</label>
                      <input
                        type="tel"
                        required
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-surface border border-line p-2.5 font-sans focus:outline-none focus:border-editorial"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-muted uppercase mb-1">EMAIL ADDRESS *</label>
                      <input
                        type="email"
                        required
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-surface border border-line p-2.5 font-sans focus:outline-none focus:border-editorial"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-muted uppercase mb-1">STREET ADDRESS *</label>
                      <input
                        type="text"
                        required
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="House / Apartment / Street Name"
                        className="w-full bg-surface border border-line p-2.5 font-sans focus:outline-none focus:border-editorial"
                      />
                    </div>
                    <div>
                      <label className="block text-muted uppercase mb-1">CITY *</label>
                      <input
                        type="text"
                        required
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full bg-surface border border-line p-2.5 font-sans focus:outline-none focus:border-editorial"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-muted uppercase mb-1">STATE *</label>
                        <input
                          type="text"
                          required
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className="w-full bg-surface border border-line p-2.5 font-sans focus:outline-none focus:border-editorial"
                        />
                      </div>
                      <div>
                        <label className="block text-muted uppercase mb-1">PINCODE *</label>
                        <input
                          type="text"
                          required
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleInputChange}
                          className="w-full bg-surface border border-line p-2.5 font-sans focus:outline-none focus:border-editorial"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Simulated Payment Selection */}
                <div className="space-y-4">
                  <h3 className="font-mono text-xs uppercase font-bold tracking-widest text-muted border-b border-line pb-2 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-editorial" />
                    <span>2. PAYMENT METHOD (DEMO SIMULATION)</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <label className={`border p-3 cursor-pointer transition-all flex flex-col justify-between ${
                      formData.paymentMethod === 'upi' ? 'border-editorial bg-editorial text-canvas shadow-md' : 'border-line bg-surface hover:border-editorial'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <Smartphone className="w-5 h-5" />
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="upi"
                          checked={formData.paymentMethod === 'upi'}
                          onChange={handleInputChange}
                          className="accent-neon"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-xs uppercase">INSTANT UPI</div>
                        <div className="text-[10px] opacity-70">GPay, PhonePe, Paytm</div>
                      </div>
                    </label>

                    <label className={`border p-3 cursor-pointer transition-all flex flex-col justify-between ${
                      formData.paymentMethod === 'card' ? 'border-editorial bg-editorial text-canvas shadow-md' : 'border-line bg-surface hover:border-editorial'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <CreditCard className="w-5 h-5" />
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          checked={formData.paymentMethod === 'card'}
                          onChange={handleInputChange}
                          className="accent-neon"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-xs uppercase">CARDS</div>
                        <div className="text-[10px] opacity-70">Visa, Mastercard, RuPay</div>
                      </div>
                    </label>

                    <label className={`border p-3 cursor-pointer transition-all flex flex-col justify-between ${
                      formData.paymentMethod === 'cod' ? 'border-editorial bg-editorial text-canvas shadow-md' : 'border-line bg-surface hover:border-editorial'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <Banknote className="w-5 h-5" />
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cod"
                          checked={formData.paymentMethod === 'cod'}
                          onChange={handleInputChange}
                          className="accent-neon"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-xs uppercase">CASH ON DELIVERY</div>
                        <div className="text-[10px] opacity-70">Pay when delivered</div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Final Bill Breakdown */}
                <div className="border-t border-editorial pt-4 font-mono text-xs space-y-2">
                  <div className="flex justify-between text-muted">
                    <span>BAG SUBTOTAL</span>
                    <span>₹{cartSubtotal}</span>
                  </div>
                  <div className="flex justify-between text-muted">
                    <span>ESTIMATED SHIPPING</span>
                    <span>{shippingFee === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : `₹${shippingFee}`}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-bold">
                      <span>PROMO DISCOUNT</span>
                      <span>-₹{discountAmount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-bold text-editorial pt-2 border-t border-line">
                    <span>TOTAL PAYABLE</span>
                    <span className="font-mono text-lg">₹{grandTotal}</span>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    icon={ArrowRight}
                  >
                    COMPLETE ORDER (₹{grandTotal})
                  </Button>
                  <p className="text-[11px] font-mono text-center text-muted mt-2">
                    🔒 100% Mock Checkout — No real charge will occur. Ready for college demo.
                  </p>
                </div>
              </form>
            </div>
          )}

          {step === 'processing' && (
            <div className="p-16 text-center space-y-4">
              <div className="w-12 h-12 border-4 border-editorial border-t-neon rounded-full animate-spin mx-auto" />
              <h3 className="font-sans text-xl font-bold uppercase tracking-tight">
                AUTHENTICATING STREETWEAR DROP...
              </h3>
              <p className="font-mono text-xs text-muted">
                Encrypting telemetry and reserving your sizes in our warehouse...
              </p>
            </div>
          )}

          {step === 'success' && orderSummary && (
            <div className="p-6 sm:p-10 text-center space-y-6">
              <div className="w-16 h-16 bg-neon text-editorial rounded-full flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle className="w-10 h-10 stroke-[2.5]" />
              </div>

              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-muted">
                  CONFIRMED &amp; SCHEDULED
                </span>
                <h2 className="font-display text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-editorial mt-1">
                  ORDER PLACED SUCCESSFULLY
                </h2>
                <p className="font-mono text-xs text-muted mt-2">
                  Order ID: <span className="text-editorial font-bold bg-line/50 px-2 py-0.5">{orderSummary.orderId}</span>
                </p>
              </div>

              {/* Order Receipt Card */}
              <div className="bg-surface border-2 border-editorial p-6 text-left max-w-lg mx-auto font-mono text-xs space-y-4">
                <div className="flex justify-between border-b border-line pb-2">
                  <span className="text-muted">DELIVERY FOR:</span>
                  <span className="font-bold text-editorial text-right">
                    {orderSummary.customer.name} ({orderSummary.customer.phone})
                  </span>
                </div>

                <div className="flex justify-between border-b border-line pb-2">
                  <span className="text-muted">DESTINATION:</span>
                  <span className="text-editorial text-right max-w-xs truncate">
                    {orderSummary.customer.address}, {orderSummary.customer.city} - {orderSummary.customer.pincode}
                  </span>
                </div>

                <div className="flex justify-between border-b border-line pb-2">
                  <span className="text-muted">PAYMENT:</span>
                  <span className="font-bold uppercase text-editorial">
                    {orderSummary.customer.paymentMethod.toUpperCase()} (MOCK PAID)
                  </span>
                </div>

                <div className="space-y-1 pt-1">
                  <div className="text-muted font-bold">ITEMS RESERVED:</div>
                  {orderSummary.items.map((it) => (
                    <div key={it.itemKey} className="flex justify-between text-muted">
                      <span>{it.product.name} [{it.size}] × {it.quantity}</span>
                      <span>₹{it.product.price * it.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between border-t border-editorial pt-2 font-bold text-sm text-editorial">
                  <span>TOTAL AMOUNT PAID:</span>
                  <span>₹{orderSummary.total}</span>
                </div>
              </div>

              <div className="bg-neon/15 border border-neon/50 p-4 max-w-lg mx-auto text-xs font-mono text-editorial">
                ⚡ Dispatch notification dispatched to <span className="font-bold">{orderSummary.customer.email}</span>. Estimated delivery: 3–5 business days.
              </div>

              <div className="pt-2 flex justify-center">
                <button
                  onClick={handleClose}
                  className="bg-editorial text-canvas hover:bg-neon hover:text-editorial px-8 py-4 font-mono font-bold text-xs uppercase tracking-widest transition-colors"
                >
                  RETURN TO SHOP
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
