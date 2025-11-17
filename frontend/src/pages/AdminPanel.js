import React, { useState, useEffect } from 'react';
import { getAllClasses, getAllBookings } from '../utils/api';

function AdminPanel() {
  const [classes, setClasses] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('classes');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [classesRes, bookingsRes] = await Promise.all([
        getAllClasses(),
        getAllBookings()
      ]);
      setClasses(classesRes.data);
      setBookings(bookingsRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      
      <div className="tabs">
        <button 
          className={activeTab === 'classes' ? 'active' : ''}
          onClick={() => setActiveTab('classes')}
        >
          Classes
        </button>
        <button 
          className={activeTab === 'bookings' ? 'active' : ''}
          onClick={() => setActiveTab('bookings')}
        >
          Bookings
        </button>
      </div>

      {activeTab === 'classes' && (
        <div className="stats-section">
          <h3>Total Classes: {classes.length}</h3>
          <div className="class-grid">
            {classes.map((classItem) => (
              <div key={classItem._id} className="class-card">
                <h4>{classItem.title}</h4>
                <p><strong>Trainer:</strong> {classItem.trainer}</p>
                <p><strong>Bookings:</strong> {classItem.currentBookings}/{classItem.maxCapacity}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'bookings' && (
        <div className="stats-section">
          <h3>Total Bookings: {bookings.length}</h3>
          <table className="bookings-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Class</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking.userId?.name}</td>
                  <td>{booking.classId?.title}</td>
                  <td>{booking.classId?.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminPanel;