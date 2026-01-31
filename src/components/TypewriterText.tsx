import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypewriterTextProps {
  text: string;
  delay?: number; // Delay before starting in ms
  speed?: number; // Speed per character in ms
  className?: string;
  onComplete?: () => void;
}

export default function TypewriterText({ 
  text, 
  delay = 0, 
  speed = 80, 
  className = '',
  onComplete 
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    // Delay before starting
    const startTimeout = setTimeout(() => {
      setHasStarted(true);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!hasStarted) return;

    setDisplayedText('');
    setIsComplete(false);
    
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsComplete(true);
        clearInterval(intervalId);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [text, speed, hasStarted, onComplete]);

  if (!hasStarted) {
    return (
      <span className={className}>
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-[3px] h-[0.9em] bg-primary align-middle"
        />
      </span>
    );
  }

  return (
    <span className={className}>
      {displayedText}
      {!isComplete && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-[3px] h-[0.9em] bg-primary ml-1 align-middle"
        />
      )}
    </span>
  );
}
