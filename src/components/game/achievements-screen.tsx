import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Trophy, Lock, ArrowLeft } from 'lucide-react';
import { achievementsList } from '@/lib/achievements';
import type { AchievementsState } from '@/hooks/use-achievements.tsx';
import type { useGameState } from '@/hooks/use-game-state';

type AchievementsScreenProps = {
  achievements: AchievementsState;
  goToMenu: ReturnType<typeof useGameState>['goToMenu'];
};

export const AchievementsScreen: React.FC<AchievementsScreenProps> = ({ achievements, goToMenu }) => {
  const { unlockedIds, bestScore, gamesPlayed } = achievements;
  
  return (
    <Card className="w-full max-w-md shadow-lg animate-in fade-in">
      <CardHeader>
        <div className="flex justify-between items-center">
            <CardTitle className="text-3xl font-bold font-headline">Achievements</CardTitle>
            <Button variant="ghost" size="icon" onClick={goToMenu}>
                <ArrowLeft className="h-5 w-5" />
            </Button>
        </div>
        <CardDescription>Track your progress and unlock new milestones!</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-around text-center mb-4">
            <div>
                <p className="font-bold text-2xl text-primary">{bestScore ?? 'N/A'}</p>
                <p className="text-xs text-muted-foreground">Best Score</p>
            </div>
             <div>
                <p className="font-bold text-2xl text-primary">{gamesPlayed}</p>
                <p className="text-xs text-muted-foreground">Games Played</p>
            </div>
        </div>

        <ScrollArea className="h-72 w-full">
          <div className="space-y-4 pr-4">
            {achievementsList.map(ach => {
              const isUnlocked = unlockedIds.has(ach.id);
              return (
                <div key={ach.id} className={`flex items-start space-x-4 p-4 rounded-lg border ${isUnlocked ? 'border-accent/50 bg-accent/10' : 'bg-muted/50'}`}>
                  {isUnlocked ? (
                    <Trophy className="h-8 w-8 text-accent flex-shrink-0 mt-1" />
                  ) : (
                    <Lock className="h-8 w-8 text-muted-foreground flex-shrink-0 mt-1" />
                  )}
                  <div>
                    <h3 className={`font-semibold ${isUnlocked ? 'text-accent-foreground' : ''}`}>{ach.title}</h3>
                    <p className="text-sm text-muted-foreground">{ach.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
