export type GameState = 'menu' | 'playing' | 'paused' | 'completed';

export type ThemeType = 'egypt' | 'space' | 'haunted';

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export type PowerUpType = 'extraTime' | 'doublePoints' | 'extraHint' | 'skipPuzzle';

export interface PowerUp {
  type: PowerUpType;
  duration?: number; // in seconds, for time-based power-ups
  multiplier?: number; // for point multipliers
  description: string;
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  content: string;
  createdAt: number;
  likes: string[];
}

export interface Post {
  id: string;
  roomId: string;
  userId: string;
  username: string;
  title: string;
  content: string;
  createdAt: number;
  likes: string[];
  comments: Comment[];
}

export type PuzzleType = 
  | 'unscramble'
  | 'riddle'
  | 'word-search'
  | 'fill-blanks'
  | 'code'
  | 'math-word'
  | 'anagram'
  | 'memory'
  | 'pattern'
  | 'crypto';

export interface Room {
  id: string;
  name: string;
  theme: ThemeType;
  description: string;
  difficulty: DifficultyLevel;
  puzzles: Puzzle[];
  timeLimit: number;
  background: string;
  ambient: string;
  availablePowerUps: PowerUp[];
  baseScore: number; // Base score multiplier for the room
  achievements: Achievement[];
  discussions?: Post[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  condition: string;
  reward: number;
}

export interface Puzzle {
  id: string;
  type: PuzzleType;
  question: string;
  answer: string;
  hints: string[];
  points: number;
  timeBonus?: number; // Extra points for solving quickly
  difficulty: DifficultyLevel;
}