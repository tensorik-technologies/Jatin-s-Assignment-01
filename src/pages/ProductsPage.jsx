import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductGrid from '../components/products/ProductGrid';
import SearchBar from '../components/products/SearchBar';
import CategoryFilter from '../components/products/CategoryFilter';
import PriceFilter from '../components/products/PriceFilter';
import SortDropdown from '../components/products/SortDropdown';
import { Filter, SlidersHorizontal, RotateCcw, Sparkles } from 'lucide-react';

export default function ProductsPage() {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  // Extract initial filters from URL search params
  const initialCategory = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('search') || '';
  const initialSort = searchParams.get('sort') || 'featured';

  const [category, setCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortOption, setSortOption] = useState(initialSort);
  const [maxPrice, setMaxPrice] = useState(200000);
  const [isLoading, setIsLoading] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync state if URL query params change (e.g. clicking category link in navbar)
  useEffect(() => {
    const urlCategory = searchParams.get('category');
    if (urlCategory && urlCategory !== category) {
      setCategory(urlCategory);
    }
    const urlSearch = searchParams.get('search');
    if (urlSearch !== null && urlSearch !== searchQuery) {
      setSearchQuery(urlSearch);
    }
  }, [searchParams]);

  // Simulate instant skeleton loader transition when changing major filters
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 200);
    return () => clearTimeout(timer);
  }, [category, sortOption, maxPrice]);

  // Update URL search parameters
  const updateParams = (newCat, newSearch, newSort) => {
    const params = {};
    if (newCat && newCat.toLowerCase() !== 'all') params.category = newCat;
    if (newSearch) params.search = newSearch;
    if (newSort && newSort !== 'featured') params.sort = newSort;
    setSearchParams(params);
  };

  const handleCategoryChange = (newCat) => {
    setCategory(newCat);
    updateParams(newCat, searchQuery, sortOption);
  };

  const handleSearchChange = (newQuery) => {
    setSearchQuery(newQuery);
    updateParams(category, newQuery, sortOption);
  };

  const handleSortChange = (newSort) => {
    setSortOption(newSort);
    updateParams(category, searchQuery, newSort);
  };

  const handleResetFilters = () => {
    setCategory('All');
    setSearchQuery('');
    setSortOption('featured');
    setMaxPrice(200000);
    setSearchParams({});
  };

  // Filter and sort the products list
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // 1. Category filter
      if (category.toLowerCase() !== 'all' && product.category.toLowerCase() !== category.toLowerCase()) {
        return false;
      }

      // 2. Search query filter across name, brand, category, description, tags
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesBrand = product.brand.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesTag = product.tags && product.tags.some(t => t.toLowerCase().includes(query));

        if (!matchesName && !matchesBrand && !matchesCategory && !matchesDesc && !matchesTag) {
          return false;
        }
      }

      // 3. Price range filter
      if (product.price > maxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      // 4. Sorting logic
      if (sortOption === 'price-low') {
        return a.price - b.price;
      } else if (sortOption === 'price-high') {
        return b.price - a.price;
      } else if (sortOption === 'rating') {
        return b.rating - a.rating;
      } else if (sortOption === 'discount-high') {
        return (b.discount || 0) - (a.discount || 0);
      } else {
        // 'featured'
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      }
    });
  }, [category, searchQuery, maxPrice, sortOption]);

  const hasActiveFilters = category.toLowerCase() !== 'all' || searchQuery.trim() !== '' || maxPrice < 10000 || sortOption !== 'featured';

  return (
    <div className="products-page animate-fade-in" style={{ padding: '2.5rem 0 5rem' }}>
      <div className="container">
        
        {/* Page Header */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          marginBottom: '2rem',
          paddingBottom: '1.5rem',
          borderBottom: '1px solid var(--border-color)'
        }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
              Explore Products
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', marginTop: '0.25rem' }}>
              Showing <strong style={{ color: 'var(--primary)' }}>{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'item' : 'items'} available
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="btn btn-secondary btn-sm"
                style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                title="Reset all active filters"
              >
                <RotateCcw size={14} />
                <span>Reset Filters</span>
              </button>
            )}

            <SortDropdown value={sortOption} onChange={handleSortChange} />
          </div>
        </div>

        {/* Layout Grid: Sidebar Filters + Main Product Feed */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '2rem'
        }} className="products-layout">
          
          {/* Main Controls & Products */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Search and Category Filter Strip */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.25rem',
              boxShadow: 'var(--shadow-xs)'
            }}>
              <SearchBar
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search by product name, brand, features (e.g. headphones, watch, jacket)..."
              />

              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.65rem' }}>
                  Filter By Category
                </div>
                <CategoryFilter
                  selectedCategory={category}
                  onSelectCategory={handleCategoryChange}
                />
              </div>

              {/* Price Filter Slider */}
              <PriceFilter
                min={0}
                max={200000}
                currentMax={maxPrice}
                onChange={setMaxPrice}
                onReset={() => setMaxPrice(200000)}
              />
            </div>

            {/* Product Grid */}
            <ProductGrid
              products={filteredProducts}
              isLoading={isLoading}
              onResetFilters={handleResetFilters}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
