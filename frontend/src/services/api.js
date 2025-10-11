import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://car-washing-booking.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Get all bookings with filters and pagination
export const getBookings = async (params = {}) => {
  try {
    const response = await api.get('/bookings', { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Search bookings
export const searchBookings = async (query) => {
  try {
    const response = await api.get('/bookings/search', { params: { query } });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get booking by ID
export const getBookingById = async (id) => {
  try {
    const response = await api.get(`/bookings/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Create booking
export const createBooking = async (bookingData) => {
  try {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Update booking
export const updateBooking = async (id, bookingData) => {
  try {
    const response = await api.put(`/bookings/${id}`, bookingData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Delete booking
export const deleteBooking = async (id) => {
  try {
    const response = await api.delete(`/bookings/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default api;
