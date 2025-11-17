const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  trainer: { type: String, required: true },
  date: { type: String, required: true },
  duration: { type: Number, required: true },
  maxCapacity: { type: Number, required: true },
  type: { 
    type: String, 
    enum: ['ONLINE', 'OFFLINE'], 
    required: true 
  },
  meetLink: { type: String },
  currentBookings: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Class', classSchema);