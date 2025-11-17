import React, { useState, useEffect } from 'react';
import { getAllClasses, createClass, updateClass, deleteClass } from '../utils/api';

function TrainerDashboard() {
  const [classes, setClasses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    trainer: '',
    date: '',
    duration: '',
    maxCapacity: '',
    type: 'OFFLINE',
    meetLink: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const { data } = await getAllClasses();
      setClasses(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingClass) {
        await updateClass(editingClass._id, formData);
        setMessage('✅ Class updated');
      } else {
        await createClass(formData);
        setMessage('✅ Class created');
      }
      resetForm();
      fetchClasses();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('❌ Operation failed');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleEdit = (classItem) => {
    setEditingClass(classItem);
    setFormData(classItem);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this class?')) {
      try {
        await deleteClass(id);
        setMessage('✅ Class deleted');
        fetchClasses();
        setTimeout(() => setMessage(''), 3000);
      } catch (err) {
        setMessage('❌ Delete failed');
        setTimeout(() => setMessage(''), 3000);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      trainer: '',
      date: '',
      duration: '',
      maxCapacity: '',
      type: 'OFFLINE',
      meetLink: ''
    });
    setEditingClass(null);
    setShowForm(false);
  };

  return (
    <div className="trainer-dashboard">
      <h2>Trainer Dashboard</h2>
      {message && <div className="message">{message}</div>}
      
      <button 
        className="btn btn-primary"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? 'Cancel' : '+ Create Class'}
      </button>

      {showForm && (
        <form className="class-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Trainer Name"
            value={formData.trainer}
            onChange={(e) => setFormData({ ...formData, trainer: e.target.value })}
            required
          />
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Duration (mins)"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Max Capacity"
            value={formData.maxCapacity}
            onChange={(e) => setFormData({ ...formData, maxCapacity: e.target.value })}
            required
          />
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          >
            <option value="OFFLINE">Offline</option>
            <option value="ONLINE">Online</option>
          </select>
          {formData.type === 'ONLINE' && (
            <input
              type="url"
              placeholder="Meeting Link"
              value={formData.meetLink}
              onChange={(e) => setFormData({ ...formData, meetLink: e.target.value })}
            />
          )}
          <button type="submit" className="btn btn-primary">
            {editingClass ? 'Update' : 'Create'}
          </button>
        </form>
      )}

      <div className="class-grid">
        {classes.map((classItem) => (
          <div key={classItem._id} className="class-card">
            <h3>{classItem.title}</h3>
            <p>{classItem.description}</p>
            <p><strong>Date:</strong> {classItem.date}</p>
            <p><strong>Bookings:</strong> {classItem.currentBookings}/{classItem.maxCapacity}</p>
            <div className="card-actions">
              <button onClick={() => handleEdit(classItem)} className="btn btn-secondary">Edit</button>
              <button onClick={() => handleDelete(classItem._id)} className="btn btn-danger">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrainerDashboard;