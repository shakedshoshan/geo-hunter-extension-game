'use client';

import { useCallback, useState, useEffect } from 'react';
import { useSettings } from './use-settings';

// Audio files - Using free assets from Pixabay
const sounds = {
  select: 'https://cdn.pixabay.com/audio/2022/03/15/audio_73135804ad.mp3',
  start: 'https://cdn.pixabay.com/audio/2022/11/17/audio_88f233a808.mp3',
  correct: 'https://cdn.pixabay.com/audio/2021/08/04/audio_c663f7b973.mp3',
  wrong: 'https://cdn.pixabay.com/audio/2022/03/10/audio_c3b417c62c.mp3',
  achievement: 'https://cdn.pixabay.com/audio/2022/09/20/audio_1b14ead962.mp3',
};

type SoundType = keyof typeof sounds;

const useAudio = (url: string) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audioInstance = new Audio(url);
    audioInstance.preload = 'auto';
    setAudio(audioInstance);
    
    return () => {
        if(audioInstance) {
            audioInstance.src = '';
        }
    }
  }, [url]);

  return audio;
};


export const useSound = () => {
    const { settings } = useSettings();
    const { soundOn } = settings;

    const audioInstances = {
        select: useAudio(sounds.select),
        start: useAudio(sounds.start),
        correct: useAudio(sounds.correct),
        wrong: useAudio(sounds.wrong),
        achievement: useAudio(sounds.achievement),
    };

    const playSound = useCallback((sound: SoundType) => {
        if (soundOn && audioInstances[sound]) {
            const audio = audioInstances[sound];
            if (audio) {
                audio.currentTime = 0;
                audio.play().catch(error => console.error(`Error playing sound: ${sound}`, error));
            }
        }
    }, [soundOn, audioInstances]);

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
