import { useGameStore } from '@/store/gameStore';
import { AnimatePresence } from 'framer-motion';
import { GameRoom } from './GameRoom';
import { CompletedScreen } from '../game/CompletedScreen';
import { useSound } from '@/hooks/useSound';
import { useEffect, useState } from 'react';

export const GameContainer = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const { gameState, currentRoom } = useGameStore();
  const ambientSound = useSound(currentRoom?.ambient || '');

  // Handle hydration
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (gameState === 'playing' && currentRoom?.ambient) {
      ambientSound.play({ loop: true });
    } else {
      ambientSound.stop();
    }
    return () => ambientSound.stop();
  }, [gameState, currentRoom, ambientSound]);

  if (!isHydrated) {
    return null; // or a loading state
  }

  return (
    <AnimatePresence mode="wait">
      {gameState === 'playing' && <GameRoom />}
      {gameState === 'completed' && <CompletedScreen />}
    </AnimatePresence>
  );
};