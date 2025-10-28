import Card from '../components/Card';
import Button from '../components/Button';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Your Dashboard</h1>
      <p className="dashboard-subtitle">
        Track your progress, booked classes, and upcoming sessions.
      </p>
      <div className="dashboard-grid">
        <Card icon="📊" title="Progress" className="dashboard-card">
          <p>View your fitness journey and achievements</p>
          <Button variant="primary">Book Class</Button>
        </Card>
        <Card icon="📅" title="Booked Classes" className="dashboard-card">
          <p>Manage your scheduled fitness classes</p>
          <Button variant="primary">Program</Button>
        </Card>
        <Card icon="🎯" title="Upcoming Sessions" className="dashboard-card">
          <p>See your next scheduled workouts</p>
          <Button variant="primary">Upcoming</Button>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
