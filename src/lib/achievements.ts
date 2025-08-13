
export interface Achievement {
  id: string;
  title: string;
  description: string;
  type: 'score' | 'games' | 'categories' | 'perfect';
  threshold: number;
}

export const achievementsList: Achievement[] = [
  // General Achievements
  { id: 'rookie_ranker', title: 'Rookie Ranker', description: 'Complete your first game.', type: 'games', threshold: 1 },
  { id: 'seasoned_geographer', title: 'Seasoned Geographer', description: 'Complete 10 games.', type: 'games', threshold: 10 },
  { id: 'world_explorer', title: 'World Explorer', description: 'Complete 25 games.', type: 'games', threshold: 25 },
  { id: 'atlas_architect', title: 'Atlas Architect', description: 'Complete 50 games.', type: 'games', threshold: 50 },
  { id: 'terra_triumph', title: 'Terra Triumph', description: 'Complete 100 games.', type: 'games', threshold: 100 },
  { id: 'globe_trotter', title: 'Globe Trotter', description: 'Complete 250 games.', type: 'games', threshold: 250 },
  { id: 'planetary_professor', title: 'Planetary Professor', description: 'Complete 500 games.', type: 'games', threshold: 500 },
  { id: 'galactic_geographer', title: 'Galactic Geographer', description: 'Complete 1000 games.', type: 'games', threshold: 1000 },
  { id: 'flawless_victory', title: 'Flawless Victory', description: 'Complete a game by choosing the best category in every round.', type: 'perfect', threshold: 1 },

  // 4-Category Achievements
  { id: 'quick_match', title: 'Quick Match', description: 'Complete a game with 4 categories.', type: 'categories', threshold: 4 },
  { id: 'score_4_160', title: 'Apprentice Analyst', description: 'Score under 160 in a 4-category game.', type: 'score', threshold: 160 },
  { id: 'score_4_140', title: 'Decisive Dabbler', description: 'Score under 140 in a 4-category game.', type: 'score', threshold: 140 },
  { id: 'score_4_100', title: 'Swift Strategist', description: 'Score under 100 in a 4-category game.', type: 'score', threshold: 100 },
  { id: 'score_4_80', title: 'Four-Star Finisher', description: 'Score under 80 in a 4-category game.', type: 'score', threshold: 80 },

  // 5-Category Achievements
  { id: 'standard_issue', title: 'Standard Issue', description: 'Complete a game with 5 categories.', type: 'categories', threshold: 5 },
  { id: 'score_5_200', title: 'Standard Success', description: 'Score under 200 in a 5-category game.', type: 'score', threshold: 200 },
  { id: 'score_5_175', title: 'Adept Analyst', description: 'Score under 175 in a 5-category game.', type: 'score', threshold: 175 },
  { id: 'score_5_125', title: 'Specialist Scorer', description: 'Score under 125 in a 5-category game.', type: 'score', threshold: 125 },
  { id: 'score_5_100', title: 'Five-Category Phenom', description: 'Score under 100 in a 5-category game.', type: 'score', threshold: 100 },
  
  // 6-Category Achievements
  { id: 'adept_adventurer', title: 'Adept Adventurer', description: 'Complete a game with 6 categories.', type: 'categories', threshold: 6 },
  { id: 'score_6_240', title: 'Solid Six', description: 'Score under 240 in a 6-category game.', type: 'score', threshold: 240 },
  { id: 'score_6_210', title: 'Hexa-Hero', description: 'Score under 210 in a 6-category game.', type: 'score', threshold: 210 },
  { id: 'score_6_150', title: 'Sensational Six', description: 'Score under 150 in a 6-category game.', type: 'score', threshold: 150 },
  { id: 'score_6_120', title: 'Six-Shooter', description: 'Score under 120 in a 6-category game.', type: 'score', threshold: 120 },

  // 7-Category Achievements
  { id: 'seasoned_specialist', title: 'Seasoned Specialist', description: 'Complete a game with 7 categories.', type: 'categories', threshold: 7 },
  { id: 'score_7_280', title: 'Lucky Number', description: 'Score under 280 in a 7-category game.', type: 'score', threshold: 280 },
  { id: 'score_7_245', title: 'Superb Seven', description: 'Score under 245 in a 7-category game.', type: 'score', threshold: 245 },
  { id: 'score_7_175', title: 'Magnificent Seven', description: 'Score under 175 in a 7-category game.', type: 'score', threshold: 175 },
  { id: 'score_7_140', title: 'Seventh Heaven', description: 'Score under 140 in a 7-category game.', type: 'score', threshold: 140 },

  // 8-Category Achievements
  { id: 'erudite_expert_finish', title: 'Erudite Expert', description: 'Complete a game with all 8 categories.', type: 'categories', threshold: 8 },
  { id: 'score_8_320', title: 'Great Eight', description: 'Score under 320 in an 8-category game.', type: 'score', threshold: 320 },
  { id: 'score_8_280', title: 'Elite Eight', description: 'Score under 280 in an 8-category game.', type: 'score', threshold: 280 },
  { id: 'score_8_200', title: 'Astounding Octet', description: 'Score under 200 in an 8-category game.', type: 'score', threshold: 200 },
  { id: 'score_8_160', title: 'World Class', description: 'Score under 160 in an 8-category game.', type: 'score', threshold: 160 },
];
