import React, { useState, useEffect } from 'react';
import { bookingService } from '../services/api';
import { Link } from 'react-router-dom';
import './Bookings.css';

const Bookings = () => {
  const [bookings, setBookings] = useState({ upcoming: [], past: [] });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upcoming');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await bookingService.getUserBookings();
      setBookings(response.data.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    try {
      await bookingService.cancelBooking(bookingId);
      fetchBookings();
      alert('Booking cancelled successfully');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to cancel booking');
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const BookingCard = ({ booking, showCancel = false }) => (
    <div className="booking-card">
      <div className="booking-header">
        <h3>{booking.fitnessClass.title}</h3>
        <span className={`booking-status ${booking.status}`}>
          {booking.status}
        </span>
      </div>
      
      <div className="booking-details">
        <div className="detail-row">
          <span className="label">Trainer:</span>
          <span className="value">{booking.fitnessClass.trainer}</span>
        </div>
        <div className="detail-row">
          <span className="label">Date:</span>
          <span className="value">{formatDate(booking.fitnessClass.date)}</span>
        </div>
        <div className="detail-row">
          <span className="label">Time:</span>
          <span className="value">{booking.fitnessClass.time}</span>
        </div>
        <div className="detail-row">
          <span className="label">Duration:</span>
          <span className="value">{booking.fitnessClass.duration} minutes</span>
        </div>
      </div>

      <div className="booking-actions">
        <Link 
          to={`/classes/${booking.fitnessClass._id}`}
          className="btn btn-secondary"
        >
          View Class
        </Link>
        {showCancel && booking.status === 'booked' && (
          <button
            onClick={() => handleCancelBooking(booking._id)}
            className="btn btn-danger"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="bookings-page">
      <div className="container">
        <div className="bookings-header">
          <h1>My Schedule</h1>
          <p>Track your fitness journey and manage your bookings</p>
        </div>

        <div className="bookings-tabs">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
          >
            Upcoming ({bookings.upcoming.length})
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`tab-btn ${activeTab === 'past' ? 'active' : ''}`}
          >
            Past ({bookings.past.length})
          </button>
        </div>

        <div className="bookings-content">
          {activeTab === 'upcoming' && (
            <div className="bookings-section">
              {bookings.upcoming.length === 0 ? (
                <div className="no-bookings">
                  <div className="no-bookings-icon">📅</div>
                  <h3>No upcoming classes</h3>
                  <p>Ready to book your next workout?</p>
                  <Link to="/classes" className="btn btn-primary">
                    Browse Classes
                  </Link>
                </div>
              ) : (
                <div className="bookings-grid">
                  {bookings.upcoming.map((booking) => (
                    <BookingCard
                      key={booking._id}
                      booking={booking}
                      showCancel={true}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'past' && (
            <div className="bookings-section">
              {bookings.past.length === 0 ? (
                <div className="no-bookings">
                  <div className="no-bookings-icon">🏆</div>
                  <h3>No past classes</h3>
                  <p>Start your fitness journey today!</p>
                  <Link to="/classes" className="btn btn-primary">
                    Book Your First Class
                  </Link>
                </div>
              ) : (
                <div className="bookings-grid">
                  {bookings.past.map((booking) => (
                    <BookingCard
                      key={booking._id}
                      booking={booking}
                      showCancel={false}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bookings;