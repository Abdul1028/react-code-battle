export interface Challenge {
  id: number;
  title: string;
  description: string;
  initialCode: string;
  solution: string;
  type: 'ui' | 'state' | 'list';
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface ChallengeState {
  currentChallenge: Challenge;
  timeLeft: number;
  isCorrect: boolean | null;
  code: string;
  completed: number[];
}