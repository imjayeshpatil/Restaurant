// const express = require('express');
// const router = express.Router();
// const { createBooking, getBookings, updateBookingStatus } = require('../controllers/bookingController');
// const authMiddleware = require('../middleware/auth');

// // Create a new booking and initiate payment
// router.post('/', authMiddleware, createBooking);

// // Get all bookings (Protected)
// router.get('/', authMiddleware, getBookings);

// // Update booking status (e.g., mark as confirmed)
// router.put('/:id', authMiddleware, updateBookingStatus);

// module.exports = router;



// routes/booking.js

const express = require('express');
const router = express.Router();
const { createBooking, getBookings, updateBookingStatus } = require('../controllers/bookingController');
const authMiddleware = require('../middleware/auth');

// Create a new booking
router.post('/', authMiddleware, createBooking);

// Get all bookings
router.get('/', authMiddleware, getBookings);

// Update booking status
router.put('/:id', authMiddleware, updateBookingStatus);

module.exports = router;
