import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Mission from './components/Mission';
import Features from './components/Features';
import Intro from './components/Intro';
import TechStack from './components/TechStack';
import DesktopApp from './components/DesktopApp';
import Footer from './components/Footer';
import LinuxModal from './components/LinuxModal';

const LandingPage: React.FC = () => {
  const [showLinuxModal, setShowLinuxModal] = useState(false);
  const downloadUrl = "https://olxclone.sfo3.digitaloceanspaces.com/Phaneros_0.1.0_x64-setup.exe";
  const debUrl = "https://olxclone.sfo3.digitaloceanspaces.com/Phaneros_0.1.0_amd64.deb";
  const rpmUrl = "https://olxclone.sfo3.digitaloceanspaces.com/Phaneros-0.1.0-1.x86_64.rpm";

  const handleDownload = (url: string) => {
    window.location.href = url;
  };

  return (
    <div className="landing-page">
      {showLinuxModal && (
        <LinuxModal 
          onClose={() => setShowLinuxModal(false)} 
          onDownload={handleDownload}
          debUrl={debUrl}
          rpmUrl={rpmUrl}
        />
      )}
      
      <Navbar />
      <Hero />
      <Mission />
      <Features />
      <Intro />
      <TechStack />
      <DesktopApp 
        onLinuxClick={() => setShowLinuxModal(true)} 
        onDownload={handleDownload}
        downloadUrl={downloadUrl}
      />
      <Footer />
    </div>
  );
};

const StudioPage: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100vh', background: '#000', overflow: 'hidden' }}>
      <iframe 
        src="https://samuelolubukun-phaneros.hf.space" 
        style={{ width: '100%', height: '100%', border: 'none' }}
        title="Phaneros Studio"
      />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/studio" element={<StudioPage />} />
      </Routes>
    </Router>
  );
};

export default App;
