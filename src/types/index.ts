export type GameState = 'menu' | 'playing' | 'paused' | 'completed';

export type ThemeType = 'egypt' | 'space' | 'haunted';

export type PuzzleType = 
  | 'unscramble'
  | 'riddle'
  | 'word-search'
  | 'fill-blanks'
  | 'code'
  | 'math-word'
  | 'anagram';

export interface Room {
  id: string;
  name: string;
  theme: ThemeType;
  description: string;
  puzzles: Puzzle[];
  timeLimit: number;
  background: string;
  ambient: string;
}

export interface Puzzle {
  id: string;
  type: PuzzleType;
  question: string;
  answer: string;
  hints: string[];
  points: number;
}