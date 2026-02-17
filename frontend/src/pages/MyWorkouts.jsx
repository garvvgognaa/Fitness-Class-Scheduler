import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { workoutService } from '../services/api';
import './MyWorkouts.css';

const MyWorkouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const response = await workoutService.getUserWorkoutPlans();
      setWorkouts(response.data.data);
    } catch (error) {
      console.error('Error fetching workouts:', error);
    } finally {
      setLoading(false);
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
    <div className="my-workouts-page">
      <div className="container">
        <div className="workouts-header">
          <h1>My Workout Plans</h1>
          <Link to="/create-workout" className="btn btn-primary">
            Create New Plan
          </Link>
        </div>

        {workouts.length === 0 ? (
          <div className="no-workouts">
            <h3>No workout plans yet</h3>
            <p>Create your first personalized workout plan</p>
            <Link to="/create-workout" className="btn btn-primary">
              Get Started
            </Link>
          </div>
        ) : (
          <div className="workouts-grid">
            {workouts.map((workout) => (
              <div key={workout._id} className="workout-card">
                <div className="workout-header">
                  <h3>{workout.planStructure}</h3>
                  <span className={`workout-status ${workout.status}`}>
                    {workout.status}
                  </span>
                </div>
                
                <div className="workout-details">
                  <div className="detail-item">
                    <span className="label">Type:</span>
                    <span className="value">{workout.workoutType}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Days/Week:</span>
                    <span className="value">{workout.daysPerWeek}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Scheduled:</span>
                    <span className="value">{formatDate(workout.scheduledDate)} at {workout.scheduledTime}</span>
                  </div>
                </div>

                <div className="workout-plan-preview">
                  <h4>Workout Plan:</h4>
                  {workout.weeklyPlan.slice(0, 2).map((day, index) => (
                    <div key={index} className="day-preview">
                      <strong>{day.day}:</strong> {day.exercises.length} exercises
                    </div>
                  ))}
                  {workout.weeklyPlan.length > 2 && (
                    <div className="more-days">+{workout.weeklyPlan.length - 2} more days</div>
                  )}
                </div>

                <Link 
                  to={`/workout/${workout._id}`}
                  className="btn btn-secondary"
                >
                  View Full Plan
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyWorkouts;
