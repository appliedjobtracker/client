import React from 'react';
import '../../styles/views/Features.scss';

const Features = () => {
  return (
    <section className="features" id="features">
      <div className="container">
        <h2>Features</h2>
        <div className="features-grid">
          <div className="feature">
            <h3>Easy Tracking</h3>
            <p>Keep track of all your job applications in one place.</p>
          </div>
          <div className="feature">
            <h3>Reminders</h3>
            <p>Set reminders for follow-ups and interviews.</p>
          </div>
          <div className="feature">
            <h3>Statistics</h3>
            <p>Get insights into your job application process.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;