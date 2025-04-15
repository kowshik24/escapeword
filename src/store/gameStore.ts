import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Room, GameState, PowerUp, Achievement, Post, Comment } from '../types';

// Sample discussions to show other users' posts
const initialDiscussions: Post[] = [
  {
    id: 'post-1',
    roomId: 'egypt',
    userId: 'user-2',
    username: 'EgyptExplorer',
    title: 'Tip for the Hieroglyphic Code',
    content: 'If you\'re stuck on puzzle 4, remember that A=1 means you need to count up from there. The first number being 13 means it starts with M!',
    createdAt: Date.now() - 86400000, // 1 day ago
    likes: ['user-3', 'user-4'],
    comments: [
      {
        id: 'comment-1',
        userId: 'user-3',
        username: 'PyramidPro',
        content: 'Thanks! This really helped me solve it.',
        createdAt: Date.now() - 43200000, // 12 hours ago
        likes: ['user-2']
      }
    ]
  },
  {
    id: 'post-2',
    roomId: 'space',
    userId: 'user-4',
    username: 'SpaceEngineer',
    title: 'Shield Generator Strategy',
    content: 'The shield generator puzzle is all about opposites. Think about the current state and what you need to do to change it!',
    createdAt: Date.now() - 172800000, // 2 days ago
    likes: ['user-2', 'user-5', 'user-6'],
    comments: [
      {
        id: 'comment-2',
        userId: 'user-5',
        username: 'StarNavigator',
        content: 'Great hint! Also works for most of the system repair puzzles.',
        createdAt: Date.now() - 158400000, // 1.8 days ago
        likes: []
      }
    ]
  },
  {
    id: 'post-3',
    roomId: 'haunted',
    userId: 'user-6',
    username: 'GhostHunter',
    title: 'The Piano Riddle',
    content: 'This one is tricky! Think about instruments that have keys but aren\'t used for opening things.',
    createdAt: Date.now() - 259200000, // 3 days ago
    likes: ['user-2', 'user-3'],
    comments: [
      {
        id: 'comment-3',
        userId: 'user-3',
        username: 'PyramidPro',
        content: 'Got it! Very clever riddle.',
        createdAt: Date.now() - 251200000, // 2.9 days ago
        likes: ['user-6']
      }
    ]
  }
];

interface GameStore {
  currentRoom: Room | null;
  completedRooms: string[];
  score: number;
  time: number;
  timeRemaining: number;
  hints: number;
  gameState: GameState;
  activePowerUps: PowerUp[];
  wrongAttempts: number;
  powerUpsUsed: number;
  achievements: Achievement[];
  totalTimeBonus: number;
  skippedPuzzles: string[];
  discussions: Post[];

  // State setters
  setCurrentRoom: (room: Room) => void;
  completeRoom: (roomId: string) => void;
  addScore: (points: number) => void;
  reduceScore: (points: number) => void;
  useHint: () => void;
  setGameState: (state: GameState) => void;
  resetGame: () => void;
  setTimeRemaining: (time: number) => void;

  // New power-up functions
  activatePowerUp: (powerUp: PowerUp) => void;
  deactivatePowerUp: (powerUpType: string) => void;
  
  // Achievement functions
  unlockAchievement: (achievement: Achievement) => void;
  
  // Difficulty related
  addTimeBonus: (bonus: number) => void;
  incrementWrongAttempts: () => void;
  getPowerUpMultiplier: () => number;

  // Skipped puzzles
  addSkippedPuzzle: (puzzleId: string) => void;

  // Discussion functions
  addPost: (post: Post) => void;
  likePost: (postId: string) => void;
  addComment: (postId: string, comment: Comment) => void;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      currentRoom: null,
      completedRooms: [],
      score: 0,
      time: 0,
      timeRemaining: 0,
      hints: 3,
      gameState: 'menu',
      activePowerUps: [],
      wrongAttempts: 0,
      powerUpsUsed: 0,
      achievements: [],
      totalTimeBonus: 0,
      skippedPuzzles: [],
      discussions: initialDiscussions,

