import { useRef, useCallback } from 'react';

interface PlayOptions {
  loop?: boolean;
  volume?: number;
}

export const useSound = (soundPath: string) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const play = useCallback(
    (options: PlayOptions = {}) => {
      if (!soundPath) return;

      if (!audioRef.current) {
        audioRef.current = new Audio(soundPath);
      }

      if (options.loop !== undefined) {
        audioRef.current.loop = options.loop;
      }

      if (options.volume !== undefined) {
        audioRef.current.volume = options.volume;
      }

      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((error) => {
        console.error('Error playing sound:', error);
      });
    },
    [soundPath]
  );

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  return { play, stop };
};