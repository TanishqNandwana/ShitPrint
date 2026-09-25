import React from 'react';
import { CATEGORIES, SORT_OPTIONS } from '../data/products';
import { SlidersHorizontal, Search, ArrowUpDown, X } from 'lucide-react';

export default function FilterBar({
  selectedCategory,
  onSelectCategory,
  selectedSort,
  onSelectSort,
  searchQuery,
  onSearchChange,
  totalCount,
  onResetFilters,
}) {
  const isFiltered = selectedCategory !== 'ALL' || selectedSort !== 'FEATURED' || searchQuery.trim() !== '';

  return (
    <div className="border-y border-editorial bg-canvas py-4 px-4 sm:px-8 space-y-4">
      {/* Top Row: Search Input + Categories */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`text-xs font-mono font-bold uppercase tracking-wider px-3.5 py-2 whitespace-nowrap transition-all border ${
                  isActive
                    ? 'bg-editorial text-canvas border-editorial shadow-sm'
                    : 'bg-surface text-editorial border-line hover:border-editorial'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search Bar Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="FILTER CATALOGUE..."
            className="w-full bg-surface border border-line pl-9 pr-8 py-2 text-xs font-mono uppercase tracking-wider focus:outline-none focus:border-editorial"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted hover:text-editorial"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Bottom Row: Product Count + Sort Controls + Reset */}
      <div className="flex items-center justify-between pt-2 border-t border-line/60 text-xs font-mono">
        <div className="flex items-center gap-3">
          <span className="font-bold text-editorial uppercase">
            SHOWING {totalCount} {totalCount === 1 ? 'DROP' : 'DROPS'}
          </span>
          {isFiltered && (
            <button
              onClick={onResetFilters}
              className="text-muted hover:text-editorial underline uppercase flex items-center gap-1"
            >
              RESET FILTERS
            </button>
          )}
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-3.5 h-3.5 text-muted shrink-0 hidden sm:inline" />
          <span className="text-muted uppercase text-[11px] hidden sm:inline">SORT BY:</span>
          <select
            value={selectedSort}
            onChange={(e) => onSelectSort(e.target.value)}
            className="bg-surface border border-line text-editorial text-xs font-mono uppercase px-2.5 py-1.5 focus:outline-none focus:border-editorial cursor-pointer"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
