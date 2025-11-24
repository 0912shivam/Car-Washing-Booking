# Car Wash Booking Application

A full-stack MERN (MongoDB, Express.js, React, Node.js) web application for managing car wash service bookings. Users can create, view, update, and delete bookings, search and filter appointments, and track service status.

![Car Wash Booking](screenshots/Screenshot%20(194).png)

## 🚀 Features

### Core Functionality
- **Full CRUD Operations**: Create, Read, Update, and Delete car wash bookings
- **Advanced Search**: Real-time search by customer name, car make, and car model
- **Smart Filtering**: Filter bookings by:
  - Service Type (Basic Wash, Deluxe Wash, Full Detailing)
  - Car Type (Sedan, SUV, Hatchback, Luxury, Truck, Coupe)
  - Status (Pending, Confirmed, Completed, Cancelled)
  - Date Range
- **Sorting Options**: Sort by date, price, duration, or status
- **Pagination**: Display 8-10 bookings per page for better performance
- **Responsive Design**: Mobile-first design that works on all devices

### Bonus Features
- ⭐ **Rating System**: 1-5 star rating for completed services
- 🎨 **Service Add-ons**: Interior Cleaning, Polishing, Tire Shine, Engine Cleaning, etc.
- 📊 **Booking Status Tracking**: Visual status indicators
- 🔍 **Real-time Search**: Instant search results as you type
- 💳 **Dynamic Pricing**: Automatic price adjustment based on service type

## 🛠️ Tech Stack

### Frontend
- **React** 18.2.0 - UI library
- **React Router DOM** 6.16.0 - Client-side routing
- **Axios** 1.5.0 - HTTP client
- **CSS3** - Custom styling with responsive design

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** 4.18.2 - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** 7.5.0 - MongoDB ODM
- **Morgan** - HTTP request logger
- **CORS** - Cross-Origin Resource Sharing

## 📁 Project Structure

```
Shivam_assignment/
├── backend/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   └── bookingController.js # Business logic
│   ├── middleware/
│   │   ├── errorHandler.js      # Error handling
│   │   └── validation.js        # Input validation
│   ├── models/
│   │   └── Booking.js           # Booking schema
│   ├── routes/
│   │   └── bookingRoutes.js     # API routes
│   ├── utils/
│   │   └── seed.js              # Database seeding
│   ├── .env                     # Environment variables
│   ├── .gitignore
│   ├── package.json
│   └── server.js                # Entry point
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── BookingCard.js
│   │   │   ├── FilterSidebar.js
│   │   │   ├── Header.js
│   │   │   ├── LoadingSpinner.js
│   │   │   ├── Pagination.js
│   │   │   └── SearchBar.js
│   │   ├── pages/
│   │   │   ├── AddEditBookingPage.js
│   │   │   ├── BookingDetailPage.js
│   │   │   └── HomePage.js
│   │   ├── services/
│   │   │   └── api.js           # API service
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── .gitignore
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Installation

#### 1. Clone the repository
```bash
git clone <repository-url>
cd Shivam_assignment
```

#### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file (already exists, modify if needed)
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/car-wash-booking
# NODE_ENV=development

# Start MongoDB (if not running)
# macOS (with Homebrew):
brew services start mongodb-community

# Windows:
# Start MongoDB service from Services

# Linux:
sudo systemctl start mongodb

# Seed the database with sample data
npm run seed

# Start the backend server
npm run dev
```

The backend server will run on `http://localhost:5000`

#### 3. Frontend Setup
```bash
# Open a new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

The frontend application will run on `http://localhost:3000`

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### Get All Bookings (with filtering and pagination)
```http
GET /bookings
```

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10)
- `serviceType` (string): Filter by service type
- `carType` (string): Filter by car type
- `status` (string): Filter by status
- `startDate` (date): Filter by start date
- `endDate` (date): Filter by end date
- `sortBy` (string): Sort field (default: date)
- `sortOrder` (string): asc or desc (default: desc)

**Example:**
```bash
curl "http://localhost:5000/api/bookings?page=1&limit=10&status=Confirmed"
```

#### Search Bookings
```http
GET /bookings/search?query=<search_term>
```

**Example:**
```bash
curl "http://localhost:5000/api/bookings/search?query=John"
```

#### Get Booking by ID
```http
GET /bookings/:id
```

**Example:**
```bash
curl http://localhost:5000/api/bookings/507f1f77bcf86cd799439011
```

#### Create New Booking
```http
POST /bookings
Content-Type: application/json
```

