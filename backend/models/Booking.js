import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fitnessClass: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FitnessClass',
    required: true
  },
  status: {
    type: String,
    enum: ['booked', 'cancelled'],
    default: 'booked'
  }
}, {
  timestamps: true
});

bookingSchema.index({ user: 1, fitnessClass: 1 }, { unique: true });

export default mongoose.model('Booking', bookingSchema);