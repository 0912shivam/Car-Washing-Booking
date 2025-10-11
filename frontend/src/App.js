import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import BookingDetailPage from './pages/BookingDetailPage';
import AddEditBookingPage from './pages/AddEditBookingPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/booking/:id" element={<BookingDetailPage />} />
          <Route path="/add" element={<AddEditBookingPage />} />
          <Route path="/edit/:id" element={<AddEditBookingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
