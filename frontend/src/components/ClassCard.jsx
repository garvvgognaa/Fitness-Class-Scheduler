import React from 'react';
import { Link } from 'react-router-dom';
import './ClassCard.css';

const ClassCard = ({ fitnessClass, showBookButton = false, onBook, userBookings = [] }) => {
  const isBooked = userBookings.some(booking => 
    booking.fitnessClass._id === fitnessClass._id && booking.status === 'booked'
  );
  
  const spotsLeft = fitnessClass.capacity - fitnessClass.currentBookingsCount;
  const isFull = spotsLeft <= 0;
  
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const getBadgeClass = () => {
    if (isFull) return 'badge-danger';
    if (spotsLeft <= 3) return 'badge-warning';
    return 'badge-success';
  };

  return (
    <div className="class-card">
      <div className="class-header">
        <h3 className="class-title">{fitnessClass.title}</h3>
        <span className={`badge ${getBadgeClass()}`}>
          {isFull ? 'FULL' : `${spotsLeft} spots`}
        </span>
      </div>
      
      <div className="class-trainer">
        <span className="trainer-label">Trainer:</span>
        <span className="trainer-name">{fitnessClass.trainer}</span>
      </div>
      
      <div className="class-details">
        <div className="detail-item">
          <span>{formatDate(fitnessClass.date)}</span>
        </div>
        <div className="detail-item">
          <span>{fitnessClass.time}</span>
        </div>
        <div className="detail-item">
          <span>{fitnessClass.duration} min</span>
        </div>
      </div>
      
      <p className="class-description">{fitnessClass.description}</p>
      
      <div className="class-actions">
        <Link to={`/classes/${fitnessClass._id}`} className="btn btn-secondary">
          View Details
        </Link>
        
        {showBookButton && (
          <button
            onClick={() => onBook(fitnessClass._id)}
            disabled={isFull || isBooked}
            className={`btn ${isBooked ? 'btn-success' : 'btn-primary'}`}
          >
            {isBooked ? 'Booked ✓' : isFull ? 'Full' : 'Book Now'}
          </button>
        )}
      </div>
    </div>
  );
};

export default ClassCard;
