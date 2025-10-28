import { Link } from 'react-router-dom';
import Button from '../components/Button';

function Home() {
  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Transform Your Fitness Journey <span className="hero-emoji">💪</span>
          </h1>
          <p className="hero-description">
            Book classes, track your progress, and get personalized fitness management tools.
          </p>
          <Link to="/classes">
            <Button variant="primary">Explore Classes</Button>
          </Link>
        </div>
        <div className="hero-image">
          <img 
            src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=600&fit=crop" 
            alt="Person working out"
          />
        </div>
      </section>
    </div>
  );
}

export default Home;
