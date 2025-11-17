import React, { useState, useEffect, useMemo } from 'react';
import { getAllClasses, createBooking } from '../utils/api';
import {
  FaClock,
  FaUsers,
  FaMapMarkerAlt,
  FaVideo,
  FaSearch,
  FaFilter,
  FaSortAmountDown,
  FaCalendarAlt,
  FaUserTie
} from 'react-icons/fa';

function ClassList() {
  const [classes, setClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [message, setMessage] = useState('');
  const [filter, setFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('LATEST');

  useEffect(() => {
    fetchClasses();
  }, []);

  useEffect(() => {
    filterClasses();
  }, [filter, searchTerm, sortBy, classes]);

  const derivedStats = useMemo(() => {
    const total = classes.length;
    const online = classes.filter((item) => item.type === 'ONLINE').length;
    const offline = classes.filter((item) => item.type === 'OFFLINE').length;
    const avgFill = total
      ? Math.round(
          classes.reduce((acc, curr) => acc + (curr.currentBookings / curr.maxCapacity || 0), 0) / total * 100
        )
      : 0;

    return { total, online, offline, avgFill: Math.min(avgFill, 100) };
  }, [classes]);

  const fetchClasses = async () => {
    try {
      const { data } = await getAllClasses();
      setClasses(data);
      setFilteredClasses(data);
    } catch (err) {
      console.error(err);
    }
  };

  const filterClasses = () => {
    let filtered = [...classes];
    
    if (filter !== 'ALL') {
      filtered = filtered.filter((c) => c.type === filter);
    }
    
    if (searchTerm) {
      filtered = filtered.filter((c) => 
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.trainer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    filtered.sort((a, b) => {
      if (sortBy === 'LATEST') {
        return new Date(b.date) - new Date(a.date);
      }
      if (sortBy === 'POPULAR') {
        const aFill = a.currentBookings / a.maxCapacity;
        const bFill = b.currentBookings / b.maxCapacity;
        return bFill - aFill;
      }
      if (sortBy === 'DURATION') {
        return b.duration - a.duration;
      }
      return 0;
    });
    
    setFilteredClasses(filtered);
  };

  const handleBook = async (classId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('❌ Please login to book classes');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    try {
      await createBooking({ classId });
      setMessage('✅ Booking successful!');
      fetchClasses();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage(err.response?.data?.message || '❌ Booking failed');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'TBD';
    const parsed = new Date(dateString);
    if (Number.isNaN(parsed)) return dateString;
    return parsed.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
  };

  const featuredClass = filteredClasses[0];
  const progressValue = (current, max) => {
    if (!max) return 0;
    return Math.min(100, Math.round((current / max) * 100));
  };

  return (
    <div className="classes-page">
      <section className="classes-hero">
        <div>
          <p className="eyebrow">Live schedule</p>
          <h2>Discover fitness sessions designed around your schedule.</h2>
          <p>Filter livestreams, find in-studio energy boosts, and never miss the classes your community raves about.</p>
          <div className="hero-promises">
            <span>Unlimited bookings</span>
            <span>Instant confirmations</span>
            <span>Hybrid ready</span>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat-chip">
            <p>Total classes</p>
            <strong>{derivedStats.total}</strong>
          </div>
          <div className="stat-chip">
            <p>Online</p>
            <strong>{derivedStats.online}</strong>
          </div>
          <div className="stat-chip">
            <p>In studio</p>
            <strong>{derivedStats.offline}</strong>
          </div>
          <div className="stat-chip">
            <p>Average fill</p>
            <strong>{derivedStats.avgFill}%</strong>
          </div>
        </div>
      </section>

      <section className="filter-panel">
        <div className="search-field">
          <FaSearch />
          <input
            type="text"
            placeholder="Search by class or trainer"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-actions">
          <div className="filter-tabs">
            {['ALL', 'ONLINE', 'OFFLINE'].map((tab) => (
              <button
                key={tab}
                className={`filter-tab ${filter === tab ? 'active' : ''}`}
                onClick={() => setFilter(tab)}
              >
                {tab === 'ALL' && <FaFilter />}
                {tab === 'ONLINE' && <FaVideo />}
                {tab === 'OFFLINE' && <FaMapMarkerAlt />}
                <span>{tab === 'ALL' ? 'All formats' : tab === 'ONLINE' ? 'Online' : 'In studio'}</span>
              </button>
            ))}
          </div>
          <div className="sort-select">
            <FaSortAmountDown />
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="LATEST">Newest first</option>
              <option value="POPULAR">Most popular</option>
              <option value="DURATION">Longest duration</option>
            </select>
          </div>
        </div>
      </section>

      {featuredClass && (
        <section className="featured-class">
          <div className="featured-content">
            <p className="eyebrow">Up next</p>
            <h3>{featuredClass.title}</h3>
            <p>{featuredClass.description}</p>
            <div className="featured-meta">
              <span><FaCalendarAlt /> {formatDate(featuredClass.date)}</span>
              <span><FaUserTie /> {featuredClass.trainer}</span>
            </div>
          </div>
          <div className="featured-capacity">
            <p>{featuredClass.currentBookings}/{featuredClass.maxCapacity} spots filled</p>
            <div className="capacity-progress">
              <div className="bar" style={{ width: `${progressValue(featuredClass.currentBookings, featuredClass.maxCapacity)}%` }} />
            </div>
            <button
              className="btn btn-primary"
              onClick={() => handleBook(featuredClass._id)}
              disabled={featuredClass.currentBookings >= featuredClass.maxCapacity}
            >
              {featuredClass.currentBookings >= featuredClass.maxCapacity ? 'Join waitlist' : 'Reserve this spot'}
            </button>
          </div>
        </section>
      )}

      {message && <div className="message">{message}</div>}
      
      <div className="class-grid">
        {filteredClasses.length === 0 ? (
          <p className="empty-state">
            We couldn’t find matching sessions. Try a different filter.
          </p>
        ) : (
          filteredClasses.map((classItem) => {
            const isFull = classItem.currentBookings >= classItem.maxCapacity;
            const isOnline = classItem.type === 'ONLINE';
            const progress = progressValue(classItem.currentBookings, classItem.maxCapacity);

            return (
              <div key={classItem._id} className="class-card">
                <div className="card-header">
                  <div>
                    <span className={`type-pill ${isOnline ? 'online' : 'offline'}`}>
                      {isOnline ? <FaVideo /> : <FaMapMarkerAlt />} {classItem.type}
                    </span>
                    <h3>{classItem.title}</h3>
                  </div>
                  <button
                    className="ghost-btn"
                    onClick={() => handleBook(classItem._id)}
                    disabled={isFull}
                  >
                    {isFull ? 'Full' : 'Book'}
                  </button>
                </div>

                <p className="class-description">{classItem.description}</p>

                <ul className="class-meta">
                  <li><FaUserTie /> {classItem.trainer}</li>
                  <li><FaCalendarAlt /> {formatDate(classItem.date)}</li>
                  <li><FaClock /> {classItem.duration} mins</li>
                  <li><FaUsers /> {classItem.currentBookings}/{classItem.maxCapacity}</li>
                </ul>

                {isOnline && classItem.meetLink && (
                  <a href={classItem.meetLink} target="_blank" rel="noreferrer" className="meet-link">
                    Join livestream
                  </a>
                )}

                <div className="capacity-progress">
                  <div className="bar" style={{ width: `${progress}%` }} />
                  <span>{progress}% full</span>
                </div>

                <button 
                  className="btn btn-primary"
                  onClick={() => handleBook(classItem._id)}
                  disabled={isFull}
                >
                  {isFull ? '🔒 Join waitlist' : '📝 Book Now'}
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default ClassList;