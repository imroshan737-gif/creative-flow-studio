import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

const motivationalQuotes = [
  "Small daily improvements lead to stunning results.",
  "Your hobby today is your legacy tomorrow.",
  "Consistency beats intensity. Show up every day.",
  "Every expert was once a beginner.",
  "The secret to getting ahead is getting started.",
  "Passion + Persistence = Progress.",
  "Your creative spark can light up the world.",
  "One challenge at a time, one day at a time.",
];

export default function TypewriterQuote() {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  const randomQuote = useMemo(() => {
    return motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
  }, []);

  useEffect(() => {
    setDisplayedText('');
    setIsComplete(false);

    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex < randomQuote.length) {
        setDisplayedText(randomQuote.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsComplete(true);
        clearInterval(intervalId);
      }
    }, 50);

    return () => clearInterval(intervalId);
  }, [randomQuote]);

  return (
    <motion.figure
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.5 }}
      className="border-l-2 border-primary/60 pl-5 md:pl-7"
    >
      <p className="eyebrow mb-2.5">Today's note</p>
      <blockquote className="font-display text-xl md:text-2xl lg:text-[1.75rem] font-normal leading-snug text-foreground/90 min-h-[3.5rem]">
        {displayedText}
        {!isComplete && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.55, repeat: Infinity }}
            className="inline-block w-[2px] h-[1em] bg-primary ml-0.5 align-[-0.1em]"
          />
        )}
      </blockquote>
    </motion.figure>
  );
}
