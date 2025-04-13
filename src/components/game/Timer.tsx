import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';

interface TimerProps {
  timeRemaining: number;
  setTimeRemaining: React.Dispatch<React.SetStateAction<number>>;
}

const Timer = ({ timeRemaining, setTimeRemaining }: TimerProps) => {
  const { currentRoom } = useGameStore();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [setTimeRemaining]);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  const getTimerColor = () => {
    if (timeRemaining > 180) return 'text-emerald-400';
    if (timeRemaining > 60) return 'text-yellow-400';
    return 'text-red-400 animate-pulse';
  };

  const getThemeGlow = () => {
    if (currentRoom?.theme === 'egypt') return 'shadow-amber-400/50';
    if (currentRoom?.theme === 'space') return 'shadow-blue-400/50';
    return 'shadow-purple-400/50';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center"
    >
      <div 
        className={`inline-block px-8 py-3 rounded-full backdrop-blur-md 
          bg-black/40 shadow-lg ${getThemeGlow()}`}
      >
        <span className={`text-5xl font-bold font-mono ${getTimerColor()}`}>
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </span>
      </div>
    </motion.div>
  );
};

export default Timer;