const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
    },
    carDetails: {
      make: {
        type: String,
        required: [true, 'Car make is required'],
        trim: true,
      },
      model: {
        type: String,
        required: [true, 'Car model is required'],
        trim: true,
      },
      year: {
        type: Number,
        required: [true, 'Car year is required'],
        min: [1900, 'Year must be after 1900'],
        max: [new Date().getFullYear() + 1, 'Year cannot be in the future'],
      },
      type: {
        type: String,
        required: [true, 'Car type is required'],
        enum: ['Sedan', 'SUV', 'Hatchback', 'Luxury', 'Truck', 'Coupe'],
      },
    },
    serviceType: {
      type: String,
      required: [true, 'Service type is required'],
      enum: ['Basic Wash', 'Deluxe Wash', 'Full Detailing'],
    },
    date: {
      type: Date,
      required: [true, 'Booking date is required'],
    },
    timeSlot: {
      type: String,
      required: [true, 'Time slot is required'],
    },
    duration: {
      type: Number,
      required: [true, 'Duration is required'],
      min: [15, 'Duration must be at least 15 minutes'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    status: {
      type: String,
      required: [true, 'Status is required'],
      enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
    rating: {
      type: Number,
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot be more than 5'],
      default: null,
    },
    addOns: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
bookingSchema.index({ customerName: 'text', 'carDetails.make': 'text', 'carDetails.model': 'text' });
bookingSchema.index({ date: 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ serviceType: 1 });

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
