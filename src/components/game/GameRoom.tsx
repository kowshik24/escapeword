import { useState, useEffect } from 'react';
import { useGameStore } from '@/store/gameStore';
import { PuzzleComponent } from './PuzzleComponent';
import { Timer } from './Timer';
import { PowerUpComponent } from './PowerUpComponent';
import { AchievementComponent } from './AchievementComponent';
import { RoomTransition } from './RoomTransition';
import { AnimatePresence } from 'framer-motion';
import { DiscussionPanel } from './DiscussionPanel';

export const GameRoom = () => {
  const { currentRoom, completeRoom, setGameState, addTimeBonus } = useGameStore();
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(currentRoom?.timeLimit || 0);
  const [showTransition, setShowTransition] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (currentRoom) {
      setTimeRemaining(currentRoom.timeLimit);
    }
    return () => {
      setTimeRemaining(0);
      setCurrentPuzzleIndex(0);
      setShowTransition(false);
      setIsTransitioning(false);
    };
  }, [currentRoom]);

  const handlePuzzleSolved = () => {
    if (!currentRoom || isTransitioning) return;

    setIsTransitioning(true);
    
    try {
      const timeBonus = currentRoom.puzzles[currentPuzzleIndex].timeBonus || 0;
      const difficultyMultiplier = 
        currentRoom.difficulty === 'hard' ? 2 :
        currentRoom.difficulty === 'medium' ? 1.5 : 1;
      
      addTimeBonus(Math.round(timeBonus * difficultyMultiplier));

      if (currentPuzzleIndex < currentRoom.puzzles.length - 1) {
        setCurrentPuzzleIndex(prev => prev + 1);
      } else {
        completeRoom(currentRoom.id);
        setGameState('completed');
      }
    } finally {
      setIsTransitioning(false);
    }
  };

  if (!currentRoom) return null;

  return (
    <div className="relative min-h-screen">
      <AnimatePresence>
        {showTransition && (
          <RoomTransition
            currentRoom={currentRoom}
            onTransitionComplete={() => setShowTransition(false)}
          />
        )}
      </AnimatePresence>

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
      <div className="relative z-10">
        <div className="min-h-screen overflow-y-auto pb-20">
          <div className="container mx-auto px-4">
            {/* Timer fixed at top */}
            <div className="sticky top-0 z-20 pt-6 mb-6 bg-gradient-to-b from-black/80 to-transparent">
              <Timer timeRemaining={timeRemaining} setTimeRemaining={setTimeRemaining} />
            </div>

            {/* Difficulty badge */}
            <div className="absolute top-4 left-4 z-20">
              <span className={`
                px-3 py-1 rounded-full text-sm font-medium
                ${currentRoom.difficulty === 'easy' 
                  ? 'bg-green-500/20 text-green-300'
                  : currentRoom.difficulty === 'medium'
                    ? 'bg-yellow-500/20 text-yellow-300'
                    : 'bg-red-500/20 text-red-300'
                }
              `}>
                {currentRoom.difficulty.charAt(0).toUpperCase() + currentRoom.difficulty.slice(1)}
              </span>
            </div>

            <div className="max-w-4xl mx-auto space-y-8 pt-8">
              {/* Power-ups */}
              <PowerUpComponent />

              {/* Achievements */}
              <AchievementComponent />

              {/* Puzzle content */}
              <AnimatePresence mode="wait">
                <PuzzleComponent
                  key={currentPuzzleIndex}
                  puzzle={currentRoom.puzzles[currentPuzzleIndex]}
                  onSolved={handlePuzzleSolved}
                />
              </AnimatePresence>

              {/* Discussion Panel */}
              <div className="mt-12">
                <DiscussionPanel room={currentRoom} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};