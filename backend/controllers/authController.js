import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import WorkoutPlan from '../models/WorkoutPlan.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const workoutPlans = {
  bodyweight: {
    1: { structure: 'Full Body', plan: [
      { day: 'Day 1', exercises: [
        { name: 'Push-ups', sets: 3, reps: '8-12', intensity: 'Medium', notes: 'Keep body straight' },
        { name: 'Squats', sets: 3, reps: '12-15', intensity: 'Medium', notes: 'Go deep' },
        { name: 'Plank', sets: 3, reps: '30-60 sec', intensity: 'Medium', notes: 'Hold steady' }
      ]}
    ]},
    3: { structure: 'Push/Pull/Legs', plan: [
      { day: 'Push', exercises: [
        { name: 'Push-ups', sets: 3, reps: '8-12', intensity: 'High', notes: '' },
        { name: 'Pike Push-ups', sets: 3, reps: '6-10', intensity: 'High', notes: '' }
      ]},
      { day: 'Pull', exercises: [
        { name: 'Pull-ups', sets: 3, reps: '5-8', intensity: 'High', notes: '' },
        { name: 'Inverted Rows', sets: 3, reps: '8-12', intensity: 'Medium', notes: '' }
      ]},
      { day: 'Legs', exercises: [
        { name: 'Squats', sets: 4, reps: '15-20', intensity: 'High', notes: '' },
        { name: 'Lunges', sets: 3, reps: '10 each leg', intensity: 'Medium', notes: '' }
      ]}
    ]}
  },
  gym: {
    1: { structure: 'Full Body', plan: [
      { day: 'Day 1', exercises: [
        { name: 'Bench Press', sets: 3, reps: '8-10', intensity: 'High', notes: '' },
        { name: 'Squats', sets: 3, reps: '10-12', intensity: 'High', notes: '' },
        { name: 'Deadlifts', sets: 3, reps: '6-8', intensity: 'High', notes: '' }
      ]}
    ]},
    3: { structure: 'Push/Pull/Legs', plan: [
      { day: 'Push', exercises: [
        { name: 'Bench Press', sets: 4, reps: '8-10', intensity: 'High', notes: '' },
        { name: 'Shoulder Press', sets: 3, reps: '10-12', intensity: 'Medium', notes: '' }
      ]},
      { day: 'Pull', exercises: [
        { name: 'Deadlifts', sets: 4, reps: '6-8', intensity: 'High', notes: '' },
        { name: 'Pull-ups', sets: 3, reps: '8-12', intensity: 'Medium', notes: '' }
      ]},
      { day: 'Legs', exercises: [
        { name: 'Squats', sets: 4, reps: '10-12', intensity: 'High', notes: '' },
        { name: 'Leg Press', sets: 3, reps: '12-15', intensity: 'Medium', notes: '' }
      ]}
    ]}
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password, workoutType, height, weight, daysPerWeek } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ 
      name, 
      email, 
      password,
      height: height || null,
      weight: weight || null
    });

    // Auto-generate workout plan if workout data provided
    if (workoutType && height && weight && daysPerWeek) {
      const planKey = daysPerWeek <= 2 ? 1 : 3;
      const selectedPlan = workoutPlans[workoutType][planKey];
      
      // Schedule for tomorrow at 9 AM by default
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      await WorkoutPlan.create({
        user: user._id,
        workoutType,
        height,
        weight,
        daysPerWeek,
        planStructure: selectedPlan.structure,
        weeklyPlan: selectedPlan.plan,
        scheduledDate: tomorrow,
        scheduledTime: '09:00'
      });
    }

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};