import { useGameStore } from '@/store/gameStore';
import { AnimatePresence } from 'framer-motion';
import { GameRoom } from './GameRoom';
import { CompletedScreen } from '../game/CompletedScreen';
import { useSound } from '@/hooks/useSound';
import { useEffect } from 'react';

export const GameContainer = () => {
  const { gameState, currentRoom } = useGameStore();
  const ambientSound = useSound(currentRoom?.ambient || '');

  useEffect(() => {
    if (gameState === 'playing' && currentRoom?.ambient) {
      ambientSound.play({ loop: true });
    } else {
      ambientSound.stop();
    }
    return () => ambientSound.stop();
  }, [gameState, currentRoom, ambientSound]);

  return (
    <AnimatePresence mode="wait">
      {gameState === 'playing' && <GameRoom />}
      {gameState === 'completed' && <CompletedScreen />}
    </AnimatePresence>
  );
};