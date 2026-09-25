import React from 'react';
import { motion } from 'framer-motion';

export default function AnnouncementBar() {
  const messages = [
    "FREE SHIPPING ON ORDERS ABOVE ₹999",
    "LIMITED RUN — DROP 04 NOW LIVE",
    "WEAR YOUR BAD DECISIONS",
    "DISPATCH WITHIN 24 HOURS ACROSS INDIA",
    "100% HEAVYWEIGHT COMBED COTTON (240+ GSM)",
  ];

  return (
    <div className="bg-editorial text-canvas text-xs uppercase tracking-widest py-2 border-b border-darkline overflow-hidden select-none relative z-50">
      <div className="flex w-max animate-marquee">
        {[...messages, ...messages].map((msg, index) => (
          <div key={index} className="flex items-center space-x-6 mx-4 font-mono font-medium">
            <span>{msg}</span>
            <span className="inline-block w-1.5 h-1.5 bg-neon rounded-full"></span>
          </div>
        ))}
      </div>
    </div>
  );
}
