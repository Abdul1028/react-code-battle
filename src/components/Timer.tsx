import React from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
  timeLeft: number;
  onTimeUp: () => void;
}

export function Timer({ timeLeft }: TimerProps) {
  const percentage = (timeLeft / 40) * 100;
  
  return (
    <div className="flex items-center gap-2">
      <Clock className="w-5 h-5 text-blue-400" />
      <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-1000 rounded-full ${
            timeLeft <= 10 ? 'bg-red-500' : 'bg-blue-500'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className={`text-sm font-medium ${
        timeLeft <= 10 ? 'text-red-500' : 'text-blue-400'
      }`}>
        {timeLeft}s
      </span>
    </div>
  );
}