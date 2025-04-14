import { useState } from 'react';
import { motion } from 'framer-motion';
import { Room } from '@/types';

interface LeaderboardEntry {
  playerName: string;
  score: number;
  timeRemaining: number;
  room: string;
  date: string;
}

// Mock data - in a real app, this would come from a backend
const mockLeaderboard: LeaderboardEntry[] = [
  { playerName: 'SphinxMaster', score: 2500, timeRemaining: 180, room: 'Ancient Egypt', date: '2025-04-14' },
  { playerName: 'StarNavigator', score: 2200, timeRemaining: 160, room: 'Space Station', date: '2025-04-13' },
  { playerName: 'GhostHunter', score: 2100, timeRemaining: 200, room: 'Haunted Mansion', date: '2025-04-12' },
];

export const Leaderboard = ({ currentRoom }: { currentRoom?: Room }) => {
  const [timeFrame, setTimeFrame] = useState<'all' | 'daily' | 'weekly'>('all');
  const [filter, setFilter] = useState<'global' | 'room'>(currentRoom ? 'room' : 'global');

  const filteredLeaderboard = mockLeaderboard
    .filter(entry => filter === 'global' || entry.room === currentRoom?.name)
    .sort((a, b) => b.score - a.score);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900/90 rounded-lg p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-purple-300">Leaderboard</h3>
        <div className="flex gap-2">
          <select
            value={timeFrame}
            onChange={(e) => setTimeFrame(e.target.value as any)}
            className="px-3 py-1 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30"
          >
            <option value="all">All Time</option>
            <option value="daily">Today</option>
            <option value="weekly">This Week</option>
          </select>
          {currentRoom && (
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="px-3 py-1 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30"
            >
              <option value="global">Global</option>
              <option value="room">This Room</option>
            </select>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {filteredLeaderboard.map((entry, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-4 p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800/70 transition-colors"
          >
            <div className={`w-8 h-8 flex items-center justify-center rounded-full ${
              index === 0 ? 'bg-yellow-500/20 text-yellow-400' :
              index === 1 ? 'bg-gray-400/20 text-gray-300' :
              index === 2 ? 'bg-orange-500/20 text-orange-400' :
              'bg-purple-500/20 text-purple-300'
            }`}>
              {index + 1}
            </div>
            <div className="flex-1">
              <div className="font-medium text-white">{entry.playerName}</div>
              <div className="text-sm text-gray-400">{entry.room}</div>
            </div>
            <div className="text-right">
              <div className="font-bold text-purple-300">{entry.score}</div>
              <div className="text-sm text-gray-400">{entry.timeRemaining}s left</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};