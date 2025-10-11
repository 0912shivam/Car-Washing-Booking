import React, { useState, useEffect, useCallback } from 'react';
import { getBookings, searchBookings } from '../services/api';
import BookingCard from '../components/BookingCard';
import SearchBar from '../components/SearchBar';
import FilterSidebar from '../components/FilterSidebar';
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/LoadingSpinner';
import './HomePage.css';

const HomePage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    serviceType: '',
    carType: '',
    status: '',
    startDate: '',
    endDate: '',
    sortBy: 'date',
    sortOrder: 'desc'
  });

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    setError('');
    
    try {
      if (searchQuery.trim()) {
        const response = await searchBookings(searchQuery);
        setBookings(response.data);
        setTotalPages(1);
      } else {
        const params = {
          page: currentPage,
          limit: 8,
          ...filters
        };
        
        // Remove empty filters
        Object.keys(params).forEach(key => {
          if (params[key] === '' || params[key] === null) {
            delete params[key];
          }
        });
        
        const response = await getBookings(params);
        setBookings(response.data);
        setTotalPages(response.totalPages || 1);
      }
    } catch (err) {
      setError(err.error || 'Failed to fetch bookings');
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, currentPage, filters]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filters]);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      serviceType: '',
      carType: '',
      status: '',
      startDate: '',
      endDate: '',
      sortBy: 'date',
      sortOrder: 'desc'
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="home-page">
      <div className="container">
        <div className="page-header">
          <h1>Car Wash Bookings</h1>
          <p>Manage and track all your car wash appointments</p>
        </div>

        <SearchBar searchQuery={searchQuery} onSearchChange={handleSearchChange} />

        <div className="content-layout">
          <aside className="sidebar">
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />
          </aside>

          <main className="main-content">
            {loading ? (
              <LoadingSpinner />
            ) : error ? (
              <div className="error-message">
                <p>⚠️ {error}</p>
              </div>
            ) : bookings.length === 0 ? (
              <div className="no-results">
                <p>📭 No bookings found</p>
                <p className="sub-text">Try adjusting your search or filters</p>
              </div>
            ) : (
              <>
                <div className="results-info">
                  <p>Showing {bookings.length} booking(s)</p>
                </div>
                <div className="bookings-grid">
                  {bookings.map((booking) => (
                    <BookingCard key={booking._id} booking={booking} />
                  ))}
                </div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