**Request Body:**
```json
{
  "customerName": "John Smith",
  "carDetails": {
    "make": "Toyota",
    "model": "Camry",
    "year": 2021,
    "type": "Sedan"
  },
  "serviceType": "Basic Wash",
  "date": "2025-10-15T00:00:00.000Z",
  "timeSlot": "10:00 AM - 11:00 AM",
  "duration": 60,
  "price": 25.99,
  "status": "Pending",
  "rating": null,
  "addOns": ["Air Freshener"]
}
```

#### Update Booking
```http
PUT /bookings/:id
Content-Type: application/json
```

**Request Body:** Same as Create Booking

#### Delete Booking
```http
DELETE /bookings/:id
```

### Response Format

**Success Response:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Error message",
  "errors": ["Detailed error 1", "Detailed error 2"]
}
```

## 📊 Database Schema

### Booking Model

```javascript
{
  customerName: String (required),
  carDetails: {
    make: String (required),
    model: String (required),
    year: Number (required, 1900-2026),
    type: String (required, enum: ['Sedan', 'SUV', 'Hatchback', 'Luxury', 'Truck', 'Coupe'])
  },
  serviceType: String (required, enum: ['Basic Wash', 'Deluxe Wash', 'Full Detailing']),
  date: Date (required),
  timeSlot: String (required),
  duration: Number (required, min: 15),
  price: Number (required, min: 0),
  status: String (required, enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled']),
  rating: Number (optional, 1-5),
  addOns: [String],
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

### Indexes
- Text index on: customerName, carDetails.make, carDetails.model
- Single indexes on: date, status, serviceType

## 📸 Screenshots

### Homepage
![Homepage](https://via.placeholder.com/800x500?text=Homepage+-+Booking+Grid+View)
*Displays all bookings in a responsive grid with search and filter options*

### Booking Detail Page
![Booking Detail](https://via.placeholder.com/800x500?text=Booking+Detail+Page)
*Shows complete booking information with edit and delete options*

### Add/Edit Booking
![Add Booking](https://via.placeholder.com/800x500?text=Add+Edit+Booking+Form)
*Comprehensive form for creating or editing bookings*

### Search Results
![Search Results](https://via.placeholder.com/800x500?text=Search+Results)
*Real-time search functionality*

### Mobile View - Homepage
![Mobile Homepage](https://via.placeholder.com/375x667?text=Mobile+Homepage)
*Responsive design for mobile devices*

### Mobile View - Booking Detail
![Mobile Detail](https://via.placeholder.com/375x667?text=Mobile+Booking+Detail)
*Mobile-optimized detail view*

## 🧪 Sample Data

The application includes 8 sample bookings with:
- Multiple car types (Sedan, SUV, Hatchback, Luxury)
- All service types (Basic Wash, Deluxe Wash, Full Detailing)
- Various statuses (Pending, Confirmed, Completed, Cancelled)
- Past, present, and future dates
- Different add-ons and ratings

To load sample data:
```bash
cd backend
npm run seed
```

## 🔍 Testing

### Manual Testing Checklist
- [ ] Create a new booking
- [ ] View all bookings with pagination
- [ ] Search bookings by customer name
- [ ] Filter by service type
- [ ] Filter by car type
- [ ] Filter by status
- [ ] Filter by date range
- [ ] Sort by different fields
- [ ] View booking details
- [ ] Edit an existing booking
- [ ] Delete a booking (with confirmation)
- [ ] Test responsive design on mobile
- [ ] Test loading states
- [ ] Test error handling

## 🚀 Deployment

### Backend Deployment (Heroku/Railway/Render)
1. Create a new app on your hosting platform
2. Set environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `NODE_ENV`: production
3. Deploy from Git repository

### Frontend Deployment (Vercel/Netlify)
1. Build the production version:
   ```bash
   cd frontend
   npm run build
   ```
2. Deploy the `build` folder
3. Set environment variable:
   - `REACT_APP_API_URL`: Your backend API URL

## 🐛 Known Issues/Limitations

- No user authentication implemented (as per requirements)
- Hard delete is used (consider soft delete for production)
- No email notifications for booking confirmations
- Time slot validation is text-based (could use time picker)
- No payment integration

## 🔮 Future Enhancements

- User authentication and authorization
- Email notifications
- SMS reminders
- Payment integration
- Calendar view for bookings
- Employee management
- Service history tracking
- Loyalty program
- Multi-location support
- Invoice generation with PDF download

## 👨‍💻 Author

SHIVAM SHARMA
- GitHub: 0912shivam
- Email: sharmashivam8970@gmail.com

## 📝 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- MongoDB for the database
- React team for the amazing framework
- Express.js for the backend framework
- All open-source contributors

---

**Note:** Make sure MongoDB is running before starting the application. Update the `.env` file with your specific configuration if needed.
