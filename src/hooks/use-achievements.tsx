'use client';

import { useState, useEffect, useCallback } from 'react';
import { useToast } from "@/hooks/use-toast";
import { achievementsList, Achievement } from '@/lib/achievements';
import { Trophy } from 'lucide-react';
import { useAudio } from '@/context/audio-context';

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
  const audio = useAudio();

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
      audio.playSound('achievement');
      achievementsToToast.forEach(a => {
        toast({
          title: (
            <div className="flex items-center gap-2 font-bold">
              <Trophy className="h-5 w-5 text-accent" />
              <span>Achievement Unlocked!</span>
            </div>
          ),
          description: (
            <div className="flex items-center gap-3 mt-2">
               <div className="relative h-10 w-10 rounded-md flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={a.image} alt={a.title} data-ai-hint={a.imageHint} className="h-10 w-10 rounded-md object-cover" />
               </div>
               <span className="font-semibold">{a.title}</span>
            </div>
          ),
        });
      });
      setAchievementsToToast([]); // Clear the queue
    }
  }, [achievementsToToast, toast, audio]);

  const checkAndUnlockAchievements = useCallback((finalScore: number, categoriesPlayed: number, isPerfectGame: boolean) => {
    setAchievements(prev => {
        const updatedGamesPlayed = prev.gamesPlayed + 1;
        const newUnlockedIds = new Set(prev.unlockedIds);
        const newAchievements: Achievement[] = [];

        achievementsList.forEach(achievement => {
          if (newUnlockedIds.has(achievement.id)) return;

          let unlocked = false;
          if (achievement.type === 'score' && finalScore <= achievement.threshold) {
              const categoriesInTitle = parseInt(achievement.id.split('_')[1], 10);
              if (categoriesInTitle === categoriesPlayed) {
                unlocked = true;
              }
          }
          if (achievement.type === 'games' && updatedGamesPlayed >= achievement.threshold) {
              unlocked = true;
          }
          if (achievement.type === 'categories' && categoriesPlayed === achievement.threshold) {
              unlocked = true;
          }
          if (achievement.type === 'perfect' && isPerfectGame) {
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
