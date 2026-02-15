import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { workoutService } from '../services/api';
import './WorkoutDetail.css';

const WorkoutDetail = () => {
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchWorkout();
  }, [id]);

  const fetchWorkout = async () => {
    try {
      const response = await workoutService.getWorkoutPlan(id);
      setWorkout(response.data.data);
    } catch (error) {
      console.error('Error fetching workout:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="container">
        <div className="error-message">Workout plan not found</div>
      </div>
    );
  }

  return (
    <div className="workout-detail-page">
      <div className="container">
        <div className="workout-detail-header">
          <button onClick={() => navigate('/my-workouts')} className="back-btn">
            Back to Workouts
          </button>
          <h1>{workout.planStructure}</h1>
          <div className="workout-meta">
            <span className="workout-type">{workout.workoutType}</span>
            <span className="workout-days">{workout.daysPerWeek} days/week</span>
          </div>
        </div>

        <div className="workout-plan">
          {workout.weeklyPlan.map((day, index) => (
            <div key={index} className="workout-day">
              <h2>Day {index + 1}: {day.day}</h2>
              <div className="exercises-list">
                {day.exercises.map((exercise, idx) => (
                  <div key={idx} className="exercise-item">
                    <div className="exercise-info">
                      <h3>{exercise.name}</h3>
                      <div className="exercise-details">
                        <span className="sets">{exercise.sets} sets</span>
                        <span className="reps">{exercise.reps} reps</span>
                        <span className="intensity">{exercise.intensity}</span>
                      </div>
                      {exercise.notes && (
                        <p className="exercise-notes">{exercise.notes}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkoutDetail;
