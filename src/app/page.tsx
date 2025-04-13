'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { rooms } from '@/data/rooms';
import { GameContainer } from '@/components/game/GameContainer';

export default function Home() {
  const { setCurrentRoom, setGameState, gameState, score, completedRooms } = useGameStore();

  const handleRoomSelect = (roomId: string) => {
    const room = rooms.find((r) => r.id === roomId);
    if (room) {
      setCurrentRoom(room);
      setGameState('playing');
    }
  };

  const calculateRank = (score: number) => {
    if (score >= 1000) return { title: 'Master Escapist', color: 'text-yellow-400' };
    if (score >= 750) return { title: 'Expert', color: 'text-purple-400' };
    if (score >= 500) return { title: 'Advanced', color: 'text-blue-400' };
    if (score >= 250) return { title: 'Intermediate', color: 'text-green-400' };
    return { title: 'Novice', color: 'text-gray-400' };
  };

  const rank = calculateRank(score);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-black text-white">
      <AnimatePresence mode="wait">
        {gameState === 'menu' ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="container mx-auto px-4 py-16"
          >
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                EscapeWord
              </h1>
              <p className="text-lg text-gray-300">Unlock the mysteries, one word at a time</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto mb-12"
            >
              {/* Profile Card */}
              <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-purple-300 mb-2">Player Dashboard</h2>
                    <div className="flex items-center gap-2">
                      <span className={`text-lg ${rank.color}`}>{rank.title}</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-yellow-500">{score} points</span>
                    </div>
                  </div>
                  <div className="px-4 py-2 rounded-full bg-purple-900/40 border border-purple-500/30">
                    <span className="text-sm font-medium text-purple-300">Level {Math.floor(score / 100) + 1}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-purple-900/40 border border-purple-500/30">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg font-semibold text-purple-200">Rooms Completed</span>
                      {completedRooms.length === rooms.length && (
                        <span className="px-2 py-1 text-xs font-bold text-yellow-900 bg-yellow-400 rounded-full">ALL CLEAR!</span>
                      )}
                    </div>
                    <p className="text-3xl font-bold text-purple-300">{completedRooms.length}/{rooms.length}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-purple-900/40 border border-purple-500/30">
                    <h3 className="text-lg font-semibold text-purple-200 mb-2">Success Rate</h3>
                    <div className="relative h-8 bg-purple-900/40 rounded-full overflow-hidden">
                      <div 
                        className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                        style={{ 
                          width: `${completedRooms.length > 0 
                            ? Math.round((completedRooms.length / rooms.length) * 100)
                            : 0}%` 
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white font-bold">
                          {completedRooms.length > 0 
                            ? Math.round((completedRooms.length / rooms.length) * 100)
                            : 0}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Achievement Badges */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <h3 className="text-lg font-semibold text-purple-200 mb-4">Achievements</h3>
                  <div className="flex gap-4">
                    <div className={`p-3 rounded-lg ${score >= 500 ? 'bg-yellow-400/20 border-yellow-400/50' : 'bg-gray-800/50 border-gray-700'} border`}>
                      <span className={`text-2xl ${score >= 500 ? 'text-yellow-400' : 'text-gray-600'}`}>🏆</span>
                    </div>
                    <div className={`p-3 rounded-lg ${completedRooms.length >= 3 ? 'bg-purple-400/20 border-purple-400/50' : 'bg-gray-800/50 border-gray-700'} border`}>
                      <span className={`text-2xl ${completedRooms.length >= 3 ? 'text-purple-400' : 'text-gray-600'}`}>🌟</span>
                    </div>
                    <div className={`p-3 rounded-lg ${score >= 1000 ? 'bg-blue-400/20 border-blue-400/50' : 'bg-gray-800/50 border-gray-700'} border`}>
                      <span className={`text-2xl ${score >= 1000 ? 'text-blue-400' : 'text-gray-600'}`}>👑</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Room Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rooms.map((room) => (
                <motion.div
                  key={room.id}
                  whileHover={{ scale: 1.03 }}
                  className={`group relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-sm border transition-all duration-300
                    ${completedRooms.includes(room.id) 
                      ? 'border-green-500/50 shadow-lg shadow-green-500/20' 
                      : 'border-white/10 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20'}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 z-10"/>
                  <div className="relative z-20 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-2xl font-bold group-hover:text-purple-300 transition-colors">
                        {room.name}
                      </h2>
                      {completedRooms.includes(room.id) && (
                        <span className="flex items-center gap-1 px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full">
                          <span className="text-green-400">✓</span>
                          <span className="text-sm font-medium text-green-400">Completed</span>
                        </span>
                      )}
                    </div>
                    <p className="text-gray-300 mb-4">{room.description}</p>
                    <button
                      onClick={() => handleRoomSelect(room.id)}
                      className={`w-full px-4 py-2 rounded-lg font-medium transition-all duration-300
                        ${completedRooms.includes(room.id)
                          ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                          : 'bg-purple-500/20 text-purple-300 hover:bg-purple-500/30'}`}
                    >
                      {completedRooms.includes(room.id) ? 'Play Again' : 'Start Challenge'}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <GameContainer />
        )}
      </AnimatePresence>
    </div>
  );
}