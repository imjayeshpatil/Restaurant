require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const crypto = require('crypto');
const Razorpay = require('razorpay');
const { log } = require('console');
const Booking = require('./models/Booking'); // Adjust path if needed

const app = express();

// ✅ Connect to Database
connectDB();

// ✅ Middleware
app.use(express.json());
app.use(cors());

// ✅ Create Admin User (Runs on Startup)
const createAdminUser = async () => {
  try {
    const existingAdmin = await User.findOne({ role: "admin" });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("Admin@123", 10);
      await User.create({
        name: "Admin",
        email: "admin@example.com",
        password: hashedPassword,
        role: "admin"
      });
      console.log("✅ Admin user created successfully.");
    }
  } catch (error) {
    console.error("❌ Error creating admin user:", error);
  }
};
createAdminUser();

// ✅ Razorpay Setup
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,  // Your Razorpay Key ID
  key_secret: process.env.RAZORPAY_KEY_SECRET,  // Your Razorpay Key Secret
});

// ✅ Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/table', require('./routes/table'));
app.use('/api/booking', require('./routes/booking'));


app.post('/create-order', async (req, res) => {
  console.log('Received POST request for create-order');
  
  console.log("Razorpay Key ID:", process.env.RAZORPAY_KEY_ID);
  console.log("Razorpay Key Secret:", process.env.RAZORPAY_KEY_SECRET);
  console.log('Request body:', req.body);

  const { tableId, numberOfPersons, bookingDate, bookingTime } = req.body;
  console.log('Booking Date:', bookingDate);
  console.log('Booking Time:', bookingTime);

  const amount = numberOfPersons * 1000;  // Amount in INR (change this to your own calculation)
  const options = {
    amount: amount * 100,  // Amount in paise (Razorpay expects amount in smallest currency unit)
    currency: 'INR',
    receipt: `order_rcptid_${Math.random() * 100000}`,  // Generate a random receipt ID
    notes: {
      bookingDate, // Save the booking date and time in the notes section
      bookingTime,
    }
  };

  console.log('Razorpay order options:', options);

  try {
    const order = await razorpay.orders.create(options);
    console.log('Razorpay order created:', order);
    res.json(order);  // Send the order details to the frontend
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    console.error('Full error object:', error);  // Log the full error object

    // Return a more detailed error response
    res.status(500).json({
      success: false,
      message: 'Error creating order',
      error: error.message,  // Provide more details about the error
      error_code: error.code,  // Add the error code for more details
      error_type: error.type,  // Include the error type for clarity
    });
  }
});


app.post('/verify-payment', async (req, res) => {
  const {
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    name,
    email,
    tableId,
    numberOfPersons,
    bookingDate,
    bookingTime,
    amount
  } = req.body;

  const body = razorpay_order_id + '|' + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest('hex');

    if (expectedSignature === razorpay_signature) {
      try {
        const newBooking = await Booking.create({
          name,
          email,
          tableId,
          numberOfPersons,
          bookingDate,
          bookingTime,
          amount,
          razorpayOrderId: razorpay_order_id,
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature,
          status: 'confirmed'
        });
    
        res.json({
          success: true,
          message: 'Payment Verified & Booking Saved',
          booking: newBooking
        });
        
        console.log(newBooking); // ✅ Fixed line
      } catch (err) {
        console.error('❌ Failed to save booking:', err);
        res.status(500).json({
          success: false,
          message: 'Payment verified but failed to save booking',
          error: err.message
        });
      }
  } else {
    res.status(400).json({
      success: false,
      message: 'Payment Verification Failed'
    });
  }
});

// ✅ Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.stack);
  res.status(500).send('Something broke!');
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));
