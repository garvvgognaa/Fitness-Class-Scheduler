import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { bookingService } from '../services/api';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    upcomingBookings: 0,
    totalBookings: 0,
    nextClass: null,
    totalUsers: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserStats();
    fetchTotalUsers();
  }, []);

  const fetchUserStats = async () => {
    try {
      const response = await bookingService.getUserBookings();
      const { upcoming, past } = response.data.data;
      
      const nextClass = upcoming.length > 0 ? upcoming[0] : null;
      
      setStats({
        upcomingBookings: upcoming.length,
        totalBookings: upcoming.length + past.length,
        nextClass
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTotalUsers = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/auth/stats`);
      setStats(prev => ({ ...prev, totalUsers: response.data.data.totalUsers }));
    } catch (error) {
      console.error('Error fetching user stats:', error);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Train Hard. Book Smarter.</h1>
            <p>
              Welcome back, <span className="text-red">{user?.name}</span>! 
              Ready to push your limits and achieve greatness?
            </p>
            <div className="hero-actions">
              <Link to="/classes" className="btn btn-primary">
                Browse Classes
              </Link>
              <Link to="/bookings" className="btn btn-secondary">
                My Schedule
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="dashboard-content">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-info">
                <h3>{stats.upcomingBookings}</h3>
                <p>Upcoming Classes</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-info">
                <h3>{stats.totalBookings}</h3>
                <p>Total Bookings</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-info">
                <h3>{user?.role}</h3>
                <p>Member Status</p>
              </div>
            </div>
          </div>

          {stats.nextClass && (
            <div className="next-class-section">
              <h2>Your Next Workout</h2>
              <div className="next-class-card">
                <div className="next-class-info">
                  <h3>{stats.nextClass.fitnessClass.title}</h3>
                  <p className="trainer">with {stats.nextClass.fitnessClass.trainer}</p>
                  <div className="class-time">
                    <span className="date">{formatDate(stats.nextClass.fitnessClass.date)}</span>
                    <span className="time">{stats.nextClass.fitnessClass.time}</span>
                  </div>
                </div>
                <div className="next-class-actions">
                  <Link 
                    to={`/classes/${stats.nextClass.fitnessClass._id}`}
                    className="btn btn-primary"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          )}

          <div className="quick-actions">
            <h2>Quick Actions</h2>
            <div className="action-grid">
              <Link to="/classes" className="action-card">
                <h3>Browse Classes</h3>
                <p>Find your next workout</p>
              </Link>
              
              <Link to="/bookings" className="action-card">
                <h3>My Schedule</h3>
                <p>Manage your bookings</p>
              </Link>
              
              <Link to="/create-workout" className="action-card">
                <h3>Personal Workout</h3>
                <p>Create custom plan</p>
              </Link>
              
              <Link to="/my-workouts" className="action-card">
                <h3>My Workouts</h3>
                <p>View your plans</p>
              </Link>
              
              {user?.role === 'admin' && (
                <Link to="/admin" className="action-card admin-card">
                  <h3>Admin Panel</h3>
                  <p>Manage classes</p>
                </Link>
              )}
            </div>
          </div>
          
          <div className="community-stats">
            <div className="community-card">
              <div className="community-info">
                <h3>{stats.totalUsers}</h3>
                <p>Members Joined</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
