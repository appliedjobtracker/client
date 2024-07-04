import React from 'react';
import '../../styles/views/Hero.scss';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <section className="hero" id="home">
      <div className="container">
        <h1>Welcome to AppliedJobTracker</h1>
        <p>Track your job applications with ease and efficiency.</p>
        <button onClick={() => handleNavigate('/features')} className="cta-button">Learn More</button>
      </div>
    </section>
  );
};

export default Hero;