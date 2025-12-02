import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { workoutService } from '../services/api';
import './CreateWorkout.css';

const CreateWorkout = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    workoutType: '',
    height: '',
    weight: '',
    daysPerWeek: '',
    scheduledDate: '',
    scheduledTime: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await workoutService.createWorkoutPlan(formData);
      alert('Workout plan created successfully!');
      navigate('/my-workouts');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to create workout plan');
    } finally {
      setLoading(false);
    }
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 7; hour <= 20; hour++) {
      const time = `${hour.toString().padStart(2, '0')}:00`;
      slots.push(time);
    }
    return slots;
  };

  return (
    <div className="create-workout-page">
      <div className="container">
        <div className="workout-header">
          <h1>Create Your Workout Plan</h1>
          <div className="step-indicator">
            Step {step} of 4
          </div>
        </div>

        <div className="workout-form">
          {step === 1 && (
            <div className="step-content">
              <h2>Choose Workout Type</h2>
              <div className="workout-types">
                <button
                  className={`workout-type-btn ${formData.workoutType === 'bodyweight' ? 'active' : ''}`}
                  onClick={() => setFormData({...formData, workoutType: 'bodyweight'})}
                >
                  <span className="icon">💪</span>
                  <h3>Bodyweight Workout</h3>
                  <p>No equipment needed</p>
                </button>
                <button
                  className={`workout-type-btn ${formData.workoutType === 'gym' ? 'active' : ''}`}
                  onClick={() => setFormData({...formData, workoutType: 'gym'})}
                >
                  <span className="icon">🏋️</span>
                  <h3>Gym Workout</h3>
                  <p>Full gym equipment</p>
                </button>
              </div>
              <button 
                className="btn btn-primary" 
                onClick={handleNext}
                disabled={!formData.workoutType}
              >
                Next
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="step-content">
              <h2>Your Body Stats</h2>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Height (cm)</label>
                  <input
                    type="number"
                    value={formData.height}
                    onChange={(e) => setFormData({...formData, height: e.target.value})}
                    className="form-input"
                    placeholder="170"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Weight (kg)</label>
                  <input
                    type="number"
                    value={formData.weight}
                    onChange={(e) => setFormData({...formData, weight: e.target.value})}
                    className="form-input"
                    placeholder="70"
                  />
                </div>
              </div>
              <div className="step-actions">
                <button className="btn btn-secondary" onClick={handleBack}>Back</button>
                <button 
                  className="btn btn-primary" 
                  onClick={handleNext}
                  disabled={!formData.height || !formData.weight}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="step-content">
              <h2>How many days per week?</h2>
              <div className="days-grid">
                {[1,2,3,4,5,6,7].map(day => (
                  <button
                    key={day}
                    className={`day-btn ${formData.daysPerWeek == day ? 'active' : ''}`}
                    onClick={() => setFormData({...formData, daysPerWeek: day})}
                  >
                    {day} {day === 1 ? 'Day' : 'Days'}
                  </button>
                ))}
              </div>
              <div className="step-actions">
                <button className="btn btn-secondary" onClick={handleBack}>Back</button>
                <button 
                  className="btn btn-primary" 
                  onClick={handleNext}
                  disabled={!formData.daysPerWeek}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="step-content">
              <h2>Schedule Your Session</h2>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    value={formData.scheduledDate}
                    onChange={(e) => setFormData({...formData, scheduledDate: e.target.value})}
                    className="form-input"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Time (1 hour session)</label>
                  <select
                    value={formData.scheduledTime}
                    onChange={(e) => setFormData({...formData, scheduledTime: e.target.value})}
                    className="form-input"
                  >
                    <option value="">Select time</option>
                    {generateTimeSlots().map(time => (
                      <option key={time} value={time}>{time} - {(parseInt(time) + 1).toString().padStart(2, '0')}:00</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="step-actions">
                <button className="btn btn-secondary" onClick={handleBack}>Back</button>
                <button 
                  className="btn btn-primary" 
                  onClick={handleSubmit}
                  disabled={!formData.scheduledDate || !formData.scheduledTime || loading}
                >
                  {loading ? 'Creating...' : 'Create Workout Plan'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateWorkout;