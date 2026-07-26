import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FloatingHeart } from '../types';
import { playPopSound, toggleBackgroundMusic, getIsMusicPlaying } from '../utils/audio';

interface BackgroundEffectProps {
  children: React.ReactNode;
}

export const BackgroundEffect: React.FC<BackgroundEffectProps> = ({ children }) => {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  // Function to create a burst of heart floating animation
  const handleGlobalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Avoid triggering on buttons or interactive links
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('a') || target.closest('input')) {
      return;
    }

    const newHeart: FloatingHeart = {
      id: Date.now() + Math.random(),
      x: e.clientX,
      y: e.clientY,
      size: Math.floor(Math.random() * 24) + 20,
      rotation: Math.floor(Math.random() * 40) - 20,
    };

    setHearts((prev) => [...prev.slice(-15), newHeart]);
  };

  useEffect(() => {
    if (hearts.length > 0) {
      const timer = setTimeout(() => {
        setHearts((prev) => prev.filter((h) => Date.now() - h.id < 2200));
      }, 2200);
      return () => clearTimeout(timer);
    }
  }, [hearts]);

  return (
    <div
      onClick={handleGlobalClick}
      className="relative min-h-screen w-full overflow-x-hidden select-none"
      style={{
        background: 'radial-gradient(circle at 0% 0%, #ffafbd 0%, transparent 50%), radial-gradient(circle at 100% 100%, #ffc3a0 0%, transparent 50%), radial-gradient(circle at 50% 50%, #2193b0 0%, #6dd5ed 100%)',
        backgroundColor: '#6dd5ed',
      }}
    >
      {/* Background glowing ambient circles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-pink-300/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-1/4 w-[30rem] h-[30rem] bg-amber-200/20 rounded-full blur-3xl animate-pulse duration-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-purple-400/20 rounded-full blur-3xl" />
      </div>

      {/* Subtle floating sparkles backdrop */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/80 animate-ping"
            style={{
              top: `${(i * 17) % 100}%`,
              left: `${(i * 23) % 100}%`,
              width: `${(i % 3) + 2}px`,
              height: `${(i % 3) + 2}px`,
              animationDuration: `${(i % 5) + 3}s`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
        {children}
      </div>

      {/* Interactive Click Burst Hearts */}
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ opacity: 1, scale: 0.5, x: heart.x - heart.size / 2, y: heart.y - heart.size / 2 }}
            animate={{
              opacity: [1, 1, 0],
              scale: [0.5, 1.4, 1.8],
              y: heart.y - 140,
              rotate: [0, heart.rotation, heart.rotation * 1.5],
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: 'easeOut' }}
            className="fixed pointer-events-none z-50 text-pink-300 drop-shadow-[0_0_10px_rgba(255,105,180,0.8)]"
            style={{ fontSize: `${heart.size}px` }}
          >
            💖
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
