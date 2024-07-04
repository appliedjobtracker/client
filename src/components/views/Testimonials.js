import React from 'react';
import '../../styles/views/Testimonials.scss';

const Testimonials = () => {
  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <h2>What Our Users Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial">
            <p>"AppliedJobTracker has made my job search so much easier. I love the reminders feature!"</p>
            <h4>- John Doe</h4>
          </div>
          <div className="testimonial">
            <p>"The statistics feature helped me understand where I was going wrong. Highly recommend!"</p>
            <h4>- Jane Smith</h4>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;