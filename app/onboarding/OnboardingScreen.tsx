import React, { useState, useEffect, useRef } from 'react';
import type { TouchEvent, MouseEvent } from 'react';

interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
}

const slides: Slide[] = [
  {
    id: 0,
    image: '/onboarding/access.jpg',
    title: 'Code in, access granted',
    subtitle: 'Office and home control made easy with unique access codes',
  },
  {
    id: 1,
    image: '/onboarding/control.jpg',
    title: 'Take control of your space',
    subtitle: 'Get time-limited access codes for home and office',
  },
  {
    id: 2,
    image: '/onboarding/simple.png',
    title: 'Access made simple',
    subtitle: 'Generate personalized entry codes for homes or offices',
  },
];

interface OnboardingScreenProps {
  onComplete?: (action: 'login' | 'register') => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Swipe / Drag state
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const isDragging = useRef<boolean>(false);

  // Auto-slide every 2 seconds (2000ms)
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isPaused, currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Touch Swipe Handlers
  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setIsPaused(true);
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diff = touchStartX.current - touchEndX.current;
      const minSwipeDistance = 40; // minimum distance in px to register a swipe

      if (diff > minSwipeDistance) {
        handleNext();
      } else if (diff < -minSwipeDistance) {
        handlePrev();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
    setIsPaused(false);
  };

  // Mouse Drag Handlers for Desktop manual sliding
  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setIsPaused(true);
    isDragging.current = true;
    touchStartX.current = e.clientX;
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    touchEndX.current = e.clientX;
  };

  const handleMouseUp = () => {
    if (isDragging.current && touchStartX.current !== null && touchEndX.current !== null) {
      const diff = touchStartX.current - touchEndX.current;
      const minSwipeDistance = 40;

      if (diff > minSwipeDistance) {
        handleNext();
      } else if (diff < -minSwipeDistance) {
        handlePrev();
      }
    }
    isDragging.current = false;
    touchStartX.current = null;
    touchEndX.current = null;
    setIsPaused(false);
  };

  return (
    <div
      style={styles.container}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Background Images Carousel */}
      <div
        style={{
          ...styles.sliderTrack,
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {slides.map((slide) => (
          <div key={slide.id} style={styles.slide}>
            <img src={slide.image} alt={slide.title} style={styles.bgImage} />
            <div style={styles.darkOverlay} />
          </div>
        ))}
      </div>

      {/* Slide Content Overlay */}
      <div style={styles.contentOverlay}>
        <div style={styles.textContainer}>
          <h2 style={styles.title}>{slides[currentIndex].title}</h2>
          <p style={styles.subtitle}>{slides[currentIndex].subtitle}</p>

          {/* Pagination Indicator Dots */}
          <div style={styles.pagination}>
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentIndex(idx);
                  setIsPaused(true);
                  setTimeout(() => setIsPaused(false), 2000);
                }}
                aria-label={`Go to slide ${idx + 1}`}
                style={{
                  ...styles.dot,
                  ...(currentIndex === idx ? styles.activeDot : {}),
                }}
              />
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={styles.buttonGroup}>
          <button
            style={styles.createAccountBtn}
            onClick={() => onComplete && onComplete('register')}
          >
            Create Account
          </button>
          <button
            style={styles.loginBtn}
            onClick={() => onComplete && onComplete('login')}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
    backgroundColor: '#0d1814',
    zIndex: 9000,
    userSelect: 'none',
    WebkitUserSelect: 'none',
    touchAction: 'pan-y',
  },
  sliderTrack: {
    display: 'flex',
    width: '100%',
    height: '100%',
    transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
  },
  slide: {
    minWidth: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  bgImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
  },
  darkOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(180deg, rgba(13, 24, 20, 0.4) 0%, rgba(13, 24, 20, 0.75) 50%, rgba(13, 24, 20, 0.92) 100%)',
  },
  contentOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: '0 24px calc(40px + env(safe-area-inset-bottom, 0px))',
    boxSizing: 'border-box',
    zIndex: 10,
    textAlign: 'center',
  },
  textContainer: {
    width: '100%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '28px',
  },
  title: {
    color: '#00e676',
    fontSize: '26px',
    fontWeight: '700',
    margin: '0 0 12px 0',
    lineHeight: '1.25',
    letterSpacing: '-0.3px',
    textShadow: '0 2px 8px rgba(0,0,0,0.5)',
  },
  subtitle: {
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: '500',
    margin: '0 0 20px 0',
    lineHeight: '1.45',
    opacity: 0.95,
    maxWidth: '340px',
    textShadow: '0 2px 6px rgba(0,0,0,0.5)',
  },
  pagination: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    marginTop: '4px',
  },
  dot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: 'transparent',
    border: '2px solid rgba(255, 255, 255, 0.5)',
    padding: 0,
    margin: 0,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  activeDot: {
    backgroundColor: '#00e676',
    borderColor: '#00e676',
    transform: 'scale(1.1)',
  },
  buttonGroup: {
    width: '100%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  createAccountBtn: {
    width: '100%',
    height: '52px',
    backgroundColor: '#347357',
    color: '#ffffff',
    border: 'none',
    borderRadius: '12px',
    fontSize: '17px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 14px rgba(52, 115, 87, 0.4)',
    transition: 'all 0.2s ease',
  },
  loginBtn: {
    width: '100%',
    height: '52px',
    backgroundColor: 'transparent',
    color: '#00e676',
    border: '2px solid #00e676',
    borderRadius: '12px',
    fontSize: '17px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
  },
};
