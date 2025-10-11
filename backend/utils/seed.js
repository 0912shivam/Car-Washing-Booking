const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Booking = require('../models/Booking');

dotenv.config();

const sampleBookings = [
  {
    customerName: 'John Smith',
    carDetails: {
      make: 'Toyota',
      model: 'Camry',
      year: 2021,
      type: 'Sedan',
    },
    serviceType: 'Basic Wash',
    date: new Date('2025-10-15'),
    timeSlot: '10:00 AM - 11:00 AM',
    duration: 60,
    price: 25.99,
    status: 'Confirmed',
    rating: 4,
    addOns: ['Air Freshener'],
  },
  {
    customerName: 'Sarah Johnson',
    carDetails: {
      make: 'Honda',
      model: 'CR-V',
      year: 2022,
      type: 'SUV',
    },
    serviceType: 'Deluxe Wash',
    date: new Date('2025-10-12'),
    timeSlot: '02:00 PM - 03:30 PM',
    duration: 90,
    price: 45.99,
    status: 'Completed',
    rating: 5,
    addOns: ['Interior Cleaning', 'Tire Shine'],
  },
  {
    customerName: 'Michael Chen',
    carDetails: {
      make: 'BMW',
      model: '5 Series',
      year: 2023,
      type: 'Luxury',
    },
    serviceType: 'Full Detailing',
    date: new Date('2025-10-18'),
    timeSlot: '09:00 AM - 12:00 PM',
    duration: 180,
    price: 149.99,
    status: 'Pending',
    addOns: ['Polishing', 'Interior Cleaning', 'Engine Cleaning'],
  },
  {
    customerName: 'Emily Davis',
    carDetails: {
      make: 'Volkswagen',
      model: 'Golf',
      year: 2020,
      type: 'Hatchback',
    },
    serviceType: 'Basic Wash',
    date: new Date('2025-10-08'),
    timeSlot: '11:00 AM - 12:00 PM',
    duration: 60,
    price: 22.99,
    status: 'Cancelled',
    addOns: [],
  },
  {
    customerName: 'Robert Martinez',
    carDetails: {
      make: 'Ford',
      model: 'Explorer',
      year: 2021,
      type: 'SUV',
    },
    serviceType: 'Deluxe Wash',
    date: new Date('2025-10-14'),
    timeSlot: '03:00 PM - 04:30 PM',
    duration: 90,
    price: 48.99,
    status: 'Confirmed',
    rating: null,
    addOns: ['Interior Cleaning'],
  },
  {
    customerName: 'Lisa Anderson',
    carDetails: {
      make: 'Mercedes-Benz',
      model: 'E-Class',
      year: 2023,
      type: 'Luxury',
    },
    serviceType: 'Full Detailing',
    date: new Date('2025-10-05'),
    timeSlot: '08:00 AM - 11:00 AM',
    duration: 180,
    price: 159.99,
    status: 'Completed',
    rating: 5,
    addOns: ['Polishing', 'Interior Cleaning', 'Headlight Restoration'],
  },
  {
    customerName: 'David Wilson',
    carDetails: {
      make: 'Mazda',
      model: 'CX-5',
      year: 2022,
      type: 'SUV',
    },
    serviceType: 'Basic Wash',
    date: new Date('2025-10-20'),
    timeSlot: '01:00 PM - 02:00 PM',
    duration: 60,
    price: 27.99,
    status: 'Pending',
    addOns: ['Tire Shine'],
  },
  {
    customerName: 'Jennifer Brown',
    carDetails: {
      make: 'Audi',
      model: 'A4',
      year: 2021,
      type: 'Sedan',
    },
    serviceType: 'Deluxe Wash',
    date: new Date('2025-10-10'),
    timeSlot: '10:30 AM - 12:00 PM',
    duration: 90,
    price: 44.99,
    status: 'Completed',
    rating: 4,
    addOns: ['Interior Cleaning'],
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB Connected...');

    // Clear existing bookings
    await Booking.deleteMany({});
    console.log('Cleared existing bookings');

    // Insert sample bookings
    await Booking.insertMany(sampleBookings);
    console.log('Sample bookings added successfully!');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
