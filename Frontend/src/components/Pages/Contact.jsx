import React from 'react';

const Contact = () => {
  return (
    <div style={styles.container}>
      {/* Header Section */}
      <header style={styles.header}>
        <h1 style={styles.title}>Contact Us</h1>
        <p style={styles.subtitle}>
          Have a question or need assistance? Reach out to us!
        </p>
      </header>

      {/* Contact Info Section */}
      <section style={styles.contactInfo}>
        <div style={styles.infoBox}>
          <i className="fas fa-map-marker-alt" style={styles.icon}></i>
          <p>123 Gourmet Street, Food City, NY 10001</p>
        </div>
        <div style={styles.infoBox}>
          <i className="fas fa-phone" style={styles.icon}></i>
          <p>+1-234-567-890</p>
        </div>
        <div style={styles.infoBox}>
          <i className="fas fa-envelope" style={styles.icon}></i>
          <p>info@restaurant.com</p>
        </div>
      </section>

      {/* Contact Form */}
      <section style={styles.formSection}>
        <h2 style={styles.heading}>Send Us a Message</h2>
        <form style={styles.form}>
          <input type="text" placeholder="Your Name" style={styles.input} required />
          <input type="email" placeholder="Your Email" style={styles.input} required />
          <textarea placeholder="Your Message" rows="5" style={styles.textarea} required></textarea>
          <button type="submit" style={styles.button}>Send Message</button>
        </form>
      </section>

      {/* Google Map (Replace the src link with your location) */}
      <section style={styles.mapSection}>
        <h2 style={styles.heading}>Find Us</h2>
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509364!2d144.95592631558998!3d-37.81720974202166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x5045675218ce6e0!2sMelbourne%20CBD%2C%20Victoria%2C%20Australia!5e0!3m2!1sen!2s!4v1603696362220!5m2!1sen!2s"
          width="100%"
          height="300"
          style={styles.map}
          allowFullScreen
          loading="lazy"
        ></iframe>
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
    padding: '40px 20px',
    borderRadius: '10px',
    margin: '20px auto',
    maxWidth: '90%',
  },
  title: {
    fontSize: '32px',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '18px',
  },
  contactInfo: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    padding: '30px',
    maxWidth: '800px',
    margin: 'auto',
  },
  infoBox: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  icon: {
    fontSize: '24px',
    color: '#f04e30',
    marginBottom: '10px',
  },
  formSection: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
    margin: '30px auto',
    maxWidth: '600px',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '15px',
    color: '#222',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '12px',
    margin: '10px 0',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '16px',
  },
  textarea: {
    padding: '12px',
    margin: '10px 0',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '16px',
  },
  button: {
    backgroundColor: '#f04e30',
    color: '#fff',
    padding: '12px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '10px',
  },
  buttonHover: {
    backgroundColor: '#d43b1f',
  },
  mapSection: {
    marginTop: '30px',
  },
  map: {
    border: '0',
    borderRadius: '10px',
  },
};

export default Contact;
