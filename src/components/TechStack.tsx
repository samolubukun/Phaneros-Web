import React from 'react';

const TechStack: React.FC = () => {
  const techs = [
    {
      title: "Native Core",
      desc: "Built with Rust and Tauri 2.1 to ensure a lightweight footprint, memory safety, and maximum performance on any OS."
    },
    {
      title: "Transcription",
      desc: "Hybrid STT architecture using Whisper High-Fidelity for local processing and Deepgram Nova-3 for low-latency cloud fallback."
    },
    {
      title: "Vector Intelligence",
      desc: "Semantic scripture resolution powered by Cloudflare Workers AI and high-dimensional verse embeddings."
    },
    {
      title: "Classic Dashboard",
      desc: "Optimized interface for high-density Bible verse monitoring, instant lookup, and low-latency display orchestration."
    },
    {
      title: "Studio Dashboard",
      desc: "Presentation suite for show building, slide design, and structured sermon delivery."
    },
    {
      title: "Broadcast Integration",
      desc: "Seamless integration with OBS, vMix, and hardware switchers via transparent overlays, OSC, and RESTful automation APIs."
    }
  ];

  return (
    <section className="section-padding section-white" style={{ background: '#f8f8f8' }}>
      <div className="container">
        <h2 className="one-line-desktop" style={{ textAlign: 'center', marginBottom: '4rem', fontSize: 'clamp(2rem, 4vw, 2.5rem)', lineHeight: '1.2' }}>
          Intelligence & <span style={{ color: 'var(--gold)' }}>Production</span>
        </h2>
        <div className="features-grid">
          {techs.map((tech, index) => (
            <div key={index} className="card" style={{ background: 'white', border: '1px solid #eee', padding: '2rem', borderRadius: '16px' }}>
              <h3 style={{ color: 'var(--gold)', marginBottom: '1rem' }}>{tech.title}</h3>
              <p style={{ color: '#555' }}>{tech.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
