import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Volume2, VolumeX, Eye, EyeOff, Lightbulb } from 'lucide-react';
import type { Settings } from '@/hooks/use-settings';

interface SettingsDialogProps {
  children: React.ReactNode;
  settings: Settings;
  toggleSound: () => void;
  toggleExpertMode: () => void;
  toggleHints: () => void;
}

export const SettingsDialog: React.FC<SettingsDialogProps> = ({ children, settings, toggleSound, toggleExpertMode, toggleHints }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Customize your game experience.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="flex items-center justify-between space-x-4 rounded-lg border p-4">
            <div className="flex items-center space-x-2">
              {settings.soundOn ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
              <Label htmlFor="sound-mode">Sound</Label>
            </div>
            <Switch
              id="sound-mode"
              checked={settings.soundOn}
              onCheckedChange={toggleSound}
            />
          </div>
          <div className="flex items-center justify-between space-x-4 rounded-lg border p-4">
            <div className="flex items-center space-x-2">
              {settings.expertMode ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              <Label htmlFor="expert-mode">Expert Mode</Label>
            </div>
            <Switch
              id="expert-mode"
              checked={settings.expertMode}
              onCheckedChange={toggleExpertMode}
            />
          </div>
          <div className="flex items-center justify-between space-x-4 rounded-lg border p-4">
            <div className="flex items-center space-x-2">
              <Lightbulb className="h-5 w-5 text-accent" />
              <Label htmlFor="hints-mode">Best Pick Hints</Label>
            </div>
            <Switch
              id="hints-mode"
              checked={settings.hintsOn}
              onCheckedChange={toggleHints}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
