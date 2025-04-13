import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Room, GameState } from '../types';

interface GameStore {
  currentRoom: Room | null;
  completedRooms: string[];
  score: number;
  time: number;
  hints: number;
  gameState: GameState;
  setCurrentRoom: (room: Room) => void;
  completeRoom: (roomId: string) => void;
  addScore: (points: number) => void;
  reduceScore: (points: number) => void;
  useHint: () => void;
  setGameState: (state: GameState) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set) => ({
      currentRoom: null,
      completedRooms: [],
      score: 0,
      time: 0,
      hints: 3,
      gameState: 'menu',
      setCurrentRoom: (room) => set({ currentRoom: room }),
      completeRoom: (roomId) =>
        set((state) => ({
          completedRooms: [...state.completedRooms, roomId],
        })),
      addScore: (points) =>
        set((state) => ({ score: state.score + points })),
      reduceScore: (points) =>
        set((state) => ({ score: Math.max(0, state.score - points) })),
      useHint: () =>
        set((state) => ({ hints: Math.max(0, state.hints - 1) })),
      setGameState: (state) => set({ gameState: state }),
      resetGame: () =>
        set({
          currentRoom: null,
          completedRooms: [],
          score: 0,
          time: 0,
          hints: 3,
          gameState: 'menu',
        }),
    }),
    {
      name: 'escapeword-storage',
    }
  )
);