// const Booking = require('../models/Booking');
// const nodemailer = require('nodemailer');

// // Setup nodemailer transporter
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER, // Your email
//     pass: process.env.EMAIL_PASS  // App password
//   }
// });

// /**
//  * @desc    Create a new booking
//  * @route   POST /api/bookings
//  * @access  Private
//  */
// exports.createBooking = async (req, res) => {
//   console.log("📩 Received booking request");

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
//     console.log("✅ Booking saved:", booking._id);

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
//     console.log("📩 Fetching all bookings...");

//     const bookings = await Booking.find().sort({ createdAt: -1 }).populate('tableId');
//     res.status(200).json(bookings);
//   } catch (error) {
//     console.error("❌ Error fetching bookings:", error.message);
//     res.status(500).json({ msg: 'Server error' });
//   }
// };

// /**
//  * @desc    Update booking status
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

//     console.log(`✅ Booking status updated: ${booking._id} => ${status}`);

//     // Prepare email content based on status
//     let subject, message;
//     if (status === "confirmed") {
//       subject = "Your booking is confirmed!";
//       message = `Dear ${booking.name},\n\nGood news! Your booking on ${booking.bookingDate} at ${booking.bookingTime} has been confirmed.\n\nThank you!`;
//     } else if (status === "rejected") {
//       subject = "Your booking was rejected";
//       message = `Dear ${booking.name},\n\nWe’re sorry, but your booking on ${booking.bookingDate} at ${booking.bookingTime} has been rejected.\n\nPlease try another time.`;
//     } else {
//       subject = `Booking status updated to ${status}`;
//       message = `Dear ${booking.name}, your booking status is now: ${status}.`;
//     }

//     // Send email
//     if (booking.email) {
//       const mailOptions = {
//         from: process.env.EMAIL_USER,
//         to: booking.email,
//         subject: subject,
//         text: message
//       };

//       transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//           console.error("❌ Email error:", error);
//         } else {
//           console.log("📧 Email sent:", info.response);
//         }
//       });
//     }

//     res.status(200).json({ msg: `Booking status updated to ${status}`, booking });
//   } catch (error) {
//     console.error("❌ Error updating status:", error.message);
//     res.status(500).json({ msg: 'Server error' });
//   }
// };




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
 * @desc    Fetch all bookings or filter by date
 * @route   GET /api/bookings?date=YYYY-MM-DD
 * @access  Private (Admin only)
 */
exports.getBookings = async (req, res) => {
  try {
    const { date } = req.query;

    let query = {};
    if (date) {
      query.bookingDate = date;
      console.log(`📅 Filtering bookings for date: ${date}`);
    } else {
      console.log("📩 Fetching all bookings...");
    }

    const bookings = await Booking.find(query).sort({ createdAt: -1 }).populate('tableId');
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

    // Prepare email content based on status
    let subject, message;
    if (status === "confirmed") {
      subject = "Your booking is confirmed!";
      message = `Dear ${booking.name},\n\nGood news! Your booking on ${booking.bookingDate} at ${booking.bookingTime} has been confirmed.\n\nThank you!`;
    } else if (status === "rejected") {
      subject = "Your booking was rejected";
      message = `Dear ${booking.name},\n\nWe’re sorry, but your booking on ${booking.bookingDate} at ${booking.bookingTime} has been rejected.\n\nPlease try another time.`;
    } else {
      subject = `Booking status updated to ${status}`;
      message = `Dear ${booking.name}, your booking status is now: ${status}.`;
    }

    // Send email
    if (booking.email) {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: booking.email,
        subject: subject,
        text: message
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

exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({ msg: 'Booking not found' });
    }

    console.log(`🗑️ Deleted booking: ${booking._id}`);
    res.status(200).json({ msg: 'Booking deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting booking:', error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};
