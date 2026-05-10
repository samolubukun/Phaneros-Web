import React from 'react';
import CustomVideoPlayer from './CustomVideoPlayer';

const Intro: React.FC = () => {
  return (
    <section className="section-padding section-white" style={{ textAlign: 'center', padding: '12rem 0' }}>
      <div className="container video-section-container" style={{ maxWidth: '1200px' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '4rem' }}>Introducing <span style={{ color: 'var(--gold)' }}>Phaneros</span></h2>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'center' }}>
          <CustomVideoPlayer 
            src="/phanerosdemo.mp4" 
          />
        </div>
      </div>
    </section>
  );
};

export default Intro;
