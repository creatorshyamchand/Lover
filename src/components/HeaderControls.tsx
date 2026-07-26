import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Heart, Sparkles } from 'lucide-react';
import { toggleBackgroundMusic, playPopSound, subscribeMusicState } from '../utils/audio';

export const HeaderControls: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeMusicState((playing) => {
      setIsPlaying(playing);
    });
    return () => unsubscribe();
  }, []);

  const handleMusicToggle = () => {
    playPopSound();
    toggleBackgroundMusic();
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-40 px-4 max-w-4xl mx-auto flex items-center justify-between pointer-events-auto">
      {/* Sender & Recipient Tag */}
      <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 shadow-lg text-white font-medium text-sm sm:text-base tracking-wide">
        <Sparkles className="w-4 h-4 text-amber-200 animate-spin" style={{ animationDuration: '4s' }} />
        <span>Abhijit</span>
        <Heart className="w-4 h-4 text-rose-300 fill-rose-300 animate-bounce" />
        <span>Sayani</span>
      </div>

      {/* Music Toggle Button */}
      <button
        onClick={handleMusicToggle}
        className={`flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md border border-white/30 shadow-lg text-sm font-semibold transition-all duration-300 ${
          isPlaying
            ? 'bg-rose-500/80 text-white shadow-rose-500/50 scale-105'
            : 'bg-white/20 text-white hover:bg-white/30'
        }`}
        title={isPlaying ? 'Pause Background Music' : 'Play Romantic Music'}
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-4 h-4 animate-pulse text-amber-200" />
            <span className="hidden sm:inline">Music Playing 🎵</span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 text-white/80" />
            <span className="hidden sm:inline">Music Off</span>
          </>
        )}
      </button>
    </header>
  );
};
