
const express = require('express');
const router = express.Router();
const { createBooking, getBookings, updateBookingStatus,deleteBooking } = require('../controllers/bookingController');
const authMiddleware = require('../middleware/auth');

// Create a new booking
router.post('/', authMiddleware, createBooking);

// Get all bookings
router.get('/', authMiddleware, getBookings);

// Update booking status
router.put('/:id', authMiddleware, updateBookingStatus);


// Delete a booking
router.delete('/:id', authMiddleware, deleteBooking);

module.exports = router;
