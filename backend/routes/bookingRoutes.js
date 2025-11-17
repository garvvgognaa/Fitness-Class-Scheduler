const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { auth, isAdmin } = require('../middleware/auth');

router.post('/', auth, bookingController.createBooking);
router.get('/my-bookings', auth, bookingController.getUserBookings);
router.get('/all', auth, isAdmin, bookingController.getAllBookings);
router.delete('/:id', auth, bookingController.cancelBooking);

module.exports = router;