import React from 'react';
import { CheckCircle2, XCircle, ArrowRight, Send, Brain } from 'lucide-react';
import type { Challenge } from '../types/challenge';

interface ChallengePanelProps {
  challenge: Challenge;
  onSubmit: () => void;
  onNext: () => void;
  isCorrect: boolean | null;
}

export function ChallengePanel({ challenge, onSubmit, onNext, isCorrect }: ChallengePanelProps) {
  const difficultyColor = {
    easy: 'text-green-400',
    medium: 'text-yellow-400',
    hard: 'text-red-400'
  }[challenge.difficulty];

  const typeIcon = {
    ui: '🎨',
    state: '⚡',
    list: '📋'
  }[challenge.type];

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{typeIcon}</span>
            <h2 className="text-xl font-bold">{challenge.title}</h2>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <Brain className="w-4 h-4 text-gray-400" />
            <span className={`text-sm font-medium capitalize ${difficultyColor}`}>
              {challenge.difficulty}
            </span>
          </div>
        </div>
        {isCorrect !== null && (
          <div className="flex items-center gap-2">
            {isCorrect ? (
              <>
                <CheckCircle2 className="w-6 h-6 text-green-400" />
                <span className="text-green-400">Correct!</span>
              </>
            ) : (
              <>
                <XCircle className="w-6 h-6 text-red-400" />
                <span className="text-red-400">Try Again</span>
              </>
            )}
          </div>
        )}
      </div>

      <p className="text-gray-300 mb-6">{challenge.description}</p>

      <div className="flex gap-3">
        <button
          onClick={onSubmit}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          <Send className="w-4 h-4" />
          Submit
        </button>
        {isCorrect && (
          <button
            onClick={onNext}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
          >
            Next Challenge
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}