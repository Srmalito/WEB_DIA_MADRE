import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Play } from 'lucide-react';
import './Preview.css';

const Preview = ({ images, dedication, onBack, onStart }) => {
  return (
    <motion.div 
      className="step-container glass preview-container"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5 }}
    >
      <div className="preview-header">
        <h2 className="cursive text-center" style={{ fontSize: '3rem', color: 'var(--primary-color)' }}>Vista Previa</h2>
        <p className="text-center">Así es como comenzará tu sorpresa</p>
      </div>

      <div className="preview-content">
        <div className="preview-images">
          {images.slice(0, 3).map((img, idx) => (
            <motion.div 
              key={idx}
              className={`preview-img-wrapper ${idx === 0 ? 'main-img' : 'sub-img'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
            >
              <img src={img} alt={`Preview ${idx}`} />
            </motion.div>
          ))}
          {images.length > 3 && (
            <div className="more-images sub-img">
              <span>+{images.length - 3}</span>
            </div>
          )}
        </div>

        <div className="preview-dedication">
          <p className="cursive">"{dedication}"</p>
        </div>
      </div>

      <div className="actions">
        <button className="btn btn-secondary" onClick={onBack}>
          <ArrowLeft size={20} /> Editar
        </button>
        <button className="btn btn-primary" onClick={onStart}>
          <Play size={20} /> Comenzar Presentación
        </button>
      </div>
    </motion.div>
  );
};

export default Preview;
