'use client';

import React, { createContext, useContext, useMemo, useCallback, ReactNode } from 'react';
import { useSettings } from '@/hooks/use-settings';

const SOUND_EFFECTS = {
  select: 'https://cdn.pixabay.com/audio/2022/03/15/audio_2c4a3c299c.mp3',
  correct: 'https://cdn.pixabay.com/audio/2021/08/04/audio_c6f2e63c23.mp3',
  incorrect: 'https://cdn.pixabay.com/audio/2022/03/10/audio_c3ffc7891d.mp3',
  achievement: 'https://cdn.pixabay.com/audio/2022/08/23/audio_8286a6c117.mp3',
  start: 'https://cdn.pixabay.com/audio/2022/03/10/audio_89d39e5590.mp3',
  end: 'https://cdn.pixabay.com/audio/2022/09/23/audio_03d80e8062.mp3',
};

type SoundType = keyof typeof SOUND_EFFECTS;

interface AudioContextType {
  playSound: (sound: SoundType) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const { settings } = useSettings();

  const audioPlayers = useMemo(() => {
    if (typeof window === 'undefined') return {};
    
    const players: { [key in SoundType]?: HTMLAudioElement } = {};
    for (const key in SOUND_EFFECTS) {
      const soundKey = key as SoundType;
      players[soundKey] = new Audio(SOUND_EFFECTS[soundKey]);
      players[soundKey]!.preload = 'auto';
    }
    return players;
  }, []);

  const playSound = useCallback((sound: SoundType) => {
    if (settings.soundOn && audioPlayers[sound]) {
      const player = audioPlayers[sound]!;
      player.currentTime = 0;
      player.play().catch(error => {
        // Autoplay was prevented. This is common in browsers.
        // You might want to log this for debugging but not show an error to the user.
        console.warn(`Could not play sound: ${sound}`, error);
      });
    }
  }, [settings.soundOn, audioPlayers]);

  const contextValue = useMemo(() => ({ playSound }), [playSound]);

  return (
    <AudioContext.Provider value={contextValue}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = (): AudioContextType => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
