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
  
  { id: 'score_4_150', title: 'Quick & Sharp', description: 'Score under 150 in a 4-category game.', type: 'score', threshold: 150 },
  { id: 'score_4_100', title: 'Swift Strategist', description: 'Score under 100 in a 4-category game.', type: 'score', threshold: 100 },
  { id: 'score_4_80', title: 'Four-Star Finisher', description: 'Score under 80 in a 4-category game.', type: 'score', threshold: 80 },
  { id: 'score_4_60', title: 'Rapid Ranker', description: 'Score under 60 in a 4-category game.', type: 'score', threshold: 60 },
  { id: 'score_4_40', title: 'Mini-Master', description: 'Score under 40 in a 4-category game.', type: 'score', threshold: 40 },

  { id: 'score_5_200', title: 'Standard Success', description: 'Score under 200 in a 5-category game.', type: 'score', threshold: 200 },
  { id: 'score_5_150', title: 'Adept Analyst', description: 'Score under 150 in a 5-category game.', type: 'score', threshold: 150 },
  { id: 'score_5_100', title: 'Five-Category Phenom', description: 'Score under 100 in a 5-category game.', type: 'score', threshold: 100 },
  { id: 'score_5_75', title: 'Specialist Scorer', description: 'Score under 75 in a 5-category game.', type: 'score', threshold: 75 },
  { id: 'score_5_50', title: 'Standard Setter', description: 'Score under 50 in a 5-category game.', type: 'score', threshold: 50 },
  
  { id: 'score_6_250', title: 'Solid Six', description: 'Score under 250 in a 6-category game.', type: 'score', threshold: 250 },
  { id: 'score_6_180', title: 'Hexa-Hero', description: 'Score under 180 in a 6-category game.', type: 'score', threshold: 180 },
  { id: 'score_6_120', title: 'Sensational Six', description: 'Score under 120 in a 6-category game.', type: 'score', threshold: 120 },
  { id: 'score_6_90', title: 'Superb Six', description: 'Score under 90 in a 6-category game.', type: 'score', threshold: 90 },
  { id: 'score_6_60', title: 'Six-Shooter', description: 'Score under 60 in a 6-category game.', type: 'score', threshold: 60 },

  { id: 'score_7_300', title: 'Lucky Number', description: 'Score under 300 in a 7-category game.', type: 'score', threshold: 300 },
  { id: 'score_7_210', title: 'Superb Seven', description: 'Score under 210 in a 7-category game.', type: 'score', threshold: 210 },
  { id: 'score_7_140', title: 'Magnificent Seven', description: 'Score under 140 in a 7-category game.', type: 'score', threshold: 140 },
  { id: 'score_7_105', title: 'Seventh Heaven', description: 'Score under 105 in a 7-category game.', type: 'score', threshold: 105 },
  { id: 'score_7_70', title: 'Perfected Septet', description: 'Score under 70 in a 7-category game.', type: 'score', threshold: 70 },

  { id: 'score_8_350', title: 'Great Eight', description: 'Score under 350 in an 8-category game.', type: 'score', threshold: 350 },
  { id: 'score_8_240', title: 'Elite Eight', description: 'Score under 240 in an 8-category game.', type: 'score', threshold: 240 },
  { id: 'score_8_160', title: 'Astounding Octet', description: 'Score under 160 in an 8-category game.', type: 'score', threshold: 160 },
  { id: 'score_8_120', title: 'Erudite Expert', description: 'Score under 120 in an 8-category game.', type: 'score', threshold: 120 },
  { id: 'score_8_80', title: 'World Class', description: 'Score under 80 in an 8-category game.', type: 'score', threshold: 80 },

  { id: 'quick_match', title: 'Quick Match', description: 'Complete a game with 4 categories.', type: 'categories', threshold: 4 },
  { id: 'standard_issue', title: 'Standard Issue', description: 'Complete a game with 5 categories.', type: 'categories', threshold: 5 },
  { id: 'adept_adventurer', title: 'Adept Adventurer', description: 'Complete a game with 6 categories.', type: 'categories', threshold: 6 },
  { id: 'seasoned_specialist', title: 'Seasoned Specialist', description: 'Complete a game with 7 categories.', type: 'categories', threshold: 7 },
  { id: 'erudite_expert_finish', title: 'Erudite Expert', description: 'Complete a game with all 8 categories.', type: 'categories', threshold: 8 },

  { id: 'flawless_victory', title: 'Flawless Victory', description: 'Complete a game by choosing the best category in every round.', type: 'perfect', threshold: 1 },
];
