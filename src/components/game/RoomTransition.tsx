import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Room } from '@/types';

interface RoomTransitionProps {
  currentRoom: Room;
  onTransitionComplete: () => void;
}

export const RoomTransition = ({ currentRoom, onTransitionComplete }: RoomTransitionProps) => {
  const [showTransition, setShowTransition] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTransition(false);
      onTransitionComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onTransitionComplete]);

  return showTransition ? (
    <motion.div
      initial={{ perspective: 1000 }}
      className="fixed inset-0 z-50"
    >
      <motion.div
        initial={{ rotateY: 0, opacity: 0 }}
        animate={{
          rotateY: [0, 90, 180],
          opacity: [0, 1, 0],
          transition: { duration: 2, times: [0, 0.5, 1] }
        }}
        className="w-full h-full relative"
      >
        {/* Room portal effect */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${currentRoom.background})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-pink-900/80" />
        </div>

        {/* Room name with glowing effect */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.h2
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: [0.8, 1.2, 0.8],
              opacity: [0, 1, 0],
            }}
            transition={{ duration: 2, times: [0, 0.5, 1] }}
            className="text-6xl font-bold text-white text-center px-6"
          >
            <span className="inline-block animate-pulse">
              {currentRoom.name}
            </span>
          </motion.h2>
        </div>

        {/* Particle effect */}
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: 0
              }}
              animate={{
                y: [null, -200],
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: Math.random() * 2 + 1,
                repeat: Infinity,
                repeatType: "loop"
              }}
              className="absolute w-1 h-1 bg-white rounded-full"
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  ) : null;
};