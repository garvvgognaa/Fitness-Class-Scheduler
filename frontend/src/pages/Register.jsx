import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import './Auth.css';

const Register = () => {
  const [step, setStep] = useState(1);
  const [showWelcome, setShowWelcome] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    workoutType: '',
    height: '',
    weight: '',
    daysPerWeek: '',
    goal: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleNext = async () => {
    if (step === 1) {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }
      
      // Create account after step 1
      setLoading(true);
      const result = await register(formData.name, formData.email, formData.password);
      
      if (result.success) {
        setShowWelcome(true);
        setTimeout(() => {
          setShowWelcome(false);
          setStep(2);
        }, 3000);
      } else {
        setError(result.message);
      }
      setLoading(false);
      return;
    }
    setError('');
    setStep(step + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Create workout plan directly
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/workouts`, {
        workoutType: formData.workoutType,
        height: parseInt(formData.height),
        weight: parseInt(formData.weight),
        daysPerWeek: parseInt(formData.daysPerWeek),
        scheduledDate: tomorrow.toISOString().split('T')[0],
        scheduledTime: '09:00'
      });
      
      navigate(`/workout-generating?type=${formData.workoutType}&days=${formData.daysPerWeek}`);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create workout plan');
    }
    
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Join FitClass</h1>
          <p>Start your fitness journey today</p>
        </div>

        {showWelcome ? (
          <div className="welcome-screen">
            <div className="welcome-animation">
              <div className="welcome-icon">🎉</div>
              <h2>Welcome, {formData.name}!</h2>
              <p>Let's create your perfect workout plan...</p>
            </div>
          </div>
        ) : (
          <div className="register-steps">
            <div className="step-indicator">
              {step === 1 ? 'Create Account' : `Question ${step - 1} of 4`}
            </div>
          
          {error && <div className="error-message">{error}</div>}
          
          {step === 1 && (
            <form className="auth-form">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              <button
                type="button"
                onClick={handleNext}
                disabled={!formData.name || !formData.email || !formData.password || !formData.confirmPassword || loading}
                className="btn btn-primary auth-submit"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
          )}
          
          {step === 2 && (
            <div className="workout-setup">
              <h3>What type of workout do you prefer?</h3>
              <div className="workout-types">
                <button
                  className={`workout-type-btn ${formData.workoutType === 'bodyweight' ? 'active' : ''}`}
                  onClick={() => setFormData({...formData, workoutType: 'bodyweight'})}
                >
                  <span className="icon">💪</span>
                  <div>Bodyweight</div>
                </button>
                <button
                  className={`workout-type-btn ${formData.workoutType === 'gym' ? 'active' : ''}`}
                  onClick={() => setFormData({...formData, workoutType: 'gym'})}
                >
                  <span className="icon">🏋️</span>
                  <div>Gym</div>
                </button>
              </div>
              <button
                onClick={handleNext}
                disabled={!formData.workoutType}
                className="btn btn-primary"
              >
                Next
              </button>
            </div>
          )}
          
          {step === 3 && (
            <div className="body-stats">
              <h3>What are your body measurements?</h3>
              <div className="stats-inputs">
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
              <button
                onClick={handleNext}
                disabled={!formData.height || !formData.weight}
                className="btn btn-primary"
              >
                Next
              </button>
            </div>
          )}
          
          {step === 4 && (
            <div className="workout-frequency">
              <h3>How many days per week do you want to work out?</h3>
              <div className="days-grid">
                {[1,2,3,4,5,6,7].map(day => (
                  <button
                    key={day}
                    className={`day-btn ${formData.daysPerWeek == day ? 'active' : ''}`}
                    onClick={() => setFormData({...formData, daysPerWeek: day})}
                  >
                    {day}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setStep(5)}
                disabled={!formData.daysPerWeek}
                className="btn btn-primary"
              >
                Next
              </button>
            </div>
          )}
          
          {step === 5 && (
            <div className="workout-goal">
              <h3>What's your main fitness goal?</h3>
              <div className="goal-options">
                <button
                  className={`goal-btn ${formData.goal === 'lose-weight' ? 'active' : ''}`}
                  onClick={() => setFormData({...formData, goal: 'lose-weight'})}
                >
                  <span className="icon">🔥</span>
                  <div>Lose Weight</div>
                </button>
                <button
                  className={`goal-btn ${formData.goal === 'build-muscle' ? 'active' : ''}`}
                  onClick={() => setFormData({...formData, goal: 'build-muscle'})}
                >
                  <span className="icon">💪</span>
                  <div>Build Muscle</div>
                </button>
                <button
                  className={`goal-btn ${formData.goal === 'stay-fit' ? 'active' : ''}`}
                  onClick={() => setFormData({...formData, goal: 'stay-fit'})}
                >
                  <span className="icon">⚡</span>
                  <div>Stay Fit</div>
                </button>
              </div>
              <button
                onClick={handleSubmit}
                disabled={!formData.goal || loading}
                className="btn btn-primary"
              >
                {loading ? 'Creating Plan...' : 'Create My Workout Plan'}
              </button>
            </div>
          )}
          </div>
        )}

        <div className="auth-footer">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="auth-link">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;