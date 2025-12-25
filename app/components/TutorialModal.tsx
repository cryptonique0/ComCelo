'use client';

import { useState } from 'react';

interface TutorialStep {
  title: string;
  icon: string;
  description: string;
  details: string[];
}

const tutorialSteps: TutorialStep[] = [
  {
    title: 'The Battlefield',
    icon: '⚔️',
    description: 'Learn about the 3x3 tactical grid',
    details: [
      '• Each game takes place on a 3x3 battlefield',
      '• Position your units strategically',
      '• Range matters - archers attack from distance',
      '• Height advantage provides tactical benefits'
    ]
  },
  {
    title: 'Your Units',
    icon: '🦸',
    description: 'Master the 3 unit archetypes',
    details: [
      '🦸 Hero: 100 HP | 15 ATK | 10 DEF | Leader unit',
      '⚔️ Soldier: 40 HP | 12 ATK | 8 DEF | Frontline warrior',
      '🏹 Archer: 30 HP | 10 ATK | 5 DEF | Range 3 attacker'
    ]
  },
  {
    title: 'Combat Actions',
    icon: '⚡',
    description: 'Execute tactics during your turn',
    details: [
      '🚶 Move: Reposition units 1 square per turn',
      '💥 Attack: Deal (ATK - Enemy DEF) damage',
      '🛡️ Defend: Reduce incoming damage by 50% next turn',
      '✨ Skills: Special abilities with unique effects'
    ]
  },
  {
    title: 'Turn Sequence',
    icon: '🔄',
    description: 'Understand turn-based gameplay',
    details: [
      '1. Your Turn: Move, attack, defend, use skills',
      '2. End Turn: Pass control to opponent',
      '3. Opponent Turn: They execute their actions',
      '4. Victory: Reduce enemy Hero HP to 0 to win'
    ]
  },
  {
    title: 'Strategy Tips',
    icon: '🧠',
    description: 'Play smarter, not harder',
    details: [
      '💡 Use terrain to your advantage',
      '💡 Balance offense and defense',
      '💡 Protect your Hero - it\'s your most vital unit',
      '💡 Coordinate multi-unit attacks for massive damage'
    ]
  },
  {
    title: 'Game Modes',
    icon: '🏆',
    description: 'Play casual or competitive',
    details: [
      '🎮 Casual: No ranking impact, practice matches',
      '⭐ Ranked: Compete for ELO and leaderboard position',
      '🎯 Tournament: Multi-round brackets with prizes',
      '⚡ Quick Match: Auto-paired opponent within seconds'
    ]
  }
];

export default function TutorialModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const step = tutorialSteps[currentStep];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-2xl mx-4 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 rounded-3xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 p-8 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="text-5xl">{step.icon}</div>
            <div>
              <h2 className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                {step.title}
              </h2>
              <p className="text-slate-400 text-sm mt-1">{step.description}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors text-2xl font-bold"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="bg-slate-900/50 rounded-xl border border-slate-700/50 p-6 mb-8">
          <div className="space-y-3">
            {step.details.map((detail, i) => (
              <p key={i} className="text-slate-300 text-base leading-relaxed flex items-start gap-3">
                <span className="text-cyan-400 font-bold min-w-fit">{detail.split(':')[0]}:</span>
                <span>{detail.split(':')[1] || detail.substring(1)}</span>
              </p>
            ))}
          </div>
        </div>

        {/* Step Indicators */}
        <div className="flex gap-2 mb-8 justify-center">
          {tutorialSteps.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentStep(i)}
              className={`h-2 rounded-full transition-all ${
                i === currentStep
                  ? 'bg-cyan-400 w-8'
                  : 'bg-slate-700 w-2 hover:bg-slate-600'
              }`}
              aria-label={`Go to step ${i + 1}`}
            />
          ))}
        </div>

        {/* Navigation */}
        <div className="flex gap-4 justify-between items-center">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="px-6 py-3 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold"
          >
            ← Previous
          </button>

          <div className="text-slate-400 text-sm font-semibold">
            {currentStep + 1} / {tutorialSteps.length}
          </div>

          <button
            onClick={() => setCurrentStep(Math.min(tutorialSteps.length - 1, currentStep + 1))}
            disabled={currentStep === tutorialSteps.length - 1}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold"
          >
            Next →
          </button>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full mt-6 px-6 py-3 rounded-lg bg-slate-800/50 border border-slate-700 text-slate-300 hover:bg-slate-800 transition-all font-semibold"
        >
          Close Tutorial
        </button>
      </div>
    </div>
  );
}
