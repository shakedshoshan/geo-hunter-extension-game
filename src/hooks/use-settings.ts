'use client';

import { useState, useEffect, useCallback } from 'react';

export interface Settings {
  expertMode: boolean; // Hides country names
  hintsOn: boolean; // Shows best pick hints
  soundOn: boolean; // Toggles all sound
}

const defaultSettings: Settings = {
  expertMode: false,
  hintsOn: true,
  soundOn: true,
};

export const useSettings = () => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedSettings = localStorage.getItem('geoRankerSettings');
      if (storedSettings) {
        setSettings({ ...defaultSettings, ...JSON.parse(storedSettings) });
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

  const toggleExpertMode = useCallback(() => {
    setSettings(s => ({ ...s, expertMode: !s.expertMode }));
  }, []);

  const toggleHints = useCallback(() => {
    setSettings(s => ({ ...s, hintsOn: !s.hintsOn }));
  }, []);

  const toggleSound = useCallback(() => {
    setSettings(s => ({ ...s, soundOn: !s.soundOn }));
  }, []);

  return {
    settings,
    isLoaded,
    toggleExpertMode,
    toggleHints,
    toggleSound,
  };
};
