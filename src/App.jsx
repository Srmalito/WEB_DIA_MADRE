import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import SetupForm from './components/SetupForm';
import Preview from './components/Preview';
import Slideshow from './components/Slideshow';
import './App.css';

function App() {
  const [step, setStep] = useState('form'); // 'form', 'preview', 'slideshow'
  const [images, setImages] = useState([]);
  const [dedication, setDedication] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const d = params.get('d');
    if (d) {
      try {
        const decoded = decodeURIComponent(escape(atob(d)));
        setDedication(decoded);
        setStep('slideshow');
      } catch(e) {
        console.error("Failed to parse dedication");
      }
    }
  }, []);

  const handleStartSlideshow = () => {
    setStep('slideshow');
  };

  const handlePreview = () => {
    setStep('preview');
  };

  const handleBackToForm = () => {
    setStep('form');
  };

  const handleReset = () => {
    setImages([]);
    setDedication('');
    setStep('form');
  };

  return (
    <div className="app-container">
      <AnimatePresence mode="wait">
        {step === 'form' && (
          <SetupForm 
            key="form"
            images={images} 
            setImages={setImages} 
            dedication={dedication} 
            setDedication={setDedication}
            onPreview={handlePreview}
            onStart={handleStartSlideshow}
          />
        )}
        {step === 'preview' && (
          <Preview 
            key="preview"
            images={images}
            dedication={dedication}
            onBack={handleBackToForm}
            onStart={handleStartSlideshow}
          />
        )}
        {step === 'slideshow' && (
          <Slideshow 
            key="slideshow"
            images={images}
            dedication={dedication}
            onBack={handleBackToForm}
            onReset={handleReset}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
