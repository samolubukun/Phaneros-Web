import React, { useRef, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const CustomVideoPlayer: React.FC<{ src: string; poster?: string }> = ({ src, poster }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showControls, setShowControls] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = Number(e.target.value);
    if (videoRef.current) {
      videoRef.current.volume = vol;
      setVolume(vol);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div 
      style={{ 
        position: 'relative', 
        width: '100%', 
        maxWidth: '1000px', 
        borderRadius: '20px', 
        overflow: 'hidden', 
        border: '8px solid #1A1A1A', 
        outline: '1px solid rgba(255, 184, 0, 0.3)',
        boxShadow: '0 30px 60px rgba(0,0,0,0.5), 0 0 40px rgba(255, 184, 0, 0.1)',
        aspectRatio: '2.2 / 1'
      }}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      <video 
        ref={videoRef}
        poster={poster}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onClick={togglePlay}
        className="video-content"
        style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }}
      >
        <source src={src} type="video/mp4" />
      </video>

      {/* Custom Controls */}
      <div className="controls-container" style={{ 
        position: 'absolute', 
        bottom: 0, 
        left: 0, 
        right: 0, 
        background: 'linear-gradient(transparent, rgba(0,0,0,0.9))', 
        padding: '2rem 1.5rem 1rem',
        opacity: showControls ? 1 : 0,
        transition: 'opacity 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem'
      }}>
        {/* Progress Bar Container */}
        <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
          <input 
            type="range" 
            min={0} 
            max={duration || 0} 
            value={currentTime} 
            onChange={handleSeek}
            style={{ width: '100%', accentColor: 'var(--gold)', height: '4px', cursor: 'pointer' }} 
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button onClick={togglePlay} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
              {isPlaying ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              )}
            </button>
            <span style={{ color: 'white', fontSize: '0.85rem', fontFamily: 'monospace', fontWeight: 600 }}>
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M11 5L6 9H2v6h4l5 4V5zM15.54 8.46L14.12 9.88c.75.75.75 1.97 0 2.72l1.42 1.42a4 4 0 000-5.56zM18.36 5.64l-1.42 1.42a7 7 0 010 9.9l1.42 1.42a9 9 0 000-12.74z"/></svg>
            <input 
              type="range" 
              min={0} 
              max={1} 
              step={0.1} 
              value={volume} 
              onChange={handleVolumeChange}
              style={{ width: '80px', accentColor: 'var(--gold)', height: '3px' }} 
            />
          </div>
        </div>
      </div>

      {/* Large Central Play Button (Only shown when paused) */}
      {!isPlaying && (
        <div 
          onClick={togglePlay}
          className="central-play-button"
          style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            background: 'var(--gold)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 0 30px rgba(255, 184, 0, 0.4)',
            transition: 'all 0.3s ease',
            zIndex: 10,
            width: 'clamp(50px, 10vw, 80px)',
            height: 'clamp(50px, 10vw, 80px)'
          }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="black" className="play-icon-svg"><path d="M8 5v14l11-7z"/></svg>
        </div>
      )}
    </div>
  );
};

