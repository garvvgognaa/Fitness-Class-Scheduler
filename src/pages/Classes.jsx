import Button from '../components/Button';

function Classes() {
  const classes = [
    {
      id: 1,
      name: 'Morning Yoga',
      instructor: 'Rya',
      date: '2023-11-01',
      mode: 'ONLINE'
    },
    {
      id: 2,
      name: 'Cardio Blast',
      instructor: 'Aflan',
      date: '2023-11-02',
      mode: 'OFFLINE'
    },
    {
      id: 3,
      name: 'Strength Training',
      instructor: 'Monu',
      date: '2023-11-03',
      mode: 'OFFLINE'
    }
  ];

  return (
    <div className="classes-container">
      <h1 className="classes-title">Available Classes</h1>
      <div className="classes-grid">
        {classes.map((classItem) => (
          <div key={classItem.id} className="class-card">
            <h3 className="class-name">{classItem.name}</h3>
            <p className="class-instructor">{classItem.instructor}</p>
            <p className="class-date">{classItem.date}</p>
            <span className={`class-mode ${classItem.mode === 'ONLINE' ? 'mode-online' : 'mode-offline'}`}>
              {classItem.mode}
            </span>
            <div>
              <Button variant="primary">Book Class</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Classes;
