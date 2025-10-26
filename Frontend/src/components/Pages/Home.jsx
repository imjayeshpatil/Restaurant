// import React from 'react';
// import { Link } from 'react-router-dom';

// const Home = () => {
//   return (
//     <div style={styles.container}>
//       <header style={styles.header}>
//         <h1 style={styles.title}>Welcome to Our Restaurant</h1>
//         <p style={styles.subtitle}>Experience the best dining with us!</p>
//         {/* <button style={styles.button}>
//           <i className="fas fa-utensils"></i> Book a Table
//         </button> */}
//         <Link to="/booking" style={{ ...styles.button, textDecoration: "none" }}>
//   <i className="fas fa-utensils"></i> Book a Table
// </Link>
//       </header>

//       {/* Features Section */}
//       <section style={styles.features}>
//         <div style={styles.featureCard}>
//           <i className="fas fa-concierge-bell" style={styles.icon}></i>
//           <h3 style={styles.featureTitle}>Quality Service</h3>
//           <p style={styles.featureText}>We provide the best service for a delightful dining experience.</p>
//         </div>

//         <div style={styles.featureCard}>
//           <i className="fas fa-pizza-slice" style={styles.icon}></i>
//           <h3 style={styles.featureTitle}>Delicious Food</h3>
//           <p style={styles.featureText}>Enjoy a variety of gourmet dishes prepared by top chefs.</p>
//         </div>

//         <div style={styles.featureCard}>
//           <i className="fas fa-wine-glass-alt" style={styles.icon}></i>
//           <h3 style={styles.featureTitle}>Great Ambience</h3>
//           <p style={styles.featureText}>Relax and dine in a luxurious and cozy atmosphere.</p>
//         </div>
//       </section>
//     </div>
//   );
// };

// // Inline styles for responsiveness and professional design
// const styles = {
//   container: {
//     textAlign: 'center',
//     padding: '20px',
//     backgroundColor: '#f8f8f8',
//     minHeight: '100vh',
//   },
//   header: {
//     backgroundColor: '#222',
//     color: '#fff',
//     padding: '50px 20px',
//     borderRadius: '10px',
//     margin: '20px auto',
//     maxWidth: '90%',
//   },
//   title: {
//     fontSize: '36px',
//     marginBottom: '10px',
//   },
//   subtitle: {
//     fontSize: '18px',
//     marginBottom: '20px',
//   },
//   button: {
//     backgroundColor: '#f04e30',
//     color: '#fff',
//     padding: '12px 20px',
//     fontSize: '16px',
//     border: 'none',
//     borderRadius: '5px',
//     cursor: 'pointer',
//     transition: 'all 0.3s ease-in-out',
//   },
//   features: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
//     gap: '20px',
//     marginTop: '30px',
//     padding: '0 10px',
//   },
//   featureCard: {
//     backgroundColor: '#fff',
//     padding: '20px',
//     borderRadius: '10px',
//     boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
//     transition: 'all 0.3s ease-in-out',
//   },
//   icon: {
//     fontSize: '30px',
//     color: '#f04e30',
//     marginBottom: '10px',
//   },
//   featureTitle: {
//     fontSize: '20px',
//     marginBottom: '8px',
//   },
//   featureText: {
//     fontSize: '14px',
//     color: '#555',
//   },
// };

// // Hover effect using JavaScript
// document.addEventListener('DOMContentLoaded', () => {
//   document.querySelectorAll('button').forEach((btn) => {
//     btn.addEventListener('mouseover', () => {
//       btn.style.backgroundColor = '#ff6b50';
//     });
//     btn.addEventListener('mouseout', () => {
//       btn.style.backgroundColor = '#f04e30';
//     });
//   });
// });

// export default Home;








import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  // Update authentication state when the component mounts
  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("token"));
  }, []);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Welcome to Our Restaurant</h1>
        <p style={styles.subtitle}>Experience the best dining with us!</p>

        {/* Conditionally render the Book a Table link if the user is authenticated */}
        {isAuthenticated ? (
          <Link to="/booking" style={{ ...styles.button, textDecoration: "none" }}>
            <i className="fas fa-utensils"></i> Book a Table
          </Link>
        ) : (
          <p style={styles.subtitle}>Please log in to book a table.</p>
        )}
      </header>

      {/* Features Section */}
      <section style={styles.features}>
        <div style={styles.featureCard}>
          <i className="fas fa-concierge-bell" style={styles.icon}></i>
          <h3 style={styles.featureTitle}>Quality Service</h3>
          <p style={styles.featureText}>We provide the best service for a delightful dining experience.</p>
        </div>

        <div style={styles.featureCard}>
          <i className="fas fa-pizza-slice" style={styles.icon}></i>
          <h3 style={styles.featureTitle}>Delicious Food</h3>
          <p style={styles.featureText}>Enjoy a variety of gourmet dishes prepared by top chefs.</p>
        </div>

        <div style={styles.featureCard}>
          <i className="fas fa-wine-glass-alt" style={styles.icon}></i>
          <h3 style={styles.featureTitle}>Great Ambience</h3>
          <p style={styles.featureText}>Relax and dine in a luxurious and cozy atmosphere.</p>
        </div>
      </section>
    </div>
  );
};

// Inline styles for responsiveness and professional design
const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#f8f8f8',
    minHeight: '100vh',
  },
  header: {
    backgroundColor: '#222',
    color: '#fff',
    padding: '50px 20px',
    borderRadius: '10px',
    margin: '20px auto',
    maxWidth: '90%',
  },
  title: {
    fontSize: '36px',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '18px',
    marginBottom: '20px',
  },
  button: {
    backgroundColor: '#f04e30',
    color: '#fff',
    padding: '12px 20px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'all 0.3s ease-in-out',
  },
  features: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
    marginTop: '30px',
    padding: '0 10px',
  },
  featureCard: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease-in-out',
  },
  icon: {
    fontSize: '30px',
    color: '#f04e30',
    marginBottom: '10px',
  },
  featureTitle: {
    fontSize: '20px',
    marginBottom: '8px',
  },
  featureText: {
    fontSize: '14px',
    color: '#555',
  },
};

export default Home;
