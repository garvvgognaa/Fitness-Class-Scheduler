function Card({ icon, title, children, className = '' }) {
  return (
    <div className={`card ${className}`}>
      {icon && <span className="card-icon">{icon}</span>}
      {title && <h3 className="card-title">{title}</h3>}
      <div className="card-content">
        {children}
      </div>
    </div>
  );
}

export default Card;
