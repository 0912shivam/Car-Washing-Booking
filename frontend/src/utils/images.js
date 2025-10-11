// Car wash and service related images from free image sources

export const images = {
  // Header logo - car wash logo
  logo: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=100&h=100&fit=crop&auto=format',
  
  // Car icons for different makes/types
  car: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop&auto=format',
  
  // Service type images
  services: {
    'Basic Wash': 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=400&h=300&fit=crop&auto=format',
    'Premium Wash': 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=400&h=300&fit=crop&auto=format',
    'Deluxe Wash': 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=400&h=300&fit=crop&auto=format',
    'Interior Cleaning': 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=400&h=300&fit=crop&auto=format',
    'Full Detail': 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=400&h=300&fit=crop&auto=format'
  },
  
  // Icon replacements
  icons: {
    car: 'https://cdn-icons-png.flaticon.com/128/3097/3097150.png',
    service: 'https://cdn-icons-png.flaticon.com/128/2917/2917995.png',
    calendar: 'https://cdn-icons-png.flaticon.com/128/2838/2838779.png',
    clock: 'https://cdn-icons-png.flaticon.com/128/2088/2088617.png',
    search: 'https://cdn-icons-png.flaticon.com/128/622/622669.png'
  }
};

// Get service image with fallback
export const getServiceImage = (serviceType) => {
  return images.services[serviceType] || images.car;
};
