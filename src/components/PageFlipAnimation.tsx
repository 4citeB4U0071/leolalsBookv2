import React, { useEffect } from 'react';

interface PageContent {
  title: string;
  content: string;
}

interface PageFlipAnimationProps {
  isAnimating: boolean;
  direction: 'next' | 'prev';
  onAnimationComplete: () => void;
  currentContent: PageContent;
  nextContent: PageContent;
  fontSize: number;
}

const PageFlipAnimation: React.FC<PageFlipAnimationProps> = ({
  isAnimating,
  direction,
  onAnimationComplete,
  currentContent,
  nextContent,
  fontSize
}) => {
  // Set up an effect to handle animation end in case onAnimationEnd doesn't fire
  // This acts as a safety mechanism
  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        onAnimationComplete();
      }, 1000); // Increased timeout for better reliability
      
      return () => clearTimeout(timer);
    }
  }, [isAnimating, onAnimationComplete]);

  return (
    <div className="relative w-full h-full overflow-hidden page-turn-animation">
      {/* Current page */}
      <div
        className={`absolute inset-0 p-8 page-content bg-black/70 backdrop-blur-sm origin-left overflow-y-auto
          ${isAnimating ? (direction === 'next' ? 'animate-page-out' : 'animate-page-in') : ''}`}
        style={{ fontSize: `${fontSize}px` }}
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-white">
            {currentContent.title}
          </h2>
          {currentContent.content.split('\n\n').map((paragraph, index) => (
            <p
              key={index}
              className="mb-6 leading-relaxed whitespace-pre-wrap text-white"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Next page */}
      <div
        className={`absolute inset-0 p-8 page-content bg-black/70 backdrop-blur-sm origin-left overflow-y-auto
          ${isAnimating ? (direction === 'next' ? 'animate-page-in' : 'animate-page-out') : ''}`}
        style={{ fontSize: `${fontSize}px` }}
        onAnimationEnd={onAnimationComplete}
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-white">
            {nextContent.title}
          </h2>
          {nextContent.content.split('\n\n').map((paragraph, index) => (
            <p
              key={index}
              className="mb-6 leading-relaxed whitespace-pre-wrap text-white"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageFlipAnimation;
