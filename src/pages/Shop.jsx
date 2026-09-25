import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PRODUCTS, CATEGORIES, SORT_OPTIONS } from '../data/products';
import FilterBar from '../components/FilterBar';
import ProductGrid from '../components/ProductGrid';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read initial params from URL if present
  const categoryParam = searchParams.get('category') || 'ALL';
  const searchParam = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedSort, setSelectedSort] = useState('FEATURED');
  const [searchQuery, setSearchQuery] = useState(searchParam);

  // Sync state with URL parameter changes
  useEffect(() => {
    if (searchParams.get('category')) {
      setSelectedCategory(searchParams.get('category'));
    }
    if (searchParams.get('search') !== null) {
      setSearchQuery(searchParams.get('search'));
    }
  }, [searchParams]);

  const handleSelectCategory = (catId) => {
    setSelectedCategory(catId);
    const newParams = new URLSearchParams(searchParams);
    if (catId === 'ALL') {
      newParams.delete('category');
    } else {
      newParams.set('category', catId);
    }
    setSearchParams(newParams);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    const newParams = new URLSearchParams(searchParams);
    if (!query) {
      newParams.delete('search');
    } else {
      newParams.set('search', query);
    }
    setSearchParams(newParams);
  };

  const handleResetFilters = () => {
    setSelectedCategory('ALL');
    setSelectedSort('FEATURED');
    setSearchQuery('');
    setSearchParams({});
  };

  // Filter & Sort calculation
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Category filter
    if (selectedCategory !== 'ALL') {
      result = result.filter((product) =>
        product.tags.includes(selectedCategory) ||
        product.category.toUpperCase() === selectedCategory.toUpperCase()
      );
    }

    // Text search query filter
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(q) ||
          product.subtitle.toLowerCase().includes(q) ||
          product.description.toLowerCase().includes(q) ||
          product.category.toLowerCase().includes(q) ||
          product.tags.some(tag => tag.toLowerCase().includes(q))
      );
    }

    // Sort order
    if (selectedSort === 'PRICE_LOW') {
      result.sort((a, b) => a.price - b.price);
    } else if (selectedSort === 'PRICE_HIGH') {
      result.sort((a, b) => b.price - a.price);
    } else if (selectedSort === 'NEWEST') {
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    } else {
      // FEATURED: featured products first
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [selectedCategory, selectedSort, searchQuery]);

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <section className="bg-canvas pt-8 pb-6 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="border-b-2 border-editorial pb-6">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted mb-2">
            <span>CATALOGUE</span>
            <span>/</span>
            <span>AUTUMN-WINTER DROP 04</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-editorial">
                ALL STREETWEAR
              </h1>
              <p className="font-mono text-xs sm:text-sm text-muted max-w-xl mt-2">
                Expressive parody graphic tees and oversized box cuts. Heavyweight 240+ GSM cotton, pre-shrunk and built to last.
              </p>
            </div>
            <div className="font-mono text-xs text-muted uppercase">
              ALL ASSETS SOURCED &amp; AUTHENTICATED
            </div>
          </div>
        </div>
      </section>

      {/* Filter and Control Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <FilterBar
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
          selectedSort={selectedSort}
          onSelectSort={setSelectedSort}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          totalCount={filteredProducts.length}
          onResetFilters={handleResetFilters}
        />
      </div>

      {/* Product Grid Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <ProductGrid products={filteredProducts} />
      </section>
    </div>
  );
}
