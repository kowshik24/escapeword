import { useEffect } from 'react';
import { useGameStore } from '@/store/gameStore';

export const AchievementComponent = () => {
  const { currentRoom, achievements, unlockAchievement, timeRemaining, hints, wrongAttempts, powerUpsUsed } = useGameStore();

  useEffect(() => {
    if (!currentRoom) return;

    // Check for achievements
    currentRoom.achievements.forEach((achievement) => {
      if (achievements.some(a => a.id === achievement.id)) return;

      const condition = achievement.condition;
      let isUnlocked = false;

      // Evaluate achievement conditions
      switch (condition) {
        case 'timeRemaining > 300':
          isUnlocked = timeRemaining > 300;
          break;
        case 'timeRemaining > 180':
          isUnlocked = timeRemaining > 180;
          break;
        case 'timeRemaining > 120':
          isUnlocked = timeRemaining > 120;
          break;
        case 'hintsUsed === 0':
          isUnlocked = hints === (currentRoom.difficulty === 'easy' ? 5 : currentRoom.difficulty === 'medium' ? 3 : 2);
          break;
        case 'wrongAttempts === 0':
          isUnlocked = wrongAttempts === 0;
          break;
        case 'powerUpsUsed === 0':
          isUnlocked = powerUpsUsed === 0;
          break;
      }

      if (isUnlocked) {
        unlockAchievement(achievement);
        
        // Play achievement sound
        const audio = new Audio('/sounds/achievement.mp3');
        audio.play();
      }
    });
  }, [currentRoom, achievements, unlockAchievement, timeRemaining, hints, wrongAttempts, powerUpsUsed]);

  if (!currentRoom?.achievements) return null;

  return (
    <div className="fixed top-20 right-4 z-30">
      <div className="space-y-2">
        {currentRoom.achievements.map((achievement) => {
          const isUnlocked = achievements.some(a => a.id === achievement.id);
          
          return (
            <div
              key={achievement.id}
              className={`
                p-3 rounded-lg text-sm transition-all duration-300
                ${isUnlocked
                  ? 'bg-green-500/20 text-green-300'
                  : 'bg-gray-500/20 text-gray-400'
                }
              `}
            >
              <div className="flex items-center gap-2">
                <span>{isUnlocked ? '🏆' : '🔒'}</span>
                <div>
                  <h3 className="font-medium">{achievement.name}</h3>
                  <p className="text-xs opacity-75">{achievement.description}</p>
                  <p className="text-xs mt-1">
                    Reward: {achievement.reward} points
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};