import { useGameStore } from '@/store/gameStore';
import { motion } from 'framer-motion';

export const CompletedScreen = () => {
  const { score, setGameState, currentRoom } = useGameStore();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 flex items-center justify-center"
    >
      <div className="text-center px-6 py-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            type: "spring",
            duration: 0.7,
            bounce: 0.5 
          }}
        >
          {/* Victory Icon */}
          <div className="mb-6">
            <motion.div 
              className="inline-block text-6xl"
              animate={{ 
                rotate: [0, -10, 10, -10, 10, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 1.5, delay: 0.3 }}
            >
              🏆
            </motion.div>
          </div>

          <h2 className="text-4xl font-bold mb-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-600">
              {currentRoom?.name} Completed!
            </span>
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            <div className="flex items-center justify-center gap-3 text-2xl">
              <span className="text-gray-400">Score:</span>
              <motion.span 
                className="font-bold text-yellow-400"
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                +{score}
              </motion.span>
              <span className="text-yellow-500">points</span>
            </div>
          </motion.div>

          <motion.button
            onClick={() => setGameState('menu')}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium
              hover:from-purple-500 hover:to-pink-500 transform transition-all duration-200 hover:scale-105
              shadow-lg shadow-purple-500/20"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Return to Menu
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};