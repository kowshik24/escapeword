import { useEffect, useCallback } from 'react';
import { useGameStore } from '@/store/gameStore';

export const useKeyboardShortcuts = () => {
  const { 
    gameState, 
    currentRoom, 
    hints,
    activePowerUps, 
    setGameState 
  } = useGameStore();

  // Call useHint at the hook level
  const hint = useGameStore(state => state.useHint);

  const handleHintShortcut = useCallback(() => {
    if (hints > 0) {
      hint();
    }
  }, [hints, hint]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Only handle shortcuts when in game
      if (gameState !== 'playing') return;

      // Ctrl/Cmd + H: Use hint if available
      if ((event.ctrlKey || event.metaKey) && event.key === 'h') {
        event.preventDefault();
        handleHintShortcut();
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
  }, [gameState, currentRoom, handleHintShortcut, activePowerUps, setGameState]);
};