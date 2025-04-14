import { useEffect } from 'react';
import { useGameStore } from '@/store/gameStore';

export const useKeyboardShortcuts = () => {
  const { 
    gameState, 
    currentRoom, 
    hints, 
    useHint, 
    activePowerUps, 
    setGameState 
  } = useGameStore();

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Only handle shortcuts when in game
      if (gameState !== 'playing') return;

      // Ctrl/Cmd + H: Use hint if available
      if ((event.ctrlKey || event.metaKey) && event.key === 'h') {
        event.preventDefault();
        if (hints > 0) {
          useHint();
        }
      }

      // Ctrl/Cmd + Esc: Return to menu
      if ((event.ctrlKey || event.metaKey) && event.key === 'Escape') {
        event.preventDefault();
        setGameState('menu');
      }

      // Ctrl/Cmd + S: Skip puzzle if power-up is active
      if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        event.preventDefault();
        const canSkip = activePowerUps.some(p => p.type === 'skipPuzzle');
        if (canSkip) {
          // Handle skip - you'll need to implement this
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState, currentRoom, hints, useHint, activePowerUps, setGameState]);
};