      setCurrentRoom: (room) => set({ 
        currentRoom: room,
        hints: room.difficulty === 'easy' ? 5 : room.difficulty === 'medium' ? 3 : 2,
        wrongAttempts: 0,
        powerUpsUsed: 0,
        totalTimeBonus: 0,
        skippedPuzzles: []
      }),

      completeRoom: (roomId) =>
        set((state) => {
          // Only add to completed rooms if no puzzles were skipped
          if (state.skippedPuzzles.length === 0) {
            return {
              completedRooms: [...state.completedRooms, roomId],
              score: state.score + (state.currentRoom?.baseScore || 0) * get().getPowerUpMultiplier() + state.totalTimeBonus
            };
          }
          return state;
        }),

      addScore: (points) =>
        set((state) => {
          const multiplier = get().getPowerUpMultiplier();
          const newScore = state.score + (points * multiplier);
          return { score: newScore };
        }),

      reduceScore: (points) =>
        set((state) => {
          const newScore = Math.max(0, state.score - points);
          return { score: newScore };
        }),

      useHint: () =>
        set((state) => {
          if (state.hints <= 0) return state;
          return { hints: state.hints - 1 };
        }),

      setGameState: (state) => set({ gameState: state }),

      resetGame: () => set({
        score: 0,
        hints: 3,
        gameState: 'menu',
        currentRoom: null,
        activePowerUps: [],
        wrongAttempts: 0,
        powerUpsUsed: 0,
        totalTimeBonus: 0,
        skippedPuzzles: []
      }),

      setTimeRemaining: (time) => set({ timeRemaining: time }),

      activatePowerUp: (powerUp) => 
        set((state) => ({
          activePowerUps: [...state.activePowerUps, powerUp],
          powerUpsUsed: state.powerUpsUsed + 1,
          ...(powerUp.type === 'skipPuzzle' ? { hints: state.hints + 1 } : {})
        })),

      deactivatePowerUp: (powerUpType) =>
        set((state) => ({
          activePowerUps: state.activePowerUps.filter(p => p.type !== powerUpType)
        })),

      unlockAchievement: (achievement) =>
        set((state) => ({
          achievements: [...state.achievements, achievement],
          score: state.score + achievement.reward
        })),

      addTimeBonus: (bonus) =>
        set((state) => ({
          totalTimeBonus: state.totalTimeBonus + bonus
        })),

      incrementWrongAttempts: () =>
        set((state) => {
          const newAttempts = state.wrongAttempts + 1;
          return { wrongAttempts: newAttempts };
        }),

      getPowerUpMultiplier: () => {
        const state = get();
        const multipliers = state.activePowerUps
          .filter(p => p.type === 'doublePoints')
          .map(p => p.multiplier || 1);
        return multipliers.length > 0 ? Math.max(...multipliers) : 1;
      },

      addSkippedPuzzle: (puzzleId) => 
        set((state) => ({
          skippedPuzzles: [...state.skippedPuzzles, puzzleId]
        })),

      addPost: (post) =>
        set((state) => ({
          discussions: [...state.discussions, post]
        })),

      likePost: (postId) =>
        set((state) => ({
          discussions: state.discussions.map(post => {
            if (post.id === postId) {
              const userId = 'user-1'; // In a real app, this would come from auth
              const hasLiked = post.likes.includes(userId);
              return {
                ...post,
                likes: hasLiked
                  ? post.likes.filter(id => id !== userId)
                  : [...post.likes, userId]
              };
            }
            return post;
          })
        })),

      addComment: (postId, comment) =>
        set((state) => ({
          discussions: state.discussions.map(post => {
            if (post.id === postId) {
              return {
                ...post,
                comments: [...post.comments, comment]
              };
            }
            return post;
          })
        }))
    }),
    {
      name: 'escape-room-storage',
      version: 1,
      storage: createJSONStorage(() => ({
        getItem: (name) => {
          if (typeof window === 'undefined') return null;
          return JSON.parse(window.localStorage.getItem(name) || 'null');
        },
        setItem: (name, value) => {
          if (typeof window !== 'undefined') {
            window.localStorage.setItem(name, JSON.stringify(value));
          }
        },
        removeItem: (name) => {
          if (typeof window !== 'undefined') {
            window.localStorage.removeItem(name);
          }
        },
      })),
      skipHydration: true,
    }
  )
);