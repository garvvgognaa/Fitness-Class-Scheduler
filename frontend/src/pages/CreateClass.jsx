import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { classService } from '../services/api';
import './CreateClass.css';

const CreateClass = () => {
  const [formData, setFormData] = useState({
    title: '',
    trainer: '',
    description: '',
    date: '',
    time: '',
    duration: '',
    capacity: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await classService.createClass({
        ...formData,
        duration: parseInt(formData.duration),
        capacity: parseInt(formData.capacity)
      });
      
      alert('Class created successfully!');
      navigate('/admin');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create class');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-class-page">
      <div className="container">
        <div className="create-class-header">
          <h1>Create New Class</h1>
          <p>Add a new fitness class to the schedule</p>
        </div>

        <div className="create-class-form-container">
          <form onSubmit={handleSubmit} className="create-class-form">
            {error && <div className="error-message">{error}</div>}

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Class Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="e.g., HIIT Bootcamp"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Trainer</label>
                <input
                  type="text"
                  name="trainer"
                  value={formData.trainer}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="e.g., Sarah Johnson"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-input form-textarea"
                placeholder="Describe the class, intensity level, and what participants can expect..."
                rows="4"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="form-input"
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Time</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Duration (minutes)</label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="e.g., 60"
                  min="15"
                  max="180"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Capacity</label>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="e.g., 20"
                  min="1"
                  max="100"
                  required
                />
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                onClick={() => navigate('/admin')}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
              >
                {loading ? 'Creating...' : 'Create Class'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateClass;