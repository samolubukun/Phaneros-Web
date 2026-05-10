import React from 'react';
import { Link } from 'react-router-dom';

const Mission: React.FC = () => {
  return (
    <section id="about" className="section-padding section-white">
      <div className="container" style={{ display: 'flex', gap: '4rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <div className="mission-image" style={{ flex: '1 1 400px', padding: '2rem 0' }}>
          <img src="/phaneros_classic.jpg" alt="Phaneros Classic" style={{ 
            width: '100%', 
            borderRadius: '12px', 
            boxShadow: '0 30px 60px rgba(0,0,0,0.4), 0 0 20px rgba(255, 184, 0, 0.1)', 
            border: '1px solid rgba(255, 184, 0, 0.2)',
            transform: 'scale(1.1)' 
          }} />
        </div>
        <div className="mission-content" style={{ flex: '1 1 400px' }}>
          <h4 style={{ color: 'var(--gold)', fontWeight: 800, marginBottom: '1rem', textTransform: 'uppercase' }}>The Mission</h4>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', marginBottom: '2rem' }}>Making the Word <span style={{ color: 'var(--gold)' }}>Visible</span></h2>
          <p style={{ fontSize: '1.1rem', color: '#555', marginBottom: '2rem' }}>
            Phaneros (Greek: φανερός) means "visible" or "clearly seen." This application is 
            built to listen and automatically detect spoken scripture, providing a 
            hands-free presentation that bridges the pulpit and the screen.
          </p>
          <Link to="/studio" className="btn btn-primary btn-pulse" style={{ background: '#000', color: '#fff', border: '2px solid var(--gold)' }}>Open Web Studio</Link>
        </div>
      </div>
    </section>
  );
};

export default Mission;
