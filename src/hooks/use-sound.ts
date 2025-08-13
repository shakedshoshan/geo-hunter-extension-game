
'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useSettings } from './use-settings';

const sounds = {
  select: 'https://cdn.pixabay.com/audio/2022/03/15/audio_73135804ad.mp3',
  start: 'https://cdn.pixabay.com/audio/2022/11/17/audio_88f233a808.mp3',
  correct: 'https://cdn.pixabay.com/audio/2021/08/04/audio_c663f7b973.mp3',
  wrong: 'https://cdn.pixabay.com/audio/2022/03/10/audio_c3b417c62c.mp3',
  achievement: 'https://cdn.pixabay.com/audio/2022/09/20/audio_1b14ead962.mp3',
};

type SoundType = keyof typeof sounds;
type AudioPlayers = { [key in SoundType]?: HTMLAudioElement };

// We create a single audio context outside the hook to avoid re-creation.
const audioContext: { players: AudioPlayers } = {
  players: {},
};

// Pre-create audio elements if in a browser environment.
if (typeof window !== 'undefined') {
  for (const key in sounds) {
    const soundKey = key as SoundType;
    const player = new Audio(sounds[soundKey]);
    player.preload = 'auto';
    audioContext.players[soundKey] = player;
  }
}

export const useSound = () => {
    const { settings } = useSettings();
    const { soundOn } = settings;

    const playSound = useCallback((sound: SoundType) => {
        if (soundOn && typeof window !== 'undefined') {
            const player = audioContext.players[sound];
            if (player) {
                player.currentTime = 0;
                player.play().catch(error => console.error(`Error playing sound: ${sound}`, error));
            }
        }
    }, [soundOn]);

    const playSelect = useCallback(() => playSound('select'), [playSound]);
    const playStart = useCallback(() => playSound('start'), [playSound]);
    const playCorrect = useCallback(() => playSound('correct'), [playSound]);
    const playWrong = useCallback(() => playSound('wrong'), [playSound]);
    const playAchievement = useCallback(() => playSound('achievement'), [playSound]);

    return {
        playSelect,
        playStart,
        playCorrect,
        playWrong,
        playAchievement,
    };
};
