import React from 'react';
import '../../styles/views/Footer.scss';

const Footer = () => {
  return (
    <footer className="footer" id="contact">
      <div className="container">
        <p>&copy; 2024 AppliedJobTracker. All Rights Reserved.</p>
        <div className="social-links">
          <a href="https://twitter.com">Twitter</a>
          <a href="https://facebook.com">Facebook</a>
          <a href="https://instagram.com">Instagram</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;