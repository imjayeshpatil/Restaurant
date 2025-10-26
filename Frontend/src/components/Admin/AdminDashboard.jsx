

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [tables, setTables] = useState([]);
  const [tableName, setTableName] = useState("");
  const [seats, setSeats] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      alert("Access denied! Admins only.");
      navigate("/");
      return;
    }

    fetchBookings();
    fetchTables();
  }, [navigate]);

  const fetchBookings = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token not found.");
      alert("Session expired. Please log in again.");
      return;
    }

    axios
      .get("http://localhost:5000/api/booking", {
        headers: {
          "x-auth-token": token,
        },
      })
      .then((res) => {
        setBookings(res.data);
      })
      .catch((err) => {
        console.error("Error fetching bookings:", err.response?.data || err);
        alert("Failed to load bookings.");
      });
  };

  const fetchTables = () => {
    axios
      .get("http://localhost:5000/api/table")
      .then((res) => {
        setTables(res.data);
      })
      .catch((err) => {
        console.error("Error fetching tables:", err.response?.data || err);
      });
  };

  const updateBooking = (id, status) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Session expired. Please log in again.");
      return;
    }

    axios
      .put(
        `http://localhost:5000/api/booking/${id}`,
        { status },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      )
      .then(() => {
        setBookings((prev) =>
          prev.map((b) => (b._id === id ? { ...b, status } : b))
        );
        alert(`Booking ${status}`);
      })
      .catch((err) => {
        console.error("Error updating booking:", err.response?.data || err);
      });
  };

  // const deleteBooking = async (id) => {
  //   const token = localStorage.getItem("token");
  //   console.log(token);
  //   if (!token) {
  //     alert("Session expired. Please log in again.");
  //     return;
  //   }

  //   try {
  //     await axios.delete(`http://localhost:5000/api/bookings/${id}`, {
  //       headers: { "x-auth-token": token },
  //     });
  //     setBookings((prev) => prev.filter((b) => b._id !== id));
  //     alert("Booking deleted successfully.");
  //   } catch (err) {
  //     console.error("Error deleting booking:", err.response?.data || err);
  //     alert("Failed to delete booking.");
  //   }
  // };

  const handleAddTable = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Authentication failed. Please log in again.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/table",
        { name: tableName, seats },
        { headers: { "x-auth-token": token } }
      );
      alert("Table added successfully");
      setTableName("");
      setSeats(1);
      fetchTables();
    } catch (err) {
      console.error("Error adding table:", err.response?.data || err);
      alert("Failed to add table");
    }
  };

  const handleDeleteTable = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/table/${id}`, {
        headers: { "x-auth-token": token },
      });
      fetchTables();
    } catch (err) {
      console.error("Error deleting table:", err.response?.data || err);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>
        <i className="fas fa-user-shield"></i> Admin Dashboard
      </h2>

      <h3 style={styles.subHeading}>
        <i className="fas fa-calendar-check"></i> Bookings
      </h3>

      {bookings && bookings.length > 0 ? (
        <div style={styles.cardparent}>
          {bookings.map((booking) => (
            <div key={booking._id} style={styles.card}>
              <p style={styles.label}>
                <i className="fas fa-user me-2"></i>{booking.name}
              </p>
              <p style={styles.label}>
                <i className="fa-solid fa-envelope me-2"></i>{booking.email}
              </p>
              <p style={styles.label}>
                <i className="fa-solid fa-calendar-days me-2"></i>
                Date: {new Date(booking.bookingDate).toISOString().slice(0, 10)}
              </p>
              <p style={styles.label}>
                <i className="fa-solid fa-clock me-2"></i>Time: {booking.bookingTime}
              </p>
              <p style={styles.label}>
                <i className="fas fa-chair me-2"></i>
                Table: {booking.tableId.name} ({booking.tableId.seats} seats)
              </p>
              <p style={styles.label}>
                <i className="fas fa-users me-2"></i>Persons: {booking.numberOfPersons}
              </p>
              <p style={styles.label}>
              {/* <i class="fa-solid fa-indian-rupee-sign me-2"></i> Amount Paid:{booking.amount} */}
                <i className="fa-solid fa-indian-rupee-sign me-2"></i> Amount Paid: {(booking.amount / 100).toFixed(2)}
              </p>
              <p style={styles.label}>
                <i className="fas fa-info-circle me-2"></i>Status: {booking.status}
              </p>

              {booking.status === "pending" && (
                <div style={styles.buttonGroup}>
                  <button
                    style={styles.confirmButton}
                    onClick={() => updateBooking(booking._id, "confirmed")}
                  >
                    <i className="fas fa-check"></i> Confirm
                  </button>
                  <button
                    style={styles.rejectButton}
                    onClick={() => updateBooking(booking._id, "rejected")}
                  >
                    <i className="fas fa-times"></i> Reject
                  </button>
                </div>
              )}
              {/* <button
                style={styles.deleteButton}
                onClick={() => deleteBooking(booking._id)}
              >
                <i className="fas fa-trash me-2"></i> Delete
              </button> */}
            </div>
          ))}
        </div>
      ) : (
        <p>No bookings available or failed to load.</p>
      )}

      <h3 style={styles.subHeading}>
        <i className="fas fa-utensils me-2"></i> Manage Tables
      </h3>
      <form onSubmit={handleAddTable} style={styles.form}>
        <input
          type="text"
          placeholder="Table Name"
          value={tableName}
          onChange={(e) => setTableName(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Seats"
          value={seats}
          onChange={(e) => setSeats(Number(e.target.value))}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.addButton}>
          <i className="fas fa-plus-circle me-2"></i> Add Table
        </button>
      </form>

      <h3 style={styles.subHeading}>
        <i className="fas fa-table me-2"></i> Existing Tables
      </h3>
      {tables && tables.length > 0 ? (
        tables.map((table) => (
          <div key={table._id} style={styles.card}>
            <p>
              <i className="fas fa-chair me-2"></i> Table: {table.name}
            </p>
            <p>
              <i className="fas fa-users me-2"></i> Seats: {table.seats}
            </p>
            <button
              onClick={() => handleDeleteTable(table._id)}
              style={styles.deleteButton}
            >
              <i className="fas fa-trash me-2"></i> Delete
            </button>
          </div>
        ))
      ) : (
        <p>No tables available</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "97vw",
    margin: "20px auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    textAlign: "center",
    color: "#333",
  },
  subHeading: {
    color: "#555",
    marginTop: "20px",
  },
  cardparent: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    justifyContent: "space-evenly",
  },
  label: {
    fontSize: "18px",
    marginBottom: "0px",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "15px",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s ease-in-out",
    width: "32%",
  },
  buttonGroup: {
    display: "flex",
    gap: "12px",
    marginTop: "15px",
  },
  confirmButton: {
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  rejectButton: {
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  deleteButton: {
    backgroundColor: "#ff0000",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  addButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "10px",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default AdminDashboard;
