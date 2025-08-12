'use client';

import { useReducer, Reducer, useCallback, useMemo, useEffect } from 'react';
import { countries, categories as allCategories, Country, Category } from '@/lib/data';
import { generateHint } from '@/ai/flows/generate-hint';
import type { Settings } from './use-settings';
import type { useAchievements } from './use-achievements.tsx';

type GameState = 'menu' | 'custom' | 'playing' | 'results' | 'achievements';

interface RoundResult {
  country: Country;
  selectedCategory: Category;
  score: number;
  bestCategory?: Category;
  hint?: string;
  hintLoading: boolean;
}

interface State {
  gameState: GameState;
  gameCountries: Country[];
  gameCategories: Category[];
  currentRoundIndex: number;
  score: number;
  history: RoundResult[];
}

type Action =
  | { type: 'START_GAME'; payload: { categories: Category[], rounds: number } }
  | { type: 'SELECT_CATEGORY'; payload: { category: Category } }
  | { type: 'SET_HINT'; payload: { hint: string } }
  | { type: 'SET_HINT_LOADING'; payload: { loading: boolean } }
  | { type: 'NEXT_ROUND' }
  | { type: 'END_GAME' }
  | { type: 'GO_TO_MENU' }
  | { type: 'GO_TO_CUSTOM' }
  | { type: 'GO_TO_ACHIEVEMENTS' };

const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const initialState: State = {
  gameState: 'menu',
  gameCountries: [],
  gameCategories: [],
  currentRoundIndex: 0,
  score: 0,
  history: [],
};

const gameReducer: Reducer<State, Action> = (state, action): State => {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...initialState,
        gameState: 'playing',
        gameCategories: action.payload.categories,
        gameCountries: shuffleArray(countries).slice(0, action.payload.rounds),
      };
    case 'SELECT_CATEGORY': {
      const currentCountry = state.gameCountries[state.currentRoundIndex];
      const score = currentCountry.ranks[action.payload.category.id];
      const gameCategories = Array.isArray(state.gameCategories) ? state.gameCategories : [];
      const availableCategoryIds = gameCategories.map(c => c.id).filter(id => !state.history.some(h => h.selectedCategory.id === id));
      const bestCategory = gameCategories
        .filter(c => availableCategoryIds.includes(c.id))
        .sort((a, b) => currentCountry.ranks[a.id] - currentCountry.ranks[b.id])[0];

      return {
        ...state,
        history: [
          ...state.history,
          {
            country: currentCountry,
            selectedCategory: action.payload.category,
            score,
            bestCategory,
            hintLoading: true,
          },
        ],
      };
    }
    case 'SET_HINT': {
        const newHistory = [...state.history];
        if(newHistory.length > 0) {
            newHistory[newHistory.length-1].hint = action.payload.hint;
            newHistory[newHistory.length-1].hintLoading = false;
        }
        return { ...state, history: newHistory };
    }
    case 'SET_HINT_LOADING': {
        const newHistory = [...state.history];
        if(newHistory.length > 0) {
            newHistory[newHistory.length-1].hintLoading = action.payload.loading;
        }
        return { ...state, history: newHistory };
    }
    case 'NEXT_ROUND':
        if (state.currentRoundIndex < state.gameCountries.length - 1) {
            const lastRound = state.history[state.history.length-1];
            return {
                ...state,
                currentRoundIndex: state.currentRoundIndex + 1,
                score: state.score + lastRound.score,
            };
        }
        // Fallthrough to END_GAME if it's the last round
        return { ...state, gameState: 'results', score: state.score + state.history[state.history.length-1].score };
    case 'END_GAME':
      const finalScore = state.score + (state.history[state.history.length-1]?.score || 0);
      return { ...state, gameState: 'results', score: finalScore };
    case 'GO_TO_MENU':
      return { ...initialState, gameState: 'menu' };
    case 'GO_TO_CUSTOM':
        return { ...state, gameState: 'custom' };
    case 'GO_TO_ACHIEVEMENTS':
        return { ...state, gameState: 'achievements' };
    default:
      return state;
  }
};

