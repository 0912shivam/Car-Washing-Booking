import React from 'react';
import { Link } from 'react-router-dom';
import './BookingCard.css';
import { images } from '../utils/images';

const BookingCard = ({ booking }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
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
    if (!rating) return null;
    return (
      <div className="rating">
        {[...Array(5)].map((_, index) => (
          <span key={index} className={index < rating ? 'star filled' : 'star'}>
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <Link to={`/booking/${booking._id}`} className="booking-card">
      <div className="card-header">
        <h3 className="customer-name">{booking.customerName}</h3>
        <span className={`status-badge ${getStatusClass(booking.status)}`}>
          {booking.status}
        </span>
      </div>

      <div className="card-body">
        <div className="info-row">
          <img src={images.icons.car} alt="Car" className="icon" />
          <span className="info-text">
            {booking.carDetails.year} {booking.carDetails.make} {booking.carDetails.model}
          </span>
        </div>

        <div className="info-row">
          <img src={images.icons.service} alt="Service" className="icon" />
          <span className="info-text">{booking.serviceType}</span>
        </div>

        <div className="info-row">
          <img src={images.icons.calendar} alt="Date" className="icon" />
          <span className="info-text">{formatDate(booking.date)}</span>
        </div>

        <div className="info-row">
          <img src={images.icons.clock} alt="Time" className="icon" />
          <span className="info-text">{booking.timeSlot}</span>
        </div>

        <div className="card-footer">
          <div className="price">
            <span className="price-label">Price:</span>
            <span className="price-value">${booking.price.toFixed(2)}</span>
          </div>
          {renderStars(booking.rating)}
        </div>
      </div>
    </Link>
  );
};

export default BookingCard;
