import React, { useState, useEffect } from 'react';
import { getUserBookings, cancelBooking, getProgress } from '../utils/api';
import { FaTrophy, FaFire, FaCalendarCheck } from 'react-icons/fa';

function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [progress, setProgress] = useState(null);
  const [message, setMessage] = useState('');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [bookingsRes, progressRes] = await Promise.all([
        getUserBookings(),
        getProgress()
      ]);
      setBookings(bookingsRes.data);
      setProgress(progressRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    
    try {
      await cancelBooking(bookingId);
      setMessage('✅ Booking cancelled successfully');
      fetchData();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('❌ Failed to cancel booking');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Welcome back, {user.name}! 👋</h2>
      {message && <div className="message">{message}</div>}
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
        <div className="progress-section" style={{ textAlign: 'center' }}>
          <FaTrophy style={{ fontSize: '3rem', color: '#F39C12' }} />
          <h3>Completed Sessions</h3>
          <p style={{ fontSize: '3rem', margin: '1rem 0' }}>{progress?.completedSessions || 0}</p>
        </div>
        
        <div className="progress-section" style={{ textAlign: 'center' }}>
          <FaFire style={{ fontSize: '3rem', color: '#E74C3C' }} />
          <h3>Active Bookings</h3>
          <p style={{ fontSize: '3rem', margin: '1rem 0' }}>{bookings.length}</p>
        </div>
        
        <div className="progress-section" style={{ textAlign: 'center' }}>
          <FaCalendarCheck style={{ fontSize: '3rem', color: '#2ECC71' }} />
          <h3>This Month</h3>
          <p style={{ fontSize: '3rem', margin: '1rem 0' }}>{bookings.filter(b => new Date(b.classId?.date) > new Date()).length}</p>
        </div>
      </div>

      <div className="bookings-section">
        <h3>📅 Your Upcoming Classes</h3>
        {bookings.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <p style={{ fontSize: '1.2rem', color: '#7F8C8D' }}>No bookings yet. Start your fitness journey today!</p>
            <a href="/classes" className="btn btn-primary" style={{ marginTop: '1rem' }}>Browse Classes</a>
          </div>
        ) : (
          <div className="bookings-list">
            {bookings.map((booking) => (
              <div key={booking._id} className="booking-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div>
                    <h4>{booking.classId?.title}</h4>
                    <p>{booking.classId?.description}</p>
                    <p><strong>📅 Date:</strong> {booking.classId?.date}</p>
                    <p><strong>⏱️ Duration:</strong> {booking.classId?.duration} mins</p>
                    <p><strong>📍 Type:</strong> {booking.classId?.type}</p>
                  </div>
                  <button 
                    className="btn btn-danger"
                    onClick={() => handleCancel(booking._id)}
                    style={{ padding: '0.5rem 1rem' }}
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
  );
}

export default Dashboard;