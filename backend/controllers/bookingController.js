import Booking from '../models/Booking.js';
import FitnessClass from '../models/FitnessClass.js';

export const bookClass = async (req, res) => {
  try {
    const { classId } = req.body;
    const userId = req.user._id;

    const fitnessClass = await FitnessClass.findById(classId);
    if (!fitnessClass) {
      return res.status(404).json({ message: 'Class not found' });
    }

    if (fitnessClass.currentBookingsCount >= fitnessClass.capacity) {
      return res.status(400).json({ message: 'Class is full' });
    }

    const existingBooking = await Booking.findOne({
      user: userId,
      fitnessClass: classId,
      status: 'booked'
    });

    if (existingBooking) {
      return res.status(400).json({ message: 'Already booked this class' });
    }

    const booking = await Booking.create({
      user: userId,
      fitnessClass: classId
    });

    await FitnessClass.findByIdAndUpdate(classId, {
      $inc: { currentBookingsCount: 1 }
    });

    const populatedBooking = await Booking.findById(booking._id)
      .populate('fitnessClass')
      .populate('user', 'name email');

    res.status(201).json({ success: true, data: populatedBooking });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    if (booking.status === 'cancelled') {
      return res.status(400).json({ message: 'Booking already cancelled' });
    }

    booking.status = 'cancelled';
    await booking.save();

    await FitnessClass.findByIdAndUpdate(booking.fitnessClass, {
      $inc: { currentBookingsCount: -1 }
    });

    res.json({ success: true, message: 'Booking cancelled successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('fitnessClass')
      .sort({ createdAt: -1 });

    const now = new Date();
    const upcoming = bookings.filter(booking => 
      booking.status === 'booked' && new Date(booking.fitnessClass.date) >= now
    );
    const past = bookings.filter(booking => 
      booking.status === 'cancelled' || new Date(booking.fitnessClass.date) < now
    );

    res.json({ success: true, data: { upcoming, past } });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};