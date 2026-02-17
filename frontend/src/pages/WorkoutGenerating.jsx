import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import './WorkoutGenerating.css';

const WorkoutGenerating = () => {
  const [step, setStep] = useState(0);
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const steps = [
    'Analyzing your body stats...',
    'Selecting optimal exercises...',
    'Calculating sets and reps...',
    'Customizing your plan...',
    'Your workout plan is ready!'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep(prev => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          // Animation complete - now generate plan
          generatePlan();
          return prev;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const generatePlan = async () => {
    try {
      const type = searchParams.get('type') || 'bodyweight';
      const days = searchParams.get('days') || '3';
      
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/workout/generate?type=${type}&days=${days}`);
      
      setGeneratedPlan(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error generating plan:', error);
      setLoading(false);
    }
  };

  return (
    <div className="workout-generating-page">
      <div className="container">
        <div className="generating-content">
          <div className="generating-animation">
            <div className="pulse-circle">
              <div className="inner-circle">
              </div>
            </div>
          </div>
          
          <h1>Creating Your Perfect Workout</h1>
          
          <div className="progress-steps">
            {steps.map((stepText, index) => (
              <div 
                key={index} 
                className={`progress-step ${index <= step ? 'active' : ''} ${index === step ? 'current' : ''}`}
              >
                <div className="step-dot"></div>
                <span className="step-text">{stepText}</span>
              </div>
            ))}
          </div>
          
          {step === steps.length - 1 && !generatedPlan && loading && (
            <div className="success-message">
              <p>Welcome to your fitness journey!</p>
            </div>
          )}
          
          {step === steps.length - 1 && !loading && (
            <div className="success-message">
              <h2>Your Workout Plan is Ready!</h2>
              <p>Plan generated successfully</p>
              <button 
                onClick={() => navigate('/my-workouts')}
                className="btn btn-primary"
              >
                View My Workouts
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkoutGenerating;
