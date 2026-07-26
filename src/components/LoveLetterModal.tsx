import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Languages, Send, Check, Copy, ExternalLink } from 'lucide-react';
import { LetterLanguage } from '../types';
import { ENGLISH_LETTER, BENGALI_STORY, RECIPIENT_NAME, SENDER_NAME, PREFILLED_INSTAGRAM_MESSAGE } from '../data/proposalData';
import { playChimeSound, playPopSound, toggleBackgroundMusic } from '../utils/audio';

interface LoveLetterModalProps {
  onBackToProposal?: () => void;
}

export const LoveLetterModal: React.FC<LoveLetterModalProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<LetterLanguage>('english');
  const [copied, setCopied] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState(false);

  const handleOpenLetter = () => {
    playChimeSound();
    toggleBackgroundMusic(true); // Automatically turns on & plays romantic song when letter opens
    setIsOpen(true);
  };

  const handleLanguageToggle = (lang: LetterLanguage) => {
    playPopSound();
    setLanguage(lang);
  };

  const handleCopyMessage = () => {
    playPopSound();
    navigator.clipboard.writeText(PREFILLED_INSTAGRAM_MESSAGE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleReplyToInstagram = () => {
    playPopSound();
    // Copy prefilled message to clipboard for easy pasting in Instagram DM
    navigator.clipboard.writeText(PREFILLED_INSTAGRAM_MESSAGE);
    
    // Open Instagram direct or main page
    window.open('https://www.instagram.com/direct/inbox/', '_blank');
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
      {/* Title Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/30 backdrop-blur-md text-white text-xs font-bold uppercase tracking-widest border border-white/30 mb-3 shadow-sm">
          <Sparkles className="w-4 h-4 text-amber-200" />
          To: Sayani 💌
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white text-shadow-lg tracking-tight">
          My Sweet Letter For You 💌
        </h1>
        <p className="text-rose-100/90 text-sm sm:text-base mt-2">
          Written with all my heart for you, Sayani
        </p>
      </motion.div>

      {/* Sealed Envelope view (When closed) */}
      {!isOpen && (
        <motion.div
          onClick={handleOpenLetter}
          whileHover={{ scale: 1.05, rotate: [0, -1, 1, 0] }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="cursor-pointer group relative my-6 w-full max-w-md aspect-[1.5/1] bg-gradient-to-br from-rose-100 via-pink-50 to-rose-200 rounded-2xl shadow-2xl p-6 border-2 border-rose-300 flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Decorative Envelope Back Flap Design */}
          <div className="absolute top-0 inset-x-0 h-1/2 bg-rose-200/60 rounded-b-[100px] border-b border-rose-300/50 shadow-inner group-hover:bg-rose-300/60 transition-colors" />

          {/* Envelope Heart Seal */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center shadow-lg border-2 border-white text-white text-3xl group-hover:scale-110 transition-transform duration-300">
              <Heart className="w-10 h-10 fill-white animate-pulse" />
            </div>
            <p className="mt-4 font-bold text-rose-800 text-lg sm:text-xl text-center">
              Click To Unseal My Letter For You, Sayani 💌
            </p>
            <span className="text-xs text-rose-600 font-medium bg-rose-200/80 px-3 py-1 rounded-full mt-1 border border-rose-300">
              Made with pure love for you ✨
            </span>
          </div>

          {/* Sparkles on seal hover */}
          <Sparkles className="absolute top-4 right-4 w-6 h-6 text-amber-400 animate-spin" />
          <Sparkles className="absolute bottom-4 left-4 w-6 h-6 text-rose-400 animate-pulse" />
        </motion.div>
      )}

      {/* Opened Letter View */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full bg-amber-50/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 border-2 border-amber-200 text-slate-800 relative my-4"
        >
          {/* Top Bar inside Letter: Language Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-200/80 pb-4 mb-6">
            <div className="flex items-center gap-2 text-rose-700 font-bold text-sm sm:text-base">
              <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
              <span>For My Dearest Sayani</span>
            </div>

            {/* Language Switcher Buttons */}
            <div className="flex items-center gap-2 bg-amber-100/80 p-1 rounded-xl border border-amber-300/60">
              <button
                onClick={() => handleLanguageToggle('english')}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  language === 'english'
                    ? 'bg-rose-500 text-white shadow-sm'
                    : 'text-amber-900 hover:bg-amber-200/50'
                }`}
              >
                English 💌
              </button>
              <button
                onClick={() => handleLanguageToggle('bengali')}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1 ${
                  language === 'bengali'
                    ? 'bg-rose-500 text-white shadow-sm'
                    : 'text-amber-900 hover:bg-amber-200/50'
                }`}
              >
                <Languages className="w-3.5 h-3.5" />
                বাংলায় চিঠি 🌸
              </button>
            </div>
          </div>

          {/* Letter Body: Animate transition on language change */}
          <AnimatePresence mode="wait">
            {language === 'english' ? (
              <motion.div
                key="english"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3 }}
                className="space-y-4 font-serif text-slate-800 text-base sm:text-lg leading-relaxed"
              >
                <h2 className="text-2xl sm:text-3xl font-bold text-rose-800 font-sans tracking-wide">
                  {ENGLISH_LETTER.salutation}
                </h2>

                {ENGLISH_LETTER.paragraphs.map((p, idx) => (
                  <p key={idx} className="text-slate-700 leading-relaxed">
                    {p}
                  </p>
                ))}

                <div className="pt-4 border-t border-amber-200/60 mt-6">
                  <p className="italic text-rose-700 font-sans font-medium">
                    {ENGLISH_LETTER.closing}
                  </p>
                  <p className="font-bold text-xl text-rose-900 mt-1 whitespace-pre-line font-sans">
                    {ENGLISH_LETTER.signature}
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="bengali"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-4 text-slate-800 text-base sm:text-lg leading-relaxed font-sans"
              >
                <div className="mb-2">
                  <h2 className="text-2xl sm:text-3xl font-bold text-rose-800">
                    {BENGALI_STORY.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-rose-600 font-medium mt-1 italic">
                    {BENGALI_STORY.subtitle}
                  </p>
                </div>

                {BENGALI_STORY.paragraphs.map((p, idx) => (
                  <p key={idx} className="text-slate-700 leading-loose">
                    {p}
                  </p>
                ))}

                <div className="pt-4 border-t border-amber-200/60 mt-6">
                  <p className="italic text-rose-700 font-medium">
                    {BENGALI_STORY.closing}
                  </p>
                  <p className="font-bold text-xl text-rose-900 mt-1 whitespace-pre-line">
                    {BENGALI_STORY.signature}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Reply Action Area */}
          <div className="mt-8 pt-6 border-t border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={() => setShowReplyModal(true)}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-bold text-base shadow-xl shadow-rose-500/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 group"
            >
              <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              <span>Reply To My Heart 💖</span>
            </button>

            <span className="text-xs text-rose-800/70 font-medium italic">
              Redirects to Instagram with a sweet message
            </span>
          </div>
        </motion.div>
      )}

      {/* Reply Modal / Instagram Popup */}
      <AnimatePresence>
        {showReplyModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-slate-800 relative border-2 border-pink-200"
            >
              <div className="text-center mb-5">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-400 to-pink-500 text-white flex items-center justify-center mx-auto mb-3 shadow-md">
                  <Heart className="w-8 h-8 fill-white animate-bounce" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Send Your Reply To Me! 💌
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  Ready to make me the happiest person alive?
                </p>
              </div>

              {/* Pre-written Message Preview */}
              <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 mb-5 text-center">
                <p className="text-xs font-semibold uppercase text-rose-500 tracking-wider mb-1">
                  Your Pre-Filled Response:
                </p>
                <p className="text-base font-semibold text-rose-900 italic">
                  "{PREFILLED_INSTAGRAM_MESSAGE}"
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleReplyToInstagram}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-bold text-base shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-5 h-5" />
                  <span>Open Instagram & Send Message</span>
                </button>

                <button
                  onClick={handleCopyMessage}
                  className="w-full py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-all flex items-center justify-center gap-2 border border-slate-300"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700 font-bold">Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-slate-500" />
                      <span>Copy Text Only</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setShowReplyModal(false)}
                  className="w-full py-2.5 text-center text-xs text-slate-400 hover:text-slate-600 font-medium"
                >
                  Close Window
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
