import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Download, Share2, ArrowLeft, Volume2, VolumeX } from 'lucide-react';
import html2canvas from 'html2canvas';
import ReactPlayer from 'react-player';
import './Slideshow.css';

const Collage = ({ images, dedication, onBack, onReset }) => {
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);
  const slideshowRef = useRef(null);

  useEffect(() => {
    // Trigger confetti after photos have appeared
    const timer = setTimeout(() => {
      triggerConfetti();
    }, images.length * 300 + 1000);

    return () => clearTimeout(timer);
  }, [images.length]);

  const triggerConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ffb6c1', '#fce4ec', '#ffd700', '#ffffff'],
        zIndex: 2000
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ffb6c1', '#fce4ec', '#ffd700', '#ffffff'],
        zIndex: 2000
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleDownload = async () => {
    if (slideshowRef.current) {
      try {
        // Hide controls before capture
        const controls = document.querySelector('.collage-controls-overlay');
        if (controls) controls.style.display = 'none';

        const canvas = await html2canvas(slideshowRef.current, {
          useCORS: true,
          scale: 2,
          backgroundColor: '#fffafb'
        });
        const url = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = 'Sorpresa_Dia_Mama.png';
        link.href = url;
        link.click();

        // Restore controls
        if (controls) controls.style.display = 'flex';
      } catch (error) {
        console.error('Error generating image', error);
      }
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Para mi Mamá',
        text: 'Mira esta sorpresa que preparé para ti.',
        url: window.location.href
      }).catch(console.error);
    } else {
      alert('La función de compartir no está disponible en este navegador.');
    }
  };

  // Predefined scattered positions to keep the center relatively clean
  const getTransform = (index) => {
    const positions = [
      { top: '5%', left: '5%', rotate: -15 },
      { top: '10%', right: '5%', rotate: 12 },
      { bottom: '15%', left: '8%', rotate: -8 },
      { bottom: '10%', right: '10%', rotate: 15 },
      { top: '40%', left: '2%', rotate: -5 },
      { top: '35%', right: '2%', rotate: 8 },
      { top: '-5%', left: '35%', rotate: -3 },
      { bottom: '-2%', left: '40%', rotate: 6 },
      { top: '25%', left: '20%', rotate: -10 },
      { bottom: '25%', right: '20%', rotate: 14 },
    ];
    return positions[index % positions.length];
  };

  return (
    <div className="collage-fullscreen" ref={slideshowRef}>
      <div style={{ position: 'fixed', top: '-9999px', left: '-9999px' }}>
        <ReactPlayer 
          url="https://www.youtube.com/watch?v=1F2lW6P7f-4" 
          playing={true} 
          muted={isMuted} 
          loop={true}
          volume={0.5}
          width="200px"
          height="200px"
          config={{
            youtube: {
              playerVars: { autoplay: 1, origin: window.location.origin }
            }
          }}
        />
      </div>

      <div className="collage-controls-overlay controls">
        <button onClick={onBack} className="control-btn" title="Volver">
          <ArrowLeft size={24} />
        </button>
      </div>

      <div className="collage-photos-container">
        {images.map((img, idx) => {
          const pos = getTransform(idx);
          return (
            <motion.div
              key={idx}
              className="collage-photo"
              style={{ ...pos }}
              initial={{ opacity: 0, scale: 0, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: idx * 0.3, duration: 0.8, type: 'spring' }}
            >
              <img src={img} alt={`Pic ${idx}`} />
            </motion.div>
          );
        })}
      </div>

      <motion.div 
        className="message-card glass"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: images.length * 0.3 + 0.5, duration: 1 }}
      >
        <h1 className="cursive text-accent text-center title-feliz text-gradient">¡Feliz Día de la Madre!</h1>
        <p className="message-text cursive text-center">"{dedication}"</p>
        
        <div className="collage-actions collage-controls-overlay">
          <button className="btn btn-primary btn-sm" onClick={handleDownload}>
            <Download size={18} /> Guardar
          </button>
          <button className="btn btn-secondary btn-sm" onClick={handleShare}>
            <Share2 size={18} /> Compartir
          </button>
          <button className="btn btn-secondary btn-sm" onClick={onReset} style={{ borderColor: '#ff4444', color: '#ff4444' }}>
            Crear Otra
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Collage;
