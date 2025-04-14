import { useGameStore } from '@/store/gameStore';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useSound } from '@/hooks/useSound';
import { useEffect, useState } from 'react';
import { ShareIcon } from '@heroicons/react/24/outline';
import { Leaderboard } from './Leaderboard';

export const CompletedScreen = () => {
  const { currentRoom, score, timeRemaining, achievements, totalTimeBonus, wrongAttempts, powerUpsUsed, setGameState, resetGame, skippedPuzzles } = useGameStore();
  const achievementSound = useSound('/sounds/achievement.mp3');
  const [shareStatus, setShareStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [shareMethod, setShareMethod] = useState<'native' | 'clipboard' | null>(null);

  useEffect(() => {
    // Play achievement sound
    achievementSound.play();
    
    // Launch confetti
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Reset share status after showing feedback
    if (shareStatus === 'success' || shareStatus === 'error') {
      const timer = setTimeout(() => {
        setShareStatus('idle');
        setShareMethod(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [shareStatus]);

  if (!currentRoom) return null;

  const handleReturnToMenu = () => {
    resetGame();
    setGameState('menu');
  };

  const handleShare = async () => {
    try {
      // Get unique achievements by filtering duplicates using Set
      const roomAchievements = [...new Set(achievements.filter(a => a.id.startsWith(currentRoom?.id || '')))];
      const achievementsText = roomAchievements.length > 0 
        ? `\n\n🏆 Achievements:\n${roomAchievements.map(a => `• ${a.name}`).join('\n')}`
        : '';
      
      const completionStatus = skippedPuzzles.length > 0 
        ? '(Partially completed - some puzzles were skipped)'
        : '(Fully completed!)';

      const text = `I played ${currentRoom?.name} in EscapeWord! ${completionStatus}\n\n📊 Score: ${score} points\n⏱️ Time remaining: ${timeRemaining} seconds${achievementsText}\n\nCan you beat my score? 🎮✨`;
      const encodedText = encodeURIComponent(text);
      
      // Try Web Share API first
      if (typeof window !== 'undefined' && 'share' in navigator) {
        try {
          await navigator.share({
            title: 'EscapeWord Challenge',
            text,
            url: window.location.href
          });
          setShareMethod('native');
          setShareStatus('success');
          return;
        } catch (error: unknown) {
          if (error instanceof Error && error.name !== 'AbortError') {
            console.warn('Native sharing failed, falling back to clipboard:', error);
          } else {
            return;
          }
        }
      }
      
      // Fallback to clipboard
      if (typeof window !== 'undefined') {
        try {
          // Try modern clipboard API first
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(text);
            setShareMethod('clipboard');
            setShareStatus('success');
            return;
          }
          
          // Legacy fallback using execCommand
          const textArea = document.createElement('textarea');
          textArea.value = text;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          textArea.style.top = '-999999px';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          
          try {
            const successful = document.execCommand('copy');
            if (successful) {
              setShareMethod('clipboard');
              setShareStatus('success');
            } else {
              throw new Error('Failed to copy text');
            }
          } catch (err) {
            throw new Error('Clipboard copy failed');
          } finally {
            document.body.removeChild(textArea);
          }
        } catch (err) {
          console.error('Clipboard error:', err);
          throw new Error('Failed to copy to clipboard');
        }
      } else {
        throw new Error('Sharing is not available');
      }
    } catch (err) {
      console.error('Error sharing:', err);
      setShareStatus('error');
    }
  };

  const handleSocialMediaShare = (platform: 'twitter' | 'facebook' | 'linkedin') => {
    const text = `I played ${currentRoom?.name} in EscapeWord! Score: ${score} points`;
    const encodedText = encodeURIComponent(text);
    const encodedUrl = encodeURIComponent(window.location.href);
    
    let url = '';
    switch (platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
    }
    
    window.open(url, '_blank', 'width=600,height=400');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6 overflow-y-auto"
    >
      <div className="container max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Score Panel */}
        <div className="bg-gray-900/90 rounded-lg p-8">
          <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Room Completed!
          </h2>
          
          <div className="space-y-6">
            {/* Room details */}
            <div className="flex items-center gap-4">
              <div>
                <h3 className="text-xl font-medium">{currentRoom.name}</h3>
                <p className="text-gray-400">Difficulty: {currentRoom.difficulty}</p>
              </div>
              <div className={`
                px-3 py-1 rounded-full text-sm font-medium ml-auto
                ${currentRoom.difficulty === 'easy'
                  ? 'bg-green-500/20 text-green-300'
                  : currentRoom.difficulty === 'medium'
                    ? 'bg-yellow-500/20 text-yellow-300'
                    : 'bg-red-500/20 text-red-300'
                }
              `}>
                {currentRoom.difficulty.toUpperCase()}
              </div>
            </div>

            {/* Score breakdown */}
            <div className="space-y-2">
              <h3 className="text-lg font-medium mb-3">Score Breakdown:</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Base Score:</span>
                  <span>{currentRoom.baseScore}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Time Bonus:</span>
                  <span className="text-green-400">+{totalTimeBonus}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Wrong Attempts:</span>
                  <span className="text-red-400">-{wrongAttempts * 50}</span>
                </div>
                <div className="flex justify-between font-medium text-lg mt-4">
                  <span>Final Score:</span>
                  <span>{score}</span>
                </div>
              </div>
            </div>

            {/* Room Status */}
            <div className="mt-4">
              {skippedPuzzles.length > 0 ? (
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                  <h3 className="text-yellow-300 font-medium">Room Partially Completed</h3>
                  <p className="text-sm text-gray-400 mt-1">
                    {skippedPuzzles.length} puzzle{skippedPuzzles.length > 1 ? 's were' : ' was'} skipped. 
                    Complete all puzzles to mark this room as finished!
                  </p>
                </div>
              ) : (
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <h3 className="text-green-300 font-medium">Room Fully Completed!</h3>
                  <p className="text-sm text-gray-400 mt-1">
                    Congratulations! You've solved all puzzles in this room.
                  </p>
                </div>
              )}
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-800/50 rounded p-3 text-center">
                <div className="text-2xl font-bold text-yellow-400">{timeRemaining}</div>
                <div className="text-xs text-gray-400">Seconds Left</div>
              </div>
              <div className="bg-gray-800/50 rounded p-3 text-center">
                <div className="text-2xl font-bold text-blue-400">{wrongAttempts}</div>
                <div className="text-xs text-gray-400">Wrong Attempts</div>
              </div>
              <div className="bg-gray-800/50 rounded p-3 text-center">
                <div className="text-2xl font-bold text-purple-400">{powerUpsUsed}</div>
                <div className="text-xs text-gray-400">Power-ups Used</div>
              </div>
            </div>

            {/* Achievements */}
            {achievements.filter(a => a.id.startsWith(currentRoom.id)).length > 0 && (
              <div>
                <h3 className="text-lg font-medium mb-3">Achievements Unlocked:</h3>
                <div className="space-y-2">
                  {achievements.filter(a => a.id.startsWith(currentRoom.id)).map((achievement) => (
                    <div
                      key={achievement.id}
                      className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 flex items-center gap-3"
                    >
                      <span className="text-2xl">🏆</span>
                      <div>
                        <h4 className="font-medium text-green-300">{achievement.name}</h4>
                        <p className="text-sm text-gray-400">{achievement.description}</p>
                        <p className="text-sm text-green-400 mt-1">+{achievement.reward} points</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Social Sharing */}
            <div className="mt-6 flex gap-4 items-center">
              <button
                onClick={handleShare}
                disabled={shareStatus === 'success'}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg
                  ${shareStatus === 'success' 
                    ? 'bg-green-500/20 text-green-300'
                    : shareStatus === 'error'
                      ? 'bg-red-500/20 text-red-300'
                      : 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30'
                  }
                  transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900
                  ${shareStatus === 'success' ? 'cursor-not-allowed' : 'cursor-pointer'}
                `}
              >
                <ShareIcon className="w-5 h-5" />
                {shareStatus === 'success' 
                  ? shareMethod === 'native' ? 'Shared!' : 'Copied to clipboard!'
                  : shareStatus === 'error'
                    ? 'Try again'
                    : 'Share Achievement'
                }
              </button>
              {shareStatus === 'error' && (
                <span className="text-sm text-red-400">
                  Failed to share. Please try again.
                </span>
              )}
              <button
                onClick={() => handleSocialMediaShare('twitter')}
                className="px-4 py-2 rounded-lg bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 transition-colors"
              >
                Share on Twitter
              </button>
              <button
                onClick={() => handleSocialMediaShare('facebook')}
                className="px-4 py-2 rounded-lg bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 transition-colors"
              >
                Share on Facebook
              </button>
              <button
                onClick={() => handleSocialMediaShare('linkedin')}
                className="px-4 py-2 rounded-lg bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 transition-colors"
              >
                Share on LinkedIn
              </button>
            </div>

            {/* Next room button */}
            <button
              onClick={handleReturnToMenu}
              className="w-full py-3 rounded-lg bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 transition-colors mt-6"
            >
              Return to Room Selection
            </button>
          </div>
        </div>

        {/* Leaderboard Panel */}
        <Leaderboard currentRoom={currentRoom} />
      </div>
    </motion.div>
  );
};