import mongoose from 'mongoose';

const fitnessClassSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  trainer: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true,
    min: 15
  },
  capacity: {
    type: Number,
    required: true,
    min: 1
  },
  currentBookingsCount: {
    type: Number,
    default: 0,
    min: 0
  },
  status: {
    type: String,
    enum: ['active', 'cancelled'],
    default: 'active'
  }
}, {
  timestamps: true
});

fitnessClassSchema.virtual('spotsLeft').get(function() {
  return this.capacity - this.currentBookingsCount;
});

fitnessClassSchema.set('toJSON', { virtuals: true });

export default mongoose.model('FitnessClass', fitnessClassSchema);