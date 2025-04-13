import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { Puzzle } from '@/types';
import { useSound } from '@/hooks/useSound';

interface PuzzleComponentProps {
  puzzle: Puzzle;
  onSolved: (puzzle: Puzzle) => void;
}

const PuzzleComponent = ({ puzzle, onSolved }: PuzzleComponentProps) => {
  const [answer, setAnswer] = useState('');
  const [currentHintIndex, setCurrentHintIndex] = useState(-1);
  const [isWrong, setIsWrong] = useState(false);
  const { useHint: spendHint, hints, currentRoom, reduceScore } = useGameStore();
  
  const successSound = useSound('/sounds/success.mp3');
  const wrongSound = useSound('/sounds/wrong.mp3');
  const hintSound = useSound('/sounds/hint.mp3');

  const getPuzzleInput = () => {
    switch (puzzle.type) {
      case 'unscramble':
        return (
          <div className="space-y-4">
            <div className="bg-black/80 p-6 rounded-lg">
              <p className="text-xl text-white mb-2">Unscramble these letters:</p>
              <div className="text-4xl font-mono tracking-widest text-yellow-400 text-center">
                {puzzle.question.replace(/\(.*?\)/, '')}
              </div>
            </div>
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full p-4 text-xl border-2 border-opacity-50 rounded-lg bg-white text-slate-900 font-semibold shadow-lg placeholder:text-slate-500"
              placeholder="Enter unscrambled word..."
              autoFocus
            />
          </div>
        );
      
      case 'riddle':
        return (
          <div className="space-y-4">
            <div className="bg-black/80 p-6 rounded-lg">
              <p className="text-xl text-white mb-2">Solve the riddle:</p>
              <div className="text-2xl text-yellow-400">
                {puzzle.question}
              </div>
            </div>
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full p-4 text-xl border-2 border-opacity-50 rounded-lg bg-white text-slate-900 font-semibold shadow-lg placeholder:text-slate-500"
              placeholder="Enter your answer..."
              autoFocus
            />
          </div>
        );
      
      default:
        return (
          <div className="space-y-4">
            <div className="bg-black/80 p-6 rounded-lg">
              <p className="text-xl text-white mb-2">Current Puzzle:</p>
              <div className="text-2xl text-yellow-400">
                {puzzle.question}
              </div>
            </div>
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full p-4 text-xl border-2 border-opacity-50 rounded-lg bg-white text-slate-900 font-semibold shadow-lg placeholder:text-slate-500"
              placeholder="Enter your answer..."
              autoFocus
            />
          </div>
        );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.toLowerCase().trim() === puzzle.answer.toLowerCase()) {
      successSound.play({ volume: 0.8 }); // Adjust volume to 50%
      onSolved(puzzle);
    } else {
      wrongSound.play({ volume: 0.8 }); // Adjust volume to 50%
      setIsWrong(true);
      setTimeout(() => setIsWrong(false), 1000);
    }
  };

  const handleHint = () => {
    if (currentHintIndex < puzzle.hints.length - 1 && hints > 0) {
      hintSound.play();
      spendHint();
      reduceScore(50); // Deduct 50 points for using a hint
      setCurrentHintIndex(prev => prev + 1);
    }
  };

  useEffect(() => {
    setAnswer('');
    setCurrentHintIndex(-1);
    setIsWrong(false);
  }, [puzzle.id]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed inset-0 flex items-center justify-center px-4"
    >
      <div 
        className={`w-full max-w-2xl rounded-xl p-8 shadow-2xl backdrop-blur-md ${
          currentRoom?.theme === 'egypt'
            ? 'bg-amber-900/90 text-amber-100'
            : currentRoom?.theme === 'space'
            ? 'bg-slate-900/90 text-blue-100'
            : 'bg-gray-900/90 text-purple-100'
        } ${isWrong ? 'animate-shake' : ''}`}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {getPuzzleInput()}
          
          {/* Hints Display */}
          <div className="space-y-3 mt-6">
            {currentHintIndex >= 0 && puzzle.hints.slice(0, currentHintIndex + 1).map((hint, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`p-4 rounded-lg ${
                  currentRoom?.theme === 'egypt'
                    ? 'bg-yellow-900/60 text-yellow-100'
                    : currentRoom?.theme === 'space'
                    ? 'bg-blue-900/60 text-blue-100'
                    : 'bg-purple-900/60 text-purple-100'
                }`}
              >
                <p className="text-lg">💡 Hint {index + 1}: {hint}</p>
              </motion.div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between gap-4 mt-8">
            <button
              type="submit"
              className={`flex-1 px-8 py-3 rounded-lg font-bold text-lg transition-all transform hover:scale-105 ${
                currentRoom?.theme === 'egypt'
                  ? 'bg-yellow-500 hover:bg-yellow-600 text-black'
                  : currentRoom?.theme === 'space'
                  ? 'bg-blue-500 hover:bg-blue-600 text-white'
                  : 'bg-purple-500 hover:bg-purple-600 text-white'
              }`}
            >
              Submit Answer
            </button>
            {hints > 0 && currentHintIndex < puzzle.hints.length - 1 && (
              <button
                type="button"
                onClick={handleHint}
                className={`px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105 flex items-center gap-2 ${
                  currentRoom?.theme === 'egypt'
                    ? 'bg-amber-700 hover:bg-amber-800 text-amber-100'
                    : currentRoom?.theme === 'space'
                    ? 'bg-blue-700 hover:bg-blue-800 text-blue-100'
                    : 'bg-purple-700 hover:bg-purple-800 text-purple-100'
                }`}
              >
                <span>Hint ({hints} left)</span>
                <span className="text-sm opacity-75">(-50 points)</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default PuzzleComponent;