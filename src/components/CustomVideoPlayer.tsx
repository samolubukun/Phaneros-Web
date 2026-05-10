import React, { useRef, useState } from 'react';

interface CustomVideoPlayerProps {
  src: string;
  poster?: string;
}

const CustomVideoPlayer: React.FC<CustomVideoPlayerProps> = ({ src, poster }) => {
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

export default CustomVideoPlayer;
