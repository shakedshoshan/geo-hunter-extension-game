import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Play, AlertCircle } from 'lucide-react';
import type { Category } from '@/lib/data';
import { useSound } from '@/hooks/use-sound';

interface CustomCategoriesScreenProps {
  allCategories: Category[];
  startGame: (categories: Category[]) => void;
  goToMenu: () => void;
}

const MIN_CATEGORIES = 4;
const MAX_CATEGORIES = 8;

export const CustomCategoriesScreen: React.FC<CustomCategoriesScreenProps> = ({ allCategories, startGame, goToMenu }) => {
  const [selected, setSelected] = useState<Map<string, Category>>(new Map());
  const [error, setError] = useState<string | null>(null);
  const { playSelect, playStart } = useSound();

  const handleSelect = useCallback((category: Category) => {
    playSelect();
    setSelected(prev => {
      const newSelected = new Map(prev);
      if (newSelected.has(category.id)) {
        newSelected.delete(category.id);
      } else {
        newSelected.set(category.id, category);
      }
      return newSelected;
    });
    setError(null);
  }, [playSelect]);

  const handleStartGame = () => {
    if (selected.size < MIN_CATEGORIES || selected.size > MAX_CATEGORIES) {
      setError(`Please select between ${MIN_CATEGORIES} and ${MAX_CATEGORIES} categories.`);
      return;
    }
    startGame(Array.from(selected.values()));
  };

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-center">
            <CardTitle className="text-3xl font-bold font-headline">Custom Game</CardTitle>
             <Button variant="ghost" size="icon" onClick={goToMenu}>
                <ArrowLeft className="h-5 w-5" />
            </Button>
        </div>
        <CardDescription>Choose {MIN_CATEGORIES}-{MAX_CATEGORIES} categories for your game.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {allCategories.map(category => (
            <div key={category.id} className="flex items-center space-x-3 p-3 rounded-md border has-[:checked]:bg-primary/10 has-[:checked]:border-primary transition-colors">
              <Checkbox
                id={category.id}
                checked={selected.has(category.id)}
                onCheckedChange={() => handleSelect(category)}
              />
              <Label htmlFor={category.id} className="flex items-center gap-2 text-sm font-normal cursor-pointer w-full">
                <category.Icon className="h-5 w-5" />
                {category.name}
              </Label>
            </div>
          ))}
        </div>
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleStartGame} className="w-full" size="lg">
          <Play className="mr-2 h-5 w-5" />
          Start Custom Game ({selected.size})
        </Button>
      </CardFooter>
    </Card>
  );
};
