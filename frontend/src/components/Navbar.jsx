import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>
        <Link to="/">
          <img
            src="/h1.png"
            alt="Logo"
            style={styles.logoImg}
          />
        </Link>
      </div>
      <div
        style={{
          ...styles.navLinks,
          ...(isOpen ? styles.navLinksOpen : {}),
        }}
      >
        <Link to="/" style={styles.link} onClick={() => setIsOpen(false)}>Home</Link>
        <Link to="/appointment" style={styles.link} onClick={() => setIsOpen(false)}>Appointment</Link>
        <a href="https://hmsdash.vercel.app/" style={styles.adminPanelBtn} onClick={() => setIsOpen(false)}>manage</a>
      </div>
      <div onClick={handleToggle} style={styles.hamburger}>
        &#9776;
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#f0f0f0',
    borderBottom: '1px solid #ddd',
    position: 'fixed',
    width: '100%',
    top: 0,
    left: 0,
    zIndex: 1000,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
  },
  logoImg: {
    height: '50px',
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    transition: 'transform 0.3s ease-in-out',
  },
  navLinksOpen: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: '60px',
    right: '20px',
    backgroundColor: '#f0f0f0',
    width: '200px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    padding: '10px',
    gap: '10px',
    zIndex: 1000,
  },
  link: {
    textDecoration: 'none',
    color: '#333',
    fontWeight: '500',
    fontSize: '18px',
    transition: 'color 0.3s',
  },
  adminPanelBtn: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '5px',
    fontSize: '16px',
    textDecoration: 'none',
    fontWeight: '600',
    transition: 'background-color 0.3s',
  },
  hamburger: {
    display: 'none',
    fontSize: '24px',
    cursor: 'pointer',
  },
  '@media (max-width: 768px)': {
    navLinks: {
      display: 'none',
    },
    navLinksOpen: {
      display: 'flex',
    },
    hamburger: {
      display: 'block',
    },
  },
};

export default Navbar;