const LandingPage: React.FC = () => {
  const downloadUrl = "https://olxclone.sfo3.digitaloceanspaces.com/Phaneros_0.1.0_x64-setup.exe";

  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="navbar" style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        zIndex: 100, 
        padding: '1.5rem 0',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <img src="/phaneros-dark.png" alt="Phaneros Logo" className="nav-logo-img" style={{ height: '35px' }} />
            <span className="nav-logo-text" style={{ fontWeight: 900, fontSize: '1.5rem', fontFamily: 'Montserrat', color: 'white', letterSpacing: '-0.05em' }}>Phaneros</span>
          </div>
          <div className="nav-cta-group" style={{ display: 'flex', gap: '1.2rem', alignItems: 'center' }}>
            <a href="https://github.com/samolubukun/Phaneros/" target="_blank" rel="noopener noreferrer" className="github-icon-link">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
            <Link to="/studio" className="btn btn-primary nav-cta-btn btn-launch-glow" style={{ padding: '0.6rem 1.2rem', gap: '0.5rem', fontSize: '0.9rem' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="desktop-only"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
              <span className="desktop-only">Launch Studio</span>
              <span className="mobile-only">Launch</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <div className="hero-content" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ color: 'white' }}>Elevate Your <span style={{ color: 'var(--gold)' }}>Presentations</span> with Phaneros</h1>
            <p className="hero-subtitle" style={{ color: 'white', opacity: 0.9, maxWidth: '700px', margin: '0 auto 2.5rem', fontWeight: 500 }}>
              Automating the bridge between spoken scripture and visual output. 
              High-speed detection, clear presentation, and seamless integration.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/studio" className="btn btn-primary hero-btn btn-launch-glow" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', gap: '0.75rem' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                Launch Studio
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section (White) */}
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

      {/* Key Features (Dark) */}
      <section id="features" className="section-padding section-dark">
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: 'clamp(2rem, 4vw, 2.5rem)', marginBottom: '4rem' }}>Phaneros Key <span style={{ color: 'var(--gold)' }}>Features</span></h2>
          <div className="features-grid">
            <div className="feature-item">
              <img src="/phaneros_classic.jpg" alt="Dashboard Classic" />
              <h3>Dashboard Classic</h3>
              <p className="text-dim">The Classic View dashboard. This layout prioritizes the Live Transcript, a Bible book search/reader, and a "Recent Detections" list for automated scripture identification.</p>
            </div>
            <div className="feature-item">
              <img src="/phaneros_studio.jpg" alt="Dashboard Studio" />
              <h3>Dashboard Studio</h3>
              <p className="text-dim">Studio dashboard featuring a Show Builder, Slide Composer, and Resource management for professional live presentation creation and streamlined media orchestration.</p>
            </div>
            <div className="feature-item">
              <img src="/phaneros_composer.jpg" alt="Slide Composer" />
              <h3>Slide Composer</h3>
              <p className="text-dim">The Slide Composer in action within the Studio layout. It shows the editing interface for a specific slide titled "Welcome," including template selection and duration settings.</p>
            </div>
            <div className="feature-item">
              <img src="/phaneros_theme_designer.jpg" alt="Theme Designer" />
              <h3>Theme Designer</h3>
              <p className="text-dim">Interface for customizing scripture styling, background aesthetics, and layout configurations, featuring live previews and theme management for presentations.</p>
            </div>
            <div className="feature-item">
              <img src="/phaneros_media_presenter.jpg" alt="Media Resources" />
              <h3>Media Resources</h3>
              <p className="text-dim">Centralized media hub for managing images and videos, featuring an integrated Live Display and dedicated Resource tab for seamless asset deployment.</p>
            </div>
            <div className="feature-item">
              <img src="/phaneros_broadcast_settings.jpg" alt="Broadcast Control" />
              <h3>Broadcast Control</h3>
              <p className="text-dim">The Broadcast configuration pop-up. It allows users to enable and manage two independent outputs for Main and Alternate with unique themes and browser source URLs for OBS.</p>
            </div>
            <div className="feature-item">
              <img src="/phaneros_speech_settings.jpg" alt="Speech Recognition" />
              <h3>Speech Recognition</h3>
              <p className="text-dim">Speech recognition selection offering Cloud Deepgram Nova-3 or local built-in transcription powered by either the Vosk Engine or Whisper.</p>
            </div>
            <div className="feature-item">
              <img src="/phaneros_api_settings.png" alt="Intelligence & APIs" />
              <h3>Intelligence & APIs</h3>
              <p className="text-dim">Settings menu for configuring Deepgram API keys for speech recognition and Cloudflare Embedding credentials for semantic search and vectorized allusions.</p>
            </div>
            <div className="feature-item">
              <img src="/phaneros_display_settings.png" alt="Display Mode Settings" />
              <h3>Display Mode Settings</h3>
              <p className="text-dim">Control center for Manual or Auto Broadcast modes, featuring an AI Direct toggle and adjustable confidence thresholds for intelligent scripture detection.</p>
            </div>
            <div className="feature-item">
              <img src="/phaneros_workspace_settings.png" alt="Workspace Management" />
              <h3>Workspace Management</h3>
              <p className="text-dim">Flexible layout toggle to seamlessly switch between the transcript-focused Classic view and the composition-centric Studio dashboard for optimized workflow efficiency.</p>
            </div>
          </div>
        </div>
      </section>


      {/* Intro Section (White) */}
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

      {/* Tech Stack Section (White) */}
      <section className="section-padding section-white" style={{ background: '#f8f8f8' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '4rem' }}>Intelligence & <span style={{ color: 'var(--gold)' }}>Production</span></h2>
          <div className="features-grid">
            <div className="card" style={{ background: 'white', border: '1px solid #eee', padding: '2rem', borderRadius: '16px' }}>
              <h3 style={{ color: 'var(--gold)', marginBottom: '1rem' }}>Native Core</h3>
              <p style={{ color: '#555' }}>Built with Rust and Tauri 2.1 to ensure a lightweight footprint, memory safety, and maximum performance on any OS.</p>
            </div>
            <div className="card" style={{ background: 'white', border: '1px solid #eee', padding: '2rem', borderRadius: '16px' }}>
              <h3 style={{ color: 'var(--gold)', marginBottom: '1rem' }}>Transcription</h3>
              <p style={{ color: '#555' }}>Hybrid STT architecture using Whisper High-Fidelity for local processing and Deepgram Nova-3 for low-latency cloud fallback.</p>
            </div>
            <div className="card" style={{ background: 'white', border: '1px solid #eee', padding: '2rem', borderRadius: '16px' }}>
              <h3 style={{ color: 'var(--gold)', marginBottom: '1rem' }}>Vector Intelligence</h3>
              <p style={{ color: '#555' }}>Semantic scripture resolution powered by Cloudflare Workers AI and high-dimensional verse embeddings.</p>
            </div>
            <div className="card" style={{ background: 'white', border: '1px solid #eee', padding: '2rem', borderRadius: '16px' }}>
              <h3 style={{ color: 'var(--gold)', marginBottom: '1rem' }}>Classic Dashboard</h3>
              <p style={{ color: '#555' }}>Optimized interface for high-density Bible verse monitoring, instant lookup, and low-latency display orchestration.</p>
            </div>
            <div className="card" style={{ background: 'white', border: '1px solid #eee', padding: '2rem', borderRadius: '16px' }}>
              <h3 style={{ color: 'var(--gold)', marginBottom: '1rem' }}>Studio Dashboard</h3>
              <p style={{ color: '#555' }}>Presentation suite for show building, slide design, and structured sermon delivery.</p>
            </div>
            <div className="card" style={{ background: 'white', border: '1px solid #eee', padding: '2rem', borderRadius: '16px' }}>
              <h3 style={{ color: 'var(--gold)', marginBottom: '1rem' }}>Broadcast Integration</h3>
              <p style={{ color: '#555' }}>Seamless integration with OBS, vMix, and hardware switchers via transparent overlays, OSC, and RESTful automation APIs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Desktop App (Dark) */}
      <section className="section-padding section-dark">
        <div className="container" style={{ display: 'flex', gap: '4rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div className="desktop-image" style={{ flex: '1 1 400px' }}>
            <img src="/phaneros_desktop_shot.png" alt="Desktop App" style={{ 
              width: '100%', 
              borderRadius: '12px', 
              border: '1px solid rgba(255, 184, 0, 0.2)',
              boxShadow: '0 30px 60px rgba(0,0,0,0.4), 0 0 20px rgba(255, 184, 0, 0.1)'
            }} />
          </div>
          <div className="desktop-content" style={{ flex: '1 1 400px' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', marginBottom: '2rem' }}>Desktop Native <span style={{ color: 'var(--gold)' }}>Performance</span></h2>
            <p style={{ marginBottom: '2rem' }}>
              Built on Tauri 2.1 for Windows, macOS, and Linux. Experience the power of 
              the Rust backend directly on your machine with minimal resource overhead.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <span className="check-icon">✓</span> Native WebView (Low RAM)
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <span className="check-icon">✓</span> Direct Hardware Access
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <span className="check-icon">✓</span> Secure Integrated STT
              </div>
            </div>
            <a href={downloadUrl} className="btn btn-primary" style={{ gap: '0.75rem' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M0 3.449L9.75 2.1V11.7H0V3.449zm0 9.15h9.75v9.6L0 20.784v-8.185zm10.5-10.55L24 0v11.7h-13.5V2.049zM24 12.6V24l-13.5-1.95V12.6H24z"/></svg>
              Download for Windows
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
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
