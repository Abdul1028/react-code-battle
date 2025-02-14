import React, { useState, useCallback, useEffect } from 'react';
import { CodeEditor } from './components/CodeEditor';
import { Timer } from './components/Timer';
import { Preview } from './components/Preview';
import { ChallengePanel } from './components/ChallengePanel';
import { challenges } from './data/challenges';
import { Trophy, Code2, Play } from 'lucide-react';
import type { Challenge } from './types/challenge';

function App() {
  const [currentChallenge, setCurrentChallenge] = useState<Challenge>(challenges[0]);
  const [code, setCode] = useState(currentChallenge.initialCode);
  const [timeLeft, setTimeLeft] = useState(40);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [completed, setCompleted] = useState<number[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((time) => {
        if (time <= 1) {
          handleTimeUp();
          return 40;
        }
        return time - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentChallenge.id]);

  const handleTimeUp = useCallback(() => {
    if (!completed.includes(currentChallenge.id)) {
      const nextIndex = challenges.findIndex(c => c.id === currentChallenge.id) + 1;
      if (nextIndex < challenges.length) {
        setCurrentChallenge(challenges[nextIndex]);
        setCode(challenges[nextIndex].initialCode);
        setIsCorrect(null);
      }
    }
  }, [currentChallenge.id, completed]);

  const handleCodeChange = useCallback((value: string) => {
    setCode(value);
  }, []);

  const handleSubmit = useCallback(() => {
    const isCodeCorrect = code.replace(/\s/g, '') === currentChallenge.solution.replace(/\s/g, '');
    setIsCorrect(isCodeCorrect);
    
    if (isCodeCorrect && !completed.includes(currentChallenge.id)) {
      setCompleted([...completed, currentChallenge.id]);
    }
  }, [code, currentChallenge.solution, currentChallenge.id, completed]);

  const handleNext = useCallback(() => {
    const nextIndex = challenges.findIndex(c => c.id === currentChallenge.id) + 1;
    if (nextIndex < challenges.length) {
      setCurrentChallenge(challenges[nextIndex]);
      setCode(challenges[nextIndex].initialCode);
      setIsCorrect(null);
      setTimeLeft(40);
    }
  }, [currentChallenge.id]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="w-6 h-6 text-blue-400" />
            <h1 className="text-xl font-bold">React UI Challenge</h1>
          </div>
          <div className="flex items-center gap-4">
            <Timer timeLeft={timeLeft} onTimeUp={handleTimeUp} />
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span>{completed.length} / {challenges.length}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        <div className="space-y-4">
          <ChallengePanel 
            challenge={currentChallenge}
            onSubmit={handleSubmit}
            onNext={handleNext}
            isCorrect={isCorrect}
          />
          <div className="bg-gray-800 rounded-lg overflow-hidden h-[500px]">
            <CodeEditor code={code} onChange={handleCodeChange} />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <Play className="w-5 h-5 text-green-400" />
            <h2 className="text-lg font-semibold">Preview</h2>
          </div>
          <div className="bg-white rounded-lg p-4 h-[500px] overflow-auto">
            <Preview code={code} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;