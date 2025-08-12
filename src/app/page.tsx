'use client';

import React from 'react';
import { MainMenu } from '@/components/game/main-menu';
import { GameScreen } from '@/components/game/game-screen';
import { ResultsScreen } from '@/components/game/results-screen';
import { AchievementsScreen } from '@/components/game/achievements-screen';
import { CustomCategoriesScreen } from '@/components/game/custom-categories-screen';
import { useGameState } from '@/hooks/use-game-state';
import { useSettings } from '@/hooks/use-settings';
import { useAchievements } from '@/hooks/use-achievements.tsx';
import { categories as allCategories } from '@/lib/data';

export default function GeoRankerPage() {
  const { settings, ...settingsActions } = useSettings();
  const { achievements, ...achievementsActions } = useAchievements();
  const gameState = useGameState({ settings, achievements, achievementsActions });

  const renderContent = () => {
    switch (gameState.gameState) {
      case 'playing':
        return <GameScreen {...gameState} {...settings} />;
      case 'results':
        return <ResultsScreen {...gameState} />;
      case 'achievements':
        return <AchievementsScreen achievements={achievements} goToMenu={gameState.goToMenu} />;
      case 'custom':
        return <CustomCategoriesScreen allCategories={allCategories} startGame={gameState.startGame} goToMenu={gameState.goToMenu} />;
      case 'menu':
      default:
        return (
          <MainMenu
            startGame={gameState.startGame}
            goToCustom={gameState.goToCustom}
            goToAchievements={gameState.goToAchievements}
            settings={settings}
            settingsActions={settingsActions}
          />
        );
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md mx-auto">
        {renderContent()}
      </div>
    </main>
  );
}
