import React from 'react';
import './SearchBar.css';
import { images } from '../utils/images';

const SearchBar = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by customer name or car details..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
      />
      <img src={images.icons.search} alt="Search" className="search-icon" />
    </div>
  );
};

export default SearchBar;
