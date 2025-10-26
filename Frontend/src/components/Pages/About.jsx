import React from 'react';

const About = () => {
  return (
    <div style={styles.container}>
      {/* Header Section */}
      <header style={styles.header}>
        <h1 style={styles.title}>About Us</h1>
        <p style={styles.subtitle}>
          Discover a world of exquisite flavors and a cozy ambiance that makes every visit memorable.
        </p>
      </header>

      {/* About Content */}
      <section style={styles.content}>
        <div style={styles.imageContainer}>
          <img
            src="../../assets/download1.jpeg"
            alt="Restaurant Interior"
            style={styles.image}
          />
        </div>
        <div style={styles.textContainer}>
          <h2 style={styles.heading}>Our Story</h2>
          <p style={styles.text}>
            Established in 2000, our restaurant has been serving delicious gourmet meals with top-notch hospitality.
            We believe in using the freshest ingredients to craft dishes that leave a lasting impression.
          </p>

          <h2 style={styles.heading}>Why Choose Us?</h2>
          <ul style={styles.list}>
            <li><i className="fas fa-check-circle" style={styles.icon}></i> Elegant Dining Experience</li>
            <li><i className="fas fa-check-circle" style={styles.icon}></i> Fresh & High-Quality Ingredients</li>
            <li><i className="fas fa-check-circle" style={styles.icon}></i> Top-Rated Chefs & Exceptional Service</li>
            <li><i className="fas fa-check-circle" style={styles.icon}></i> Convenient Online Table Booking</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

// Inline styles for responsiveness and modern design
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
  content: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
    alignItems: 'center',
    padding: '20px',
    maxWidth: '1000px',
    margin: 'auto',
  },
  imageContainer: {
    textAlign: 'center',
  },
  image: {
    width: '100%',
    borderRadius: '10px',
    boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
  },
  textContainer: {
    textAlign: 'left',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '10px',
    color: '#222',
  },
  text: {
    fontSize: '16px',
    color: '#555',
    marginBottom: '15px',
  },
  list: {
    listStyle: 'none',
    padding: '0',
    fontSize: '16px',
    color: '#555',
  },
  icon: {
    color: '#f04e30',
    marginRight: '10px',
  },
};

export default About;
