import React from 'react';

interface LinuxModalProps {
  onClose: () => void;
  onDownload: (url: string) => void;
  debUrl: string;
  rpmUrl: string;
}

const LinuxModal: React.FC<LinuxModalProps> = ({ onClose, onDownload, debUrl, rpmUrl }) => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.85)',
      backdropFilter: 'blur(8px)',
      zIndex: 2000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }} onClick={onClose}>
      <div style={{
        background: '#111',
        border: '1px solid var(--gold)',
        borderRadius: '24px',
        padding: 'clamp(1.5rem, 5vw, 3rem)',
        maxWidth: '500px',
        width: '100%',
        textAlign: 'center',
        position: 'relative',
        boxShadow: '0 20px 50px rgba(255, 184, 0, 0.15)',
        maxHeight: '90vh',
        overflowY: 'auto'
      }} onClick={e => e.stopPropagation()}>
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'rgba(255,255,255,0.05)',
            border: 'none',
            color: '#888',
            cursor: 'pointer',
            fontSize: '1.2rem',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >&times;</button>
        <h3 style={{ fontSize: 'clamp(1.4rem, 4vw, 1.8rem)', color: 'white', marginBottom: '1rem' }}>Choose Linux Package</h3>
        <p style={{ color: '#888', marginBottom: '2.5rem', fontSize: '0.95rem' }}>Select the format compatible with your distribution.</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
          <button onClick={() => onDownload(debUrl)} className="btn linux-download-btn" style={{ 
            padding: '1.2rem', 
            fontSize: '0.95rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            cursor: 'pointer',
            width: '100%',
            background: 'transparent',
            border: '1px solid #333',
            color: 'white',
            whiteSpace: 'nowrap'
          }}>
            Download .DEB (Debian/Ubuntu)
          </button>
          <button onClick={() => onDownload(rpmUrl)} className="btn linux-download-btn" style={{ 
            padding: '1.2rem', 
            fontSize: '0.95rem', 
            background: 'transparent', 
            border: '1px solid #333', 
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            cursor: 'pointer',
            width: '100%',
            whiteSpace: 'nowrap'
          }}>
            Download .RPM (Fedora/RHEL)
          </button>
        </div>
      </div>
    </div>
  );
};

export default LinuxModal;
