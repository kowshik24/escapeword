'use client';

import { useEffect, useState } from 'react';
import { useGameStore } from '@/store/gameStore';
import { PowerUp } from '@/types';

export const PowerUpComponent = () => {
  const [isClient, setIsClient] = useState(false);
  const { currentRoom, activePowerUps, activatePowerUp, deactivatePowerUp } = useGameStore();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    // Clean up expired power-ups
    const interval = setInterval(() => {
      activePowerUps.forEach(powerUp => {
        if (powerUp.duration) {
          deactivatePowerUp(powerUp.type);
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [activePowerUps, deactivatePowerUp, isClient]);

  const handlePowerUpClick = async (powerUp: PowerUp) => {
    if (!isClient) return;
    
    activatePowerUp(powerUp);
    
    // Play sound effect
    const audio = new Audio('/sounds/powerup.mp3');
    await audio.play().catch(console.error);
  };

  if (!isClient || !currentRoom?.availablePowerUps) return null;

  return (
    <div className="fixed bottom-4 left-4 z-30">
      <div className="flex gap-2">
        {currentRoom.availablePowerUps.map((powerUp, index) => {
          const isActive = activePowerUps.some(p => p.type === powerUp.type);
          
          return (
            <button
              key={`${powerUp.type}-${index}`}
              onClick={() => handlePowerUpClick(powerUp)}
              disabled={isActive}
              className={`
                p-3 rounded-lg text-sm font-medium transition-all duration-300
                ${isActive 
                  ? 'bg-purple-500/50 text-purple-200 cursor-not-allowed'
                  : 'bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 hover:text-purple-200'
                }
              `}
              title={powerUp.description}
            >
              {powerUp.type === 'extraTime' && '⏰'}
              {powerUp.type === 'doublePoints' && '2️⃣'}
              {powerUp.type === 'extraHint' && '💡'}
              {powerUp.type === 'skipPuzzle' && '⏭️'}
              <span className="ml-2">{powerUp.description}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};