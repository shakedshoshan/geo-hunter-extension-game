import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Lightbulb, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import type { useGameState } from '@/hooks/use-game-state';

type GameScreenProps = ReturnType<typeof useGameState> & { expertMode: boolean };

export const GameScreen: React.FC<GameScreenProps> = ({
  score,
  currentRoundIndex,
  gameCategories,
  currentCountry,
  availableCategories,
  selectCategory,
  roundResult,
  nextRound,
  expertMode,
}) => {
  const hasSelected = !!roundResult;

  const renderResult = () => {
    if (!hasSelected) return null;

    const { selectedCategory, score, bestCategory, hint, hintLoading } = roundResult;
    const isBestPick = selectedCategory.id === bestCategory?.id;

    return (
      <div className="mt-4 space-y-4 animate-in fade-in">
        <Alert variant={isBestPick ? "default" : "destructive"} className={isBestPick ? "border-green-500" : ""}>
          {isBestPick ? <CheckCircle className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4" />}
          <AlertTitle>
            {isBestPick ? "Perfect Pick!" : "Good Try!"}
          </AlertTitle>
          <AlertDescription>
            Your score for this round is {score}.
          </AlertDescription>
        </Alert>

        {hintLoading && <Skeleton className="h-20 w-full" />}
        {!hintLoading && hint && (
          <Alert>
            <Lightbulb className="h-4 w-4 text-accent" />
            <AlertTitle>Hint</AlertTitle>
            <AlertDescription>{hint}</AlertDescription>
          </Alert>
        )}
        <Button onClick={nextRound} className="w-full">
          {currentRoundIndex < gameCategories.length - 1 ? 'Next Round' : 'Finish Game'}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    );
  };
  
  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-headline">Round {currentRoundIndex + 1}/{Array.isArray(gameCategories) ? gameCategories.length : 0}</CardTitle>
          <Badge variant="secondary" className="text-lg">Score: {score}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-primary/20">
            <Image
              src={currentCountry.flag}
              alt={`Flag of ${currentCountry.name}`}
              data-ai-hint={`flag ${currentCountry.name}`}
              fill
              style={{ objectFit: 'cover' }}
              priority
              unoptimized
            />
          </div>
          {!expertMode && (
            <h2 className="text-3xl font-bold">{currentCountry.name}</h2>
          )}
          <p className="text-center text-muted-foreground">Which category does this country rank highest in?</p>

          <div className="grid grid-cols-2 gap-3 w-full pt-4">
            {Array.isArray(gameCategories) && gameCategories.map(category => {
              const isUsed = !availableCategories.some(ac => ac.id === category.id);
              const isSelected = hasSelected && roundResult.selectedCategory.id === category.id;

              return (
                <Button
                  key={category.id}
                  onClick={() => selectCategory(category)}
                  disabled={isUsed || hasSelected}
                  variant={isSelected ? "default" : "outline"}
                  className="h-20 text-wrap flex flex-col justify-center items-center relative"
                >
                  <div className="flex items-center gap-2">
                    <category.Icon className="h-5 w-5 flex-shrink-0" />
                    <span className="flex-grow text-center">{category.name}</span>
                  </div>
                   {isSelected && (
                    <div className="absolute -top-3 -right-3 flex items-center gap-1 bg-background border rounded-full px-2 py-1 shadow-lg">
                        <div className="relative w-6 h-6 rounded-full overflow-hidden">
                           <Image src={currentCountry.flag} alt={currentCountry.name} fill style={{ objectFit: 'cover' }} unoptimized/>
                        </div>
                        <Badge variant="outline">#{roundResult.score}</Badge>
                    </div>
                  )}
                </Button>
              );
            })}
          </div>
          {renderResult()}
        </div>
      </CardContent>
    </Card>
  );
};
