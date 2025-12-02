import React, { useState, useEffect } from 'react';
import { classService, bookingService } from '../services/api';
import ClassCard from '../components/ClassCard';
import { useAuth } from '../context/AuthContext';
import './Classes.css';

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [userBookings, setUserBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('upcoming');
  const [error, setError] = useState('');
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchClasses();
    if (isAuthenticated) {
      fetchUserBookings();
    }
  }, [filter, isAuthenticated]);

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const response = await classService.getClasses(filter);
      setClasses(response.data.data);
    } catch (error) {
      setError('Failed to fetch classes');
      console.error('Error fetching classes:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserBookings = async () => {
    try {
      const response = await bookingService.getUserBookings();
      const { upcoming } = response.data.data;
      setUserBookings(upcoming);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleBookClass = async (classId) => {
    try {
      await bookingService.bookClass(classId);
      fetchClasses();
      fetchUserBookings();
      alert('Class booked successfully!');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to book class');
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="classes-page">
      <div className="container">
        <div className="classes-header">
          <h1>Fitness Classes</h1>
          <p>Choose your next challenge and push your limits</p>
        </div>

        <div className="classes-filters">
          <button
            onClick={() => setFilter('upcoming')}
            className={`filter-btn ${filter === 'upcoming' ? 'active' : ''}`}
          >
            Upcoming Classes
          </button>
          <button
            onClick={() => setFilter('past')}
            className={`filter-btn ${filter === 'past' ? 'active' : ''}`}
          >
            Past Classes
          </button>
          <button
            onClick={() => setFilter('')}
            className={`filter-btn ${filter === '' ? 'active' : ''}`}
          >
            All Classes
          </button>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {classes.length === 0 ? (
          <div className="no-classes">
            <div className="no-classes-icon">🏋️</div>
            <h3>No classes found</h3>
            <p>Check back later for new classes or try a different filter</p>
          </div>
        ) : (
          <div className="classes-grid">
            {classes.map((fitnessClass) => (
              <ClassCard
                key={fitnessClass._id}
                fitnessClass={fitnessClass}
                showBookButton={isAuthenticated && filter !== 'past'}
                onBook={handleBookClass}
                userBookings={userBookings}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Classes;