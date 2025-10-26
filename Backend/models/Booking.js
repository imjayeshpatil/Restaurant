// const mongoose = require('mongoose');

// const BookingSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   table: { type: mongoose.Schema.Types.ObjectId, ref: 'Table', required: true },
//   numberOfPersons: { type: Number, required: true },
//   paymentResult: { type: Object },
//   status: { type: String, enum: ['pending', 'confirmed', 'rejected'], default: 'pending' },
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Booking', BookingSchema);










// models/Booking.js
// const mongoose = require('mongoose');

// const bookingSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   tableId: { type: mongoose.Schema.Types.ObjectId, ref: 'Table', required: true },
//   numberOfPersons: { type: Number, required: true },
//   bookingDate: { type: Date, required: true },
//   bookingTime: { type: String, required: true },
//   amount: { type: Number, required: true },
//   razorpayOrderId: { type: String, required: true },
//   razorpayPaymentId: { type: String },
//   razorpaySignature: { type: String },
//   status: { type: String, default: 'pending' }, // e.g. 'pending', 'confirmed', 'completed'
// }, { timestamps: true });

// const Booking = mongoose.model('Booking', bookingSchema);

// module.exports = Booking;



const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  tableId: { type: mongoose.Schema.Types.ObjectId, ref: 'Table', required: true },
  numberOfPersons: { type: Number, required: true },
  bookingDate: { type: Date, required: true },
  bookingTime: { type: String, required: true },
  amount: { type: Number, required: true },
  razorpayOrderId: { type: String },
  razorpayPaymentId: { type: String },
  razorpaySignature: { type: String },
  status: { type: String, default: 'pending' }, // pending, confirmed, completed
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;