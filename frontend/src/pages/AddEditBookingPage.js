import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getBookingById, createBooking, updateBooking } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import './AddEditBookingPage.css';

const AddEditBookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [loading, setLoading] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    customerName: '',
    carDetails: {
      make: '',
      model: '',
      year: new Date().getFullYear(),
      type: 'Sedan'
    },
    serviceType: 'Basic Wash',
    date: '',
    timeSlot: '',
    duration: 60,
    price: 25.99,
    status: 'Pending',
    rating: '',
    addOns: []
  });

  const [availableAddOns] = useState([
    'Interior Cleaning',
    'Polishing',
    'Tire Shine',
    'Engine Cleaning',
    'Headlight Restoration',
    'Air Freshener'
  ]);

  useEffect(() => {
    if (isEditMode) {
      fetchBooking();
    }
  }, [id]);

  const fetchBooking = async () => {
    try {
      const response = await getBookingById(id);
      const booking = response.data;
      
      // Format date for input field
      const formattedDate = new Date(booking.date).toISOString().split('T')[0];
      
      setFormData({
        customerName: booking.customerName,
        carDetails: booking.carDetails,
        serviceType: booking.serviceType,
        date: formattedDate,
        timeSlot: booking.timeSlot,
        duration: booking.duration,
        price: booking.price,
        status: booking.status,
        rating: booking.rating || '',
        addOns: booking.addOns || []
      });
    } catch (err) {
      setError(err.error || 'Failed to fetch booking');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('car.')) {
      const carField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        carDetails: {
          ...prev.carDetails,
          [carField]: carField === 'year' ? parseInt(value) : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: ['duration', 'price', 'rating'].includes(name) 
          ? (value === '' ? '' : parseFloat(value)) 
          : value
      }));
    }
  };

  const handleAddOnToggle = (addOn) => {
    setFormData(prev => ({
      ...prev,
      addOns: prev.addOns.includes(addOn)
        ? prev.addOns.filter(a => a !== addOn)
        : [...prev.addOns, addOn]
    }));
  };

  const handleServiceTypeChange = (e) => {
    const serviceType = e.target.value;
    let duration = 60;
    let price = 25.99;

    // Auto-adjust duration and price based on service type
    if (serviceType === 'Deluxe Wash') {
      duration = 90;
      price = 45.99;
    } else if (serviceType === 'Full Detailing') {
      duration = 180;
      price = 149.99;
    }

    setFormData(prev => ({
      ...prev,
      serviceType,
      duration,
      price
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const submitData = {
        ...formData,
        rating: formData.rating === '' ? null : formData.rating
      };

      if (isEditMode) {
        await updateBooking(id, submitData);
      } else {
        await createBooking(submitData);
      }

      navigate('/');
    } catch (err) {
      setError(err.error || err.errors?.join(', ') || 'Failed to save booking');
      console.error('Error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="add-edit-page">
      <div className="container">
        <div className="form-card">
          <div className="form-header">
            <Link to="/" className="back-link">← Back</Link>
            <h1>{isEditMode ? 'Edit Booking' : 'New Booking'}</h1>
          </div>

          {error && (
            <div className="error-banner">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="booking-form">
            {/* Customer Information */}
            <section className="form-section">
              <h2>Customer Information</h2>
              <div className="form-row">
                <div className="form-group full-width">
                  <label htmlFor="customerName">Customer Name *</label>
                  <input
                    type="text"
                    id="customerName"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter customer name"
                  />
                </div>
              </div>
            </section>

            {/* Vehicle Details */}
            <section className="form-section">
              <h2>Vehicle Details</h2>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="car.make">Make *</label>
                  <input
                    type="text"
                    id="car.make"
                    name="car.make"
                    value={formData.carDetails.make}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Toyota"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="car.model">Model *</label>
                  <input
                    type="text"
                    id="car.model"
                    name="car.model"
                    value={formData.carDetails.model}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Camry"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="car.year">Year *</label>
                  <input
                    type="number"
                    id="car.year"
                    name="car.year"
                    value={formData.carDetails.year}
                    onChange={handleInputChange}
                    required
                    min="1900"
                    max={new Date().getFullYear() + 1}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="car.type">Type *</label>
                  <select
                    id="car.type"
                    name="car.type"
                    value={formData.carDetails.type}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="Luxury">Luxury</option>
                    <option value="Truck">Truck</option>
                    <option value="Coupe">Coupe</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Service Information */}
            <section className="form-section">
              <h2>Service Information</h2>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="serviceType">Service Type *</label>
                  <select
                    id="serviceType"
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleServiceTypeChange}
                    required
                  >
                    <option value="Basic Wash">Basic Wash</option>
                    <option value="Deluxe Wash">Deluxe Wash</option>
                    <option value="Full Detailing">Full Detailing</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="duration">Duration (minutes) *</label>
                  <input
                    type="number"
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    required
                    min="15"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="price">Price ($) *</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="status">Status *</label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Appointment Details */}
            <section className="form-section">
              <h2>Appointment Details</h2>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="date">Date *</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="timeSlot">Time Slot *</label>
                  <input
                    type="text"
                    id="timeSlot"
                    name="timeSlot"
                    value={formData.timeSlot}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., 10:00 AM - 11:00 AM"
                  />
                </div>
              </div>
            </section>

            {/* Add-ons */}
            <section className="form-section">
              <h2>Add-ons</h2>
              <div className="addon-checkboxes">
                {availableAddOns.map(addOn => (
                  <label key={addOn} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.addOns.includes(addOn)}
                      onChange={() => handleAddOnToggle(addOn)}
                    />
                    <span>{addOn}</span>
                  </label>
                ))}
              </div>
            </section>

            {/* Rating */}
            <section className="form-section">
              <h2>Rating (Optional)</h2>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="rating">Rating (1-5)</label>
                  <input
                    type="number"
                    id="rating"
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    min="1"
                    max="5"
                    placeholder="Leave empty if not rated"
                  />
                </div>
              </div>
            </section>

            {/* Submit Buttons */}
            <div className="form-actions">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="btn btn-secondary"
                disabled={submitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={submitting}
              >
                {submitting ? 'Saving...' : isEditMode ? 'Update Booking' : 'Create Booking'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEditBookingPage;
