// const Booking = require('../models/Booking');
// const nodemailer = require('nodemailer');

// // Setup nodemailer transporter
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER, // your email
//     pass: process.env.EMAIL_PASS  // your app-specific password
//   }
// });

// /**
//  * @desc    Create a new booking (manual, not via Razorpay)
//  * @route   POST /api/bookings
//  * @access  Private
//  */
// exports.createBooking = async (req, res) => {
//   const {
//     name,
//     email,
//     tableId,
//     numberOfPersons,
//     bookingDate,
//     bookingTime,
//     amount
//   } = req.body;

//   try {
//     if (!name || !email || !tableId || !numberOfPersons || !bookingDate || !bookingTime || !amount) {
//       return res.status(400).json({ msg: "Missing required fields" });
//     }

//     const booking = new Booking({
//       name,
//       email,
//       tableId,
//       numberOfPersons,
//       bookingDate,
//       bookingTime,
//       amount,
//       status: "pending"
//     });

//     await booking.save();

//     res.status(201).json({ msg: 'Booking created successfully', booking });
//   } catch (error) {
//     console.error("❌ Error creating booking:", error.message);
//     res.status(500).json({ msg: 'Server error' });
//   }
// };

// /**
//  * @desc    Fetch all bookings
//  * @route   GET /api/bookings
//  * @access  Private (Admin only)
//  */
// exports.getBookings = async (req, res) => {
//   try {
//     const bookings = await Booking.find().sort({ createdAt: -1 });
//     res.status(200).json(bookings);
//   } catch (error) {
//     console.error("❌ Error fetching bookings:", error.message);
//     res.status(500).json({ msg: 'Server error' });
//   }
// };

// /**
//  * @desc    Update booking status and notify via email
//  * @route   PUT /api/bookings/:id
//  * @access  Private (Admin only)
//  */
// exports.updateBookingStatus = async (req, res) => {
//   const { status } = req.body;

//   try {
//     const booking = await Booking.findById(req.params.id);

//     if (!booking) {
//       return res.status(404).json({ msg: 'Booking not found' });
//     }

//     booking.status = status;
//     await booking.save();

//     // Send email notification
//     if (booking.email) {
//       const mailOptions = {
//         from: process.env.EMAIL_USER,
//         to: booking.email,
//         subject: `Booking Status Updated to ${status}`,
//         text: `Dear ${booking.name}, your booking status is now: ${status}.`
//       };

//       transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//           console.error("❌ Error sending email:", error);
//         } else {
//           console.log("📧 Email sent:", info.response);
//         }
//       });
//     }

//     res.status(200).json({ msg: `Booking status updated to ${status}`, booking });
//   } catch (error) {
//     console.error("❌ Error updating booking status:", error.message);
//     res.status(500).json({ msg: 'Server error' });
//   }
// };


// controllers/bookingController.js

const Booking = require('../models/Booking');
const nodemailer = require('nodemailer');

// Setup nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS  // App password
  }
});

/**
 * @desc    Create a new booking
 * @route   POST /api/bookings
 * @access  Private
 */
exports.createBooking = async (req, res) => {
  console.log("📩 Received booking request");

  const {
    name,
    email,
    tableId,
    numberOfPersons,
    bookingDate,
    bookingTime,
    amount
  } = req.body;

  try {
    if (!name || !email || !tableId || !numberOfPersons || !bookingDate || !bookingTime || !amount) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    const booking = new Booking({
      name,
      email,
      tableId,
      numberOfPersons,
      bookingDate,
      bookingTime,
      amount,
      status: "pending"
    });

    await booking.save();
    console.log("✅ Booking saved:", booking._id);

    res.status(201).json({ msg: 'Booking created successfully', booking });
  } catch (error) {
    console.error("❌ Error creating booking:", error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

/**
 * @desc    Fetch all bookings
 * @route   GET /api/bookings
 * @access  Private (Admin only)
 */
exports.getBookings = async (req, res) => {
  try {
    console.log("📩 Fetching all bookings...");

    const bookings = await Booking.find().sort({ createdAt: -1 }).populate('tableId');
    res.status(200).json(bookings);
  } catch (error) {
    console.error("❌ Error fetching bookings:", error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

/**
 * @desc    Update booking status
 * @route   PUT /api/bookings/:id
 * @access  Private (Admin only)
 */
exports.updateBookingStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ msg: 'Booking not found' });
    }

    booking.status = status;
    await booking.save();

    console.log(`✅ Booking status updated: ${booking._id} => ${status}`);

    // Send email notification
    if (booking.email) {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: booking.email,
        subject: `Booking Status Updated to ${status}`,
        text: `Dear ${booking.name}, your booking status is now: ${status}.`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("❌ Email error:", error);
        } else {
          console.log("📧 Email sent:", info.response);
        }
      });
    }

    res.status(200).json({ msg: `Booking status updated to ${status}`, booking });
  } catch (error) {
    console.error("❌ Error updating status:", error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};
