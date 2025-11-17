import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">🏋️‍♂️ Fitness Scheduler</Link>
      </div>
      
      <div className="nav-links">
        <Link to="/classes">Classes</Link>
        
        {token ? (
          <>
            {user.role === 'ADMIN' && <Link to="/admin">Admin</Link>}
            {user.role === 'TRAINER' && <Link to="/trainer">Trainer</Link>}
            {user.role === 'USER' && <Link to="/dashboard">Dashboard</Link>}
            <button onClick={handleLogout} className="btn-logout">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;