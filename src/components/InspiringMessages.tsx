import React, { useState, useEffect, useRef } from 'react';
import ParticleSystem from './ParticleSystem';

const InspiringMessages: React.FC = () => {
  const [currentSentence, setCurrentSentence] = useState('');
  const [position, setPosition] = useState(-100);
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef<number | null>(null); // Fix animationRef type
  
  const inspirationalSentences = [
    "Find joy in each stitch as your hands create what your heart imagines",
    "Your passion for color and texture transforms simple yarn into magic",
    "In each hook and loop, you weave stories that connect generations",
    "Believe in the power of your creativity to bring warmth into the world",
    "Time spent creating with your hands is never wasted, but treasured",
    "Let your spirit flow through each thread, creating patterns of love",
    "Share your handcrafted gifts to spread ripples of joy to those you love",
    "When you create with passion, you leave fingerprints of love on everything"
  ];

  useEffect(() => {
    const startNextSentence = () => {
      setPosition(100);
      setCurrentSentence(inspirationalSentences[sentenceIndex]);
      setIsAnimating(true);
      
      let startTime: number | undefined; // Fix startTime type
      const duration = 8000;
      
      const animateStep = (timestamp: number) => { // Fix timestamp type
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - (startTime || 0); // Use 0 as default if startTime is undefined
        const progress = Math.min(elapsed / duration, 1);
        
        const newPosition = 100 - progress * 220;
        setPosition(newPosition);
        
        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animateStep);
        } else {
          setIsAnimating(false);
          setTimeout(() => {
            setSentenceIndex((prevIndex) => (prevIndex + 1) % inspirationalSentences.length);
          }, 2000);
        }
      };
      
      animationRef.current = requestAnimationFrame(animateStep);
    };
    
    if (!isAnimating) {
      startNextSentence();
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [sentenceIndex, isAnimating, inspirationalSentences]);
  
  const renderStardustTrail = () => {
    const particles = [];
    const particleCount = 150;
    
    for (let i = 0; i < particleCount; i++) {
      const distance = Math.random() * 400 + 50;
      const verticalOffset = (Math.random() - 0.5) * 80;
      const size = Math.random() * 4 + 1;
      const opacity = Math.max(0.1, 1 - (distance / 500));
      const blur = Math.min(4, distance / 80);
      
      const colorRand = Math.random();
      let color = '#FFD700';
      if (colorRand > 0.7) color = '#FFFFFF';
      if (colorRand > 0.9) color = '#E6E6FA';
      
      particles.push(
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: color,
            right: `${distance}px`,
            top: '50%',
            marginTop: `${verticalOffset}px`,
            opacity: opacity,
            filter: `blur(${blur}px)`,
          }}
        />
      );
    }
    
    return particles;
  };
  
  return (
    <div className="fixed top-0 left-0 right-0 h-20 flex items-center pointer-events-none z-20 overflow-hidden">
      <div 
        className="relative"
        style={{
          left: `${position}%`,
          transform: 'translateY(-50%)',
          width: 'max-content',
        }}
      >
        <div className="absolute right-full top-1/2 transform -translate-y-1/2">
          {renderStardustTrail()}
        </div>
        
        <div 
          className="relative whitespace-nowrap px-4"
          style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            fontFamily: 'serif',
            color: '#FFD700',
            textShadow: '0 0 20px rgba(255, 215, 0, 0.8), 0 0 40px rgba(255, 215, 0, 0.4)',
            animation: 'wordGlow 1.5s infinite alternate ease-in-out'
          }}
        >
          {currentSentence}
          <ParticleSystem /> {/* Remove props from ParticleSystem */}
        </div>
      </div>
      
      <style>{`
        @keyframes wordGlow {
          0% {
            text-shadow: 0 0 20px rgba(255, 215, 0, 0.8), 0 0 40px rgba(255, 215, 0, 0.4);
          }
          100% {
            text-shadow: 0 0 30px rgba(255, 215, 0, 1), 0 0 60px rgba(255, 215, 0, 0.6);
          }
        }
      `}</style>
    </div>
  );
};

export default InspiringMessages;
