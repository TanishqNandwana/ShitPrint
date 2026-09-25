import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Ruler } from 'lucide-react';

export default function SizeGuideModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const sizeChart = [
    { size: 'S', chest: '40"', length: '28"', shoulder: '19.5"', sleeve: '8.5"' },
    { size: 'M', chest: '42"', length: '29"', shoulder: '20.5"', sleeve: '9.0"' },
    { size: 'L', chest: '44"', length: '30"', shoulder: '21.5"', sleeve: '9.5"' },
    { size: 'XL', chest: '46"', length: '31"', shoulder: '22.5"', sleeve: '10.0"' },
    { size: 'XXL', chest: '48"', length: '32"', shoulder: '23.5"', sleeve: '10.5"' },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-editorial/80 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative z-10 bg-canvas border-2 border-editorial max-w-xl w-full shadow-2xl p-6 md:p-8"
        >
          <div className="flex items-center justify-between pb-4 border-b border-line">
            <div className="flex items-center gap-2">
              <Ruler className="w-5 h-5 text-editorial" />
              <h3 className="font-sans text-xl font-bold uppercase tracking-tight">
                STREETWEAR SIZE GUIDE
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-editorial hover:text-canvas transition-colors"
              aria-label="Close size guide"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-4 text-xs font-mono text-muted uppercase">
            All measurements are garment dimensions (inches). Our oversized tees are cut with dropped shoulders and a boxy torso.
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left font-mono text-xs border-collapse">
              <thead>
                <tr className="bg-editorial text-canvas border border-editorial">
                  <th className="p-3 font-bold">SIZE</th>
                  <th className="p-3">CHEST</th>
                  <th className="p-3">LENGTH</th>
                  <th className="p-3">SHOULDER</th>
                  <th className="p-3">SLEEVE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line border border-line bg-surface">
                {sizeChart.map((row) => (
                  <tr key={row.size} className="hover:bg-neon/10 transition-colors">
                    <td className="p-3 font-bold text-editorial bg-line/20">{row.size}</td>
                    <td className="p-3">{row.chest}</td>
                    <td className="p-3">{row.length}</td>
                    <td className="p-3">{row.shoulder}</td>
                    <td className="p-3">{row.sleeve}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-4 bg-line/30 border border-line text-xs font-mono">
            <div className="font-bold text-editorial uppercase mb-1">FIT ADVICE:</div>
            <p className="text-muted">
              • For regular streetwear drape: Take your true size.
              <br />
              • For dramatic oversized skater/grunge silhouette: Size up by one.
              <br />
              • Machine wash cold to avoid unwanted shrinking.
            </p>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="bg-editorial text-canvas hover:bg-neon hover:text-editorial px-6 py-2.5 text-xs font-mono uppercase font-bold transition-colors"
            >
              GOT IT, CLOSE
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
