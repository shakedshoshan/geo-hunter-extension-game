import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Lock, ArrowLeft } from 'lucide-react';
import { achievementsList } from '@/lib/achievements';
import type { AchievementsState } from '@/hooks/use-achievements';
import type { useGameState } from '@/hooks/use-game-state.tsx';

type AchievementsScreenProps = {
  achievements: AchievementsState;
  goToMenu: ReturnType<typeof useGameState>['goToMenu'];
};

const AchievementItem = ({ achievement, isUnlocked }: { achievement: typeof achievementsList[0], isUnlocked: boolean }) => (
    <div key={achievement.id} className={`flex items-center space-x-4 p-4 rounded-lg border ${isUnlocked ? 'border-accent/50 bg-accent/10' : 'bg-muted/50'}`}>
        {isUnlocked ? (
          <img src={achievement.image} alt={achievement.title} data-ai-hint={achievement.imageHint} className="h-12 w-12 rounded-md object-cover flex-shrink-0" />
        ) : (
          <div className="flex items-center justify-center h-12 w-12 rounded-md bg-muted flex-shrink-0">
            <Lock className="h-6 w-6 text-muted-foreground" />
          </div>
        )}
        <div className="flex-grow">
          <h3 className={`font-semibold ${isUnlocked ? 'text-accent-foreground' : ''}`}>{achievement.title}</h3>
          <p className="text-sm text-muted-foreground">{achievement.description}</p>
        </div>
    </div>
);


export const AchievementsScreen: React.FC<AchievementsScreenProps> = ({ achievements, goToMenu }) => {
  const { unlockedIds, bestScore, gamesPlayed } = achievements;

  const generalAchievements = achievementsList.filter(a => a.type === 'games' || a.type === 'perfect');
  const categoryAchievements = (count: number) => achievementsList.filter(a => (a.type === 'categories' && a.threshold === count) || (a.type === 'score' && a.id.startsWith(`score_${count}`)));
  
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

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6 h-auto mb-2">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="4">4 Cats</TabsTrigger>
            <TabsTrigger value="5">5 Cats</TabsTrigger>
            <TabsTrigger value="6">6 Cats</TabsTrigger>
            <TabsTrigger value="7">7 Cats</TabsTrigger>
            <TabsTrigger value="8">8 Cats</TabsTrigger>
          </TabsList>
          
          <ScrollArea className="h-72 w-full">
            <TabsContent value="general">
                <div className="space-y-4 pr-4">
                {generalAchievements.map(ach => (
                    <AchievementItem key={ach.id} achievement={ach} isUnlocked={unlockedIds.has(ach.id)} />
                ))}
                </div>
            </TabsContent>
            {[4, 5, 6, 7, 8].map(catCount => (
                <TabsContent value={String(catCount)} key={catCount}>
                    <div className="space-y-4 pr-4">
                    {categoryAchievements(catCount).map(ach => (
                         <AchievementItem key={ach.id} achievement={ach} isUnlocked={unlockedIds.has(ach.id)} />
                    ))}
                    </div>
                </TabsContent>
            ))}
          </ScrollArea>
        </Tabs>
      </CardContent>
    </Card>
  );
};
