import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { Puzzle } from '@/types';
import Timer from '../game/Timer';
import PuzzleComponent from '../game/PuzzleComponent';

export const GameRoom = () => {
  const { currentRoom, addScore, completeRoom, setGameState } = useGameStore();
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(currentRoom?.timeLimit || 0);

  useEffect(() => {
    if (timeRemaining <= 0) {
      setGameState('completed');
    }
  }, [timeRemaining, setGameState]);

  const handlePuzzleSolved = (puzzle: Puzzle) => {
    addScore(puzzle.points);
    if (currentPuzzleIndex === currentRoom!.puzzles.length - 1) {
      completeRoom(currentRoom!.id);
      setGameState('completed');
    } else {
      setCurrentPuzzleIndex(currentPuzzleIndex + 1);
    }
  };

  if (!currentRoom) return null;

  return (
    <div className="relative min-h-screen">
      {/* Background image with overlay */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${currentRoom.background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Game content */}
      <div className="relative z-10 min-h-screen">
        {/* Timer fixed at top */}
        <div className="fixed top-0 left-0 right-0 z-20 pt-6">
          <Timer timeRemaining={timeRemaining} setTimeRemaining={setTimeRemaining} />
        </div>

        {/* Puzzle content */}
        <AnimatePresence mode="wait">
          <PuzzleComponent
            key={currentPuzzleIndex}
            puzzle={currentRoom.puzzles[currentPuzzleIndex]}
            onSolved={handlePuzzleSolved}
          />
        </AnimatePresence>
      </div>
    </div>
  );
};