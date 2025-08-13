import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { SettingsDialog } from './settings-dialog';
import { ListChecks, Play, Trophy, Settings } from 'lucide-react';
import type { useSettings } from '@/hooks/use-settings';

interface MainMenuProps {
  startGame: () => void;
  goToCustom: () => void;
  goToAchievements: () => void;
  settings: ReturnType<typeof useSettings>['settings'];
  settingsActions: Omit<ReturnType<typeof useSettings>, 'settings' | 'isLoaded'>;
}

export const MainMenu: React.FC<MainMenuProps> = ({ startGame, goToCustom, goToAchievements, settings, settingsActions }) => {

  return (
    <Card className="w-full max-w-md text-center shadow-lg">
      <CardHeader>
        <CardTitle className="text-4xl font-bold font-headline text-primary">Geo Ranker</CardTitle>
        <CardDescription>Test your geography knowledge!</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        <Button onClick={startGame} className="w-full" size="lg">
          <Play className="mr-2 h-5 w-5" />
          Start Game
        </Button>
        <Button onClick={goToCustom} className="w-full" variant="secondary">
          <ListChecks className="mr-2 h-5 w-5" />
          Custom Game
        </Button>
        <Button onClick={goToAchievements} className="w-full" variant="secondary">
          <Trophy className="mr-2 h-5 w-5 text-accent" />
          Achievements
        </Button>
        <SettingsDialog settings={settings} {...settingsActions}>
          <Button variant="outline" className="w-full">
            <Settings className="mr-2 h-5 w-5" />
            Settings
          </Button>
        </SettingsDialog>
      </CardContent>
    </Card>
  );
};
