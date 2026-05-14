import React from 'react';
import { FeaturesGridIcon } from './OEMIcons';

const Features: React.FC = () => {
  const features = [
    {
      img: "/phaneros_classic.jpg",
      title: "Dashboard Classic",
      desc: "The Classic View dashboard. This layout prioritizes the Live Transcript, a Bible book search/reader, and a \"Recent Detections\" list for automated scripture identification."
    },
    {
      img: "/phaneros_studio.jpg",
      title: "Dashboard Studio",
      desc: "Studio dashboard featuring a Show Builder, Slide Composer, and Resource management for professional live presentation creation and streamlined media orchestration."
    },
    {
      img: "/phaneros_composer.jpg",
      title: "Slide Composer",
      desc: "The Slide Composer in action within the Studio layout. It shows the editing interface for a specific slide titled \"Welcome,\" including template selection and duration settings."
    },
    {
      img: "/phaneros_theme_designer.jpg",
      title: "Theme Designer",
      desc: "Interface for customizing scripture styling, background aesthetics, and layout configurations, featuring live previews and theme management for presentations."
    },
    {
      img: "/phaneros_media_presenter.jpg",
      title: "Media Resources",
      desc: "Centralized media hub for managing images and PDFs, featuring an integrated Live Display and dedicated Resource tab for seamless asset deployment."
    },
    {
      img: "/phaneros_broadcast_settings.jpg",
      title: "Broadcast Control",
      desc: "The Broadcast configuration pop-up. It allows users to enable and manage two independent outputs for Main and Alternate with unique themes and browser source URLs for OBS."
    },
    {
      img: "/phaneros_speech_settings.jpg",
      title: "Speech Recognition",
      desc: "Speech recognition selection offering Cloud Deepgram Nova-3 or local built-in transcription powered by either the Vosk Engine or Whisper."
    },
    {
      img: "/phaneros_bible_settings.png",
      title: "Bible Translations",
      desc: "Comprehensive support for multiple Bible versions including KJV, NIV, ESV, and more, allowing for instant version switching and multi-lingual scripture presentation."
    },
    {
      img: "/phaneros_api_settings.png",
      title: "Intelligence & APIs",
      desc: "Settings menu for configuring Deepgram API keys for speech recognition and Cloudflare Embedding credentials for semantic search and vectorized allusions."
    },
    {
      img: "/phaneros_display_settings.png",
      title: "Display Mode Settings",
      desc: "Control center for Manual or Auto Broadcast modes, featuring an AI Direct toggle and adjustable confidence thresholds for intelligent scripture detection."
    },
    {
      img: "/phaneros_workspace_settings.png",
      title: "Workspace Management",
      desc: "Flexible layout toggle to seamlessly switch between the transcript-focused Classic view and the composition-centric Studio dashboard for optimized workflow efficiency."
    }
  ];

  return (
    <section id="features" className="section-padding section-dark">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <FeaturesGridIcon size={40} />
        </div>
        <h2 style={{ textAlign: 'center', fontSize: 'clamp(2rem, 4vw, 2.5rem)', marginBottom: '4rem' }}>
          Phaneros Key <span style={{ color: 'var(--gold)' }}>Features</span>
        </h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-item">
              <img src={feature.img} alt={feature.title} />
              <h3>{feature.title}</h3>
              <p className="text-dim">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
