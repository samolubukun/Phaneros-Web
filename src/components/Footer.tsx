import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
            <img src="/phaneroslogo.png" alt="Phaneros" style={{ height: '60px', objectFit: 'contain' }} />
          </div>
          <p className="text-dim footer-mission" style={{ maxWidth: '650px', margin: '0 auto', lineHeight: '1.6', fontWeight: 500 }}>
            Real-time Bible verse detection and presentation for live services.
          </p>
        </div>
        
        <div className="footer-bottom" style={{ borderTop: '1px solid #222', paddingTop: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p className="text-dim footer-bottom-text" style={{ margin: 0 }}>&copy; {new Date().getFullYear()} Phaneros. All Rights Reserved.</p>
          <p className="text-dim footer-bottom-text" style={{ margin: 0 }}>
            Designed & Developed by <a href="https://samuelolubukun.netlify.app/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)', fontWeight: 600 }}>Samuel Olubukun</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
