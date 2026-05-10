import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer style={{ padding: '6rem 0 3rem', background: '#000', borderTop: '1px solid #222' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <img src="/phaneros-dark.png" alt="Phaneros" style={{ height: '40px' }} />
            <h1 style={{ fontWeight: 900, fontSize: '1.4rem', color: 'white', letterSpacing: '-0.05em', margin: 0 }}>Phaneros</h1>
          </div>
          <p className="text-dim footer-mission" style={{ maxWidth: '650px', margin: '0 auto', lineHeight: '1.6', fontWeight: 500 }}>
            Real-time Bible verse detection and presentation for live services.
          </p>
        </div>
        
        <div style={{ borderTop: '1px solid #222', paddingTop: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p className="text-dim footer-bottom-text" style={{ margin: 0 }}>&copy; {new Date().getFullYear()} Phaneros Suite. All Rights Reserved.</p>
          <p className="text-dim footer-bottom-text" style={{ margin: 0 }}>
            Designed & Developed by <a href="https://samuelolubukun.netlify.app/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)', fontWeight: 600 }}>Samuel Olubukun</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
