import WorkoutPlan from '../models/WorkoutPlan.js';
import User from '../models/User.js';

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

export const createWorkoutPlan = async (req, res) => {
  try {
    const { workoutType, height, weight, daysPerWeek, scheduledDate, scheduledTime } = req.body;
    const userId = req.user._id;

    // Update user height/weight if provided
    await User.findByIdAndUpdate(userId, { height, weight });

    // Generate workout plan
    const planKey = daysPerWeek <= 2 ? 1 : 3;
    const selectedPlan = workoutPlans[workoutType][planKey];

    const workoutPlan = await WorkoutPlan.create({
      user: userId,
      workoutType,
      height,
      weight,
      daysPerWeek,
      planStructure: selectedPlan.structure,
      weeklyPlan: selectedPlan.plan,
      scheduledDate,
      scheduledTime
    });

    const populatedPlan = await WorkoutPlan.findById(workoutPlan._id).populate('user', 'name email');
    res.status(201).json({ success: true, data: populatedPlan });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUserWorkoutPlans = async (req, res) => {
  try {
    const plans = await WorkoutPlan.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, data: plans });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getWorkoutPlan = async (req, res) => {
  try {
    const plan = await WorkoutPlan.findById(req.params.id);
    if (!plan || plan.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Workout plan not found' });
    }
    res.json({ success: true, data: plan });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};