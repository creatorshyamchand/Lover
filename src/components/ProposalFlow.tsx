import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, ArrowRight, RefreshCw, MessageCircleHeart } from 'lucide-react';
import { PageStep } from '../types';
import { RECIPIENT_NAME, SENDER_NAME, SAD_GIFS, NO_PROMPTS } from '../data/proposalData';
import { playChimeSound, playPopSound, playFanfareSound } from '../utils/audio';
import { LoveLetterModal } from './LoveLetterModal';
import { ReasonsList } from './ReasonsList';

export const ProposalFlow: React.FC = () => {
  const [step, setStep] = useState<PageStep>('welcome');
  const [noCount, setNoCount] = useState<number>(0);
  const [noButtonPos, setNoButtonPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isNoButtonAbsolute, setIsNoButtonAbsolute] = useState(false);
  const [noPromptText, setNoPromptText] = useState<string | null>(null);
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);

  const loadingMessages = [
    `Calculating heartbeats for ${RECIPIENT_NAME}...`,
    `Wrapping ${SENDER_NAME}'s love in golden ribbon...`,
    `Asking the stars for a magical moment...`,
    `Almost ready...`,
  ];

  // Cycle loading messages
  useEffect(() => {
    if (step === 'loading') {
      const interval = setInterval(() => {
        setLoadingTextIndex((prev) => (prev + 1) % loadingMessages.length);
      }, 500);

      const timer = setTimeout(() => {
        setStep('question');
      }, 2200);

      return () => {
        clearInterval(interval);
        clearTimeout(timer);
      };
    }
  }, [step]);

  const handleNextStep = (nextStep: PageStep) => {
    playPopSound();
    setStep(nextStep);
  };

  const handleStartLoading = () => {
    playPopSound();
    setStep('loading');
  };

  // Trigger confetti explosion
  const triggerConfettiExplosion = () => {
    const count = 200;
    const defaults = { origin: { y: 0.7 } };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  const handleYes = () => {
    playFanfareSound();
    triggerConfettiExplosion();
    setStep('accepted');
  };

  // Evasive "No" button move handler
  const moveNoButton = () => {
    playPopSound();
    setNoCount((prev) => prev + 1);

    // Show heart-tugging prompt message
    const promptIndex = noCount % NO_PROMPTS.length;
    setNoPromptText(NO_PROMPTS[promptIndex]);

    // Calculate a safe bounded position for absolute movement
    const maxX = Math.min(window.innerWidth - 180, 280);
    const maxY = Math.min(window.innerHeight - 180, 200);

    const randomX = (Math.random() - 0.5) * maxX * 1.8;
    const randomY = (Math.random() - 0.5) * maxY * 1.5;

    setIsNoButtonAbsolute(true);
    setNoButtonPos({ x: randomX, y: randomY });
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[80vh] py-8 px-4 text-center">
      <AnimatePresence mode="wait">
        {/* STEP 1: WELCOME */}
        {step === 'welcome' && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center"
          >
            <div className="relative mb-6">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border-2 border-white/40 shadow-2xl">
                <Heart className="w-14 h-14 text-rose-300 fill-rose-300 animate-pulse" />
              </div>
              <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-amber-200 animate-spin" style={{ animationDuration: '6s' }} />
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white text-shadow-lg tracking-tight leading-tight max-w-lg">
              I Have Something Very Special For You, {RECIPIENT_NAME}! ✨
            </h1>
            <p className="text-rose-100 text-base sm:text-lg mt-3 font-medium max-w-md">
              I have created a little world of affection just for you...
            </p>

            <button
              onClick={() => handleNextStep('tease')}
              className="mt-8 px-8 py-4 rounded-full bg-white text-rose-600 font-extrabold text-lg shadow-xl hover:bg-rose-50 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 group border-2 border-rose-200"
            >
              <span>Let's See! 💕</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        )}

        {/* STEP 2: TEASE */}
        {step === 'tease' && (
          <motion.div
            key="tease"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center w-full"
          >
            <div className="bg-white/20 backdrop-blur-md p-4 sm:p-6 rounded-3xl border-2 border-white/40 shadow-2xl mb-6 max-w-xs sm:max-w-sm w-full">
              <img
                src="https://i.ibb.co/DD1XPDtD/pandapanah.gif"
                alt="Cute Panda"
                className="w-full h-auto rounded-2xl shadow-md object-cover"
              />
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white text-shadow-md">
              Are You Ready, {RECIPIENT_NAME}? 🌸
            </h2>
            <p className="text-pink-100 text-sm sm:text-base mt-2 font-medium">
              Take a deep breath... something magical is waiting!
            </p>

            <button
              onClick={handleStartLoading}
              className="mt-6 px-8 py-4 rounded-full bg-white text-rose-600 font-extrabold text-lg shadow-xl hover:bg-rose-50 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 border-2 border-rose-200"
            >
              <span>What's Next? ✨</span>
            </button>
          </motion.div>
        )}

        {/* STEP 3: LOADING */}
        {step === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex flex-col items-center"
          >
            <div className="w-24 h-24 mb-6 relative flex items-center justify-center">
              <img
                src="https://i.ibb.co/zhZT3m35/g5.gif"
                alt="Loading..."
                className="w-20 h-20 object-contain rounded-full border-2 border-white/40 shadow-xl"
              />
              <RefreshCw className="absolute inset-0 w-24 h-24 text-white/40 animate-spin" />
            </div>

            <p className="text-xl sm:text-2xl font-bold text-white text-shadow animate-pulse">
              {loadingMessages[loadingTextIndex]}
            </p>
          </motion.div>
        )}

        {/* STEP 4: MAIN QUESTION */}
        {step === 'question' && (
          <motion.div
            key="question"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center w-full max-w-lg"
          >
            {/* Cute GIF box */}
            <div className="bg-white/20 backdrop-blur-md p-4 rounded-3xl border-2 border-white/40 shadow-2xl mb-6 max-w-xs sm:max-w-sm w-full relative">
              <img
                src={noCount > 0 ? SAD_GIFS[(noCount - 1) % SAD_GIFS.length] : 'https://i.ibb.co/dH28C8z/bunga.gif'}
                alt="Cute Love GIF"
                className="w-full h-56 sm:h-64 object-cover rounded-2xl shadow-md transition-all duration-300"
              />
              {noCount > 0 && (
                <span className="absolute top-2 right-2 bg-rose-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md animate-bounce">
                  Sad Mode 🥺
                </span>
              )}
            </div>

            {/* Proposal Question */}
            <h1 className="text-3xl sm:text-5xl font-black text-white text-shadow-lg tracking-tight uppercase">
              DO YOU LOVE ME, {RECIPIENT_NAME}? ♥️
            </h1>

            {/* Heart-tugging prompt if "No" attempted */}
            {noPromptText && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 px-4 py-2 rounded-2xl bg-rose-950/70 border border-rose-300/40 text-rose-200 text-sm font-semibold shadow-lg max-w-sm"
              >
                {noPromptText}
              </motion.div>
            )}

            {/* Options Area */}
            <div className="mt-8 relative w-full flex flex-wrap items-center justify-center gap-4 min-h-[80px]">
              {/* YES BUTTON - Grows bigger with each "No" attempt */}
              <motion.button
                onClick={handleYes}
                style={{
                  scale: Math.min(1 + noCount * 0.15, 1.8),
                }}
                whileHover={{ scale: Math.min(1.08 + noCount * 0.15, 1.9) }}
                whileTap={{ scale: 0.95 }}
                className="z-20 px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold text-xl shadow-2xl shadow-emerald-500/50 flex items-center gap-2 border-2 border-emerald-200 cursor-pointer"
              >
                <Heart className="w-6 h-6 fill-white" />
                <span>Yes, 💌!</span>
              </motion.button>

              {/* NO BUTTON - Evasive & Flees */}
              <motion.button
                onMouseEnter={moveNoButton}
                onTouchStart={moveNoButton}
                onClick={moveNoButton}
                animate={
                  isNoButtonAbsolute
                    ? { x: noButtonPos.x, y: noButtonPos.y }
                    : { x: 0, y: 0 }
                }
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="z-10 px-6 py-3.5 rounded-full bg-white/80 hover:bg-white text-rose-700 font-bold text-lg shadow-lg border border-white cursor-pointer select-none transition-colors"
              >
                <span>No 💔</span>
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* STEP 5: ACCEPTED / YAY */}
        {step === 'accepted' && (
          <motion.div
            key="accepted"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center w-full"
          >
            <div className="bg-white/20 backdrop-blur-md p-4 sm:p-6 rounded-3xl border-2 border-white/40 shadow-2xl mb-6 max-w-xs sm:max-w-sm w-full">
              <img
                src="https://i.ibb.co/MDm4bRGj/mmm.gif"
                alt="Yay Love GIF"
                className="w-full h-auto rounded-2xl shadow-md"
              />
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white text-shadow-lg tracking-tight">
              Yay! {RECIPIENT_NAME} Said YES! 💖
            </h1>
            <p className="text-rose-100 text-base sm:text-xl font-semibold mt-3">
              I Love You Forever & Always, Sayani! ✨
            </p>

            <button
              onClick={() => handleNextStep('letter')}
              className="mt-8 px-8 py-4 rounded-full bg-white text-rose-600 font-extrabold text-lg shadow-2xl hover:bg-rose-50 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 border-2 border-rose-200"
            >
              <MessageCircleHeart className="w-6 h-6 text-rose-500" />
              <span>Read My Heart's Letter 💌</span>
            </button>
          </motion.div>
        )}

        {/* STEP 6: LETTER VIEW & EXTRAS */}
        {step === 'letter' && (
          <motion.div
            key="letter"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full"
          >
            <LoveLetterModal />
            <ReasonsList />

            {/* Back to Proposal Question toggle button */}
            <div className="mt-8 text-center">
              <button
                onClick={() => handleNextStep('question')}
                className="text-xs text-white/80 hover:text-white underline font-medium"
              >
                Replay Proposal Question
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
