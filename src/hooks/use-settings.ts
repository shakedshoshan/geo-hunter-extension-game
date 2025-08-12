'use client';

import { useState, useEffect, useCallback } from 'react';

export interface Settings {
  soundOn: boolean;
  expertMode: boolean; // Hides country names
  hintsOn: boolean; // Shows best pick hints
}

const defaultSettings: Settings = {
  soundOn: true,
  expertMode: false,
  hintsOn: true,
};

export const useSettings = () => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedSettings = localStorage.getItem('geoRankerSettings');
      if (storedSettings) {
        setSettings(JSON.parse(storedSettings));
      }
    } catch (error) {
      console.error('Failed to load settings from localStorage', error);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('geoRankerSettings', JSON.stringify(settings));
      } catch (error) {
        console.error('Failed to save settings to localStorage', error);
      }
    }
  }, [settings, isLoaded]);

  const toggleSound = useCallback(() => {
    setSettings(s => ({ ...s, soundOn: !s.soundOn }));
  }, []);

  const toggleExpertMode = useCallback(() => {
    setSettings(s => ({ ...s, expertMode: !s.expertMode }));
  }, []);

  const toggleHints = useCallback(() => {
    setSettings(s => ({ ...s, hintsOn: !s.hintsOn }));
  }, []);

  return {
    settings,
    isLoaded,
    toggleSound,
    toggleExpertMode,
    toggleHints,
  };
};
