export interface Achievement {
  id: string;
  title: string;
  description: string;
  type: 'score' | 'games';
  threshold: number;
}

export const achievementsList: Achievement[] = [
  { id: 'rookie_ranker', title: 'Rookie Ranker', description: 'Complete your first game.', type: 'games', threshold: 1 },
  { id: 'seasoned_geographer', title: 'Seasoned Geographer', description: 'Complete 10 games.', type: 'games', threshold: 10 },
  { id: 'world_explorer', title: 'World Explorer', description: 'Complete 25 games.', type: 'games', threshold: 25 },
  { id: 'bronze_medalist', title: 'Bronze Medalist', description: 'Get a total score under 400.', type: 'score', threshold: 400 },
  { id: 'silver_medalist', title: 'Silver Medalist', description: 'Get a total score under 250.', type: 'score', threshold: 250 },
  { id: 'gold_medalist', title: 'Gold Medalist', description: 'Get a total score under 100.', type: 'score', threshold: 100 },
  { id: 'perfect_picker', title: 'Perfect Picker', description: 'Get a total score under 50.', type: 'score', threshold: 50 },
  { id: 'master_ranker', title: 'Master Ranker', description: 'Get a total score of 20 or less.', type: 'score', threshold: 20 },
];
