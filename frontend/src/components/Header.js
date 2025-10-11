import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { images } from '../utils/images';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          <img src={images.logo} alt="Car Wash" className="logo-icon" />
          <span className="logo-text">Car Wash Booking</span>
        </Link>
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/add" className="nav-link btn-primary">+ New Booking</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
