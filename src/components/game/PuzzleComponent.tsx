import { useState, useRef, useEffect } from 'react';
import { useGameStore } from '@/store/gameStore';
import { Puzzle } from '@/types';
import { motion } from 'framer-motion';

interface PuzzleComponentProps {
  puzzle: Puzzle;
  onSolved: () => void;
}

export const PuzzleComponent = ({ puzzle, onSolved }: PuzzleComponentProps) => {
  const [answer, setAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { hints, useHint, addScore, reduceScore, incrementWrongAttempts, activePowerUps, addSkippedPuzzle } = useGameStore();

  // Re-focus input when puzzle changes
  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, [puzzle.id]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      setAnswer('');
      setShowHint(false);
      setIsSubmitting(false);
    };
  }, []);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const trimmedAnswer = answer.trim().toLowerCase();
      const correctAnswer = puzzle.answer.toLowerCase();

      if (trimmedAnswer === correctAnswer) {
        // Calculate points based on difficulty and power-ups
        const basePoints = puzzle.points;
        const difficultyMultiplier = 
          puzzle.difficulty === 'hard' ? 2 :
          puzzle.difficulty === 'medium' ? 1.5 : 1;

        addScore(Math.round(basePoints * difficultyMultiplier));

        // Play success sound
        const audio = new Audio('/sounds/success.mp3');
        await audio.play().catch(console.error);
        
        // Clear the answer and hint state
        setAnswer('');
        setShowHint(false);
        
        onSolved();
      } else {
        // Reduce score on wrong answer based on difficulty
        const penalty = 
          puzzle.difficulty === 'hard' ? 100 :
          puzzle.difficulty === 'medium' ? 50 : 25;
        
        reduceScore(penalty);
        incrementWrongAttempts();

        // Play wrong answer sound
        const audio = new Audio('/sounds/wrong.mp3');
        await audio.play().catch(console.error);
        
        // Clear the input but keep the hint visible
        setAnswer('');
        inputRef.current?.focus();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleHint = async () => {
    if (hints > 0) {
      useHint();
      setShowHint(true);
      
      // Play hint sound
      const audio = new Audio('/sounds/hint.mp3');
      await audio.play().catch(console.error);
      
      // Focus back on input after revealing hint
      inputRef.current?.focus();
    }
  };

  const handleSkip = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      const audio = new Audio('/sounds/powerup.mp3');
      await audio.play().catch(console.error);
      
      // Mark puzzle as skipped and award 0 points
      addSkippedPuzzle(puzzle.id);
      addScore(0);
      onSolved();
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check if skip puzzle power-up is active
  const canSkipPuzzle = activePowerUps.some(p => p.type === 'skipPuzzle');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full py-6"
      role="main"
      aria-label={`Puzzle: ${puzzle.type}`}
    >
      <div className="bg-black/50 backdrop-blur p-6 rounded-lg max-w-2xl w-full mx-auto">
        <div className="mb-4">
          <span 
            className={
              puzzle.difficulty === 'easy' 
                ? 'px-2 py-1 rounded text-xs font-medium bg-green-500/20 text-green-300'
                : puzzle.difficulty === 'medium'
                  ? 'px-2 py-1 rounded text-xs font-medium bg-yellow-500/20 text-yellow-300'
                  : 'px-2 py-1 rounded text-xs font-medium bg-red-500/20 text-red-300'
            }
            role="status"
            aria-label={`Difficulty: ${puzzle.difficulty}`}
          >
            {puzzle.difficulty.toUpperCase()}
          </span>
        </div>

        <h2 className="text-2xl font-bold mb-4" id="puzzle-question">{puzzle.question}</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="answer" className="sr-only">Your answer</label>
            <input
              ref={inputRef}
              id="answer"
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              className="w-full p-3 rounded bg-black/30 border border-gray-700 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              placeholder="Enter your answer..."
              aria-labelledby="puzzle-question"
              disabled={isSubmitting}
              autoComplete="off"
            />
          </div>
          
          <div className="flex items-center gap-4 flex-wrap">
            <button
              type="submit"
              disabled={isSubmitting || !answer.trim()}
              className="px-6 py-3 rounded bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 transition-colors focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black active:bg-purple-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Checking...' : 'Submit Answer'}
            </button>
            
            {hints > 0 && !showHint && (
              <button
                type="button"
                onClick={handleHint}
                disabled={isSubmitting}
                className="px-4 py-2 rounded bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black active:bg-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label={`Use hint (${hints} remaining)`}
              >
                Use Hint ({hints} left)
              </button>
            )}

            {canSkipPuzzle && (
              <button
                type="button"
                onClick={handleSkip}
                disabled={isSubmitting}
                className="px-4 py-2 rounded bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30 transition-colors focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-black active:bg-yellow-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Skip this puzzle (0 points)"
              >
                Skip Puzzle (0 points)
              </button>
            )}
          </div>
        </form>

        {showHint && (
          <div 
            className="mt-4 p-4 rounded bg-blue-500/10 border border-blue-500/20"
            role="alert"
          >
            <p className="text-blue-300">💡 Hint: {puzzle.hints[0]}</p>
          </div>
        )}

        <div 
          className="mt-6 text-sm text-gray-400"
          role="status"
        >
          Potential points: {puzzle.points} 
          {puzzle.timeBonus ? ` (+ up to ${puzzle.timeBonus} time bonus)` : ''}
        </div>
      </div>
    </motion.div>
  );
};