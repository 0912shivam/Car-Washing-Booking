const express = require('express');
const router = express.Router();
const {
  getBookings,
  searchBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
} = require('../controllers/bookingController');
const { validateBooking } = require('../middleware/validation');

// Search route must come before /:id to avoid conflicts
router.get('/search', searchBookings);

// Main CRUD routes
router.route('/')
  .get(getBookings)
  .post(validateBooking, createBooking);

router.route('/:id')
  .get(getBookingById)
  .put(validateBooking, updateBooking)
  .delete(deleteBooking);

module.exports = router;
