import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Heart, Sparkles } from 'lucide-react';
import './SetupForm.css';

const PREDEFINED_IDEAS = [
  "Mamá, gracias por ser mi luz en la oscuridad y mi fuerza cuando me siento débil. Eres la persona más maravillosa del mundo. ¡Feliz Día!",
  "Abuelita, tu amor es el regalo más grande. Gracias por tus mimos, tus consejos y por quererme tanto. ¡Feliz Día de la Madre!",
  "Tía querida, siempre has sido como una segunda madre para mí. Gracias por tu cariño incondicional. ¡Te quiero muchísimo!",
  "No hay palabras suficientes para describir cuánto te amo. Gracias por tu paciencia infinita y tu amor incondicional. Eres mi mayor tesoro.",
  "La vida no viene con un manual de instrucciones, pero vino con una mujer increíble como tú para guiarme. Gracias por todo.",
  "A la mujer más fuerte, valiente y amorosa que conozco: gracias por darlo todo por mí. ¡Feliz Día de la Madre!"
];

const QUICK_EMOJIS = ["❤️", "💖", "💕", "💝", "🌹", "💐", "🌸", "✨", "🥰", "😘"];

const SetupForm = ({ images, setImages, dedication, setDedication, onPreview, onStart }) => {
  const [showIdeas, setShowIdeas] = useState(false);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    setImages(prev => [...prev, ...newImages].slice(0, 10)); // Max 10 images
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <motion.div 
      className="step-container glass form-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="header text-center">
        <Heart className="heartbeat text-accent" size={48} fill="var(--primary-color)" stroke="var(--primary-color)"/>
        <h1 className="cursive title text-gradient">Feliz Día de la Madre</h1>
        <p className="subtitle">Crea una sorpresa inolvidable para mamá, tu abuelita, tu tía o esa mujer especial.</p>
      </div>

      <div className="form-content">
        <div className="upload-section">
          <h3>Sube tus fotos favoritas juntos</h3>
          <div className="upload-box">
            <input 
              type="file" 
              multiple 
              accept="image/*" 
              onChange={handleImageUpload} 
              id="file-upload"
              className="hidden"
            />
            <label htmlFor="file-upload" className="upload-label">
              <Upload size={32} />
              <span>Haz clic aquí para subir imágenes</span>
              <small>(Opcional, máximo 10 fotos)</small>
            </label>
          </div>

          {images.length > 0 && (
            <div className="image-preview-list">
              {images.map((img, idx) => (
                <div key={idx} className="preview-thumbnail">
                  <img src={img} alt={`Preview ${idx}`} />
                  <button onClick={() => removeImage(idx)} className="remove-btn">
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="dedication-section">
          <div className="dedication-header">
            <h3>Escribe tu dedicatoria</h3>
            <button 
              className="btn-ideas" 
              onClick={() => setShowIdeas(!showIdeas)}
              title="Ver ideas pre-armadas"
            >
              <Sparkles size={18} /> Ideas
            </button>
          </div>

          <div className="emoji-palette">
            {QUICK_EMOJIS.map((emoji, idx) => (
              <button 
                key={idx} 
                className="emoji-btn"
                onClick={() => setDedication(prev => prev + emoji)}
                title="Añadir emoji"
              >
                {emoji}
              </button>
            ))}
          </div>

          <AnimatePresence>
            {showIdeas && (
              <motion.div 
                className="ideas-container"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <p className="ideas-title">Elige una idea o úsala como inspiración:</p>
                <div className="ideas-list">
                  {PREDEFINED_IDEAS.map((idea, idx) => (
                    <button 
                      key={idx} 
                      className="idea-chip"
                      onClick={() => {
                        setDedication(prev => prev.trim() ? prev + " " + idea : idea);
                        setShowIdeas(false);
                      }}
                    >
                      "{idea}"
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <textarea
            value={dedication}
            onChange={(e) => setDedication(e.target.value)}
            placeholder="Escribe unas palabras hermosas..."
            rows={5}
            className="dedication-input"
          />
        </div>

        <div className="actions">
          <button 
            className="btn btn-secondary" 
            onClick={onPreview}
            disabled={!dedication.trim()}
          >
            Vista Previa
          </button>
          <button 
            className="btn btn-primary" 
            onClick={onStart}
            disabled={!dedication.trim()}
          >
            Crear Sorpresa
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default SetupForm;
