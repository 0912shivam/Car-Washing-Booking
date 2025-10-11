const Booking = require('../models/Booking');

// @desc    Get all bookings with filtering and pagination
// @route   GET /api/bookings
// @access  Public
const getBookings = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      serviceType,
      carType,
      status,
      startDate,
      endDate,
      sortBy = 'date',
      sortOrder = 'desc',
    } = req.query;

    // Build filter object
    const filter = {};

    if (serviceType) {
      filter.serviceType = serviceType;
    }

    if (carType) {
      filter['carDetails.type'] = carType;
    }

    if (status) {
      filter.status = status;
    }

    // Date range filtering
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) {
        filter.date.$gte = new Date(startDate);
      }
      if (endDate) {
        filter.date.$lte = new Date(endDate);
      }
    }

    // Sorting
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const limitNum = parseInt(limit);

    // Execute query
    const bookings = await Booking.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNum);

    // Get total count for pagination
    const total = await Booking.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: bookings.length,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limitNum),
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Search bookings by customer name or car details
// @route   GET /api/bookings/search
// @access  Public
const searchBookings = async (req, res, next) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        error: 'Search query is required',
      });
    }

    // Search using text index or regex
    const bookings = await Booking.find({
      $or: [
        { customerName: { $regex: query, $options: 'i' } },
        { 'carDetails.make': { $regex: query, $options: 'i' } },
        { 'carDetails.model': { $regex: query, $options: 'i' } },
      ],
    }).sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single booking by ID
// @route   GET /api/bookings/:id
// @access  Public
const getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found',
      });
    }

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Public
const createBooking = async (req, res, next) => {
  try {
    const booking = await Booking.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update booking
// @route   PUT /api/bookings/:id
// @access  Public
const updateBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Booking updated successfully',
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete booking
// @route   DELETE /api/bookings/:id
// @access  Public
const deleteBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Booking deleted successfully',
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBookings,
  searchBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
};
