import React from 'react';
import ProductCard from './ProductCard';

export default function ProductGrid({ products = [], className = '' }) {
  if (!products || products.length === 0) {
    return (
      <div className="py-20 text-center border border-dashed border-line bg-surface/50 p-8 my-6">
        <h3 className="font-sans text-xl font-bold uppercase tracking-tight text-editorial">
          NO STREETWEAR MATCHES YOUR CRITERIA
        </h3>
        <p className="font-mono text-xs text-muted mt-2">
          Try resetting your filters or clearing search terms to explore all items.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 ${className}`}
    >
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
}
