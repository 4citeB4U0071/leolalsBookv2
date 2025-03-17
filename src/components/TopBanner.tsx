import { useEffect, useState } from 'react';
import GiftBox from './GiftBox';
import PaymentOverlay from './PaymentOverlay';

const TopBanner = ({ title = "Leola's Digital Library", subtitle = "A collection of heartwarming stories and guides by Leola \"Sista\" Lee" }) => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [showSupportOverlay, setShowSupportOverlay] = useState(false);
  const messages = [
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
    let currentIndex = 0;
    const interval = setInterval(() => {
      setCurrentMessage(messages[currentIndex]);
      currentIndex = (currentIndex + 1) % messages.length;
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Fixed Banner Header */}
      <div className="fixed top-0 left-0 right-0 z-10 bg-black/90 backdrop-blur-md border-b border-yellow-500/30 shadow-lg shadow-yellow-500/10 pt-6 pb-4">
        <h1 className="text-5xl font-bold text-center text-yellow-500 animate-glow [text-shadow:_0_0_20px_rgba(234,179,8,0.7)]">
          {title}
        </h1>
        <p className="text-xl text-gray-300 text-center mt-2">
          {subtitle}
        </p>
        <div className="text-center mt-4">
          <p className="text-lg text-yellow-400 animate-fade-in-out transition-opacity duration-1000">
            {currentMessage}
          </p>
        </div>
        <div className="absolute bottom-2 right-4">
          <button 
            onClick={() => setShowSupportOverlay(true)}
            className="flex items-center gap-2 py-2 px-4 rounded-lg transition-all transform-gpu hover:scale-[1.02] cursor-pointer"
          >
            <GiftBox />
          </button>
        </div>
      </div>

      {/* Support Overlay */}
      {showSupportOverlay && (
        <PaymentOverlay
          isOpen={showSupportOverlay}
          onClose={() => setShowSupportOverlay(false)}
        />
      )}

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          50% { transform: translateX(5px); }
          75% { transform: translateX(-5px); }
        }
        
        .animate-shake {
          animation: shake 0.5s infinite;
        }

        @keyframes glow {
          0%, 100% { text-shadow: 0 0 10px rgba(234,179,8,0.7); }
          50% { text-shadow: 0 0 20px rgba(234,179,8,0.9), 0 0 30px rgba(234,179,8,0.3); }
        }
        
        .animate-glow {
          animation: glow 2s infinite;
        }

        @keyframes fade-in-out {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }

        .animate-fade-in-out {
          animation: fade-in-out 5s infinite;
        }
      `}</style>
    </>
  );
};

export default TopBanner;
