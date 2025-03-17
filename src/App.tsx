// App Settings Panel Component
const AppSettingsPanel = ({ isOpen, onClose, settings, onSettingsChange }) => {
  const [availableVoices, setAvailableVoices] = useState([]);
  
  // Get available voices for speech synthesis 
  useEffect(() => {
    if ('speechSynthesis' in window) {
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          console.log("Settings panel loaded voices:", voices.map(v => v.name));
          setAvailableVoices(voices);
          
          // If we have a preference for female voices, try to find one
          const femaleVoice = voices.find(v => 
            v.name.includes("female") || 
            v.name.includes("Female") || 
            v.name.includes("woman") ||
            v.name.includes("Woman") ||
            v.name.includes("girl") ||
            v.name.includes("Girl")
          );
          
          if (femaleVoice && settings.voice === 'default') {
            console.log("Settings panel selecting female voice:", femaleVoice.name);
            onSettingsChange({...settings, voice: femaleVoice.name});
          } else if (voices.length > 0 && settings.voice === 'default') {
            // Just pick the first voice if we can't find a female one
            console.log("Settings panel using first voice:", voices[0].name);
            onSettingsChange({...settings, voice: voices[0].name});
          }
        }
      };
      
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
      
      return () => {
        window.speechSynthesis.onvoiceschanged = null;
      };
    }
  }, []);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-40 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg w-full max-w-4xl p-6 relative border border-purple-500">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 bg-red-600 hover:bg-red-500 text-white p-2 rounded-full"
          aria-label="Close settings"
        >
          <X size={24} />
        </button>
        
        <h2 className="text-3xl font-bold text-center mb-6 text-purple-300" style={{ 
          textShadow: '0 0 8px #a855f7, 0 0 15px #a855f7'
        }}>
          Library Settings
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Narration Settings */}
          <div className="bg-gray-700 p-5 rounded-lg">
            <h3 className="text-xl font-bold mb-4 text-amber-300">Narration Settings</h3>
            
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Narrator Voice</label>
              <select
                value={settings.voice}
                onChange={(e) => onSettingsChange({ ...settings, voice: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg"
              >
                {availableVoices.map((voice) => (
                  <option key={voice.name} value={voice.name}>
                    {voice.name}
                  </option>
                ))}
                {availableVoices.length === 0 && (
                  <option value="default">Default Voice</option>
                )}
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">
                Reading Speed: {settings.voiceSpeed.toFixed(1)}x
              </label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={settings.voiceSpeed}
                onChange={(e) => onSettingsChange({ 
                  ...settings, 
                  voiceSpeed: parseFloat(e.target.value) 
                })}
                className="w-full"
              />
            </div>
            
            <div>
              <button
                onClick={() => {
                  if ('speechSynthesis' in window) {
                    // Cancel any ongoing speech
                    window.speechSynthesis.cancel();
                    
                    const message = "Hello! This is how I will sound when reading books to you.";
                    const utterance = new SpeechSynthesisUtterance(message);
                    
                    // Get fresh list of voices
                    const voices = window.speechSynthesis.getVoices();
                    console.log("Test voice - current setting:", settings.voice);
                    console.log("Test voice - available voices:", voices.map(v => v.name));
                    
                    if (settings.voice !== 'default') {
                      const voice = voices.find(v => v.name === settings.voice);
                      if (voice) {
                        console.log("Test voice - using voice:", voice.name);
                        utterance.voice = voice;
                      } else {
                        console.log("Test voice - voice not found:", settings.voice);
                      }
                    }
                    
                    utterance.rate = settings.voiceSpeed;
                    window.speechSynthesis.speak(utterance);
                  }
                }}
                className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg"
              >
                Test Voice
              </button>
            </div>
          </div>
          
          {/* Visual Settings */}
          <div className="bg-gray-700 p-5 rounded-lg">
            <h3 className="text-xl font-bold mb-4 text-amber-300">Visual Settings</h3>
            
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Background Particles</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button 
                  onClick={() => onSettingsChange({ ...settings, particles: 'none' })}
                  className={`py-2 rounded ${settings.particles === 'none' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300'}`}
                >
                  None
                </button>
                <button 
                  onClick={() => onSettingsChange({ ...settings, particles: 'few' })}
                  className={`py-2 rounded ${settings.particles === 'few' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300'}`}
                >
                  Few
                </button>
                <button 
                  onClick={() => onSettingsChange({ ...settings, particles: 'normal' })}
                  className={`py-2 rounded ${settings.particles === 'normal' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300'}`}
                >
                  Normal
                </button>
                <button 
                  onClick={() => onSettingsChange({ ...settings, particles: 'many' })}
                  className={`py-2 rounded ${settings.particles === 'many' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300'}`}
                >
                  Many
                </button>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Text Size</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button 
                  onClick={() => onSettingsChange({ ...settings, textSize: 'small' })}
                  className={`py-2 rounded ${settings.textSize === 'small' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300'}`}
                >
                  Small
                </button>
                <button 
                  onClick={() => onSettingsChange({ ...settings, textSize: 'medium' })}
                  className={`py-2 rounded ${settings.textSize === 'medium' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300'}`}
                >
                  Medium
                </button>
                <button 
                  onClick={() => onSettingsChange({ ...settings, textSize: 'large' })}
                  className={`py-2 rounded ${settings.textSize === 'large' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300'}`}
                >
                  Large
                </button>
                <button 
                  onClick={() => onSettingsChange({ ...settings, textSize: 'xlarge' })}
                  className={`py-2 rounded ${settings.textSize === 'xlarge' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300'}`}
                >
                  X-Large
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2">Animation Speed</label>
              <div className="grid grid-cols-3 gap-2">
                <button 
                  onClick={() => onSettingsChange({ ...settings, animationSpeed: 'slow' })}
                  className={`py-2 rounded ${settings.animationSpeed === 'slow' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300'}`}
                >
                  Slow
                </button>
                <button 
                  onClick={() => onSettingsChange({ ...settings, animationSpeed: 'normal' })}
                  className={`py-2 rounded ${settings.animationSpeed === 'normal' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300'}`}
                >
                  Normal
                </button>
                <button 
                  onClick={() => onSettingsChange({ ...settings, animationSpeed: 'fast' })}
                  className={`py-2 rounded ${settings.animationSpeed === 'fast' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300'}`}
                >
                  Fast
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-center">
          <button
            onClick={onClose}
            className="px-8 py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg text-xl"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};import React, { useState, useEffect, useRef } from 'react';
import { Volume2, X, ChevronLeft, ChevronRight, Heart } from 'lucide-react';

// Book type definition
const Book = ({ id, title, author, description, content, coverImage, genres, gradient, bubbleColor }) => ({
  id, title, author, description, content, coverImage, genres, gradient, bubbleColor
});

// Moving Particles System
const MovingParticles = ({ density = 'normal', speed = 'normal' }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(0);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Setup canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Determine particle count based on density setting
    let particleCount;
    switch (density) {
      case 'none': particleCount = 0; break;
      case 'few': particleCount = 8; break;
      case 'normal': particleCount = 15; break;
      case 'many': particleCount = 25; break;
      default: particleCount = 15;
    }
    
    // Determine speed multiplier
    let speedMultiplier;
    switch (speed) {
      case 'slow': speedMultiplier = 0.5; break;
      case 'normal': speedMultiplier = 1.0; break;
      case 'fast': speedMultiplier = 1.5; break;
      default: speedMultiplier = 1.0;
    }
    
    // Create particles - larger and more prominent
    const particleTypes = ['🧶', '🪡', '🧵', '✂️'];
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 25 + Math.random() * 35,
        speedX: (Math.random() - 0.5) * 1.2 * speedMultiplier,
        speedY: (Math.random() - 0.5) * 1.2 * speedMultiplier,
        type: particleTypes[Math.floor(Math.random() * particleTypes.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2 * speedMultiplier,
        opacity: 0.4 + Math.random() * 0.5
      });
    }
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.rotation += particle.rotationSpeed;
        
        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1;
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1;
        }
        
        // Draw particle
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation * Math.PI / 180);
        ctx.globalAlpha = particle.opacity;
        ctx.font = `${particle.size}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(particle.type, 0, 0);
        ctx.restore();
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, [density, speed]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

// Scrolling Inspirational Banner
const ScrollingBanner = () => {
  const [position, setPosition] = useState(110);
  const [currentSentence, setCurrentSentence] = useState(0);
  
  const inspirationalSentences = [
    "Find joy in each stitch as your hands create what your heart imagines",
    "Your passion for color and texture transforms simple yarn into magic",
    "In each hook and loop, you weave stories that connect generations",
    "Believe in the power of your creativity to bring warmth into the world",
    "Time spent creating with your hands is never wasted, but treasured",
    "Let your spirit flow through each thread, creating patterns of love"
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(prev => {
        if (prev < -120) {
          // Reset text and show next sentence
          setCurrentSentence(current => (current + 1) % inspirationalSentences.length);
          return 110;
        }
        return prev - 0.6;
      });
    }, 30);
    
    return () => clearInterval(interval);
  }, [inspirationalSentences.length]);
  
  return (
    <div className="relative w-full h-16 overflow-hidden flex items-center">
      <div
        className="absolute whitespace-nowrap font-serif text-3xl"
        style={{
          transform: `translateX(${position}%)`,
          background: 'linear-gradient(90deg, #7e22ce, #fbbf24, #7e22ce)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundSize: '200% 100%',
          animation: 'gradientShift 4s linear infinite'
        }}
      >
        {inspirationalSentences[currentSentence]}
      </div>
    </div>
  );
};

// BookCard Component
const BookCard = ({ book, onOpenBook }) => {
  const [isNarrating, setIsNarrating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const handleNarrate = (e) => {
    e.stopPropagation();
    
    if (isNarrating) {
      window.speechSynthesis.cancel();
      setIsNarrating(false);
      return;
    }
    
    if ('speechSynthesis' in window) {
      const description = `${book.title} by ${book.author}. ${book.description}`;
      const utterance = new SpeechSynthesisUtterance(description);
      utterance.rate = 0.9;
      utterance.onend = () => setIsNarrating(false);
      
      window.speechSynthesis.speak(utterance);
      setIsNarrating(true);
    }
  };
  
  return (
    <div
      className="relative rounded-lg overflow-hidden bg-gray-900 bg-opacity-60 backdrop-blur-sm border border-gray-700 transition-all duration-500 h-full flex flex-col cursor-pointer"
      style={{
        transform: isHovered ? 'translateY(-10px) scale(1.02)' : 'translateY(0) scale(1)',
        boxShadow: isHovered
          ? `0 0 40px ${book.bubbleColor}80, 0 0 20px ${book.bubbleColor}40`
          : '0 0 15px rgba(0,0,0,0.3)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onOpenBook(book)}
    >
      {/* Book Title */}
      <div className="p-4 pb-2">
        <h3 className="text-4xl font-bold" style={{ color: book.bubbleColor }}>{book.title}</h3>
        <p className="text-xl flex items-center">
          by <span className="author-name ml-2 mr-2" style={{ 
            color: '#a855f7', 
            textShadow: '0 0 8px #a855f7, 0 0 15px #a855f7, 0 0 25px #a855f7',
            animation: 'pulse-purple 2s infinite'
          }}>{book.author}</span>
          <button
            onClick={handleNarrate}
            className={`ml-3 p-3 rounded-full transition-colors ${isNarrating ? 'bg-red-600 text-white' : 'bg-blue-700 text-white hover:bg-blue-600'}`}
            aria-label={isNarrating ? "Stop narration" : "Narrate description"}
          >
            <Volume2 size={20} />
          </button>
        </p>
      </div>
      
      {/* Book Cover */}
      <div 
        className="w-full aspect-[3/4] overflow-hidden flex items-center justify-center transition-all duration-300 relative"
        style={{
          background: book.gradient,
          filter: isHovered ? 'brightness(1.1)' : 'brightness(1)',
        }}
      >
        <img 
          src={book.coverImage} 
          alt={`${book.title} cover`}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />
      </div>
      
      {/* Book Description */}
      <div className="p-4 pt-3 flex-grow">
        <p className="text-gray-200 text-xl mb-3 leading-relaxed">
          {book.description}
        </p>
        
        {/* Genre Tags */}
        <div className="flex flex-wrap gap-2 mt-3">
          {book.genres.map((genre, index) => {
            // Different colors for each genre tag
            const colors = ['#FF6B6B', '#48BEFF', '#9775FA', '#4CAF50'];
            const color = colors[index % colors.length];
            
            return (
              <span 
                key={index} 
                className="inline-block rounded-full px-4 py-2 text-base font-medium transition-all duration-300"
                style={{
                  backgroundColor: isHovered ? `${color}40` : `${color}20`,
                  color: color,
                  border: `1px solid ${color}40`
                }}
              >
                {genre}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Enhanced Book Reader Component for elderly users
const BookReader = ({ book, onClose, settings }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isReading, setIsReading] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState(settings?.voice || 'default');
  const [availableVoices, setAvailableVoices] = useState([]);
  const [voiceSpeed, setVoiceSpeed] = useState(settings?.voiceSpeed || 1);
  const [showNarrationSettings, setShowNarrationSettings] = useState(false);
  const [textSize, setTextSize] = useState(settings?.textSize || 'large'); // default to large for elderly users
  const readingRef = useRef(null);
  
  const totalPages = book.content.length;
  
  // Get available voices for speech synthesis
  useEffect(() => {
    if ('speechSynthesis' in window) {
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          setAvailableVoices(voices);
          setSelectedVoice(voices[0]?.name || 'default');
        }
      };
      
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
      
      return () => {
        window.speechSynthesis.onvoiceschanged = null;
      };
    }
  }, []);
  
  // Auto reading functionality
  useEffect(() => {
    if (isReading) {
      readPage(() => {
        // This callback is executed when the current page finishes reading
        if (currentPage < totalPages - 1) {
          const timer = setTimeout(() => {
            setCurrentPage(prev => prev + 1);
          }, 1000); // Wait 1 second before turning the page
          return () => clearTimeout(timer);
        } else {
          setIsReading(false);
        }
      });
    }
    
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isReading, currentPage, totalPages]);
  
  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      // Stop reading if auto-reading is on
      if (isReading) {
        window.speechSynthesis.cancel();
      }
      setCurrentPage(prev => prev + 1);
    }
  };
  
  const goToPrevPage = () => {
    if (currentPage > 0) {
      // Stop reading if auto-reading is on
      if (isReading) {
        window.speechSynthesis.cancel();
      }
      setCurrentPage(prev => prev - 1);
    }
  };
  
  // Read current page with callback
  const readPage = (onEndCallback) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const text = book.content[currentPage];
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Get available voices and set the selected voice
      const voices = window.speechSynthesis.getVoices();
      console.log("Available voices:", voices.map(v => v.name));
      console.log("Selected voice:", selectedVoice);
      
      // Find the voice that matches the selected voice
      if (selectedVoice !== 'default') {
        const voice = voices.find(v => v.name === selectedVoice);
        if (voice) {
          console.log("Setting voice to:", voice.name);
          utterance.voice = voice;
        } else {
          console.log("Voice not found:", selectedVoice);
        }
      }
      
      // Set speed
      utterance.rate = voiceSpeed;
      
      // Set callback for when reading finishes
      if (onEndCallback) {
        utterance.onend = onEndCallback;
      }
      
      window.speechSynthesis.speak(utterance);
    }
  };
  
  // Toggle auto-reading
  const toggleReading = () => {
    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
    } else {
      setIsReading(true);
    }
  };
  
  // Manual read current page
  const readCurrentPage = () => {
    readPage();
  };
  
  // Stop reading
  const stopReading = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsReading(false);
    }
  };
  
  // Get text size class based on setting
  const getTextSizeClass = () => {
    switch (textSize) {
      case 'small': return 'text-xl';
      case 'medium': return 'text-2xl';
      case 'large': return 'text-3xl';
      case 'xlarge': return 'text-4xl';
      default: return 'text-3xl';
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
      <div
        className="bg-gray-900 w-full h-full max-h-screen flex flex-col relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        }}
      >
        {/* Top controls bar */}
        <div className="flex justify-between items-center p-4 bg-gray-800 border-b border-gray-700">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="bg-red-600 hover:bg-red-500 text-white p-3 rounded-lg flex items-center gap-2"
              aria-label="Close book"
            >
              <X size={20} />
              Close
            </button>
            
            <h2 className="text-2xl md:text-3xl font-bold text-amber-300 hidden md:block">{book.title}</h2>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowNarrationSettings(!showNarrationSettings)}
              className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-3 rounded-lg"
            >
              Narration Settings
            </button>
            
            <button
              onClick={toggleReading}
              className={`px-4 py-3 rounded-lg text-white font-bold ${isReading ? 'bg-red-600 hover:bg-red-500' : 'bg-green-600 hover:bg-green-500'}`}
            >
              {isReading ? 'Stop Auto-Reading' : 'Start Auto-Reading'}
            </button>
          </div>
        </div>
        
        {/* Book title for mobile */}
        <div className="md:hidden text-center py-2 bg-gray-800 border-b border-gray-700">
          <h2 className="text-xl font-bold text-amber-300">{book.title}</h2>
        </div>
        
        {/* Narration settings panel */}
        {showNarrationSettings && (
          <div className="bg-gray-800 p-4 border-b border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-300 mb-2 text-lg">Narrator Voice</label>
                <select
                  value={selectedVoice}
                  onChange={(e) => setSelectedVoice(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg text-lg"
                >
                  {availableVoices.map((voice) => (
                    <option key={voice.name} value={voice.name}>
                      {voice.name}
                    </option>
                  ))}
                  {availableVoices.length === 0 && (
                    <option value="default">Default Voice</option>
                  )}
                </select>
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2 text-lg">Reading Speed: {voiceSpeed.toFixed(1)}x</label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={voiceSpeed}
                  onChange={(e) => setVoiceSpeed(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2 text-lg">Text Size</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setTextSize('small')}
                    className={`px-3 py-2 rounded-lg ${textSize === 'small' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                  >
                    Small
                  </button>
                  <button
                    onClick={() => setTextSize('medium')}
                    className={`px-3 py-2 rounded-lg ${textSize === 'medium' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                  >
                    Medium
                  </button>
                  <button
                    onClick={() => setTextSize('large')}
                    className={`px-3 py-2 rounded-lg ${textSize === 'large' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                  >
                    Large
                  </button>
                  <button
                    onClick={() => setTextSize('xlarge')}
                    className={`px-3 py-2 rounded-lg ${textSize === 'xlarge' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                  >
                    X-Large
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-4">
              <button
                onClick={readCurrentPage}
                className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg mx-2"
              >
                Read This Page
              </button>
              <button
                onClick={stopReading}
                className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-lg mx-2"
              >
                Stop Reading
              </button>
            </div>
          </div>
        )}
        
        {/* Main content area */}
        <div className="flex flex-grow overflow-hidden">
          {/* Left navigation */}
          <div className="flex items-center">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 0}
              className="h-full px-2 md:px-6 bg-gray-800 hover:bg-gray-700 text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={36} />
            </button>
          </div>
          
          {/* Page content */}
          <div className="flex-grow overflow-auto p-4 md:p-8 lg:p-12">
            <div
              ref={readingRef}
              className={`${getTextSizeClass()} text-gray-100 leading-relaxed max-w-5xl mx-auto`}
              style={{ 
                textShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}
            >
              {book.content[currentPage].split('\n').map((paragraph, idx) => (
                paragraph.trim() ? (
                  <p key={idx} className="mb-8">
                    {paragraph}
                  </p>
                ) : <br key={idx} />
              ))}
            </div>
          </div>
          
          {/* Right navigation */}
          <div className="flex items-center">
            <button
              onClick={goToNextPage}
              disabled={currentPage >= totalPages - 1}
              className="h-full px-2 md:px-6 bg-gray-800 hover:bg-gray-700 text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight size={36} />
            </button>
          </div>
        </div>
        
        {/* Bottom navigation bar */}
        <div className="flex justify-center items-center p-4 bg-gray-800 border-t border-gray-700 text-xl">
          <div className="text-amber-200">
            Page {currentPage + 1} of {totalPages}
          </div>
        </div>
      </div>
    </div>
  );
};

// Support Writer Modal Component
const SupportWriterModal = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState('');
  
  // Support messages
  const supportMessages = [
    "Thank you for supporting independent storytelling! Every stitch of my words is woven with love and care.",
    "Your support fuels creativity! Every contribution helps bring more inspiring stories to life.",
    "Writers and creators thrive because of readers like you. Your kindness is truly appreciated!",
    "A simple act of support can turn a dream into reality. Thank you for believing in the magic of words.",
    "Your generosity keeps the art of storytelling alive. Your support means the world!",
    "Every contribution, no matter the size, helps create something meaningful. Thank you for being part of the journey!"
  ];
  
  // Choose random message when modal opens
  useEffect(() => {
    if (isOpen) {
      const randomIndex = Math.floor(Math.random() * supportMessages.length);
      setMessage(supportMessages[randomIndex]);
    }
  }, [isOpen, supportMessages]);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div 
        className="relative bg-gradient-to-b from-amber-800 to-amber-600 rounded-2xl p-10 max-w-lg w-full shadow-2xl"
        style={{
          transform: 'perspective(1000px) rotateX(5deg)',
          boxShadow: '0 20px 60px -10px rgba(255, 193, 7, 0.3), 0 0 30px rgba(255, 193, 7, 0.2)'
        }}
      >
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-amber-200 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X size={24} />
        </button>
        
        {/* Support message */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <Heart className="text-red-400 w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold text-amber-100 mb-6">Support the Writer</h2>
          <div className="bg-amber-900/30 p-6 rounded-xl border border-amber-500/20 mb-8">
            <p className="text-xl text-amber-100 leading-relaxed italic">{message}</p>
          </div>
          
          {/* Support options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button className="bg-amber-700 hover:bg-amber-600 text-white py-3 px-6 rounded-lg transition-colors shadow-lg">
              Buy Me Needle and Yarn
            </button>
            <button className="bg-red-700 hover:bg-red-600 text-white py-3 px-6 rounded-lg transition-colors shadow-lg">
              Donate via Patreon
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useState(false);
  const [appSettings, setAppSettings] = useState({
    voice: 'default',
    voiceSpeed: 1.0,
    particles: 'normal',
    textSize: 'large',
    animationSpeed: 'normal'
  });
  
  // Book data
  const books = [
    {
      id: 'needle-and-yarn',
      title: "The Love Story of a Needle and a Yarn",
      author: "Leola Sister Lee",
      description: "A heartwarming tale of love between crafting tools. Follow Needle and Yarn as they navigate challenges, form deep bonds, and create beautiful projects together.",
      coverImage: "/api/placeholder/400/500",
      content: [
        "CHAPTER 1\n\nNeedle woke up feeling restless. The sunlight streamed in through the window of the sewing basket, and Yarn was coiled beside her, snug and warm.\n\nFor as long as Needle could remember, they had been together in this basket. Silver and smooth, Needle prided herself on precision and sharpness. Meanwhile, Yarn was soft and colorful, always ready with a kind word or gentle suggestion.\n\n\"Good morning,\" Yarn said, uncoiling slightly. \"You look like you've been thinking again.\"",
        "Needle sighed. \"I've been wondering if we'll ever get to create something truly beautiful. It's been weeks since we were last used.\"\n\nYarn moved closer, its fibers brushing against Needle's metal surface. \"We will. The right project will come along—we just need to be patient.\"\n\nNeedle wasn't convinced. Patience had never been her strong suit.",
        "CHAPTER 2\n\nThat afternoon, the basket was lifted, and light flooded in as the lid opened. Human hands reached inside, selecting both Needle and Yarn.\n\n\"Finally!\" Needle whispered excitedly.\n\n\"I told you,\" Yarn replied, its red fibers seeming to glow in the afternoon light.",
        "Together, they were guided through fabric, forming loops and stitches. At first, Needle was focused only on her task—piercing the fabric with precision, pulling Yarn through.\n\nBut as the hours passed, something changed. Each time Yarn followed her through the fabric, Needle felt a strange warmth. They were creating something together, something neither could make alone.",
        "CHAPTER 3\n\nAs days turned into weeks, their project grew. It was a beautiful sweater, with intricate patterns that showcased both Needle's precision and Yarn's warmth and color.\n\n\"We make a good team,\" Needle admitted one evening as they rested.\n\n\"We always have,\" Yarn replied softly. \"You guide, and I follow, but together we create something greater than either of us alone.\"",
        "Needle considered this. It was true—without Yarn, she was just a piece of metal. And without her, Yarn would remain just a tangled possibility.\n\n\"I think,\" said Needle slowly, \"that this is what humans call love. When two different beings come together and create something beautiful.\"",
        "Yarn twined a little closer. \"I think you're right. And I think I've loved you for a very long time, my sharp friend.\"\n\nAs the sweater neared completion, they realized that every loop and stitch held a piece of their hearts. And so they journeyed on, weaving a story of love and perseverance for all to see.\n\nTHE END"
      ],
      genres: ["Fantasy", "Love Story", "Adventure", "DIY"],
      gradient: 'linear-gradient(135deg, #4361EE 0%, #7209B7 100%)',
      bubbleColor: '#7B61FF',
    },
    {
      id: 'crochet-mastery',
      title: "Crochet Mastery: A Complete Guide",
      author: "Leola Sister Lee",
      description: "A comprehensive guide to mastering the art of crochet. From basic stitches to complex techniques, this guide has everything you need to become a crochet master.",
      coverImage: "/api/placeholder/400/500",
      content: [
        "INTRODUCTION\n\nCrochet is an age-old craft that has allowed countless generations to create beautiful pieces from simple yarn. In this guide, we will go from the basics to advanced techniques.\n\nAll you need to start is a hook and some yarn—but what you can create is limited only by your imagination.",
        "CHAPTER 1: Basic Stitches\n\nEvery crochet journey begins with the humble chain stitch. To create a chain stitch:\n\n1. Make a slip knot on your hook\n2. Yarn over (wrap the yarn around your hook)\n3. Pull the yarn through the loop on your hook\n\nCongratulations! You've made your first chain stitch. Repeat to create a foundation chain of the desired length.",
        "The single crochet (SC) is your next building block:\n\n1. Insert your hook into the second chain from the hook\n2. Yarn over and pull through the chain (two loops on hook)\n3. Yarn over again and pull through both loops\n\nPractice this stitch until it becomes second nature. The tension should be firm but not tight.",
        "The double crochet (DC) creates height in your work:\n\n1. Yarn over\n2. Insert your hook into the third chain from the hook\n3. Yarn over and pull through the chain (three loops on hook)\n4. Yarn over and pull through two loops (two loops remain)\n5. Yarn over again and pull through the remaining two loops",
        "CHAPTER 2: Shaping and Texture\n\nNow that you've mastered the basic stitches, let's explore how to shape your work and add texture.\n\nTo increase: Work two stitches into the same space\nTo decrease: Work two stitches together as one\n\nTexture can be created by varying your stitch patterns. Try alternating rows of single and double crochet, or experiment with front and back post stitches for a ribbed effect.",
        "CHAPTER 3: Advanced Techniques\n\nReady to take your crochet to the next level? Let's explore some advanced techniques.\n\nColorwork can be achieved through methods like tapestry crochet or color changes at the end of rows.\n\nLace patterns use chains and spaces to create delicate, airy designs perfect for shawls and decorative items.",
        "Cables might look intimidating, but they simply involve working stitches out of order. Front post stitches are worked around posts of stitches a few rows below, creating the twisted, raised effect.\n\nAmigurumi—the Japanese art of crocheting small stuffed toys—uses tight single crochet worked in spirals or rounds to create three-dimensional forms.",
        "CONCLUSION\n\nCrochet is more than just a craft—it's a journey of creativity, patience, and self-expression. Each stitch you make adds to your experience and skill.\n\nRemember that even master crocheters were once beginners. Practice regularly, be patient with yourself, and don't be afraid to try new techniques.\n\nWith the foundations in this guide and your own creative spirit, you'll be creating beautiful, meaningful pieces that bring joy to yourself and others.\n\nHappy crocheting!"
      ],
      genres: ["DIY", "Instruction", "Crafts", "Reference"],
      gradient: 'linear-gradient(135deg, #F72585 0%, #B5179E 100%)',
      bubbleColor: '#F5515F',
    },
  ];
  
  return (
    <div className="h-screen bg-black text-white flex flex-col overflow-hidden">
      {/* Moving particles background with settings */}
      <MovingParticles 
        density={appSettings.particles} 
        speed={appSettings.animationSpeed} 
      />
      
      {/* Header Section - Fixed at top */}
      <div className="relative z-10 p-6 pb-0">
        <div className="text-center mb-6">
          <h1 className="text-6xl font-bold text-yellow-500" style={{ animation: 'pulse 3s infinite' }}>
            Leola's Digital Library
          </h1>
          <p className="text-gray-300 mt-4 text-2xl">
            A collection of heartwarming stories and guides by 
            <span className="author-name ml-2" style={{ 
              color: '#a855f7', 
              textShadow: '0 0 8px #a855f7, 0 0 15px #a855f7, 0 0 25px #a855f7',
              animation: 'pulse-purple 2s infinite'
            }}>Leola "Sister" Lee</span>
          </p>
        </div>
        
        {/* Action buttons - side by side on the left */}
        <div className="absolute top-8 left-8 flex flex-row gap-4">
          {/* Gift Box Button */}
          <button 
            className="flex flex-col items-center justify-center hover:scale-110 transition-transform cursor-pointer bg-amber-900/30 p-4 rounded-xl border border-amber-500/30"
            onClick={() => setIsSupportModalOpen(true)}
            aria-label="Support the Writer"
            style={{ width: '120px', height: '120px' }}
          >
            <span className="text-5xl" style={{ animation: 'bounce 2s infinite' }}>🎁</span>
            <span className="text-sm text-amber-300 mt-2 font-bold">Support Leola</span>
          </button>
          
          {/* Settings Button */}
          <button 
            className="flex flex-col items-center justify-center hover:scale-110 transition-transform cursor-pointer bg-blue-800 p-4 rounded-xl border border-blue-400 shadow-lg"
            onClick={() => setIsSettingsPanelOpen(true)}
            aria-label="Library Settings"
            style={{
              boxShadow: '0 0 15px rgba(37, 99, 235, 0.5)',
              width: '120px', 
              height: '120px'
            }}
          >
            <span className="text-5xl">⚙️</span>
            <span className="text-sm text-blue-200 mt-2 font-bold">Settings</span>
          </button>
        </div>
        
        {/* Scrolling Banner */}
        <div className="mb-6">
          <ScrollingBanner />
        </div>
      </div>
      
      {/* Scrollable Book Cards Container */}
      <div className="flex-grow relative z-10 px-6 overflow-hidden">
        <div className="h-full overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#4B5563 #1F2937' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4 px-12 md:px-24">
            {books.map(book => (
              <div key={book.id} className="h-full max-w-lg mx-auto">
                <BookCard 
                  book={book} 
                  onOpenBook={(book) => setSelectedBook(book)} 
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Book Reader Modal - passing app settings */}
      {selectedBook && (
        <BookReader 
          book={selectedBook} 
          onClose={() => setSelectedBook(null)}
          settings={appSettings}
        />
      )}
      
      {/* Support Writer Modal */}
      <SupportWriterModal 
        isOpen={isSupportModalOpen} 
        onClose={() => setIsSupportModalOpen(false)} 
      />
      
      {/* Settings Panel */}
      <AppSettingsPanel 
        isOpen={isSettingsPanelOpen}
        onClose={() => setIsSettingsPanelOpen(false)}
        settings={appSettings}
        onSettingsChange={setAppSettings}
      />
      
      {/* CSS for animations */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            text-shadow: 0 0 15px rgba(234, 179, 8, 0.5);
          }
          50% {
            text-shadow: 0 0 30px rgba(234, 179, 8, 0.8);
          }
        }
        
        @keyframes pulse-purple {
          0%, 100% {
            text-shadow: 0 0 8px #a855f7, 0 0 15px #a855f7;
          }
          50% {
            text-shadow: 0 0 15px #a855f7, 0 0 30px #a855f7, 0 0 45px #a855f7;
          }
        }
        
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        
        /* Custom scrollbar styles for Webkit browsers */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #1F2937;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #4B5563;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #6B7280;
        }
      `}</style>
    </div>
  );
};

export default App;