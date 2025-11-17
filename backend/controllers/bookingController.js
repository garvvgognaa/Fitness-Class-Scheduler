const Booking = require('../models/Booking');
const Class = require('../models/Class');
const Progress = require('../models/Progress');

exports.createBooking = async (req, res) => {
  try {
    const { classId } = req.body;
    const userId = req.userId;

    const classItem = await Class.findById(classId);
    if (!classItem) {
      return res.status(404).json({ message: 'Class not found' });
    }

    if (classItem.currentBookings >= classItem.maxCapacity) {
      return res.status(400).json({ message: 'Class is fully booked' });
    }

    const existingBooking = await Booking.findOne({ userId, classId });
    if (existingBooking) {
      return res.status(400).json({ message: 'Already booked this class' });
    }

    const booking = new Booking({ userId, classId });
    await booking.save();

    classItem.currentBookings += 1;
    await classItem.save();

    res.status(201).json({ message: 'Booking successful', booking });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.userId })
      .populate('classId')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('userId', 'name email')
      .populate('classId', 'title date')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.userId.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const classItem = await Class.findById(booking.classId);
    if (classItem) {
      classItem.currentBookings -= 1;
      await classItem.save();
    }

    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};