interface GameStateProps {
    settings: Settings;
    achievements: ReturnType<typeof useAchievements>['achievements'];
    achievementsActions: Pick<ReturnType<typeof useAchievements>, 'checkAndUnlockAchievements'>;
}

export const useGameState = ({ settings, achievements, achievementsActions }: GameStateProps) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  useEffect(() => {
    if (state.gameState === 'results' && state.score > 0) {
      achievementsActions.checkAndUnlockAchievements(state.score);
    }
  }, [state.gameState, state.score, achievementsActions]);

  const startGame = useCallback((customCategories?: Category[]) => {
    const categoriesToUse = customCategories || shuffleArray(allCategories).slice(0, 5);
    dispatch({ type: 'START_GAME', payload: { categories: categoriesToUse, rounds: categoriesToUse.length } });
  }, []);

  const selectCategory = useCallback(async (category: Category) => {
    dispatch({ type: 'SELECT_CATEGORY', payload: { category } });
    
    const currentCountry = state.gameCountries[state.currentRoundIndex];
    const rank = currentCountry.ranks[category.id];
    
    const gameCategories = Array.isArray(state.gameCategories) ? state.gameCategories : [];
    const availableCategoryIds = gameCategories.map(c => c.id).filter(id => !state.history.some(h => h.selectedCategory.id === id));
    const bestCategory = gameCategories
      .filter(c => availableCategoryIds.includes(c.id))
      .sort((a, b) => currentCountry.ranks[a.id] - currentCountry.ranks[b.id])[0];
      
    if (settings.hintsOn && bestCategory && bestCategory.id !== category.id && currentCountry.ranks[bestCategory.id] < rank) {
        try {
            const hintResult = await generateHint({
                country: currentCountry.name,
                selectedCategory: category.name,
                correctCategory: bestCategory.name,
                countryRankingInSelectedCategory: rank,
                countryRankingInCorrectCategory: currentCountry.ranks[bestCategory.id],
            });
            dispatch({ type: 'SET_HINT', payload: { hint: hintResult.hint } });
        } catch(e) {
            console.error("Error generating hint:", e);
            dispatch({ type: 'SET_HINT', payload: { hint: "Could not generate a hint at this time." } });
        }
    } else {
        dispatch({ type: 'SET_HINT_LOADING', payload: { loading: false } });
    }
  }, [state.currentRoundIndex, state.gameCountries, state.gameCategories, state.history, settings.hintsOn]);
  
  const nextRound = useCallback(() => {
    const gameCategories = Array.isArray(state.gameCategories) ? state.gameCategories : [];
    if (state.currentRoundIndex >= gameCategories.length - 1) {
        dispatch({ type: 'END_GAME' });
    } else {
        dispatch({ type: 'NEXT_ROUND' });
    }
  }, [state.currentRoundIndex, state.gameCategories]);
  
  const goToMenu = useCallback(() => dispatch({ type: 'GO_TO_MENU' }), []);
  const goToCustom = useCallback(() => dispatch({ type: 'GO_TO_CUSTOM' }), []);
  const goToAchievements = useCallback(() => dispatch({ type: 'GO_TO_ACHIEVEMENTS' }), []);

  const currentCountry = useMemo(() => state.gameCountries[state.currentRoundIndex], [state.gameCountries, state.currentRoundIndex]);
  const roundResult = useMemo(() => state.history[state.currentRoundIndex], [state.history, state.currentRoundIndex]);
  const availableCategories = useMemo(() => {
    const gameCategories = Array.isArray(state.gameCategories) ? state.gameCategories : [];
    return gameCategories.filter(cat => !state.history.some(h => h.selectedCategory.id === cat.id))
  }, [state.gameCategories, state.history]);
  
  return {
    ...state,
    currentCountry,
    roundResult,
    availableCategories,
    startGame,
    selectCategory,
    nextRound,
    goToMenu,
    goToCustom,
    goToAchievements,
  };
};
