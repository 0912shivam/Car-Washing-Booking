import React from 'react';
import './FilterSidebar.css';

const FilterSidebar = ({ filters, onFilterChange, onClearFilters }) => {
  const serviceTypes = ['Basic Wash', 'Deluxe Wash', 'Full Detailing'];
  const carTypes = ['Sedan', 'SUV', 'Hatchback', 'Luxury', 'Truck', 'Coupe'];
  const statuses = ['Pending', 'Confirmed', 'Completed', 'Cancelled'];

  return (
    <div className="filter-sidebar">
      <div className="filter-header">
        <h3>Filters</h3>
        <button onClick={onClearFilters} className="clear-btn">Clear All</button>
      </div>

      <div className="filter-section">
        <h4>Service Type</h4>
        <select
          value={filters.serviceType || ''}
          onChange={(e) => onFilterChange('serviceType', e.target.value)}
          className="filter-select"
        >
          <option value="">All Services</option>
          {serviceTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className="filter-section">
        <h4>Car Type</h4>
        <select
          value={filters.carType || ''}
          onChange={(e) => onFilterChange('carType', e.target.value)}
          className="filter-select"
        >
          <option value="">All Car Types</option>
          {carTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className="filter-section">
        <h4>Status</h4>
        <select
          value={filters.status || ''}
          onChange={(e) => onFilterChange('status', e.target.value)}
          className="filter-select"
        >
          <option value="">All Statuses</option>
          {statuses.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>

      <div className="filter-section">
        <h4>Date Range</h4>
        <label className="date-label">From</label>
        <input
          type="date"
          value={filters.startDate || ''}
          onChange={(e) => onFilterChange('startDate', e.target.value)}
          className="filter-input"
        />
        <label className="date-label">To</label>
        <input
          type="date"
          value={filters.endDate || ''}
          onChange={(e) => onFilterChange('endDate', e.target.value)}
          className="filter-input"
        />
      </div>

      <div className="filter-section">
        <h4>Sort By</h4>
        <select
          value={filters.sortBy || 'date'}
          onChange={(e) => onFilterChange('sortBy', e.target.value)}
          className="filter-select"
        >
          <option value="date">Date</option>
          <option value="price">Price</option>
          <option value="duration">Duration</option>
          <option value="status">Status</option>
        </select>
        <select
          value={filters.sortOrder || 'desc'}
          onChange={(e) => onFilterChange('sortOrder', e.target.value)}
          className="filter-select"
          style={{ marginTop: '0.5rem' }}
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSidebar;
