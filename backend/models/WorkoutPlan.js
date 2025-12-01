import mongoose from 'mongoose';

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sets: { type: Number, required: true },
  reps: { type: String, required: true },
  intensity: { type: String, required: true },
  notes: { type: String, default: '' }
});

const dayPlanSchema = new mongoose.Schema({
  day: { type: String, required: true },
  exercises: [exerciseSchema]
});

const workoutPlanSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  workoutType: { type: String, enum: ['bodyweight', 'gym'], required: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  daysPerWeek: { type: Number, min: 1, max: 7, required: true },
  planStructure: { type: String, required: true },
  weeklyPlan: [dayPlanSchema],
  scheduledDate: { type: Date, required: true },
  scheduledTime: { type: String, required: true },
  status: { type: String, enum: ['active', 'completed', 'cancelled'], default: 'active' }
}, {
  timestamps: true
});

export default mongoose.model('WorkoutPlan', workoutPlanSchema);