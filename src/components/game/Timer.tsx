import { useEffect } from 'react';
import { useGameStore } from '@/store/gameStore';

interface TimerProps {
  timeRemaining: number;
  setTimeRemaining: (time: number) => void;
}

export const Timer = ({ timeRemaining, setTimeRemaining }: TimerProps) => {
  const { setGameState, activePowerUps } = useGameStore();

  useEffect(() => {
    let mounted = true;

    if (timeRemaining <= 0 && mounted) {
      setGameState('completed');
      return;
    }

    const interval = setInterval(() => {
      if (!mounted) return;

      // Check for active time-extension power-ups
      const timeExtensions = activePowerUps
        .filter(p => p.type === 'extraTime')
        .reduce((total, p) => total + (p.duration || 0), 0);

      if (timeExtensions > 0) {
        return;
      }

      setTimeRemaining(timeRemaining - 1);
    }, 1000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [timeRemaining, setTimeRemaining, setGameState, activePowerUps]);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  // Determine timer color based on remaining time
  const getTimerColor = () => {
    if (timeRemaining > 180) return 'text-green-400'; // > 3 minutes
    if (timeRemaining > 60) return 'text-yellow-400'; // > 1 minute
    return 'text-red-400'; // <= 1 minute
  };

  // Show active time power-ups
  const activeTimeExtensions = activePowerUps.filter(p => p.type === 'extraTime');

  return (
    <div className="flex flex-col items-center">
      <div className={`text-4xl font-bold ${getTimerColor()}`}>
        {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
      </div>
      
      {activeTimeExtensions.length > 0 && (
        <div className="mt-2 text-sm text-purple-300">
          🕒 Time Extension Active
        </div>
      )}
    </div>
  );
};