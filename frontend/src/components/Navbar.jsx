import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">
            <span className="brand-text">FIT</span>
            <span className="brand-accent">CLASS</span>
          </Link>

          <div className="navbar-links">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="nav-link">Dashboard</Link>
                <Link to="/classes" className="nav-link">Classes</Link>
                <Link to="/bookings" className="nav-link">My Schedule</Link>
                <Link to="/my-workouts" className="nav-link">Workouts</Link>
                {user?.role === 'admin' && (
                  <Link to="/admin" className="nav-link admin-link">Admin</Link>
                )}
                <div className="user-info">
                  <span className="user-name">{user?.name}</span>
                  <span className={`user-role ${user?.role}`}>{user?.role}</span>
                </div>
                <button onClick={handleLogout} className="btn btn-secondary">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link">Login</Link>
                <Link to="/register" className="btn btn-primary">
                  Join Now
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;