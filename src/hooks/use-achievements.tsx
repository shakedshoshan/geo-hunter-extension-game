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
  const [achievementsToToast, setAchievementsToToast] = useState<Achievement[]>([]);
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

  useEffect(() => {
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
      setAchievementsToToast([]); // Clear the queue
    }
  }, [achievementsToToast, toast]);

  const checkAndUnlockAchievements = useCallback((finalScore: number, categoriesPlayed: number) => {
    setAchievements(prev => {
        const updatedGamesPlayed = prev.gamesPlayed + 1;
        const newUnlockedIds = new Set(prev.unlockedIds);
        const newAchievements: Achievement[] = [];

        achievementsList.forEach(achievement => {
          if (newUnlockedIds.has(achievement.id)) return;

          let unlocked = false;
          if (achievement.type === 'score' && finalScore <= achievement.threshold) {
              unlocked = true;
          }
          if (achievement.type === 'games' && updatedGamesPlayed >= achievement.threshold) {
              unlocked = true;
          }
          if (achievement.type === 'categories' && categoriesPlayed === achievement.threshold) {
              unlocked = true;
          }

          if (unlocked) {
              newUnlockedIds.add(achievement.id);
              newAchievements.push(achievement);
          }
        });

        if (newAchievements.length > 0) {
            setAchievementsToToast(newAchievements);
        }
        
        return {
            unlockedIds: newUnlockedIds,
            gamesPlayed: updatedGamesPlayed,
            bestScore: prev.bestScore === null ? finalScore : Math.min(prev.bestScore, finalScore),
        };
    });
  }, []);

  return {
    achievements,
    checkAndUnlockAchievements,
    isLoaded,
  };
};
