import React, { useState } from 'react';
import Style from './AdvancedFilter.module.css';

const AdvancedFilter = () => {
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const categories = ['all', 'art', 'music', 'virtual worlds', 'trading cards', 'collectibles'];
  const sortOptions = ['newest', 'oldest', 'price high', 'price low'];

  return (
    <div className={Style.advancedFilter}>
      <div className={Style.filterGroup}>
        <h4>Price Range</h4>
        <div className={Style.priceInputs}>
          <input
            type="number"
            value={priceRange.min}
            onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
            placeholder="Min"
          />
          <span>to</span>
          <input
            type="number"
            value={priceRange.max}
            onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
            placeholder="Max"
          />
        </div>
      </div>

      <div className={Style.filterGroup}>
        <h4>Category</h4>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={Style.select}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className={Style.filterGroup}>
        <h4>Sort By</h4>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className={Style.select}
        >
          {sortOptions.map((option) => (
            <option key={option} value={option}>
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default AdvancedFilter;