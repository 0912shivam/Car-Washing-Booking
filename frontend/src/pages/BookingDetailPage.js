import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getBookingById, deleteBooking } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import './BookingDetailPage.css';

const BookingDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    fetchBooking();
  }, [id]);

  const fetchBooking = async () => {
    try {
      const response = await getBookingById(id);
      setBooking(response.data);
    } catch (err) {
      setError(err.error || 'Failed to fetch booking details');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteBooking(id);
      navigate('/');
    } catch (err) {
      setError(err.error || 'Failed to delete booking');
      console.error('Error:', err);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusClass = (status) => {
    const statusClasses = {
      'Pending': 'status-pending',
      'Confirmed': 'status-confirmed',
      'Completed': 'status-completed',
      'Cancelled': 'status-cancelled'
    };
    return statusClasses[status] || '';
  };

  const renderStars = (rating) => {
    if (!rating) return <span className="no-rating">Not rated yet</span>;
    return (
      <div className="rating-display">
        {[...Array(5)].map((_, index) => (
          <span key={index} className={index < rating ? 'star filled' : 'star'}>
            ★
          </span>
        ))}
        <span className="rating-text">({rating}/5)</span>
      </div>
    );
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error-page"><p>⚠️ {error}</p></div>;
  if (!booking) return <div className="error-page"><p>Booking not found</p></div>;

  return (
    <div className="booking-detail-page">
      <div className="container">
        <div className="detail-card">
          <div className="detail-header">
            <div>
              <Link to="/" className="back-link">← Back to All Bookings</Link>
              <h1>Booking Details</h1>
            </div>
            <div className="action-buttons">
              <Link to={`/edit/${booking._id}`} className="btn btn-edit">
                ✏️ Edit
              </Link>
              <button onClick={() => setShowDeleteConfirm(true)} className="btn btn-delete">
                🗑️ Delete
              </button>
            </div>
          </div>

          <div className="detail-content">
            <div className="detail-section">
              <h2>Customer Information</h2>
              <div className="info-grid">
                <div className="info-item">
                  <label>Customer Name</label>
                  <p>{booking.customerName}</p>
                </div>
                <div className="info-item">
                  <label>Status</label>
                  <span className={`status-badge ${getStatusClass(booking.status)}`}>
                    {booking.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h2>Vehicle Details</h2>
              <div className="info-grid">
                <div className="info-item">
                  <label>Make</label>
                  <p>{booking.carDetails.make}</p>
                </div>
                <div className="info-item">
                  <label>Model</label>
                  <p>{booking.carDetails.model}</p>
                </div>
                <div className="info-item">
                  <label>Year</label>
                  <p>{booking.carDetails.year}</p>
                </div>
                <div className="info-item">
                  <label>Type</label>
                  <p>{booking.carDetails.type}</p>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h2>Service Information</h2>
              <div className="info-grid">
                <div className="info-item">
                  <label>Service Type</label>
                  <p className="service-type">{booking.serviceType}</p>
                </div>
                <div className="info-item">
                  <label>Duration</label>
                  <p>{booking.duration} minutes</p>
                </div>
                <div className="info-item">
                  <label>Price</label>
                  <p className="price-large">${booking.price.toFixed(2)}</p>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h2>Appointment Details</h2>
              <div className="info-grid">
                <div className="info-item">
                  <label>Date</label>
                  <p>{formatDate(booking.date)}</p>
                </div>
                <div className="info-item">
                  <label>Time Slot</label>
                  <p>{booking.timeSlot}</p>
                </div>
              </div>
            </div>

            {booking.addOns && booking.addOns.length > 0 && (
              <div className="detail-section">
                <h2>Add-ons</h2>
                <div className="addon-list">
                  {booking.addOns.map((addon, index) => (
                    <span key={index} className="addon-badge">
                      ✓ {addon}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="detail-section">
              <h2>Rating</h2>
              {renderStars(booking.rating)}
            </div>

            <div className="detail-section">
              <div className="info-grid">
                <div className="info-item">
                  <label>Created At</label>
                  <p>{new Date(booking.createdAt).toLocaleString()}</p>
                </div>
                <div className="info-item">
                  <label>Last Updated</label>
                  <p>{new Date(booking.updatedAt).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="modal-overlay" onClick={() => setShowDeleteConfirm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this booking? This action cannot be undone.</p>
            <div className="modal-actions">
              <button onClick={() => setShowDeleteConfirm(false)} className="btn btn-secondary">
                Cancel
              </button>
              <button onClick={handleDelete} className="btn btn-delete">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingDetailPage;
