import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Repeat, Home } from 'lucide-react';
import type { useGameState } from '@/hooks/use-game-state';
import type { AchievementsState } from '@/hooks/use-achievements.tsx';

type ResultsScreenProps = Pick<ReturnType<typeof useGameState>, 'score' | 'history' | 'startGame' | 'goToMenu'> & {
    achievements: AchievementsState;
};

export const ResultsScreen: React.FC<ResultsScreenProps> = ({ score, history, startGame, goToMenu, achievements }) => {
  
  return (
    <Card className="w-full max-w-md text-center shadow-lg animate-in fade-in zoom-in-95">
      <CardHeader>
        <CardTitle className="text-4xl font-bold font-headline text-primary">Game Over!</CardTitle>
        <CardDescription>Here's how you did.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
            <p className="text-lg text-muted-foreground">Final Score</p>
            <p className="text-6xl font-bold text-primary">{score}</p>
            {achievements.bestScore !== null && (
                 <p className="text-sm text-muted-foreground mt-1">Best Score: {achievements.bestScore}</p>
            )}
        </div>
        
        <Separator />
        
        <h3 className="font-semibold text-left">Round Summary</h3>
        <ScrollArea className="h-48 w-full rounded-md border p-2">
            <div className="space-y-2">
            {history.map((round, index) => (
                <div key={index} className="flex justify-between items-center text-sm p-2 bg-muted/50 rounded-md">
                    <div className="flex items-center gap-2 text-left">
                        <round.selectedCategory.Icon className="h-4 w-4" />
                        <span>{round.country.name} in <span className="font-semibold">{round.selectedCategory.name}</span></span>
                    </div>
                    <Badge variant="outline">Rank #{round.score}</Badge>
                </div>
            ))}
            </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-2">
        <Button onClick={() => startGame()} className="w-full">
          <Repeat className="mr-2 h-4 w-4" /> Play Again
        </Button>
        <Button onClick={goToMenu} variant="outline" className="w-full">
            <Home className="mr-2 h-4 w-4" /> Main Menu
        </Button>
      </CardFooter>
    </Card>
  );
};
