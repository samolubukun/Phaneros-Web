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
  const [showLinuxModal, setShowLinuxModal] = useState(false);
  const downloadUrl = "https://olxclone.sfo3.digitaloceanspaces.com/Phaneros_0.1.0_x64-setup.exe";
  const debUrl = "https://olxclone.sfo3.digitaloceanspaces.com/Phaneros_0.1.0_amd64.deb";
  const rpmUrl = "https://olxclone.sfo3.digitaloceanspaces.com/Phaneros-0.1.0-1.x86_64.rpm";

  const handleDownload = (url: string) => {
    window.location.href = url;
  };

  return (
    <div className="landing-page">
      {/* Linux Download Modal */}
      {showLinuxModal && (
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
        }} onClick={() => setShowLinuxModal(false)}>
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
              onClick={() => setShowLinuxModal(false)}
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
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <button onClick={() => handleDownload(debUrl)} className="btn linux-download-btn" style={{ 
                padding: '1.2rem', 
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                cursor: 'pointer',
                width: '100%',
                background: 'transparent',
                border: '1px solid #333',
                color: 'white'
              }}>
                Download .DEB (Debian/Ubuntu)
              </button>
              <button onClick={() => handleDownload(rpmUrl)} className="btn linux-download-btn" style={{ 
                padding: '1.2rem', 
                fontSize: '1rem', 
                background: 'transparent', 
                border: '1px solid #333', 
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                cursor: 'pointer',
                width: '100%'
              }}>
                Download .RPM (Fedora/RHEL)
              </button>
            </div>
          </div>
        </div>
      )}
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
              <a href="https://github.com/samolubukun/Phaneros/" target="_blank" rel="noopener noreferrer" className="btn hero-btn secondary-btn" style={{ 
                padding: '0.8rem 2.2rem', 
                fontSize: '1.05rem', 
                gap: '0.75rem',
                display: 'inline-flex',
                alignItems: 'center'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                GitHub
              </a>
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
          <h2 className="one-line-desktop" style={{ textAlign: 'center', marginBottom: '4rem', fontSize: 'clamp(2rem, 4vw, 2.5rem)', lineHeight: '1.2' }}>
            Intelligence & <span style={{ color: 'var(--gold)' }}>Production</span>
          </h2>
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
      <section className="section-padding section-dark" style={{ padding: '12rem 0' }}>
        <div className="container" style={{ display: 'flex', gap: '4rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div className="desktop-image" style={{ flex: '1 1 400px', padding: '6rem 0' }}>
            <img src="/phaneros_desktop_shot.png" alt="Desktop App" style={{ 
              width: '100%', 
              borderRadius: '12px', 
              border: '1px solid rgba(255, 184, 0, 0.2)',
              boxShadow: '0 30px 60px rgba(0,0,0,0.4), 0 0 20px rgba(255, 184, 0, 0.1)',
              transform: 'scale(1.1)'
            }} />
          </div>
          <div className="desktop-content" style={{ flex: '1 1 400px' }}>
            <h2 className="one-line-desktop" style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', marginBottom: '2rem', lineHeight: '1.2' }}>
              Desktop Native <span style={{ color: 'var(--gold)' }}>Performance</span>
            </h2>
            <p style={{ marginBottom: '2rem' }}>
              Built on Tauri 2.1 for Windows, macOS, and Linux. Experience the power of 
              the Rust backend directly on your machine with minimal resource overhead.
            </p>
            <div style={{ display: 'flex', gap: '2rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', fontSize: '0.95rem', fontWeight: 500 }}>
                <span className="check-icon">✓</span> Native WebView (Low RAM)
              </div>
              <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', fontSize: '0.95rem', fontWeight: 500 }}>
                <span className="check-icon">✓</span> Direct Hardware Access
              </div>
              <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', fontSize: '0.95rem', fontWeight: 500 }}>
                <span className="check-icon">✓</span> Secure Integrated STT
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Main Button */}
              <button onClick={() => handleDownload(downloadUrl)} className="btn btn-primary main-download-btn" style={{ 
                gap: '1rem', 
                display: 'inline-flex', 
                alignItems: 'center',
                padding: '1rem 2.5rem',
                fontSize: '1.2rem',
                width: 'fit-content',
                cursor: 'pointer',
                border: 'none',
                whiteSpace: 'nowrap'
              }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}><path d="M0 3.449L9.75 2.1V11.7H0V3.449zm0 9.15h9.75v9.6L0 20.784v-8.185zm10.5-10.55L24 0v11.7h-13.5V2.049zM24 12.6V24l-13.5-1.95V12.6H24z"/></svg>
                <span>Download for Windows</span>
              </button>

              {/* Version Row */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <p style={{ color: '#888', fontSize: '1.1rem', fontWeight: 500 }}>Download another version:</p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  {/* Windows Icon */}
                  <button onClick={() => handleDownload(downloadUrl)} className="version-icon-btn" title="Windows">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M0 3.449L9.75 2.1V11.7H0V3.449zm0 9.15h9.75v9.6L0 20.784v-8.185zm10.5-10.55L24 0v11.7h-13.5V2.049zM24 12.6V24l-13.5-1.95V12.6H24z"/></svg>
                  </button>
                  
                  {/* macOS Icon (Coming Soon) */}
                  <div className="version-icon-btn coming-soon" title="macOS (Coming Soon)">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.06.75 1.21-.02 2.1-.78 3.52-.7 1.21.07 2.15.54 2.67 1.34-2.54 1.48-2.12 5.18.42 6.25-.56 1.43-1.28 2.85-2.67 5.33zm-2.86-13.43c-.06-1.63 1.31-3.2 2.94-3.35.21 1.76-1.3 3.42-2.94 3.35z"/></svg>
                  </div>

                  {/* Linux Icon */}
                  <button onClick={() => setShowLinuxModal(true)} className="version-icon-btn" title="Linux">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 640 640" fill="currentColor">
                      <path d="M316.9 187.3C317.9 187.8 318.7 189 319.9 189C321 189 322.7 188.6 322.8 187.5C323 186.1 320.9 185.2 319.6 184.6C317.9 183.9 315.7 183.6 314.1 184.5C313.7 184.7 313.3 185.2 313.5 185.6C313.8 186.9 315.8 186.7 316.9 187.3zM295 189C296.2 189 297 187.8 298 187.3C299.1 186.7 301.1 186.9 301.5 185.7C301.7 185.3 301.3 184.8 300.9 184.6C299.3 183.7 297.1 184 295.4 184.7C294.1 185.3 292 186.2 292.2 187.6C292.3 188.6 294 189.1 295 189zM516 467.8C512.4 463.8 510.7 456.2 508.8 448.1C507 440 504.9 431.3 498.3 425.7C497 424.6 495.7 423.6 494.3 422.8C493 422 491.6 421.3 490.2 420.8C499.4 393.5 495.8 366.3 486.5 341.7C475.1 311.6 455.2 285.3 440 267.3C422.9 245.8 406.3 225.4 406.6 195.3C407.1 149.4 411.7 64.1 330.8 64C228.4 63.8 254 167.4 252.9 199.2C251.2 222.6 246.5 241 230.4 263.9C211.5 286.4 184.9 322.7 172.3 360.6C166.3 378.5 163.5 396.7 166.1 413.9C159.6 419.7 154.7 428.6 149.5 434.1C145.3 438.4 139.2 440 132.5 442.4C125.8 444.8 118.5 448.4 114 456.9C111.9 460.8 111.2 465 111.2 469.3C111.2 473.2 111.8 477.2 112.4 481.1C113.6 489.2 114.9 496.8 113.2 501.9C108 516.3 107.3 526.3 111 533.6C114.8 540.9 122.4 544.1 131.1 545.9C148.4 549.5 171.9 548.6 190.4 558.4C210.2 568.8 230.3 572.5 246.3 568.8C257.9 566.2 267.4 559.2 272.2 548.6C284.7 548.5 298.5 543.2 320.5 542C335.4 540.8 354.1 547.3 375.6 546.1C376.2 548.4 377 550.7 378.1 552.8L378.1 552.9C386.4 569.6 401.9 577.2 418.4 575.9C435 574.6 452.5 564.9 466.7 548C480.3 531.6 502.7 524.8 517.6 515.8C525 511.3 531 505.7 531.5 497.5C531.9 489.3 527.1 480.2 516 467.8zM319.8 151.3C329.6 129.1 354 129.5 363.8 150.9C370.3 165.1 367.4 181.8 359.5 191.3C357.9 190.5 353.6 188.7 346.9 186.4C348 185.2 350 183.7 350.8 181.8C355.6 170 350.6 154.8 341.7 154.5C334.4 154 327.8 165.3 329.9 177.5C325.8 175.5 320.5 174 316.9 173.1C315.9 166.2 316.6 158.5 319.8 151.3zM279.1 139.8C289.2 139.8 299.9 154 298.2 173.3C294.7 174.3 291.1 175.8 288 177.9C289.2 169 284.7 157.8 278.4 158.3C270 159 268.6 179.5 276.6 186.4C277.6 187.2 278.5 186.2 270.7 191.9C255.1 177.3 260.2 139.8 279.1 139.8zM265.5 200.5C271.7 195.9 279.1 190.5 279.6 190C284.3 185.6 293.1 175.8 307.5 175.8C314.6 175.8 323.1 178.1 333.4 184.7C339.7 188.8 344.7 189.1 356 194C364.4 197.5 369.7 203.7 366.5 212.2C363.9 219.3 355.5 226.6 343.8 230.3C332.7 233.9 324 246.3 305.6 245.2C301.7 245 298.6 244.2 296 243.1C288 239.6 283.8 232.7 276 228.1C267.4 223.3 262.8 217.7 261.3 212.8C259.9 207.9 261.3 203.8 265.5 200.5zM268.8 534.5C266.1 569.6 224.9 568.9 193.5 552.5C163.6 536.7 124.9 546 117 530.6C114.6 525.9 114.6 517.9 119.6 504.2L119.6 504C122 496.4 120.2 488 119 480.1C117.8 472.3 117.2 465.1 119.9 460.1C123.4 453.4 128.4 451 134.7 448.8C145 445.1 146.5 445.4 154.3 438.9C159.8 433.2 163.8 426 168.6 420.9C173.7 415.4 178.6 412.8 186.3 414C194.4 415.2 201.4 420.8 208.2 430L227.8 465.6C237.3 485.5 270.9 514 268.8 534.5zM267.4 508.6C263.3 502 257.8 495 253 489C260.1 489 267.2 486.8 269.7 480.1C272 473.9 269.7 465.2 262.3 455.2C248.8 437 224 422.7 224 422.7C210.5 414.3 202.9 404 199.4 392.8C195.9 381.6 196.4 369.5 199.1 357.6C204.3 334.7 217.7 312.4 226.3 298.4C228.6 296.7 227.1 301.6 217.6 319.2C209.1 335.3 193.2 372.5 215 401.6C215.6 380.9 220.5 359.8 228.8 340.1C240.8 312.7 266.1 265.2 268.1 227.4C269.2 228.2 272.7 230.6 274.3 231.5C278.9 234.2 278.5 238.2 286.9 241.8C299.3 251.8 315.4 251 329.3 243C335.5 239.5 340.5 235.5 345.2 234C355.1 230.9 363 225.4 367.5 219C375.2 249.4 393.2 293.3 404.7 314.7C410.8 326.1 423 350.2 428.3 379.3C431.6 379.2 435.3 379.7 439.2 380.7C453 345 427.5 306.5 415.9 295.8C411.2 291.2 411 289.2 413.3 289.3C425.9 300.5 442.5 323 448.5 348.3C441.3 359.9 451.8 372 448.9 384C465.3 390.8 484.8 401.9 479.6 418.8C477.4 418.7 476.4 418.8 475.4 418.8C478.6 408.7 471.5 401.2 452.6 392.7C433 384.1 416.6 384.1 414.3 405.2C402.2 409.4 396 419.9 392.9 432.5C390.1 443.7 389.3 457.2 388.5 472.4C388 480.1 384.9 490.4 381.7 501.4C349.6 524.3 305 534.3 267.4 508.6zM524.8 497.1C523.9 513.9 483.6 517 461.6 543.6C448.4 559.3 432.2 568 418 569.1C403.8 570.2 391.5 564.3 384.3 549.8C379.6 538.7 381.9 526.7 385.4 513.5C389.1 499.3 394.6 484.7 395.3 472.9C396.1 457.7 397 444.4 399.5 434.2C402.1 423.9 406.1 417 413.2 413.1C413.5 412.9 413.9 412.8 414.2 412.6C415 425.8 421.5 439.2 433 442.1C445.6 445.4 463.7 434.6 471.4 425.8C480.4 425.5 487.1 424.9 494 430.9C503.9 439.4 501.1 461.2 511.1 472.5C521.7 484.1 525.1 492 524.8 497.1zM269.4 212.7C271.4 214.6 274.1 217.2 277.4 219.8C284 225 293.2 230.4 304.7 230.4C316.3 230.4 327.2 224.5 336.5 219.6C341.4 217 347.4 212.6 351.3 209.2C355.2 205.8 357.2 202.9 354.4 202.6C351.6 202.3 351.8 205.2 348.4 207.7C344 210.9 338.7 215.1 334.5 217.5C327.1 221.7 315 227.7 304.6 227.7C294.2 227.7 285.9 222.9 279.7 218C276.6 215.5 274 213 272 211.1C270.5 209.7 270.1 206.5 267.7 206.2C266.3 206.1 265.9 209.9 269.4 212.7z"/></svg>
                  </button>
                </div>
              </div>
            </div>
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
