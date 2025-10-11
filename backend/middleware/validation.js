const validator = require('validator');

const validateBooking = (req, res, next) => {
  const { customerName, carDetails, serviceType, date, timeSlot, duration, price } = req.body;

  const errors = [];

  // Validate customer name
  if (!customerName || !validator.isLength(customerName.trim(), { min: 2 })) {
    errors.push('Customer name must be at least 2 characters long');
  }

  // Validate car details
  if (!carDetails) {
    errors.push('Car details are required');
  } else {
    if (!carDetails.make || !validator.isLength(carDetails.make.trim(), { min: 2 })) {
      errors.push('Car make must be at least 2 characters long');
    }
    if (!carDetails.model || !validator.isLength(carDetails.model.trim(), { min: 1 })) {
      errors.push('Car model is required');
    }
    if (!carDetails.year || !validator.isInt(String(carDetails.year), { min: 1900, max: new Date().getFullYear() + 1 })) {
      errors.push('Valid car year is required');
    }
  }

  // Validate date
  if (date && !validator.isISO8601(date)) {
    errors.push('Valid date is required');
  }

  // Validate duration
  if (duration && !validator.isInt(String(duration), { min: 15 })) {
    errors.push('Duration must be at least 15 minutes');
  }

  // Validate price
  if (price && !validator.isFloat(String(price), { min: 0 })) {
    errors.push('Price must be a positive number');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      errors,
    });
  }

  next();
};

module.exports = { validateBooking };
