export interface Achievement {
  id: string;
  title: string;
  description: string;
  type: 'score' | 'games' | 'categories' | 'perfect';
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

  { id: 'quick_match', title: 'Quick Match', description: 'Win a game with 4 categories.', type: 'categories', threshold: 4 },
  { id: 'standard_issue', title: 'Standard Issue', description: 'Win a game with 5 categories.', type: 'categories', threshold: 5 },
  { id: 'adept_adventurer', title: 'Adept Adventurer', description: 'Win a game with 6 categories.', type: 'categories', threshold: 6 },
  { id: 'seasoned_specialist', title: 'Seasoned Specialist', description: 'Win a game with 7 categories.', type: 'categories', threshold: 7 },
  { id: 'erudite_expert', title: 'Erudite Expert', description: 'Win a game with all 8 categories.', type: 'categories', threshold: 8 },

  { id: 'flawless_victory', title: 'Flawless Victory', description: 'Complete a game with a perfect score, choosing the best category every round.', type: 'perfect', threshold: 1 },
];
