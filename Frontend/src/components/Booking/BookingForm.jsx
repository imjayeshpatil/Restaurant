
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookingForm = () => {
  const [tables, setTables] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    tableId: '',
    numberOfPersons: 1,
    bookingDate: '',
    bookingTime: '',
  });

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/table')
      .then((res) => {
        setTables(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching tables:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!bookingData.bookingDate) return;

    axios
      .get(`http://localhost:5000/api/bookings?date=${bookingData.bookingDate}`)
      .then((res) => setBookings(res.data))
      .catch((err) => console.error('Error fetching bookings:', err));
  }, [bookingData.bookingDate]);

  const handleChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { tableId, numberOfPersons, bookingDate, bookingTime } = bookingData;

    try {
      const { data } = await axios.post(
        'http://localhost:5000/create-order',
        { tableId, numberOfPersons, bookingDate, bookingTime },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!data || !data.amount) {
        throw new Error("Invalid response from backend");
      }

      const options = {
        key: 'rzp_test_Uyb4AjDWvg4STZ',
        amount: data.amount,
        currency: data.currency,
        name: `Table Booking for ${numberOfPersons} Persons`,
        description: 'Book a table at our restaurant',
        image: 'https://example.com/your-logo.png',
        order_id: data.id,
        handler: function (response) {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;

          axios
            .post('http://localhost:5000/verify-payment', {
              razorpay_payment_id,
              razorpay_order_id,
              razorpay_signature,
              name: bookingData.name,
              email: bookingData.email,
              tableId: bookingData.tableId,
              numberOfPersons: bookingData.numberOfPersons,
              bookingDate: bookingData.bookingDate,
              bookingTime: bookingData.bookingTime,
              amount: data.amount,
            })
            .then((verifyResponse) => {
              alert('✅ Payment Successful & Booking Confirmed');
              console.log('Booking Response:', verifyResponse.data);
            })
            .catch((error) => {
              console.error('❌ Error during payment verification:', error);
              alert('❌ Payment Verification Failed');
            });
        },
        prefill: {
          name: bookingData.name,
          email: bookingData.email,
        },
        theme: {
          color: '#F37254',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error('Error creating Razorpay order:', error);
      alert(`An error occurred while creating the payment order: ${error.message}`);
    }
  };

  const isTableBooked = (tableId) => {
    return bookings.some((b) => b.tableId === tableId);
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Book a Table</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={bookingData.name}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={bookingData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />

          {loading ? (
            <p>Loading tables...</p>
          ) : (
            <>
              {bookingData.bookingDate && bookings.length === tables.length && (
                <p style={{ color: 'red' }}>
                  ❌ All tables are booked for the selected date.
                </p>
              )}
              <select
                name="tableId"
                value={bookingData.tableId}
                onChange={handleChange}
                required
                style={styles.select}
              >
                <option value="">Select a Table</option>
                {tables.map((table) => {
                  const booked = isTableBooked(table._id);
                  return !booked ? (
                    <option key={table._id} value={table._id}>
                      Table {table.name || table.number} - {table.seats || 'N/A'} Seats
                    </option>
                  ) : null;
                })}
              </select>
            </>
          )}

          <input
            type="number"
            name="numberOfPersons"
            value={bookingData.numberOfPersons}
            onChange={handleChange}
            min="1"
            required
            style={styles.input}
          />
          <input
            type="date"
            name="bookingDate"
            min={new Date().toISOString().split('T')[0]}
            value={bookingData.bookingDate}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="time"
            name="bookingTime"
            value={bookingData.bookingTime}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <button
            type="submit"
            style={styles.button}
            onMouseOver={(e) =>
              (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)
            }
            onMouseOut={(e) =>
              (e.target.style.backgroundColor = styles.button.backgroundColor)
            }
          >
            Proceed to Payment
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '90vh',
    backgroundColor: '#f8f9fa',
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
    outline: 'none',
  },
  select: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
    outline: 'none',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: '0.3s',
  },
  buttonHover: {
    backgroundColor: '#218838',
  },
};

export default BookingForm;
