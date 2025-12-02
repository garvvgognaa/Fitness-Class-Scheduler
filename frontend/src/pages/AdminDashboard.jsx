import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { classService } from '../services/api';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await classService.getClasses('');
      setClasses(response.data.data);
    } catch (error) {
      console.error('Error fetching classes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClass = async (classId) => {
    if (!window.confirm('Are you sure you want to cancel this class?')) {
      return;
    }

    try {
      await classService.deleteClass(classId);
      fetchClasses();
      alert('Class cancelled successfully');
    } catch (error) {
      alert('Failed to cancel class');
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
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
    <div className="admin-dashboard">
      <div className="container">
        <div className="admin-header">
          <h1>Admin Dashboard</h1>
          <p>Manage fitness classes and monitor bookings</p>
          <Link to="/admin/create-class" className="btn btn-primary">
            Create New Class
          </Link>
        </div>

        <div className="admin-stats">
          <div className="stat-card">
            <h3>{classes.length}</h3>
            <p>Total Classes</p>
          </div>
          <div className="stat-card">
            <h3>{classes.filter(c => c.status === 'active').length}</h3>
            <p>Active Classes</p>
          </div>
          <div className="stat-card">
            <h3>{classes.reduce((sum, c) => sum + c.currentBookingsCount, 0)}</h3>
            <p>Total Bookings</p>
          </div>
        </div>

        <div className="classes-section">
          <h2>All Classes</h2>
          {classes.length === 0 ? (
            <div className="no-classes">
              <p>No classes created yet</p>
              <Link to="/admin/create-class" className="btn btn-primary">
                Create First Class
              </Link>
            </div>
          ) : (
            <div className="admin-classes-grid">
              {classes.map((fitnessClass) => (
                <div key={fitnessClass._id} className="admin-class-card">
                  <div className="class-info">
                    <h3>{fitnessClass.title}</h3>
                    <p className="trainer">Trainer: {fitnessClass.trainer}</p>
                    <div className="class-meta">
                      <span>{formatDate(fitnessClass.date)} at {fitnessClass.time}</span>
                      <span>{fitnessClass.currentBookingsCount}/{fitnessClass.capacity} booked</span>
                    </div>
                    <span className={`status ${fitnessClass.status}`}>
                      {fitnessClass.status}
                    </span>
                  </div>
                  <div className="class-actions">
                    <Link 
                      to={`/admin/edit-class/${fitnessClass._id}`}
                      className="btn btn-secondary"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteClass(fitnessClass._id)}
                      className="btn btn-danger"
                      disabled={fitnessClass.status === 'cancelled'}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;