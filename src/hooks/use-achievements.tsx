'use client';

import { useState, useEffect, useCallback } from 'react';
import { useToast } from "@/hooks/use-toast";
import { achievementsList, Achievement } from '@/lib/achievements';
import { Trophy } from 'lucide-react';

export interface AchievementsState {
  unlockedIds: Set<string>;
  bestScore: number | null;
  gamesPlayed: number;
}

const defaultAchievements: AchievementsState = {
  unlockedIds: new Set(),
  bestScore: null,
  gamesPlayed: 0,
};

export const useAchievements = () => {
  const [achievements, setAchievements] = useState<AchievementsState>(defaultAchievements);
  const [isLoaded, setIsLoaded] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const stored = localStorage.getItem('geoRankerAchievements');
      if (stored) {
        const parsed = JSON.parse(stored);
        setAchievements({
          ...defaultAchievements,
          ...parsed,
          unlockedIds: new Set(parsed.unlockedIds || []),
        });
      }
    } catch (error) {
      console.error('Failed to load achievements from localStorage', error);
    }
    setIsLoaded(true);
  }, []);
  
  useEffect(() => {
    if (isLoaded) {
      try {
        const toStore = {
          ...achievements,
          unlockedIds: Array.from(achievements.unlockedIds),
        };
        localStorage.setItem('geoRankerAchievements', JSON.stringify(toStore));
      } catch (error) {
        console.error('Failed to save achievements to localStorage', error);
      }
    }
  }, [achievements, isLoaded]);

  const checkAndUnlockAchievements = useCallback((finalScore: number) => {
    const updatedGamesPlayed = achievements.gamesPlayed + 1;
    const newUnlockedIds = new Set(achievements.unlockedIds);
    const achievementsToToast: Achievement[] = [];

    achievementsList.forEach(achievement => {
      if (newUnlockedIds.has(achievement.id)) return;

      let unlocked = false;
      if (achievement.type === 'score' && finalScore <= achievement.threshold) {
        unlocked = true;
      }
      if (achievement.type === 'games' && updatedGamesPlayed >= achievement.threshold) {
        unlocked = true;
      }

      if (unlocked) {
        newUnlockedIds.add(achievement.id);
        achievementsToToast.push(achievement);
      }
    });

    setAchievements(prev => ({
        unlockedIds: newUnlockedIds,
        gamesPlayed: updatedGamesPlayed,
        bestScore: prev.bestScore === null ? finalScore : Math.min(prev.bestScore, finalScore),
    }));

    if (achievementsToToast.length > 0) {
      achievementsToToast.forEach(a => {
        toast({
          title: (
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-accent" />
              <span>Achievement Unlocked!</span>
            </div>
          ),
          description: a.title,
        });
      });
    }

  }, [achievements.gamesPlayed, achievements.unlockedIds, toast]);

  return {
    achievements,
    checkAndUnlockAchievements,
    isLoaded,
  };
};
