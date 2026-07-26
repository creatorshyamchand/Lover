import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, ChevronDown } from 'lucide-react';
import { PROPOSAL_REASONS } from '../data/proposalData';
import { playPopSound } from '../utils/audio';

export const ReasonsList: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const handleToggle = (id: number) => {
    playPopSound();
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="w-full max-w-xl mx-auto my-8">
      <div className="text-center mb-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-rose-100 text-xs font-semibold uppercase tracking-wider border border-white/30 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-200" />
          Special Highlights
        </span>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 text-shadow">
          Why Sayani Is One In A Million 💖
        </h3>
        <p className="text-xs sm:text-sm text-pink-100/90 mt-1">
          Tap any card below to see why I love you so much!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 px-2">
        {PROPOSAL_REASONS.map((item) => {
          const isExpanded = expandedId === item.id;
          return (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleToggle(item.id)}
              className={`cursor-pointer rounded-2xl p-4 transition-all duration-300 border shadow-lg ${
                isExpanded
                  ? 'bg-white/95 text-slate-800 border-rose-300 shadow-rose-500/20'
                  : 'bg-white/20 backdrop-blur-md text-white border-white/30 hover:bg-white/30'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <h4 className={`font-bold text-base ${isExpanded ? 'text-rose-700' : 'text-white'}`}>
                      {item.title}
                    </h4>
                    <span className={`text-xs block ${isExpanded ? 'text-rose-500' : 'text-rose-200'}`}>
                      {item.titleBengali}
                    </span>
                  </div>
                </div>
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-300 ${
                    isExpanded ? 'rotate-180 text-rose-500' : 'text-white/70'
                  }`}
                />
              </div>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="mt-3 pt-3 border-t border-rose-200/80 text-sm space-y-1.5"
                  >
                    <p className="text-slate-700 font-medium">{item.description}</p>
                    <p className="text-rose-800 font-semibold text-xs italic">{item.descriptionBengali}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
